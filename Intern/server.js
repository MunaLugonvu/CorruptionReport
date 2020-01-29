require('dotenv').config()

let express = require('express');
let mongoose = require('mongoose')
let bodyParser = require('body-parser');
let app = express();

//database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
let db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))

app.use(express.json())
app.use(bodyParser.json());

app.get('/', (req,res) =>{
    res.json({message: "API working"});
})
;
let interventionsRouter = require('./routes/interventions')
app.use('/interventions', interventionsRouter)

let user = require('./routes/auth')
app.use('/auth',user);
app.listen(3000, () => console.log('server started'))



