const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs")
const YAML = require("yaml") 
const path = require("path")


// const loadFile = fs.readFileSync(`${__dirname. ../../swagger.yml}`)





const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Application Backend",
            version: "1.0.0",
            description: "Application backend for transport goods"
        }
    },

    apis: [
        "./src/routes/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);


module.exports = (app) => {
app.use('/api-docs', swaggerUi.serve , swaggerUi.setup(swaggerSpec)) 
}

