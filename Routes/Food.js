const express = require('express')
const { AddFood, GetAllFood, GetOneFood, DeleteOneFood, UpdateOneFood, FetchFoods, GetFoodWithChefID, FetchFoodsOwnerID } = require('../Controllers/Food')
const foodRouter = express.Router()


const Food = require('../Models/Food')
const { IsAuth } = require('../Middlewares/IsAuth')

//add food
foodRouter.post('/AddFood', IsAuth ,AddFood)

//get all food
foodRouter.get('/GetAllFood', GetAllFood)
foodRouter.get('/FetchFoods', FetchFoods);
foodRouter.get('/FetchFoodsOwnerID/:id', FetchFoodsOwnerID)

//with params get_one, delete_one, update_one
foodRouter.get('/GetOneFood/:id', GetOneFood)
foodRouter.delete('/DeleteOneFood/:id', DeleteOneFood)
foodRouter.put('/UpdateOneFood/:id', UpdateOneFood)


module.exports = foodRouter