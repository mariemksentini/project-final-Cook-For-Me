const express = require('express')
const AdminReq = require('../Models/AdminReq')
const adminReqRouter = express.Router()
const  bcrypt = require('bcrypt')
const User = require('../Models/User')
const { DeleteReqByID, SendRequestToAdmin, GetAllRequests, AddAdminReq } = require('../Controllers/AdminReq')



//add request to admin
adminReqRouter.post('/AddAdminReq', AddAdminReq)


adminReqRouter.get('/GetAllRequests', GetAllRequests)


adminReqRouter.post('/SendRequestToAdmin', SendRequestToAdmin)

adminReqRouter.delete('/DeleteReqByID/:id', DeleteReqByID )
module.exports = adminReqRouter