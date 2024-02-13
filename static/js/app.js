url ='https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

//Inicializing Function
function init() {
    //Creating dropdown menu
    d3.json(url).then(data=>{
        names = data.names
        dropmenu = d3.select("#selDataset")
        names.forEach(id => {
            dropmenu.append('option').text(id).property('value')
        });
        //calling the fuctiom plot everytime names[0] change
        plot(names[0])
    })

}
function plot(idseleccionado){
    d3.json(url).then(data=>{
    //declaring Values 
    let samples = data.samples;
    let metadata = data.metadata;
    let nameId = samples.filter(item => item.id == idseleccionado);
    let id = metadata.filter(item => item.id == idseleccionado);
    let sample_metadata = d3.select("#sample-metadata").html("");
    let sampleValues = nameId[0].sample_values;
    let otuIds = nameId[0].otu_ids;
    let otuLabels = nameId[0].otu_labels;
    //declaring charts
    let barChart = [{
        type: 'bar',
        x: sampleValues.slice(0,10),
        y: otuIds.slice(0,10).map(nameId => `OTU ${nameId}`),
        text: otuLabels,
        orientation: 'h'
    }]
    let bubbleChart = [{
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker:{
            color: otuIds,
            size: sampleValues
        }
    }
    ]
    //plotting and charging metadata
    Plotly.newPlot("bar", barChart,{height: 500, width: 1000 });
    Plotly.newPlot("bubble", bubbleChart);
    Object.entries(id[0]).forEach(([key, value]) => {
        sample_metadata.append("h5").text(`${key}: ${value}`);
      });
   

    })
}
//fuction of changing 
function optionChanged(idseleccionado) {
    plot(idseleccionado)
  };
init()