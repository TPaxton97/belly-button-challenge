// Use the D3 library to read in samples.json
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

let samples = d3.json(url, function(data) {
    console.log(data);
});

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// let sample_values = samples.map(function(sample_value) {
//     return sample_value.sample_values ;
// });

let bar_data = [{
    type: 'bar',
    x: [],              // sample_values
    y: [],              // otu_ids
    orientation: 'h',
    text: []            // otu_labels
}];

let bar_layout = {
    title: "Top 10 OTUs"
  };

Plotly.newPlot('bar', bar_data, bar_layout);

// Create a bubble chart that displays each sample.

let bub_data = [{
    mode: 'markers',
    x: [],              // otu_ids
    y: [],              // sample_values
    text: [],           // otu_labels
    marker: {
        size: [],       // sample_values
        color: []       // otu_ids
    }
}];

let bub_layout = {
    xaxis:
        title:
            
}


//Display the sample metadata, i.e., an individual's demographic information.

//Display each key-value pair from the metadata JSON object somewhere on the page.

//Update all the plots when a new sample is selected.