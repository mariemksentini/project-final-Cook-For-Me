const  bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');

const User = require("../Models/User");
const Panier = require('../Models/Panier');

exports.SignUp = async(req,res)=>{
    try {
        const {name, age, email, password} = req.body

        //verifier tous les champs 
        if (!email) {
            return res.status(400).send({errors : [{msg : 'Email is required'}]})
        }
        if (!password) {
            return res.status(400).send({errors : [{msg : 'password is required'}]})
        }
        if (!name) {
            return res.status(400).send({errors : [{msg : 'Name is required'}]})
        }
        if (!age) {
            return res.status(400).send({errors : [{msg : 'Age is required'}]})
        }
        

        //verify existance
        const found = await User.findOne({email})
        if (found) {
            return res.status(400).send({errors : [{msg : 'Email already exists'}]})
        }
        const newUser = new User(req.body)


        //hashing password
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds)
        const hashedPassword = bcrypt.hashSync(password, salt)

        newUser.password = hashedPassword
        await newUser.save()

        const newPanier = new Panier({products : [], client : newUser._id})
        await newPanier.save()
        //token
        const payload = {id : newUser._id}
        var token = jwt.sign( payload, process.env.privateKey)


        //return
        res.status(200).send({msg : 'Account created', newUser, token,newPanier})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not register account'}]})
    }
}


exports.SignIn = async(req,res)=>{
    try {
        const {email, password} = req.body

        //verifier tous les champs 
        if (!email) {
            return res.status(400).send({errors : [{msg : 'Email is required'}]})
        }

        
        if (!password) {
            return res.status(400).send({errors : [{msg : 'password is required'}]})
        }

        //verify existance
        const found = await User.findOne({email})
        if (!found) {
            return res.status(400).send({errors : [{msg : 'Email does not exists'}]})
        }

        // Handle archived accounts
        if (found.archived) {
            return res.status(400).send({errors : [{msg : 'Account was archieved please contact the Admin.'}]});
        }

        //verify password 
        const matched = bcrypt.compareSync(password, found.password); // true
        if (!matched) {
            return res.status(400).send({errors : [{msg : 'Wrong password'}]})
        }

        //token
        const payload = { id:  found._id}
        var token = jwt.sign( payload, process.env.privateKey);

        res.status(200).send({msg : 'Logged In', found, token})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not log into account'}]})
    }
}

exports.UpdateUser = async(req,res)=>{
    try {
        const {id} = req.params
        await User.findByIdAndUpdate(id, {$set : req.body})
        res.status(200).send({msg : 'Info changed'})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not update the account'}]})
    }
}


exports.UpdateUserRate = async (req, res) => {
    try {
        const { id } = req.params;
        const { newRateNumber } = req.body; // Suppression de `.rate` pour éviter une erreur de destructuration

        const found = await User.findById(id);
        if (!found) {
            return res.status(404).send({ msg: "User not found" });
        }

        found.rate.push(newRateNumber); // Ajout du nouveau rate au tableau existant
        await found.save(); // Sauvegarde des modifications

        res.status(200).send({ msg: "Info changed", updatedUser: found });
    } catch (error) {
        console.error(error);
        res.status(500).send({ errors: [{ msg: "Could not update the account" }] });
    }
};


exports.DeleteUser = async(req,res)=>{
    try {
        
        const {id} = req.params
        await Panier.findOneAndDelete({client : id})
        await User.findByIdAndDelete(id)
        res.status(200).send({msg : 'Account deleted successfully'})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not delete user'}]})
    }
}


exports.CheckUser =async (req,res)=>{
    try {
        const {email, password} = req.body

        const found = await User.findOne({email})
        if (!found) {
            return res.status(400).send({errors : [{msg : 'Email does not exists'}]})
        }

        //verify password 
        const matched = await bcrypt.compareSync(password, found.password); // true
        if (!matched) {
            return res.status(400).send({errors : [{msg : 'Wrong password'}]})
        }

        res.status(200).send({msg : 'Account matched', matched : found})

    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not check user'}]})
    }
}

exports.AllUsers = async(req,res)=>{
    try {
        const users = await User.find()
        res.status(200).send({msg : 'this is all of the users', users})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not retrieve all users'}]})
    }
}


exports.GetOneUser = async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id)
        res.status(200).send({msg : 'The user wanted', user})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not retrieve the wanted'}]})
    }
}


exports.ArchiveUser = async(req,res)=>{
    try {
        const {id} = req.params
        await User.findByIdAndUpdate(id, {$set : req.body})
        res.status(200).send({msg : 'Info changed'})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not update the account'}]})
    }
}














// const {email, password} = req.body
        // const found = await User.findOne({email})
        // if (!found) {
        //     return res.status(400).send({errors : [{msg : 'Email does not exists'}]})
        // }

        // //verify password 
        // const matched = bcrypt.compareSync(password, found.password); // true
        // if (!matched) {
        //     return res.status(400).send({errors : [{msg : 'Wrong password'}]})
        // }

        //change 