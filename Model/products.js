const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    sellerId: { type: mongoose.Types.ObjectId, ref: "seller" },
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    discount: { type: Number },
    image: { type: String },
})

let User = new mongoose.model("User", productSchema)
module.exports = User