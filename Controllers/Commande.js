const Commande = require("../Models/Commande");
const User = require("../Models/User");

exports.AddCommande = async (req, res) => {
    try {
        const { client, chef, products } = req.body;

        const foundClient = await User.findById(client);
        const foundChef = await User.findById(chef);

        if (!foundClient) {
            return res.status(400).send({ errors: [{ msg: 'Client ID not valid' }] });
        }

        if (!foundChef) {
            return res.status(400).send({ errors: [{ msg: 'Chef ID not valid' }] });
        }
        // Calcul du totalPrice
        const totalPrice = await products.reduce((sum, product) => sum + product.priceTot, 0);

        const newComm = await new Commande({ ...req.body, totalPrice });

        await newComm.save();
        res.status(200).send({ msg: 'Commande added', newComm });
    } catch (error) {
        console.log(error)
        res.status(500).send({ errors: [{ msg: 'Could not add commande' }] });
    }
}

exports.GetCommandesWithChefID = async (req, res) => {
    try {
        const commandes = await Commande.find({ chef: req.user._id })
            .populate('client')
            .populate('chef')
            .populate('livreur')
            .populate({
                path: 'products.product',
                model: 'Food'
            });

        if (commandes.length === 0) {
            return res.status(400).send({ errors: [{ msg: 'You don’t have any commandes at the moment' }] });
        }

        res.status(200).send({ msg: 'These are your commandes', commandes });
    } catch (error) {
        
        res.status(500).send({ errors: [{ msg: 'Could not get commande ya chef' }] });
    }
}

exports.GetCommandesWithClientID = async (req, res) => {
    try {
        const commandes = await Commande.find({ client: req.user._id })
            .populate('chef')
            .populate('client')
            .populate('livreur')
            .populate({
                path: 'products.product',
                model: 'Food'
            });

        if (commandes.length === 0) {
            return res.status(400).send({ errors: [{ msg: 'You don’t have any commandes at the moment' }] });
        }

        res.status(200).send({ msg: 'These are your commandes', commandes });
    } catch (error) {
        
        res.status(500).send({ errors: [{ msg: 'Could not get commande ya client' }] });
    }
}


exports.GetCommandesWithLivreurID = async (req, res) => {
    try {
        const commandes = await Commande.find({ livreur: req.user._id })
            .populate('client')
            .populate('chef')
            .populate('livreur')
            .populate({
                path: 'products.product',
                model: 'Food'
            });

        if (commandes.length === 0) {
            return res.status(400).send({ errors: [{ msg: 'You don’t have any commandes at the moment' }] });
        }

        res.status(200).send({ msg: 'These are your commandes', commandes });
    } catch (error) {
        
        res.status(500).send({ errors: [{ msg: 'Could not get commande ya livreur' }] });
    }
}

exports.GetOneCommandsWithID = async (req, res) => {
    try {
        const {id} = req.params
        const commande = await Commande.findById(id)
            .populate('chef')
            .populate('client')
            .populate('livreur')
            .populate({
                path: 'products.product',
                model: 'Food'
            });

        if (!commande) {
            return res.status(400).send({ errors: [{ msg: 'This commande does not exist anymore' }] });
        }

        res.status(200).send({ msg: 'This is the commande', commande });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not get commande ya admin' }] });
    }
}


exports.UpdateCommandeStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Destructure status from the request body

        // Validate the status
        if (!["Accepted", "Rejected", "In progress"].includes(status)) {
            return res.status(400).send({ errors: [{ msg: 'Invalid status value' }] });
        }

        // Find the commande by ID
        const found = await Commande.findById(id);
        if (!found) {
            return res.status(404).send({ errors: [{ msg: 'Commande not found' }] });
        }

        // Update the status
        await Commande.findByIdAndUpdate(id, { status }, { new: true }); // { new: true } returns the updated document

        res.status(200).send({ msg: "Status updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ errors: [{ msg: 'Could not update status de la commande ya chef' }] });
    }
}

exports.UpdateCommande = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the commande by ID
        const found = await Commande.findById(id);
        if (!found) {
            return res.status(404).send({ errors: [{ msg: 'Commande not found' }] });
        }

        // Si les produits sont mis à jour, recalculer totalPrice
        let updatedData = { ...req.body };
        if (req.body.products) {
            updatedData.totalPrice = req.body.products.reduce((sum, product) => sum + product.priceTot, 0);
        }

        // Mettre à jour la commande
        await Commande.findByIdAndUpdate(id, { $set: updatedData });

        res.status(200).send({ msg: "Commande updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ errors: [{ msg: 'Could not update la commande' }] });
    }
}

exports.GetAllCommandes = async (req, res) => {
    try {
        const commandes = await Commande.find()
            .populate('chef')
            .populate('client')
            .populate('livreur')
            .populate({
                path: 'products.product',
                model: 'Food'
            });

        if (commandes.length === 0) {
            return res.status(400).send({ errors: [{ msg: 'No commandes found' }] });
        }

        res.status(200).send({ msg: 'These are all the commandes', commandes });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not get any commande ya admin' }] });
    }
}

exports.DeleteCommande = async(req,res)=>{
    try {
        const {id} = req.params
        const found = await Commande.findById(id)
        if (!found) {
            return res.status(400).send({msg : 'There is no commande with this ID'})
        }
        await Commande.findByIdAndDelete(id)
        res.status(200).send({msg : 'Commande was deleted'})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not delete any commande' }] });
    }
}