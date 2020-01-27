let mongoose = require('mongoose')
let interventionSchema = new mongoose.Schema({
    id:{
        type: integer,
        required: true
    },
    createdOn:{
        type: Date,
        required: true,
        default: Date.now

    },
    

})