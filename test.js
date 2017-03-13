var csvWriter = require('csv-write-stream')
var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');

var inputFile='dataset.csv';
    var latitude = []; longitude =[]; timestamp =[];
    var x=0;
var parser = parse({delimiter: ','}, function (err, data) {

  async.eachSeries(data, function (line, callback) {
    latitude.push(line[0]);longitude.push(line[1]);timestamp.push(line[2]);  // Store the data into arrays
    callback();
    x++;
  })
  storedata(latitude,longitude,timestamp);
});
fs.createReadStream(inputFile).pipe(parser);
function storedata(data1,data2,data3)    // Obtain the data and write to file
{
    var prev=0,next=prev+1;
    var length = data1.length;
      var writer = csvWriter({sendHeaders: false,flags:'r+'});  
           writer.pipe(fs.createWriteStream('output.csv'))
    for(var i=0;i< length;i++)  // Iterate through the dataset
    {
      if(next==length-1)
      continue;
       var time = (data3[next] - data3[prev])/3600;
       var dist = distance(data1[prev],data2[prev],data1[next],data2[next]);
       var speed = dist/time;
       prev++;
       next++;
       if((speed == 0)||(speed >100)||(speed <11 && time*3600 > 4))  //Disregard and skip to the next index
       {
         next=next+1;
         continue;
       }
       if(next-prev > 1)   // Reset the counters
       {
       prev=next;
       next=next +1;
       }
       
       console.log('time', time*3600 ,'speed', speed , " ", i , next, prev );
       // writer.write({lat: data1[prev], long: data2[prev], time: data3[prev]})
        writer.write({lat: data1[prev], long: data2[prev], timestamp: data3[prev] ,speed: speed,time:time*3600 }) //write to file
        
    }
    writer.end()
}
 function distance(latitude1, longitude1,latitude2, longitude2)   //Calculate distance
    {
      var Radius_of_earth = 6371; // km
      var diff_latitude = Radians(latitude2-latitude1);
      var diff_longitude = Radians(longitude2-longitude1);
      var latitude1 = Radians(latitude1);
      var latitude2 = Radians(latitude2);

      var a = Math.sin(diff_latitude/2) * Math.sin(diff_latitude/2) +
        Math.sin(diff_longitude/2) * Math.sin(diff_longitude/2) * Math.cos(latitude1) * Math.cos(latitude2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = Radius_of_earth * c;
  //    var time = (time2 - time1);
   //   var speed = d / time;
      return d;
    }

  //  Converts numeric degrees to radians
  function Radians(result) 
    {
        return result * Math.PI / 180;
    }
  // var d= distance(51.49871493,-0.1601177991,51.49840586,-0.1604068824);
  // console.log(d);
