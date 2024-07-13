const Controllers = require('../Controllers/User')
const router = require("express").Router()
router.post('/Signup', Controllers.Signup)
    .post('/Login', Controllers.Login)


module.exports = router