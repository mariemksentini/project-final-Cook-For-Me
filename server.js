const express = require('express')
const ConnectDB = require('./Config/ConnectDB')
const userRouter = require('./Routes/User')
const foodRouter = require('./Routes/Food')
const panierRouter = require('./Routes/Panier')
const commandeRouter = require('./Routes/Commande')
const cors = require('cors');
const adminReqRouter = require('./Routes/AdminReq')

const app = express()

app.use(cors());


require('dotenv').config()

ConnectDB()

app.use(express.json())

app.use('/api/auth', userRouter)

app.use('/api/food', foodRouter)

app.use('/api/panier', panierRouter)

app.use('/api/commande', commandeRouter)

app.use('/api/adminReq', adminReqRouter)

app.listen(process.env.port,
    console.log(`Server is running on port ${process.env.port}`)
)