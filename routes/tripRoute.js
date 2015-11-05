var graphService = require('../services/graphService');
var winston = require('winston');
var log = require('../utils/van-logger');

exports.searchTripsWithParameters = function(req, res) {

	var stopCode = req.param('stopCode');
	var routeCode = req.param('routeCode');

	log.info('routeCode: [' + routeCode + ']');
	log.info('stopCode: [' + stopCode + ']');

	if (typeof routeCode !== 'undefined' && typeof stopCode !== 'undefined') {
		res.status(422)
			.send('Not found');
	}

	if (typeof routeCode !== 'undefined') {
		graphService.searchTripByRouteAndStop(routeCode, stopCode, function(data) {
			log.debug("searchTripByRouteAndStop - sending data");
			res.send(data);
		});
	} else {
		graphService.searchTripByStop(stopCode, function(data) {
			log.debug("searchTripByStop - sending data");
			res.send(data);
		});
	}

};

exports.searchTripsByRoute = function(req, res) {

	//res.header("Access-Control-Allow-Origin", "*");
	//res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	var routeCode = req.param('routeCode');

	log.info('routeCode: [' + routeCode + ']');

	if ((typeof routeCode !== 'undefined')) {
		graphService.searchTripByRoute(routeCode, function(data) {
			log.debug("searchTripByStop - sending data");
			res.send(data);
		});
	} else {
		res.status(422)
			.send('Not found');
	}

};

exports.searchTripById = function(req, res) {

	var tripId = req.param('tripId');

	log.info('tripId: [' + tripId + ']');

	if (typeof tripId !== 'undefined') {
		graphService.searchTripById(tripId, function(data) {
			res.send(data);
		});
	} else {

	}
};