const { SendResponse } = require('../Helpers/HelperFx')
let User = require('../Model/seller')
let jwt = require('jsonwebtoken')
// let bcrypt = require('bcrypt')
let UserController = {
    Login: async (req, res) => {
        try {
            let { userName, password, email, phone, gender } = req.body
            let ErrArr = []
            if (!userName) ErrArr.push("UserName is Required")
            if (!password) ErrArr.push("Password is Required")
            if (!email) ErrArr.push("email is Required")
            if (password.length < 6) ErrArr.push("Password Must be Greater than 6 digit")
            if (ErrArr.length > 0) return res.status(400).send(SendResponse(false, "", ErrArr))
            let UserExits = await User.findOne({ userName })
            if (!UserExits) return res.status(400).send(SendResponse(false, "User Not Found", { userName }))
            // let EnPassword = await bcrypt.compare(Password, UserExits._doc.Password)
            // if (!EnPassword) return res.status(400).send(SendResponse(false, "Incorrect Password", { UserName }))
            delete UserExits.password
            let token = jwt.sign({ ...UserExits }, process.env.SECRET_KEY)
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
            if (!userName) ErrArr.push("UserName is Required ")
            if (!password) ErrArr.push("Password is Required ")
            if (!email) ErrArr.push("email is Required ")
            if (password < 6) ErrArr.push("Password Must be Greater than 6 digit")
            if (ErrArr.length > 0) return res.status(400).send(SendResponse(false, "", ErrArr))
            let UserExits = await User.findOne({ userName })
            if (UserExits) return res.send(SendResponse(false, "User Already Exits", { userName }))
            // let EnPassword = await bcrypt.hash(password, 10)
            let Response = await User({ userName, password, email, phone, gender }).save()
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
            let decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded._doc.UserName) {
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
}
module.exports = UserController



