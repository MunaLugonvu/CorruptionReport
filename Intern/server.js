require('dotenv').config()
let joi = require('joi');
let express = require('express');
let mongoose = require('mongoose')
let bodyParser = require('body-parser');


let users = require('./routes/auth');
let interventionsRouter = require('./routes/interventions');

let app = express();

//database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
let db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(bodyParser.json());
app.use(express.json())


app.get('/', (req,res,next) =>{
    res.json({message: "API working"});
    next();
})
;


app.use('/auth',users);
app.use('/interventions', interventionsRouter)





app.listen(8000, () => console.log('server started'))



