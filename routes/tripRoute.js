var graphService = require('../services/graphService');

var winston = require('winston');
var log = new winston.Logger();

exports.searchTripsWithParameters = function (req,res){

	var stopCode = req.param('stopCode');

	var routeCode = req.param('routeCode');

	if( typeof routeCode !== 'undefined'){
		graphService.searchTripByRouteAndStop(routeCode,stopCode,function (data) {
			log.info("stops route - sending data");
			res.send(data);
		});
	}else{
		console.log('step 2');
		graphService.searchTripByStop(stopCode,function (data) {
			log.info("stops route - sending data");
			res.send(data);
		});		
	}

};

exports.searchTripById = function (req,res){

	var tripId = req.param('tripId');

	if( typeof tripId !== 'undefined'){
		graphService.searchTripById(tripId,function (data) {
			res.send(data);
		});
	}else{
			
	}

};
