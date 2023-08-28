// Use the D3 library to read in samples.json
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Initial webpage display
function init() {
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data) => {
        let names = data.names;
        const dropdown = d3.select("#selDataset")
        for (let index = 0; index < names.length; index++) {
            dropdown.append("option").text(names[index]).property("value", names[index])
        }
        buildCharts(names[0])
        buildMetadata(names[0])
});
};

init()

// Update charts and metadata when new participant chosen
function optionChanged(newSample) {
    buildCharts(newSample)
    buildMetadata(newSample)
}

// Create bar chart and bubble chart
function buildCharts(sample) {
    d3.json('https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json').then((data) => {
        let samples = data.samples;
        // Filter the data for the object with the desired sample number
        let resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        let result = resultArray[0];
        console.log(result)

        // Bar chart
        let bar_data = [{
            type: 'bar',
            x: result.sample_values.slice(0,10).reverse(),                                       // sample_values
            y: result.otu_ids.slice(0,10).map(otu_id => "OTU " + otu_id).reverse(),              // otu_ids
            orientation: 'h',
            text: result.otu_labels.slice(0,10).reverse()                                        // otu_labels
        }];
        
            let bar_layout = {
            title: "Top 10 OTUs"
          };
        
            Plotly.newPlot('bar', bar_data, bar_layout);

        // Bubble chart
        let bub_data = [{
            mode: 'markers',
            x: result.otu_ids,                                                       // otu_ids
            y: result.sample_values.reverse(),                                       // sample_values
            text: result.otu_labels.reverse(),                                       // otu_labels
            marker: {
                size: result.sample_values.reverse(),                                // sample_values
                color: result.otu_ids                                                // otu_ids
                }
            }];
            
            let bub_layout = {
                xaxis: {
                    title: {
                        text: 'OTU ID'
                    }
                }
            }
            Plotly.newPlot('bubble', bub_data, bub_layout)
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

        for (key in result) {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
        };
    });
}
