var graphService = require('../services/graphService');

var winston = require('winston');
var log = new winston.Logger();

exports.searchStop = function (req,res){

	var stopNo = req.param('stopNo');

	graphService.searchStop(stopNo,function (data) {
		log.info("stops route - sending data");
		res.send(data);
	});
};

exports.createStop = function (req,res){
	graphService.insertNodeUniqueStops(req.body,function (data) {
		if(data=="NODE_ALREADY_EXIST"){
			res.status(409);
			res.end();
		}else{
			res.send(data);	
		}
	});
};

exports.normalize = function (req,res){
	graphService.normalize(function (data) {
		if(data=="NODE_ALREADY_EXIST"){
			res.status(409);
			res.end();
		}else{
			res.send(data);	
		}
	});
};