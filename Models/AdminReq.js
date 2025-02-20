const mongoose = require('mongoose')


const adminReqSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    },
    email : String,
    type : {
        type : String,
        default : "Other"
    },
    message : {
        type : String,
        default : "None"
    }
}, { timestamps: true })

module.exports = mongoose.model('AdminReq', adminReqSchema)