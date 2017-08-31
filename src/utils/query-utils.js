export function parseQuery(location) {
  const query = location.slice(1); // Remove "?"
  const queryObject = {};
  query
    .split("&")
    .map(pair => pair.split("="))
    .forEach(([key, val]) => (queryObject[key] = val));
  return queryObject;
}
