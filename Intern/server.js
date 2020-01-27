require('dotenv').config()

let express = require('express');
let mongoose = require('mongoose')
let bodyParser = require('body-parser');
let app = express();
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
let db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to database'))
app.use(express.json())
const interventionsRouter = require('./routes/interventions')
app.use('/interventions', interventionsRouter)

app.listen(3000, () => console.log('server started'))



