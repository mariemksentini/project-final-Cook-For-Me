const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    type : {
        type : String,
        default : 'Plat'
    },
    imageUrl : {
        type : String,
        default : "expemple.com"
    },
    biography : {
        type : String
    },
    price : {
        type : Number,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    owner : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    archieved : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Food', foodSchema)