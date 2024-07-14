const { SendResponse } = require('../Helpers/HelperFx')
let userModel = require('../Model/seller')
let restorantModel = require('../Model/restorant')
let jwt = require('jsonwebtoken')
// let bcrypt = require('bcrypt')
let UserController = {
    Login: async (req, res) => {
        try {
            let { userName, password, email, phone, gender } = req.body
            let ErrArr = []
            email = email.toLowerCase()
            gender = gender.toLowerCase()
            if (!userName) ErrArr.push("UserName is Required")
            if (!password) ErrArr.push("Password is Required")
            if (!email) ErrArr.push("email is Required")
            if (password.length < 6) ErrArr.push("Password Must be Greater than 6 digit")
            if (ErrArr.length > 0) return res.status(400).send(SendResponse(false, "", ErrArr))
            let UserExits = await userModel.findOne({ userName })
            if (!UserExits) return res.status(400).send(SendResponse(false, "User Not Found", { userName }))
            // let EnPassword = await bcrypt.compare(Password, UserExits._doc.Password)
            // if (!EnPassword) return res.status(400).send(SendResponse(false, "Incorrect Password", { UserName }))
            delete UserExits.password
            let token = jwt.sign({ ...UserExits }, process.env.sellerToken)
            if (!token) return res.status(400).send(SendResponse(false, 'Token Not Found'))
            console.log(UserExits)
            res.send(SendResponse(true, "User Successfully Login", { userName, Token: token }))
        } catch (err) {
            res.status(400).send(SendResponse(false, "Catch Unknown Error", { ...err }))
        }
    },
    Signup: async (req, res) => {
        try {
            let { userName, password, email, phone, gender } = req.body
            let ErrArr = []
            email = email.toLowerCase()
            gender = gender.toLowerCase()
            if (!userName) ErrArr.push("UserName is Required ")
            if (!password) ErrArr.push("Password is Required ")
            if (!email) ErrArr.push("email is Required ")
            if (password < 6) ErrArr.push("Password Must be Greater than 6 digit")
            if (ErrArr.length > 0) return res.status(400).send(SendResponse(false, "", ErrArr))
            let UserExits = await userModel.findOne({ userName })
            if (UserExits) return res.send(SendResponse(false, "User Already Exits", { userName }))
            // let EnPassword = await bcrypt.hash(password, 10)
            let Response = await userModel({ userName, password, email, phone, gender }).save()
            res.status(400).send(SendResponse(true, "User Successfully Created", Response))
            // if (EnPassword) {
            // }
        } catch (err) {
            res.send(SendResponse(false, "Catch Unknown Error", err))

        }
    },

    ProtectByAuth: async (req, res, Next) => {
        try {
            let token = req.get("Authorization")?.split("Bearer ")[1];
            let decoded = jwt.verify(token, process.env.sellerToken);
            if (decoded._doc.userName) {
                req.user = decoded._doc
                Next();
            } else {
                res
                    .status(407)
                    .send(SendResponse(false, "invalid Token", decoded));
            }
        } catch (err) {
            res.status(407).send(SendResponse(false, "invalid Token Err", err));
        }
    },
    CreateRestorant: async (req, res) => {
        try {
            let { name, address, location, contactInfo, sliderImages, coverImage } = req.body
            let ErrArr = []
            console.log(name)
            if (!name) ErrArr.push("Name is Required ")
            if (!address) ErrArr.push("address is Required")
            if (ErrArr.length > 0) return res.status(400).send(SendResponse(false, "", ErrArr))
            let restorantExits = await restorantModel.findOne({ name })
            if (restorantExits) return res.status(400).send(SendResponse(false, "restorant Already Exits", { name }))
            let Response = await restorantModel({
                ownerId: req.user._id,
                name, address, location, contactInfo, sliderImages, coverImage
            }).save()
            res.status(200).send(SendResponse(true, "restorant Successfully Created", Response))
        } catch (err) {
            res.send(SendResponse(false, "Catch Unknown Error", err))
        }
    },
    getAllMyRestorant: async (req, res) => {
        try {
            let { _id } = req.user
            let ErrArr = []
            let restorantExits = await restorantModel.find({ ownerId: _id })
            res.status(200).send(SendResponse(true, "Success", restorantExits))
        } catch (err) {
            res.send(SendResponse(false, "Catch Unknown Error", err))
        }
    },
    getRestorantById: async (req, res) => {
        try {
            let { _id } = req.user
            let { id } = req.params
            let ErrArr = []
            if (!id) ErrArr.push(" you Mush be Put Restorant Id ")
            if (ErrArr.length > 0) return res.status(400).send(SendResponse(false, "", ErrArr))
            let restorantExits = await restorantModel.findOne({ ownerId: _id, _id: id })
            res.status(200).send(SendResponse(true, "Success", restorantExits))
        } catch (err) {
            res.send(SendResponse(false, "Catch Unknown Error", err))
        }
    },
    updateRestorant: async (req, res) => {
        try {
            console.log(req.params.id)
            console.log(req.user._id)
            let { name, address, location, contactInfo, sliderImages, coverImage } = req.body
            let Response = await restorantModel.findOneAndUpdate({ _id: req.params.id, ownerId: req.user._id }, { name, address, location, contactInfo, sliderImages, coverImage })
            if (!Response) return res.status(404).send(SendResponse(false, "restorant Not Found", { Response }))
            res.status(200).send(SendResponse(true, "restorant Successfully updated", Response))
        } catch (err) {
            res.send(SendResponse(false, "Catch Unknown Error", err))
        }
    },
    deleteRestorant: async (req, res) => {
        try {
            let { id } = req.params 
            let Response = await restorantModel.findOneAndUpdate({ _id: req.params.id, ownerId: req.user._id }, { isDeleted: true })
            if (!Response) return res.send(SendResponse(false, "restorant Not Found", Response))
            res.status(200).send(SendResponse(true, "restorant Successfully Deleted", Response))
        } catch (err) {
            res.send(SendResponse(false, "Catch Unknown Error", err))
        }
    },
}
module.exports = UserController



