const logger = require('../config/winston.createLogger')
const errorHandler = (err, req, res, next)=>{
    logger.error(err.message)
    res.status(500).send("internal server Error")
    next();
}


module.exports = errorHandler