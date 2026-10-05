const express = require('express')
const mongoose = require('mongoose')
const userRouter = require("./src/routes/user.route")
const path = require("path")
const auth_router = require("./src/routes/auth.router")
const cookieParser = require("cookie-parser")
const swagger = require("./src/utils/swagger")
require("dotenv").config()



// console.log(options.defifnition.servers)






const app = express()
app.use(express.json())

const port = process.env.BACKEND_PORT
const mongoseURL = process.env.MONGO_URL


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
// app.use(check_auth())

app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the Express Application API!" });
});


// Routers:
app.use("/api", userRouter)
app.use("/auth", auth_router)



mongoose.connect(mongoseURL).then(()=>{
    console.log("Database is connect seccfully")
    app.listen(port, ()=>{
        console.log(`serveur is runing on ${port}`)
    })

}).catch((error) =>{
    console.log("error in connect to Database")
})

swagger(app)