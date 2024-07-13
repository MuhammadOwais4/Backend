require('dotenv').config()
const express = require("express")
const App = express()
const cors = require("cors")
const UserRouters = require("./Routes/User")
const { default: mongoose } = require("mongoose")

App.get("/favicon.ico", (req, res) => res.status(204));
App.use(cors())
App.use(express.json())
App.use('/api/Auth', UserRouters)

Main().catch((e) => console.log(e))
async function Main() {
    await mongoose.connect(process.env.MONGOURL)
    console.log("Dataase is Connected")
}
App.listen(process.env.PORT, () => { console.log("Server is Started At", process.env.PORT) })