const Panier = require("../Models/Panier")


exports.GetAllPaniers = async(req,res)=>{
    try {
        const paniers = await Panier.find()
        .populate({
            path: 'products.product',
            populate: {
                path: 'owner'  // This populates the owner field inside product
            }
        })
        .populate('client');

        if (paniers.length === 0) {
            res.status(400).send({errors : [{msg : 'Could not find any panier'}]})
        }

        res.status(200).send({msg : 'these are  all paniers', paniers})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not get all panier'}]})
    }
}

exports.DeleteOnePanierByID = async(req,res)=>{
    try {
        const {id} = req.params
        const found = Panier.findById(id)
        if (!found) {
            res.status(400).send({msg : "could not find panier"})
        }
        await Panier.findByIdAndDelete(id)
        res.status(200).send({msg : "panier deleted successfully"})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not delete panier' }] });
    }
}

exports.GetOwnPanier = async(req,res)=>{
    try {
        const panier = await Panier.findOne({client : req.user._id})
        .populate({
            path: 'products.product',
            populate: {
                path: 'owner'  // This populates the owner field inside product
            }
        })
        .populate('client');

        if (!panier) {
            res.status(400).send({errors : [{msg : 'Could not find panier'}]})
        }

        res.status(200).send({msg : 'This is your panier', panier})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not get panier'}]})
    }
}



exports.GetOwnPanierByChef = async(req,res)=>{
    try {
        const {id} = req.params
        const panier = await Panier.findOne({ client: req.user._id})
        .populate({
            path: 'products.product',
            populate: {
                path: 'owner'  // This populates the owner field inside product
            }
        })
        .populate('client').find({'product.owner._id' : id})

        if (!panier) {
            res.status(400).send({errors : [{msg : 'Could not find panier'}]})
        }

        res.status(200).send({msg : 'This is your panier', panier})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not get panier'}]})
    }
}
exports.UpdateOnePanier = async (req, res) => {
    try {
        
        const panier = await Panier.findOne({client : req.user._id})

        if (!panier) {
            return res.status(400).send({ errors: [{ msg: 'Could not find panier' }] });
        }

        await Panier.findOneAndUpdate({client : req.user._id}, {$set : req.body})

        res.status(200).send({ msg: "Updated panier successfully", panier });
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not update panier' }] });
    }
}

exports.DeleteOnePanierByClientID = async(req,res)=>{
    try {
        const {id} = req.params
        const found = Panier.findOne({client : id})
        if (!found) {
            res.status(400).send({msg : "could not find panier"})
        }
        await Panier.findOneAndDelete({client : id})
        res.status(200).send({msg : "panier deleted successfully"})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not delete panier' }] });
    }
}


exports.GetOnePanierByClientID = async(req,res)=>{
    try {
        const {id} = req.params
        const panier = await Panier.findOne({client : id})
        .populate({
            path: 'products.product',
            populate: {
                path: 'owner'  // This populates the owner field inside product
            }
        })
        .populate('client');

        if (!panier) {
            res.status(400).send({errors : [{msg : 'Could not find panier'}]})
        }

        res.status(200).send({msg : 'This is your panier', panier})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not get panier'}]})
    }
}