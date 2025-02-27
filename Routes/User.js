const express = require('express')
const userRouter = express.Router()

const { SignUp, SignIn, UpdateUser, DeleteUser, CheckUser, AllUsers, GetOneUser, ArchiveUser, UnArchiveUser, UpdateUserRate, FetchUsers } = require('../Controllers/User')
const { VerifSignUp, Validation, VerifSignIn } = require('../Middlewares/VerifMid')
const { IsAuth } = require('../Middlewares/IsAuth')

// get user through token :
userRouter.get('/CurrentUser',IsAuth, (req,res)=> res.send(req.user))

//get all users or one user withouth auth:
userRouter.get('/AllUsers', AllUsers)
userRouter.get('/GetOneUser/:id', GetOneUser)
userRouter.get('/FetchUsers', FetchUsers)

//sign up and sign in each create a new token
userRouter.post('/SignUp',VerifSignUp, Validation, SignUp)
userRouter.post('/SignIn', VerifSignIn, Validation,SignIn)

// updating and deleting with params id
userRouter.put('/UpdateUser/:id', UpdateUser)
userRouter.put('/UpdateUserRate/:id', UpdateUserRate)

userRouter.post('/CheckUser', CheckUser)
userRouter.delete('/DeleteUser/:id', DeleteUser)


module.exports = userRouter