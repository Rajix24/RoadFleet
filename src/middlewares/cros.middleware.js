const URL = "http://localhost:5173"

    const corsOptions = {
        origin: [URL],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true ,
        exposedHeaders: ["access_token"]
    }



module.exports = {corsOptions} 