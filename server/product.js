const mongoose = require('mongoose');
const { Schema }  = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    productId: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);