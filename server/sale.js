const mongoose = require('mongoose');
const { Schema }  = mongoose;

const saleSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true },
    total: { type: Number, required: true },
});

module.exports = mongoose.model('Sale', saleSchema);