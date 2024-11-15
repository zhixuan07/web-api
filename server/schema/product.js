const moogose = require('mongoose');

const productSchema = new moogose.Schema({
    sku: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image_path: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, required: true },
    ingredients : { type: Object, required: true },
})

const Product = moogose.model('Product', productSchema);
module.exports = Product;
