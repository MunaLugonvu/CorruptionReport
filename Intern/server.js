let express = require('express');
let mongoose = require('mongoose')
let bodyParser = require('body-parser');
let app = express();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
let db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

let port = 8000;
//require('./app/routes')(app,{});
app.listen(port, () => {  console.log('We are live on ' + port);});

