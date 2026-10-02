const {validationResult} = require("express-validator")

function validate(req, res, next){
    const error  = validationResult(req)
    if(!error.isEmpty()){
        console.log(error)
        return res.status(400).json({massage: "validation failed"})
    }
    next()
}
module.exports = {validate}

// TO IMPORT FUNCTION I NEED TO ADD  {} IN THE MODULE.EXPORT    