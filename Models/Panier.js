const mongoose = require('mongoose');

const panierSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Food', // Référence au produit
            required: true
        },
        qte: {
            type: Number,
        },
        prixTot : Number,
        order_time: {
            type: Date,
            default: Date.now
        }
    }],
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Panier', panierSchema);
