var stopsFromFile = require('../import/bus_stops.json');
var graph = require('../services/graphService.js');

//console.log(stopsFromFile.data[1000].graph.nodes[0].labels[0]);

for ( i=0; i<stopsFromFile.data.length; i++){
    var stop = stopsFromFile.data[i];

    var bodyBatch  = [{
        method: 'POST',
        to: '/node', 
        id: i,
        body: stop.row[0]
    },{
        method: 'POST',
        to: '{'+i+'}/labels',
	body: 'Stop'
    }]	
	
    //console.log(bodyBatch)//console.log(stop.row);
    console.log(JSON.stringify(bodyBatch));
}
 

