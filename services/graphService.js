var graphDao = require('../dao/graph-dao');
var util = require('../utils/util');
var log = require('../utils/van-logger');


function searchTripByRouteAndStop(routeCode, stopCode, callback) {

	var currentDate = new Date();
	var endHour = util.modifyDate(currentDate, 20);
	var initialHour = util.modifyDate(currentDate, -10);

	graphDao.searchTripByRouteAndStop(routeCode, initialHour, endHour, stopCode, util.getDayOfweek(currentDate.getDay()), function(result) {
		util.massageReturn(result, callback);
	});
};

function searchTripByRoute(routeCode, callback) {

	var currentDate = new Date();
	var endHour = util.modifyDate(currentDate, 20);
	var initialHour = util.modifyDate(currentDate, -10);

	graphDao.searchTripsByRoute(routeCode, initialHour, endHour, util.getDayOfweek(currentDate.getDay()), function(result) {
		util.massageReturn(result, callback);
	});
};

function searchTripByStop(stopCode, callback) {

	var currentDate = new Date();
	var endHour = util.modifyDate(currentDate, 20);
	var initialHour = util.modifyDate(currentDate, -10);

	graphDao.searchTripByStop(initialHour, endHour, stopCode, util.getDayOfweek(currentDate.getDay()), function(result) {
		log.debug("graph service -  result: [" + result + "]");
		util.massageReturn(result, callback);
		//callback(result);
	});
};

function searchTripById(tripId, callback) {

	var date = new Date();

	graphDao.searchTripById(tripId, util.getDayOfweek(date.getDay()), function(result) {
		//log.debug("graph service -  result: [" + JSON.stringify(result) + "]");
		util.massageReturn(result, callback);
		//callback(result);
	});
};

module.exports.searchTripByRouteAndStop = searchTripByRouteAndStop;
module.exports.searchTripByStop = searchTripByStop;
module.exports.searchTripById = searchTripById;
module.exports.searchTripByRoute = searchTripByRoute;