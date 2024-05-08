
// Log the url that the data will be pulled from
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// fetch and log the JSON data
d3.json(url).then(function(data){
  console.log(data);
}); 

//create init function that will populate the dropdown, bar chart, and bubble chart with each sample's dataset
function init(){

  //create the dropdown list variable for all sample IDs in the dataset by appending each ID as a new value
  let dropdownmenu = d3.select("#selDataset");

  //access sample data using d3
  d3.json(url).then((data) => {

  //gather the sample ids from the names list in data and populate the dropdown
  let sample_ids = data.names;
  console.log(sample_ids);
      for (id of sample_ids){
          dropdownmenu.append("option").attr("value", id).text(id);
      };

  let first_id = sample_ids[0];
  console.log(first_id);

  makeBar(first_id);
  makeBubble(first_id);
  makeDemographics(first_id);
  }); 
};

//create a function to populate the horizontal bar chart graph
function makeBar(sample){

  d3.json(url).then((data) => {
      let sample_data = data.samples;

      //apply a filter that matches based on sample id
      let results = sample_data.filter(id => id.id == sample);

      let first_result = results[0];
      console.log(first_result);

      //store the first 10 results to display in the bar chart
      let sample_values = first_result.sample_values.slice(0,10);
      let otu_ids = first_result.otu_ids.slice(0,10);
      let otu_labels = first_result.otu_labels.slice(0,10);
      console.log(sample_values);
      console.log(otu_ids);
      console.log(otu_labels);

      let bar_trace = {
          x: sample_values.reverse(),
          y: otu_ids.map(item => `OTU ${item}`).reverse(),
          text: otu_labels.reverse(),
          type: 'bar',
          orientation: 'h'
      };

      let layout = {title: "Top Ten OTUs"};
      Plotly.newPlot("bar", [bar_trace], layout);
  });
};

function makeBubble(sample){

  d3.json(url).then((data) => {
      let sample_data = data.samples;

      let results = sample_data.filter(id => id.id == sample);

      let first_result = results[0];
      console.log(first_result);

      //store the results to display in the chart
      let sample_values = first_result.sample_values;
      let otu_ids = first_result.otu_ids;
      let otu_labels = first_result.otu_labels;
      console.log(sample_values);
      console.log(otu_ids);
      console.log(otu_labels);

      let bubble_trace = {
          x: otu_ids.reverse(),
          y: sample_values.reverse(),
          text: otu_labels.reverse(),
          mode: 'markers',
          marker: {
              size: sample_values,
              color: otu_ids,
          }
      };

      let layout = {
          title: "Bacteria Count for each Sample ID",
          xaxis: {title: 'OTU ID'},
          yaxis: {title: 'Number of Bacteria'}
      };
      Plotly.newPlot("bubble", [bubble_trace], layout);
  });
};

//create the demographic info function to populate each sample's info
function makeDemographics(sample){

  d3.json(url).then((data) => {

  let demo_info = data.metadata;

  let results = demo_info.filter(id => id.id == sample);

  let first_result = results[0];
  console.log(first_result);

  //clear out previous entries in the demographic info section by setting the text to a blank string
  d3.select('#sample-metadata').text('');

  Object.entries(first_result).forEach(([key,value]) => {
      console.log(key,value);

      //select the demographic info html section with d3 and append new key-value pair
      d3.select('#sample-metadata').append('h3').text(`${key}, ${value}`);
  });
  
  });
};

// define the function when the dropdown detects a change
function optionChanged(value){

  //log the value for debug
  console.log(value);
  makeBar(value);
  makeBubble(value);
  makeDemographics(value);
};

init();