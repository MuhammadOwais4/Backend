const mongoose = require('mongoose')
const SellerSchema = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    password: {
        type: String, required: true, minlength: 6
    },
    email: { type: String, },
    phone: { type: String, },
    gender: { type: String, enum: ["male", 'female'] },
    restorantId: { type: mongoose.Types.ObjectId, ref: "restorant" }
})

let sellerModel = new mongoose.model("seller", SellerSchema)
module.exports = sellerModel