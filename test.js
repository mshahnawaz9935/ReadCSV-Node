var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile='dataset.csv';
    var latitude = []; longitude =[]; timestamp =[];
    var x=0;
var parser = parse({delimiter: ','}, function (err, data) {

  async.eachSeries(data, function (line, callback) {
  //  console.log(line);
    latitude.push(line[0]);
    callback();
    x++;
  })
  storedata(latitude);
});
fs.createReadStream(inputFile).pipe(parser);
function storedata(data)
{
    console.log(data);

}

