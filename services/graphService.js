
var graphDao = require('../dao/neo4j-dao');
var winston = require('winston');
var log = new winston.Logger();

function searchStop(stopNo,callback){
	graphDao.searchStopByNumber(stopNo , function(result){
		log.debug("graph service -  result: ["+result+"]");
		callback(result.data);
	});
};

function searchStopByRoute(routeNo,callback){
	graphDao.searchStopByRoute(routeNo , function(result){
		log.debug("graph service -  result: ["+result+"]");
		callback(result.data);
	});
};

function searchRoute(routeNo,callback){
	graphDao.searchRouteByNumber(routeNo , function(result){
		log.debug("graph service -  result: ["+result+"]");
		callback(result.data);
	});
};

function searchAllStops(callback){
	graphDao.searchAllStops(function(result){
		log.debug("graph service -  result: ["+result+"]");
		callback(result.data);
	});
};


function searchAllRoutes(callback){
	graphDao.searchAllRoutes(function(result){
		log.debug("graph service -  result: ["+result+"]");
		callback(result.data);
	});
};

function insertNodeStops (data,callback){
	var stop = {
		stopNo: data.StopNo,
		name: data.Name,
		bayNo: data.BayNo,
		city: data.City,
		onStreet: data.OnStreet,
		atStreet: data.AtStreet,
		latitude: data.Latitude,
		longitude: data.Longitude,
		wheelchairAccess: data.WheelchairAccess,
		distance: data.Distance,
		Routes: data.Routes
	}

	log.debug('calling graphDao.insertNode');
	graphDao.insertNode(stop, 'Stop',function(node){
		console.log('Node created: ['+JSON.stringify(node)+']');
		callback(node);
	});
};


function insertNodeRoute(routeNo,callback){
	var route = {
		routeNo: routeNo
	}
	log.debug('calling graphDao.insertNode');
	graphDao.insertNode(route, 'Route',function(node){
		console.log('Node created: ['+JSON.stringify(node)+']');
		callback(node);
	});
};


function insertNodeUniqueStops(stopToCreate,callback){

	log.debug('data received: ['+stopToCreate+']');
	searchStop(stopToCreate.StopNo,function(data){
		if(data.length==0){
			insertNodeStops(stopToCreate,function(node){
				callback(node);
			});
		}else{
			console.log('found node: ['+JSON.stringify(data)+']');
			// I was trying to throw an exception, but it was
			// affecting node-neo4j. why??
			callback('NODE_ALREADY_EXIST');
		}
	});
};

function insertNodeUniqueRoute(routeNo,callback){
	// search for an existing route
	searchRoute(routeNo,function(data){
		if(data.length==0){
			console.log(routeNo);
			console.log(data);
			insertNodeRoute(routeNo,function(node){
				callback(node);
			});
		}else{
			console.log('found: ' + routeNo);
			//console.log('found node: ['+JSON.stringify(data)+']');
			// I was trying to throw an exception, but it was
			// affecting node-neo4j. why??
			callback('NODE_ALREADY_EXIST');
		}
	});
};

function createRouteFromStop(callback){
	this.searchAllStops(function (data) {
		handleStops(data,callback);	
	});
};


function handleStops(data, callback){
	var existingRoutes = [];
	for(i = 0; i < data.length; i++){
		var stop = data[i];
		var routes = stop.Routes.split(',');
		for(j = 0;j < routes.length; j++){
			var route = routes[j].trim();
			if(!exist(route,existingRoutes)){
				insertNodeUniqueRoute(route,callback);
			}
		}
	}
}

function exist(route,existingRoutes){
	if(existingRoutes.indexOf(route) == -1){
		existingRoutes.push(route);
		return false;
	}else{
		return true;
	}
}

function createRouteToStopRel(callback){
	searchAllRoutes(function(data){
		console.log(data);
		for(i = 0; i < data.length; i++){
			var routeNode = data[i];
			searchStopByRoute(routeNode.routeNo, function(stops){
				for(j = 0; j < stops.length; j++){
					var stopNode = stops[j];
					insertStopsAtRelationShip(routeNode,stopNode,function(data){
						console.log(data);
					});
				}
			});
		}
	});
}

function insertStopsAtRelationShip(route, stop, callback){
	graphDao.insertRelationship('STOPS_AT',route, stop, {}, callback);
}

module.exports.createRouteFromStop = createRouteFromStop;
module.exports.insertNodeStops = insertNodeStops;
module.exports.searchRoute = searchRoute;
module.exports.insertNodeRoute = insertNodeRoute;
module.exports.searchStop = searchStop;
module.exports.searchAllStops = searchAllStops;
module.exports.insertNodeUniqueStops = insertNodeUniqueStops;
module.exports.createRouteToStopRel = createRouteToStopRel;
