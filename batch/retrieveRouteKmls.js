var graphService = require('../services/graphService.js');

graphService.searchAllRoutes(function(data){
    for(i=0 ; i < data.length ; i++){
         var routeNo = data[i].routeNo;
         console.log('http://nb.translink.ca/geodata/'+routeNo+'.kmz');    
    }
});
