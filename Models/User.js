const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    address : {
        houseNum : {
            type : Number
        },
        street : {
            type : String
        },
        city : {
            type : String
        },
        zipCode : {
            type : Number
        },
        country : {
            type : String
        }
    },
    email : {
        type : String, 
        unique : true, 
        required : true
    },
    password : {
        type : String, 
        required : true
    },
    role : {
        type : String,
        default : 'user'
    },
    archived : {
        type : Boolean,
        default : false
    },
    earnings : {
        type : Number,
        default : 0
    },
    rate: {
        type: [Number], // Tableau de nombres
        default: [] // Par défaut, un tableau vide
    }
})

module.exports = mongoose.model('User', userSchema)