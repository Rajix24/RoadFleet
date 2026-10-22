require("dotenv").config()

const express = require('express')
const mongoose = require('mongoose')


const userRouter = require("./src/routes/user.route")
const camionRouter = require("./src/routes/camion.route")
const tireRouter = require("./src/routes/tire.route")
const remorqueRouter = require("./src/routes/remorque.route")
const trajetRouter = require("./src/routes/trajet.router")
const maintenanceRouter = require("./src/routes/maintenance.router")
const assigneRouter = require('./src/routes/assigne.router')
const auth_router = require("./src/routes/auth.router")
const fileRouter = require("./src/routes/file.route")


const cookieParser = require("cookie-parser")
const swagger = require("./src/utils/swagger")
const analyseRouter = require('./src/routes/analyse.router')
const {limiter, clientReady} = require('./src/utils/rate_limiting')
const {initializeBucket} =  require("./src/services/fileStorage.service")
const logger = require("./src/config/winston.createLogger")
const requestHandler = require("./src/middlewares/request.handler.middleware")
const errorHandler = require("./src/middlewares/errorHandler.middleware")

const app = express()
app.use(express.json())
app.use(limiter)
const port = process.env.BACKEND_PORT || 3000
const mongoseURL = process.env.MONGO_URL


app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to the Express Application API!" });
});

//reqHandler
app.use(requestHandler);
// error handler:


// ROUTERS:
app.use("/auth", auth_router)
app.use("/api", userRouter)
app.use("/camion", camionRouter)
app.use("/tires", tireRouter)
app.use("/remorques", remorqueRouter)
app.use('/trajet', trajetRouter)
app.use('/maintenance', maintenanceRouter)
app.use('/assigne', assigneRouter)
// V2:
app.use('/api/v2/analytics/', analyseRouter)
app.use('/file', fileRouter)

app.use(errorHandler)

async function startServer() {
    try {
        console.log("initializeBucket is on :")
        await initializeBucket()
        console.log("initializeBucket is good :")

        console.log("starting rateliming ")
        await clientReady;// that is for rate limiting 

        console.log('start connection with database')
        await mongoose.connect(mongoseURL);
        console.log("Database is connect seccfully") 

        app.listen(port, ()=>{logger.info(`serveur is runing on ${port}`)})
    } catch (error) {
        console.error('Failed to start application:', error);
        process.exit(1);
    }
}
startServer()
swagger(app)
