var fs = require('fs');
var  xml2js = require('xml2js');

var parser = new xml2js.Parser();

fs.readFile('../import/kmls/097.kmz.kml', function(err, data) {
    parser.parseString(data, function (err, result) {
        var geometries = result.kml.Document[0].Folder[0].Placemark[0].MultiGeometry[0].MultiGeometry;
        for (k=0;k<geometries.length;k++){ 
            var coordinatesNode = geometries[k].LineString;
            for (i=0;i<coordinatesNode.length;i++){
                var rawLine = coordinatesNode[i].coordinates[0];
                var splitline = rawLine.split(" ");
                for (j=0;j<splitline.length;j++){
                    var latitude = splitline[j].split(",")[1];
                    var longitude = splitline[j].split(",")[0];
                    if(latitude){
                        console.log(latitude+' '+longitude);
                    }
                }  

                console.log('new line');
            }
        }
        console.log('Done');
    });
});
