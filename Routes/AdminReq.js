const express = require('express')
const AdminReq = require('../Models/AdminReq')
const adminReqRouter = express.Router()
const  bcrypt = require('bcrypt')
const User = require('../Models/User')



//add request to admin
adminReqRouter.post('/AddAdminReq', async(req,res)=>{
    try {
        const newReq = new AdminReq(req.body)
        await newReq.save()
        res.status(200).send({msg : "Request to unarchive was sent"}, newReq)
    } catch (error) {
        res.status(500).send({errors : [{msg : "Could not send request"}]})
    }
})


adminReqRouter.get('/GetAllRequests', async(req,res)=>{
    try {
        const requests = await AdminReq.find()
        console.log(requests)
        res.status(200).send({msg : "These are the requests",requests})
    } catch (error) {
        res.status(500).send({errors : [{msg : "Could not get request"}]})
    }
})


adminReqRouter.post('/SendRequestToAdmin', async(req,res)=>{
    try {
        const {email, password, type, message} = req.body

        //verify existance
        const found = await User.findOne({email})
        if (!found) {
            return res.status(400).send({errors : [{msg : 'Email does not exists'}]})
        }

        //verif existance mail
        const matched = bcrypt.compareSync(password, found.password); // true
        if (!matched) {
            return res.status(400).send({errors : [{msg : 'Wrong password'}]})
        }

        //save the new req
        const userID = await found._id
        const newReq = new AdminReq({userID, email, type, message})
        await newReq.save()
        res.status(200).send({msg : "Request was sent to Admin", newReq})
    } catch (error) {
        res.status(500).send({errors : [{msg : "Could not send request"}]})
    }
})

adminReqRouter.delete('/DeleteReqByID/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const found =await AdminReq.findById(id)
        if (!found) {
            res.status(400).send({errors : [{msg : "ID does not exist"}]})
        }

        await AdminReq.findByIdAndDelete(id)
        res.status(200).send({msg : "we deleted this request", found})

    } catch (error) {
        res.status(500).send({errors : [{msg : "Could not delete request"}]})
    }
})
module.exports = adminReqRouter