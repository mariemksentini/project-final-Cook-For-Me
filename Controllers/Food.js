const Food = require("../Models/Food")

exports.AddFood = async(req,res)=>{
    try {
        const {name} = req.body

        // verifier champs name
        if (!name) {
            return res.status(400).send({errors : [{msg : 'Name is required'}]})
        }

        //save food
        const newFood = new Food({...req.body, owner : req.user._id})
        await newFood.save()

        // ===>
        res.status(200).send({msg : 'Food added', newFood})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not add food'}]})
    }
}

exports.GetAllFood = async(req,res)=>{
    try {
        const foods = await Food.find().populate('owner')
        res.status(200).send({msg : 'This is your foods', foods})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not get all the food'}]})
    }
}

exports.FetchFoods = async(req, res) => {
    try {
        const archived = req.query.archived === "true"; // Convertir en booléen
        const foodet = await Food.find({ archived }).populate("owner");

        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);
        
        // Calculate the start and end indexes for the requested page
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        
        // Slice the products array based on the indexes
        const paginatedFoods = foodet.slice(startIndex, endIndex);
        
        // Calculate the total number of pages
        const totalPages = Math.ceil(foodet.length / pageSize);

        // Send the paginated products and total pages as the API response
        res.status(200).send({msg : "these are all the foods", foods: paginatedFoods, totalPages });
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not get all the food'}]})
    }
}

exports.FetchFoodsOwnerID = async(req, res) => {
    try {
        const {id} = req.params 
        const archived = req.query.archived === "true"; // Convertir en booléen
        const foodet = await Food.find({ owner : id, archived  }).populate("owner");

        const page = parseInt(req.query.page);
        const pageSize = parseInt(req.query.pageSize);
        
        // Calculate the start and end indexes for the requested page
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        
        // Slice the products array based on the indexes
        const paginatedFoods = foodet.slice(startIndex, endIndex);
        
        // Calculate the total number of pages
        const totalPages = Math.ceil(foodet.length / pageSize);

        // Send the paginated products and total pages as the API response
        res.status(200).send({msg : "these are all the foods", foods: paginatedFoods, totalPages });
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not get all the food'}]})
    }
}



exports.GetOneFood = async(req,res)=>{
    try {
        const {id} = req.params
        const food = await Food.findById(id).populate('owner')
        res.status(200).send({msg : 'This is your foods', food})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not get all the food'}]})
    }
}

exports.DeleteOneFood = async(req,res)=>{
    try {
        const {id} = req.params
        const found = await Food.findById(id)
        if (!found) {
            return res.status(400).send({msg : 'Food by this id does not exist'})
        }
        await Food.findByIdAndDelete(id)
        res.status(200).send({msg : 'Food deleted'})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not delete one food'}]})
    }
}

exports.UpdateOneFood = async(req,res)=>{
    try {
        const {id} = req.params
        const found = await Food.findById(id)
        if (!found) {
            return res.status(400).send({msg : 'Food by this id does not exist'})
        }
        await Food.findByIdAndUpdate(id, {$set : req.body})
        res.status(200).send({msg : 'food changed'})
    } catch (error) {
        res.status(500).send({errors : [{msg : 'Could not get all the food'}]})
    }
}