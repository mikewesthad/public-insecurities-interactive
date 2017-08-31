// Generator that create a unique name in the format jsonp_[time in ms]_[unique number]
const callbackNameGenerator = {
  i: 0,
  lastTime: 0,
  getUniqueName: function() {
    const time = Date.now();
    if (time === this.lastTime) this.i++;
    else this.i = 0;
    this.lastTime = time;
    return `jsonp_${time}_${this.i}`;
  }
};

export default function fetchJsonp(url, jsonpKey = "jsonp", timeout = 4000) {
  return new Promise((resolve, reject) => {
    // Namespace all the callbacks to keep the globals clean
    if (!window.jsonpCallbacks) window.jsonpCallbacks = {};

    // Create the script
    const script = document.createElement("script");
    const callbackName = callbackNameGenerator.getUniqueName();
    // Construct the url, handling the following cases:
    // - www.url.com -> add a "?"
    // - www.url.com? -> do nothing
    // - www.url.com?param=val -> add an &
    let requestUrl = url;
    if (!url.includes("?")) requestUrl += "?";
    else {
      const query = url.substring(url.indexOf("?") + 1); // Split at first "?"
      // If there's a query string, but it doesn't end with "&", add an "&"
      if (query.length !== 0 && !query.endsWith("&")) requestUrl += "&";
    }
    requestUrl += `${jsonpKey}=window.jsonpCallbacks.${callbackName}`;
    script.src = requestUrl;

    // Set a timeout error
    const timerId = setTimeout(() => {
      reject(new Error(`Jsonp fetch: request timed out for ${requestUrl}`));
      cleanUp();
    }, timeout);

    // Script error
    script.addEventListener("error", error => {
      reject(new Error(`Jsonp fetch: request errored out for ${requestUrl}.`));
      cleanUp();
    });

    // Handle a successful request
    window.jsonpCallbacks[callbackName] = data => {
      resolve(data);
      cleanUp();
    };

    const cleanUp = () => {
      clearTimeout(timerId);
      delete window.jsonpCallbacks[callbackName];
      if (Object.keys(window.jsonpCallbacks).length === 0) delete window.jsonpCallbacks;
      document.head.removeChild(script);
    };

    // Kick things off
    document.head.appendChild(script);
  });
}
