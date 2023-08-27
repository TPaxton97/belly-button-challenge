// Use the D3 library to read in samples.json
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// const samples = d3.json(url);

function loadData(dataObject) {
    console.log("printing json as array")
    console.log(dataObject)
    let names = dataObject.names;
    console.log("printing names:");
    console.log(names);
}

// d3.json(url)
//     .then(loadData);

// // console.log("printing samples:");
// // console.log(samples);

// // // data cleaning

// let names = samples.names

// // let names = samples[0].map(function(item) {
// //     return item;
// // });

// console.log("printing names again now:");
// console.log(emptyArray);

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
function init() {
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data) => {
        let names = data.names;
        const dropdown = d3.select("#selDataset")
        for (let index = 0; index < names.length; index++) {
            dropdown.append("option").text(names[index]).property("value", names[index])
        }
        buildcharts(names[0])
        buildMetadata(names[0])
});
};

init()

function optionChanged(newSample) {
    buildcharts(newSample)
    buildMetadata(newSample)
}
// let sample_values = samples.map(function(sample_value) {
//     return sample_value.sample_values ;
// });

// let bar_data = [{
//     type: 'bar',
//     x: [],              // sample_values
//     y: [],              // otu_ids
//     orientation: 'h',
//     text: []            // otu_labels
// }];

// let bar_layout = {
//     title: "Top 10 OTUs"
//   };

// Plotly.newPlot('bar', bar_data, bar_layout);

// Create a bubble chart that displays each sample.

// let bub_data = [{
//     mode: 'markers',
//     x: [],              // otu_ids
//     y: [],              // sample_values
//     text: [],           // otu_labels
//     marker: {
//         size: [],       // sample_values
//         color: []       // otu_ids
//     }
// }];

// let bub_layout = {
//     xaxis:
//         title:

// }
function buildcharts(sample) {
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data) => {
        let samples = data.samples;
        // Filter the data for the object with the desired sample number
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        console.log(result)
        let bar_data = [{
            type: 'bar',
            x: result.sample_values.slice(0,10).reverse(),              // sample_values
            y: result.otu_ids.slice(0,10).map(otu_id => "OTU " + otu_id).reverse(),              // otu_ids
            orientation: 'h',
            text: result.otu_labels.slice(0,10).reverse()           // otu_labels
        }];
        
            let bar_layout = {
            title: "Top 10 OTUs"
          };
        
            Plotly.newPlot('bar', bar_data, bar_layout);
    }
    )};

// Display the sample metadata, i.e., an individual's demographic information.
function buildMetadata(sample) {
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data) => {
        let metadata = data.metadata;
        // Filter the data for the object with the desired sample number
        let resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        // use d3 to select the panel with id of `#sample-metadata`
        let PANEL = d3.select("#sample-metadata");

        // Use `.html("") to clear any existing metadata
        PANEL.html("");

        //Hint: inside the loop, you will need to use the d3 to append new
        // tages for each key-value in the metadata
        for (key in result) {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
    });
}

//Display each key-value pair from the metadata JSON object somewhere on the page.

//Update all the plots when a new sample is selected.