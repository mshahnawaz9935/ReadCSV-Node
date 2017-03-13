This program disregards the potentially erroneus points from a cab journey from A-B. The program is written in Javascript(Node JS). 

Algorithm - 

1. Read the dataset. In order to read the dataset or the CSV file, the csv-parse node module was used which reads the file on the basis of the delemiters provided.

2. The obtained data was seperated and divided into different arrays which stored the latitude,longitude and timestamp for  the different points.

3. Using the data arrays, we calculated the distance in kilometers between two coordinates using the haversine formula and speed in km/hr using the timestamps and distance obtained.

4. Assumptions were made such that 

a)if the distance between two points is zero, the points were discarded and then we did check for the next coordinates.

b)Also, the average speed in km/hr was analyzed and the points were discarded if they didnt coorelate well with speed and time. 

c)For example, if the speed was less than one km/hr and the time elapsed was 10 seconds then the points were disregarded. The speeds above 100 km/hr were also disregarded.

5. If the distance between two points fit well with speed and time then they were written to an output csv file. The whole arrays were read and the erroneus points were disregarded in this way. The output is shown on the console as well as it is stored in the csv file.