const mongoose = require('mongoose')


const commandeSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food', // Référence au produit
            required: true
        },
        qte: {
            type: Number,
        },
        priceTot : {
            type: Number,
        }
        
    }],
    totalPrice : Number,
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    chef : {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status : {
        type : String,
        default :'In progress'
    },
    delivered : {
        type : Boolean,
        default : false
    },
    archieved : {
        type : Boolean,
        default : false
    }
}, { timestamps: true })

module.exports = mongoose.model('Commande', commandeSchema)
