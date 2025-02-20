const express = require('express')
const { IsAuth } = require('../Middlewares/IsAuth')
const Panier = require('../Models/Panier')
const { GetAllPaniers, DeleteOnePanierByID, GetOwnPanier, UpdateOnePanier, DeleteOnePanierByClientID, GetOnePanierByClientID, GetOwnPanierByChef } = require('../Controllers/Panier')
const panierRouter = express.Router()

//admin 
panierRouter.get('/GetAllPaniers', GetAllPaniers)

//delete by id of panier, #admin
panierRouter.delete('/DeleteOnePanierByID/:id', DeleteOnePanierByID)


//by client in token
panierRouter.get('/GetOwnPanier', IsAuth ,GetOwnPanier)

panierRouter.get('/GetOwnPanierByChef/:id', IsAuth ,GetOwnPanierByChef)

panierRouter.put('/UpdateOnePanier', IsAuth, UpdateOnePanier);


//delete by id of owner of panier (client)
panierRouter.delete('/DeleteOnePanierByClientID/:id', DeleteOnePanierByClientID)

//get by id of owner of panier (client)
panierRouter.get('/GetOnePanierByClientID/:id', GetOnePanierByClientID)

module.exports = panierRouter