const mongoose = require('mongoose')
const restorantSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Type.ObjectId, ref: "seller" },
    name: { type: String, unique: true, required: true },
    address: { type: String },
    location: {
        type: pointSchema,
        default: {
            type: "Point",
            coordinates: [0, 0]
        },
        index: "2dsphere"
    },
    contactInfo: {
        phone: { type: Number },
        whatsapp: { type: Number },
        otherSocialAccounts: { type: String }
    },
    sliderImages: [{
        url: String,
        type: String,
        name: String
    }],
    coverImage: {
        url: String,
        type: String,
        name: String
    },
    isDeleted: { type: Boolean },
    isActive: { type: Boolean }
}, { timestamps: true })

let restorantModel = new mongoose.model("restorant", restorantSchema)
module.exports = restorantModel