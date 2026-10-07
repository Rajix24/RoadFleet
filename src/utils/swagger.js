const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs")
const YAML = require("yaml") 
const path = require("path")


const swaggerPath = path.join(__dirname, "../../swagger.yml")
const file = fs.readFileSync(swaggerPath, "utf-8")

const swaggerDoc = YAML.parse(file)

const options = {
    definition: swaggerDoc,
    apis: [
        "./src/routes/*.js"
    ]
};

const swaggerSpec = swaggerJsdoc(options);


module.exports = (app) => {
app.use('/api', swaggerUi.serve , swaggerUi.setup(swaggerSpec)) 
}

    