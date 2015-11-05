var dao = require('./graph-db-conf').Neo4jDb;
var winston = require('winston');
var log = require('../utils/van-logger');

exports.searchNode = function(id, callback) {
	log.debug('calling dao.readNode');
	dao.readNode(id, function(err, node) {
		if (err) throw err;
		log.debug('calling callback');
		callback(node);
	});
};

exports.searchTripsByRoute = function(routeCode, timeBegin, timeEnd, dayOfWeek, callback){
	log.debug('calling cypherQuery');
	var query = "match (r:ROUTE)-[rl0:TRAVELS]->(t:TRIP)-[rl1:EXECUTE]->(s:SERVICE), (t)-[rl3:PICKUP_AT]->(bs:BUSSTOP) where r.code = '"+routeCode+"' and s.dayOfweek = '" + dayOfWeek + "' and rl3.arrivalTimeInt > " + timeBegin + " and rl3.arrivalTimeInt < " + timeEnd + " return r.code as routeCode, toInt(t.tripId) as tripId, rl3.arrivalTime as arrivalTime, bs.code as stopCode, bs.description as stopDescription, toInt(rl3.sequence) as sequence,bs.latitude as latitude, bs.longitude as longitude order by toInt(rl3.sequence), rl3.arrivalTimeInt;"
	log.debug('query: [' + query + ']');
	dao.cypherQuery(query, function(err, result) {
		if (err) throw err;
		log.debug('calling callback');
		callback(result);
	});
};

exports.searchTripByRouteAndStop = function(routeCode, timeBegin, timeEnd, stopCode, dayOfWeek, callback) {
	log.debug('calling cypherQuery');
	var query = "match (r:ROUTE)-[rl0:TRAVELS]->(t:TRIP)-[rl1:EXECUTE]->(s:SERVICE), (t)-[rl3:PICKUP_AT]->(bs:BUSSTOP) where r.code = '" + routeCode + "' and s.dayOfweek = '" + dayOfWeek + "' and rl3.arrivalTimeInt > " + timeBegin + " and rl3.arrivalTimeInt < " + timeEnd + " and bs.code = '" + stopCode + "' return r.code as routeCode, toInt(t.tripId) as tripId, rl3.arrivalTime as arrivalTime, bs.code as stopCode, bs.description as stopDescription, toInt(rl3.sequence) as sequence order by t.tripId, toInt(rl3.sequence)";
	log.debug('query: [' + query + ']');
	dao.cypherQuery(query, function(err, result) {
		if (err) throw err;
		log.debug('calling callback');
		callback(result);
	});
};

exports.searchTripByStop = function(timeBegin, timeEnd, stopCode, dayOfWeek, callback) {
	log.debug('calling cypherQuery');
	var query = "match (r:ROUTE)-[rl0:TRAVELS]->(t:TRIP)-[rl1:EXECUTE]->(s:SERVICE), (t)-[rl3:PICKUP_AT]->(bs:BUSSTOP) where s.dayOfweek = '" + dayOfWeek + "' and rl3.arrivalTimeInt > " + timeBegin + " and rl3.arrivalTimeInt < " + timeEnd + " and bs.code = '" + stopCode + "' return r.code as routeCode, toInt(t.tripId) as tripId, rl3.arrivalTime as arrivalTime, bs.code as stopCode, bs.description as stopDescription, toInt(rl3.sequence) as sequence order by t.tripId, toInt(rl3.sequence)";
	log.debug("query: [" + query + "]");
	dao.cypherQuery(query, function(err, result) {
		if (err) throw err;
		log.debug('calling callback');
		callback(result);
	});
};

exports.searchTripById = function(tripId, dayOfWeek, callback) {
	log.debug('calling cypherQuery');
	var query = "match (r:ROUTE)-[rl0:TRAVELS]->(t:TRIP)-[rl1:EXECUTE]->(s:SERVICE), (t)-[rl3:PICKUP_AT]->(bs:BUSSTOP) where t.tripId = '" + tripId + "' and s.dayOfweek = '" + dayOfWeek + "' return r.code as routeCode, toInt(t.tripId) as tripId, rl3.arrivalTime as arrivalTime, bs.code as stopCode, bs.description as stopDescription, toInt(rl3.sequence) as sequence, bs.latitude as latitude, bs.longitude as longitude order by t.tripId, toInt(rl3.sequence)";
	log.debug("query: [" + query + "]");
	dao.cypherQuery(query, function(err, result) {
		if (err) throw err;
		log.debug('calling callback');
		callback(result);
	});
};