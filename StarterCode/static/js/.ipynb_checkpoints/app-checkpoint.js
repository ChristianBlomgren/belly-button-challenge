//"https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json"

const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Promise Pending
const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
}).catch(error => console.error('Error fetching data:', error));
