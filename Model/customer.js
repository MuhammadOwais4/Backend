const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    userName: { type: String, unique: true, required: true },
    password: {
        type: String, required: true, minlength: 6
    },
    email: { type: String, },
    phone: { type: String, },
    gender: { type: String, enum: ["male", 'female'] },
})

let User = new mongoose.model("customer", UserSchema)
module.exports = User