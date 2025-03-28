const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String, // image URL
    minimumOffer: Number,
    actualOffer: Number,
    bidHistory: [
        {
            name: String,
            amount: Number,
            date: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

module.exports = mongoose.model('Product', productSchema);