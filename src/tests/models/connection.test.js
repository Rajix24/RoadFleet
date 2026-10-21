require("dotenv").config()
const mongoose = require("mongoose")
const mongoUrl = process.env.MONGO_URL

describe("connection", () => {
    let connection

    beforeAll(async () => {
        connection = await mongoose.connect(mongoUrl, { serverSelectionTimeoutMS: 3000 })
    })

    afterAll(async () => {
        await mongoose.disconnect()
    })
    


    
    test("connects to the MongoDB database", () => {
        expect(mongoose.connection.readyState).toBe(1)
        expect(connection.connection.readyState).toBe(1)
    })
})
