let mongoose = require('mongoose')
let interventionSchema = new mongoose.Schema({
    
    
    createdOn:{
        type: Date,
        required: true,
        default: Date.now

    },
    createdBy:{
        type: Number,
        required: true,
        ref: 'User'

    },
    tittle:{
        type: String,
        required: true

    },
    type:{
        type: String,
        enum:['redfag','intervention'],
        required: true
    },
    location:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['draft','Under Investigation','resolved', 'rejected'],
        required: true

    },
    images:{
        type: Buffer,
        required: false
    },
    videos:{
        type: Buffer,
        required: false

    },
    comment:{
        type: String,
        required: true
    }


})
module.exports = mongoose.model('Intervention', interventionSchema)
