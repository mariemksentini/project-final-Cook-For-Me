const mongoose = require('mongoose')

const rendezVousSchema = new mongoose.Schema({
    startTime: {
        required: true,
        type: Date, // Using Date to store the start time
    },
    endTime: {
        required: true,
        type: Date, // Using Date to store the end time
    },

    privateChef : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    type : {
        type : String,
        default : "online"
    },
    description : String,
    price : {
        type : Number,
        default : 50
    },
    client : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rate : Number,
    address : {
        latitude : {
            type : Number,
            default : 36.777125
        },
        longitude : {
            type : Number,
            default : 10.177729
        },
    },
    link : {
        type : String,
        default : 'www.googlemeet.com'
    }
}, {timestamps : true})

module.exports = mongoose.model('RendezVous', rendezVousSchema)