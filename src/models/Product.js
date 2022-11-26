const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema({
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    photo: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    condition: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'in-stock'
    }
},
    { timestamps: true }
);

const Product = new mongoose.model('Product', ProductSchema);

module.exports = Product;