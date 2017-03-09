var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile='dataset.csv';
    var latitude = []; longitude =[]; timestamp =[];
    var x=0;
var parser = parse({delimiter: ','}, function (err, data) {

  async.eachSeries(data, function (line, callback) {
  //  console.log(line);
    latitude.push(line[0]);longitude.push(line[1]);timestamp.push(line[2]);
    callback();
    x++;
  })
  storedata(latitude,longitude,timestamp);
});
fs.createReadStream(inputFile).pipe(parser);
function storedata(data1,data2,data3)
{
    var length = data1.length;
    for(var i=0;i< length;i++)
    {
      if(i==length-1)
      continue;
       var time = data3[i+1] - data3[i];
       console.log('time', time );
    }
}