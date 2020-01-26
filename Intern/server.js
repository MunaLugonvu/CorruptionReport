let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

let port = 8000;
require('./app/routes')(app,{});
app.listen(port, () => {  console.log('We are live on ' + port);});
