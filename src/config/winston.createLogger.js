const path = require("path");
const { dirname } = require("path");
const {winston, format, transports, createLogger} = require("winston")
const DailyRotateFile = require("winston-daily-rotate-file");


const dir_path = path.join(process.cwd(), "logs")


const fileTransport = new DailyRotateFile({
    dirname: dir_path,
    filename: "application-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxSize: "20m",
    maxFiles: "14d",
    format: format.json()
})


fileTransport.on("error", (error) => {
    console.error("Log file error:", error);
});



const logger = createLogger({
    level: "http",
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
    ),
     transports: [
        fileTransport, 
         new transports.Console({
            format: format.simple()
        })
    ]
});


module.exports = logger