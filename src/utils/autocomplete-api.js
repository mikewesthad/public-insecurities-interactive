// Ref: https://shreyaschand.com/blog/2013/01/03/google-autocomplete-api/
import fetchJsonp from "./fetch-jsonp";

export function fetchAutocompletes(searchTerm, tld = ".com") {
  const encodedTerm = encodeURI(searchTerm);
  return fetchJsonp(
    `http://google${tld}/complete/search?client=youtube&q=${encodedTerm}`,
    "jsonp",
    "6000"
  ).then(jsonResponse => {
    const [originalTerm, autocompletes] = jsonResponse;
    return {
      searchTerm: originalTerm,
      autocompletes: autocompletes.map(elem => elem[0]) // Trim away empty 2nd element
    };
  });
}

export function fetchAutocompletesWithTlds(searchTerm, tlds = [".com", ".co.uk"]) {
  const promises = tlds.map(tld => fetchAutocompletes(searchTerm, tld));
  return Promise.all(promises).then(results => {
    const autocompletes = results
      .map(results => results.autocompletes)
      .reduce((prev, next) => prev.concat(next), []) // Flatten
      .filter((elem, i, array) => array.indexOf(elem) === i); // Filter out duplicates
    return {
      searchTerm: results[0].searchTerm,
      tlds,
      autocompletes
    };
  });
}
