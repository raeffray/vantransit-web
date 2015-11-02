
var graphDao = require('../dao/neo4j-dao');
var util = require('./utils.js');
var winston = require('winston');
var log = new winston.Logger();


function searchTripByRouteAndStop(routeCode, stopCode, callback){

	var date = new Date();

    var data_inc = new Date(date.getTime() + (1000 * 1200));

    var data_dec = new Date(date.getTime() - (1000 * 600));

    var endHour = util.formatHour(data_inc);

    var initialHour = util.formatHour(data_dec);

	graphDao.searchTripByRouteAndStop(routeCode, initialHour, endHour, stopCode, util.getDayOfweek(date.getDay()), function(result){
		log.debug("graph service -  result: ["+result+"]");
		util.massageReturn(result,callback);
	});
};

function searchTripByStop(stopCode, callback){

	console.log("stopCode: "+stopCode);

	var date = new Date();

    var data_inc = new Date(date.getTime() + (1000 * 1200));

    var data_dec = new Date(date.getTime() - (1000 * 600));

    var endHour = util.formatHour(data_inc);

    var initialHour = util.formatHour(data_dec);

	graphDao.searchTripByStop(initialHour, endHour, stopCode, util.getDayOfweek(date.getDay()), function(result){
		log.debug("graph service -  result: ["+result+"]");
		util.massageReturn(result,callback);
		//callback(result);
	});
};

function searchTripById(tripId, callback){
    
     var date = new Date();

     graphDao.searchTripById(tripId, util.getDayOfweek(date.getDay()), function(result){
         log.debug("graph service -  result: ["+result+"]");
         util.massageReturn(result,callback);
		//callback(result);
     });
};

module.exports.searchTripByRouteAndStop = searchTripByRouteAndStop;
module.exports.searchTripByStop = searchTripByStop;
module.exports.searchTripById = searchTripById;


