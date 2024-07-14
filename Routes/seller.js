const Controllers = require('../Controllers/seller.js')
const router = require("express").Router()
router.post('/Signup', Controllers.Signup)
    .post('/Login', Controllers.Login)
    .post('/restorant', Controllers.ProtectByAuth, Controllers.CreateRestorant)
    .get('/restorant', Controllers.ProtectByAuth, Controllers.getAllMyRestorant)
    // .get('/restorant', Controllers.ProtectByAuth, Controllers.getRestorantById)
    // .patch('/restorant', Controllers.ProtectByAuth, Controllers.updateRestorant)
    // .delete('/restorant', Controllers.ProtectByAuth, Controllers.deleteRestorant)


module.exports = router