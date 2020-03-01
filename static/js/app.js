console.log('JS is loaded')
var names;
var metadata;
var samples;

d3.json('samples.json').then(function(data){
    console.log(data)
    names= data.names 
    metadata= data.metadata
    samples= data.samples
    

    dropdown(names)
})
function dropdown(values){
    var selector = d3.select ('#selDataset')
    values.forEach(function(name){
        selector 
            .append('option')
            .property('value',name)
            .text(name)
    })
optionChanged (values[0])  
}

function barchart (sample){
//sample (ID) go here

//Top 10 


var new_samples = samples.filter(r => r.id.toString() === sample)[0];
console.log (new_samples);

({otu_ids,sample_values, otu_labels} = new_samples);

console.log(sample_values);
//Top 10 values 
var top=sample_values.slice (0,10);
console.log (top);
var reversedtop= top.reverse()
console.log (reversedtop);

var data = [{
    type: 'bar',
    x: reversedtop,
    y: otu_ids.map(item => 'OTU' + " " + item),
    title: 'TOP 10 OTUs',
    orientation: 'h',
    text: otu_labels
  }];

  Plotly.newPlot('bar', data);
console.log(sample)

}


function bubblechart (sample) {
//sample go here

var new_samples = samples.filter(r => r.id.toString() === sample)[0];
console.log (new_samples);

({otu_ids,sample_values, otu_labels} = new_samples);

console.log(sample_values)

var trace1 = {
    x: otu_ids,
    y: sample_values,
    text: otu_labels,
    mode: 'markers',
    marker: {
      color: otu_ids,
      size: sample_values
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'OTU ID',
    showlegend: false,
    height: 450,
    width: 700
  };
  
  Plotly.newPlot('bubble', data, layout);

console.log(sample)

}



//metadata go here
function render_metadata (samples){
    var selector = d3.select("#sample-metadata");
    var selected_metadata = metadata.filter(r => r.id.toString() === samples)[0];
    
    selector.html("")

    for (let [key, value] of Object.entries(selected_metadata)) {
        selector 
        .append('p')
        .text(`${key}: ${value}`);
      }
       
   
}



function optionChanged(newvalue){
    barchart (newvalue)
    bubblechart (newvalue)
    render_metadata (newvalue)

}