// Ref: https://shreyaschand.com/blog/2013/01/03/google-autocomplete-api/
import fetchJsonp from "./fetch-jsonp";

const endpoint = "http://google.com/complete/search";
const query = "is it normal ";
// fetchJsonp(`${endpoint}?client=youtube&q=${encodeURI(query)}`)
//     .then((jsonResponse) => jsonResponse[1])
//     .then((autocompletes) => {
//         autocompletes.forEach(([autocomplete, num]) => 
//             document.body.innerHTML += `<h1>${autocomplete} : ${num}</h1>`);
//     })
//     .catch((err) => console.log(err));