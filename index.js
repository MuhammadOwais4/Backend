require('dotenv').config()
const express = require("express")
const App = express()
const cors = require("cors")
const customerRouters = require("./Routes/customer")
const { default: mongoose } = require("mongoose")

App.get("/favicon.ico", (req, res) => res.status(204));
App.use(cors())
App.use(express.json())
App.use('/api/customer', customerRouters)

Main().catch((e) => console.log(e))
async function Main() {
    await mongoose.connect(process.env.MONGOURL)
    console.log("Dataase is Connected")
}
App.listen(process.env.PORT, () => { console.log("Server is Started At", process.env.PORT) })