const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    restorantId: { type: mongoose.Types.ObjectId, ref: "restorant" },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    discount: { type: Number },
    image: { type: String },
    category: { type: String }
}, { timestamps: true })

let productModel = new mongoose.model("product", productSchema)
module.exports = productModel