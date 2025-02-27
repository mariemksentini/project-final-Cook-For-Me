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
    livreur : {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    status : {
        type : String,
        default :'In_progress'
    },
    delivered : {
        type : Boolean,
        default : false
    },
    confirmed : {
        type : Boolean,
        default : false
    },
    archieved : {
        type : Boolean,
        default : false
    },
    rating : {
        type : Number,
        default : 0
    },
    feedBack : {
        type : String,
        default : "None"
    },
    addressClient : {
        latitude : {
            type : Number,
            default : 36.777125
        },
        longitude : {
            type : Number,
            default : 10.177729
        }
    },
    adressChef : {
        latitude : {
            type : Number,
            default : 36.777125
        },
        longitude : {
            type : Number,
            default : 10.177729
        }
    }   
}, { timestamps: true })

module.exports = mongoose.model('Commande', commandeSchema)
