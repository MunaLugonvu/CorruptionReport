let express = require('express');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

const port = 8000;
app.listen(port, () => {  console.log('We are live on ' + port);});
