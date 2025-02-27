const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    birthdate : {
        type : String,
        required : true,
        default : "1900-01-01"
    },
    address : {
        houseNum : {
            type : String
        },
        street : {
            type : String
        },
        city : {
            type : String
        },
        zipCode : {
            type : String
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
        type : [Number],
        default : []
    },
    rate: {
        type: [Number], // Tableau de nombres
        default: [] // Par défaut, un tableau vide
    },
    image : {
        type : String,
        default :"/user.png"
    },
    addressMap : {
        latitude : {
            type : Number,
            default : 36.777125
        },
        longitude : {
            type : Number,
            default : 10.177729
        }
    }
    
    
    
})

module.exports = mongoose.model('User', userSchema)