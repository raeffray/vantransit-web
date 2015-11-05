/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/index');
var bodyParser = require('body-parser');
var logger = require('./utils/van-logger');
var morgan = require('morgan');
var cors = require('cors');



//var data = require('./routes/data');
//var graph = require('./services/graphService');

var tripRoute = require('./routes/tripRoute');

var consolidate = require('consolidate');

var http = require('http');
var path = require('path');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('ejs', consolidate.ejs);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	// to support URL-encoded bodies
	extended: true
}));
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan("combined", "{ 'stream': logger.stream }"));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//enable CORS 
app.use(cors());

app.get('/', routes.index);

app.get('/ws/trips/stop/:stopCode', tripRoute.searchTripsWithParameters);
app.get('/ws/trips/route/:routeCode', tripRoute.searchTripsByRoute);
app.get('/ws/trips/trip/:tripId', tripRoute.searchTripById);


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});