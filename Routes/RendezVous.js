const express = require('express');
const RendezVous = require('../Models/RendezVous');
const { IsAuth } = require('../Middlewares/IsAuth');

const rendezVousRouter = express.Router()

rendezVousRouter.get('/getAllRendezVous', async(req,res)=>{
    try {
        const rendezvouss = await RendezVous.find()
        .populate('privateChef')
        .populate('client')
        res.status(200).send({msg : 'these are the rdvs', rendezvouss})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not fetch rendezvous s' }] });
    }
})


// lezm naaml wehd post bch l chef yzid rdv w wehed put bch l client yajm ybadel yrod l client fih l id teeou (maghir current brabi)
// lezm delete 
//lezm nthabt f date kifeh tetaada 

rendezVousRouter.get('/getOneChefRendezVous/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const rendezvouss = await RendezVous.find({privateChef : id})
        .populate('privateChef')
        .populate('client')
        
        res.status(200).send({msg : 'these are the rdvs', rendezvouss})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not fetch rendezvous s' }] });
    }
})

rendezVousRouter.get('/getOneRendezVous/:id', async(req,res)=>{
    try {
        const {id} = req.params
        const found = await RendezVous.findById(id)
        .populate('privateChef')
        .populate('client')

        if(!found){
            res.status(400).send({ errors: [{ msg: 'Could not find this rendezvous ' }] })
        }
        res.status(200).send({msg : 'this is the rdv', found})
    } catch (error) {
        res.status(500).send({ errors: [{ msg: 'Could not fetch this rendezvous' }] });
        
    }
})

rendezVousRouter.post('/addRendezVous', IsAuth, async (req, res) => {
    try {
        const { startTime, endTime, price, purpose } = req.body;
        const privateChef = req.user._id;

        // Convert to Date objects
        const start = new Date(startTime);
        const end = new Date(endTime);

        // Check minimum duration (1h 30m)
        const minDuration = 90 * 60 * 1000; // 90 minutes in milliseconds
        if (end - start < minDuration) {
            return res.status(400).json({ errors: [{ msg: "Duration must be at least 1 hour 30 minutes" }] });
        }

        // Check for time conflicts
        const conflict = await RendezVous.findOne({
            privateChef,
            $or: [
                
                { startTime: { $lt: end }, endTime: { $gt: start } } // Overlapping condition
            ]
        });

        if (conflict) {
            return res.status(400).json({ errors: [{ msg: "Time slot unavailable, please choose another time" }] });
        }

        const rdvToAdd = req.body
        rdvToAdd.startTime = start
        rdvToAdd.endTime = end
        rdvToAdd.privateChef = req.user._id
        // Save the new rendezvous
        const newRendezVous = new RendezVous(rdvToAdd);

        await newRendezVous.save();
        res.status(200).json({ msg: "Rendezvous added successfully", rendezVous: newRendezVous });

    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: 'Could not add rendezvous' }] });
    }
});

rendezVousRouter.put('/updateRendezVous/:id', async(req,res)=>{
    try {
        const {id} = req.params
        await RendezVous.findByIdAndUpdate(id, req.body)
        const updated = await RendezVous.findById(id)
        res.status(200).send({msg : 'updated rendezvous', updated})
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: 'Could not update rendezvous' }] });
    }
})


rendezVousRouter.delete('/deleteRendezVous/:id', async(req,res)=>{
    try {
        const {id} = req.params
        await RendezVous.findByIdAndDelete(id)
        res.status(200).send({msg : 'delted rendezvous successfully'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [{ msg: 'Could not delete rendezvous' }] });
    }
} )




module.exports = rendezVousRouter