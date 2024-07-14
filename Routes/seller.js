const Controllers = require('../Controllers/seller.js')
const router = require("express").Router()
router.post('/Signup', Controllers.Signup)
    .post('/Login', Controllers.Login)
    .post('/restorant', Controllers.ProtectByAuth, Controllers.CreateRestorant)
    .get('/restorant', Controllers.ProtectByAuth, Controllers.getAllMyRestorant)
    .get('/restorant/:id', Controllers.ProtectByAuth, Controllers.getRestorantById)
    .patch('/restorant/:id', Controllers.ProtectByAuth, Controllers.updateRestorant)
    .delete('/restorant/:id', Controllers.ProtectByAuth, Controllers.deleteRestorant)
    .post('/product', Controllers.ProtectByAuth, Controllers.CreateProduct)
    .get('/product', Controllers.ProtectByAuth, Controllers.getAllMyProduct)
    .get('/product/:id', Controllers.ProtectByAuth, Controllers.getProductById)
    .patch('/product/:id', Controllers.ProtectByAuth, Controllers.updateProduct)
    .delete('/product/:id', Controllers.ProtectByAuth, Controllers.deleteProduct)


module.exports = router