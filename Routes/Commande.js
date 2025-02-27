const express = require('express');
const User = require('../Models/User');
const Commande = require('../Models/Commande');
const { IsAuth } = require('../Middlewares/IsAuth');
const { AddCommande, GetCommandesWithChefID, GetCommandesWithClientID, GetOneCommandsWithID, UpdateCommandeStatus, UpdateCommande, GetAllCommandes, DeleteCommande, GetCommandesWithLivreurID } = require('../Controllers/Commande');

const commandeRouter = express.Router();

commandeRouter.post('/AddCommande', AddCommande);



commandeRouter.get('/GetCommandesWithChefID', IsAuth, GetCommandesWithChefID);

commandeRouter.get('/GetCommandesWithClientID', IsAuth, GetCommandesWithClientID);

commandeRouter.get('/GetCommandesWithLivreurID', IsAuth, GetCommandesWithLivreurID);

commandeRouter.get('/GetOneCommandsWithID/:id', GetOneCommandsWithID);



commandeRouter.put('/UpdateCommandeStatus/:id', UpdateCommandeStatus);

commandeRouter.put('/UpdateCommande/:id', UpdateCommande);

commandeRouter.get('/GetAllCommandes', GetAllCommandes);



commandeRouter.delete('/DeleteCommande/:id', DeleteCommande)

module.exports = commandeRouter;
