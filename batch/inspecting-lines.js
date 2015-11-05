var fs = require('fs');
var xml2js = require('xml2js');

var parser = new xml2js.Parser();

var readFile = function(processLines, filePath, callback) {
    var countLine = 0;
    var countPoints = 0;
    fs.readFile(filePath, function(err, data) {
        parser.parseString(data, function(err, result) {
            try {
                var geometries;
                var geometriesSize;
                var routeNo = result.kml.Document[0].Folder[0].name[0];
                if (processLines && processLines === '--processLines') {
                    if (result.kml.Document[0].Folder[0].Placemark[0].MultiGeometry[0].MultiGeometry) {
                        geometries = result.kml.Document[0].Folder[0].Placemark[0].MultiGeometry[0].MultiGeometry;
                        geometriesSize = geometries.length;
                    } else {
                        geometries = result.kml.Document[0].Folder[0].Placemark[0].MultiGeometry;
                        geometriesSize = 1;
                    }
                    for (k = 0; k < geometriesSize; k++) {
                        var coordinatesNode;
                        if (geometries == 1) {
                            coordinatesNode = geometries.LineString;
                        } else {
                            coordinatesNode = geometries[k].LineString;
                        }
                        for (i = 0; i < coordinatesNode.length; i++) {
                            countLine++;
                            countPoints = 0;
                            var rawLine = coordinatesNode[i].coordinates[0];
                            var splitline = rawLine.split(" ");
                            for (j = 0; j < splitline.length; j++) {
                                countPoints++;
                                var latitude = splitline[j].split(",")[1];
                                var longitude = splitline[j].split(",")[0];
                                if (latitude) {
                                    createLinePoints(routeNo, countLine, countPoints, latitude, longitude);
                                }
                            }
                        }
                    }
                } else {
                    createItinerary(routeNo);
                }
            } catch (err) {
                console.log(err);
                console.log('error: [' + data + ']');
            }
        });
    });
}

function createItinerary(routeNo) {
    console.log('"' + routeNo + '","V1",' + new Date() + ',' + new Date() + '');
}

function createLinePoints(routeNo, countLine, countPoints, latitude, longitude) {
    console.log('"' + routeNo + '",' + countLine + ',' + countPoints + ',' + latitude + ',' + longitude + '');
}

var readFiles = function(processLines) {
    var path = 'import/kmls/';

    fs.readdir(path, function(err, data) {
        if (data) {
            for (x = 0; x < data.length; x++) {
                var filePath = path + data[x];
                readFile(processLines, filePath, function() {});
            }
        } else {
            console.log('FILES NOT FOUND');
        }
    });
}

readFiles(process.argv[2]);