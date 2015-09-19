var dao = require('../model/db-neo4j').Neo4jDb;

var winston = require('winston');
var log = new winston.Logger();

exports.searchNode = function(id, callback){
	log.debug('calling dao.readNode');
	dao.readNode(id, function(err, node){
	    if(err) throw err;
	    log.debug('calling callback'); 
	    callback(node);
	});
};

exports.searchStopByNumber = function(stopNo, callback){
	log.debug('calling cypherQuery...');
	dao.cypherQuery("match (s:Stop) where s.stopNo = "+stopNo+" return s" , function(err, result){
		if(err) throw err; 
		log.debug('result: ['+JSON.stringify(result)+ ']' );
		log.debug('calling callback');
		callback(result);
	});
};

exports.searchStopByRoute = function(routeNo, callback){
	log.debug('calling cypherQuery...');
	dao.cypherQuery("match (s:Stop) where s.Routes =~ '.*"+routeNo+".*' return s" , function(err, result){
		if(err) throw err; 
		log.debug('result: ['+JSON.stringify(result)+ ']' );
		log.debug('calling callback');
		callback(result);
	});
};

exports.searchRouteByNumber = function(routeNo, callback){
	log.debug('calling cypherQuery...');
	dao.cypherQuery("match (r:Route) where r.routeNo = '"+routeNo+"' return r" , function(err, result){
		if(err) throw err; 
		log.debug('result: ['+JSON.stringify(result)+ ']' );
		log.debug('calling callback');
		callback(result);
	});
};

exports.searchAllStops = function(callback){
	log.debug('calling cypherQuery...');
	dao.cypherQuery("match (s:Stop) return s" , function(err, result){
		if(err) throw err; 
		log.debug('result: ['+JSON.stringify(result)+ ']' );
		log.debug('calling callback');
		callback(result);
	});
};

exports.searchAllRoutes = function(callback){
	log.debug('calling cypherQuery...');
	dao.cypherQuery("match (r:Route) return r" , function(err, result){
		if(err) throw err; 
		log.debug('result: ['+JSON.stringify(result)+ ']' );
		log.debug('calling callback');
		callback(result);
	});
};

exports.insertNode = function(obj, label, callback){
	console.log('calling insertNode');
	dao.insertNode(obj, label, function(err, node){
			console.log('callback insertNode');
	    if(err) throw err;
	    console.log('created node: ['+JSON.stringify(node)+']'); 
	    callback(node);
	});
};

exports.insertRelationship = function (name, root, target, parameters, callback){
	dao.insertRelationship(root._id, target._id, name, parameters, function(err, relationship){
        if(err) throw err;
        console.log('relationship:' + relationship);
        callback(relationship);
	});
}

