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
    image : {
        type : String,
        default :"/food.jpg"
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
    archived : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Food', foodSchema)