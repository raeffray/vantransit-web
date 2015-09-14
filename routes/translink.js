var graph = require('../services/graphService');

var http = require('http');

var headers_opt = { 
  'accept': 'application/json' }

function callExternalWs(options,callback){

	var response = '';
	try{
		http.request(options, function(res) {
		  
		  console.log('STATUS: ' + res.statusCode);
		  console.log('HEADERS: ' + JSON.stringify(res.headers));
		  
		  res.setEncoding('utf8');
		  
		  res.on('data', function (chunk) {
		    response += chunk;
		  });
		  
		  res.on('end', function (err) {
			if(res.statusCode==200){
				console.log(response);
				createNodes(JSON.parse(response),function(){
					callback(response);	
				});
			  	
		  	}
		  	callback(response);
		  });
		}).end();
	}catch(err){
		console.log(err);
	}
};

function createNodes(data,callback){
	for (var i = 0; i < data.length; i++) {
		graph.insertNodeUniqueStops(data[i],callback);
	}	
}

function insertCallback(node){
	console.log('created: ' + node);
}

exports.stops = function(req, res){
	for (var i = 0; i < source.length; i++) {
	response = '';
		var options = {
		  host: 'api.translink.ca',
		  port: 80,
		  path: '/rttiapi/v1/stops?apikey='+process.env.TRANSLINK_API_KEY+'&'+source[i],
		  method: 'GET',
		  headers: headers_opt
		};
		callExternalWs(options,function(result){
			//res.send(result);
		});
		console.log(options);
	}
};


var source =[
,'lat=49.209&long=-122.733&Radius=2000'
,'lat=49.192&long=-122.733&Radius=2000'
,'lat=49.175&long=-122.733&Radius=2000'
,'lat=49.158&long=-122.733&Radius=2000'
,'lat=49.141&long=-122.733&Radius=2000'
,'lat=49.124&long=-122.733&Radius=2000'
,'lat=49.107&long=-122.733&Radius=2000'
,'lat=49.09&long=-122.733&Radius=2000'
,'lat=49.073&long=-122.733&Radius=2000'
,'lat=49.056&long=-122.733&Radius=2000'
,'lat=49.039&long=-122.733&Radius=2000'
,'lat=49.022&long=-122.733&Radius=2000'
,'lat=49.005&long=-122.733&Radius=2000'];