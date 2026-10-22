
const { randomUUID } = require("node:crypto");
const logger = require("../config/winston.createLogger");

function requestHandler(req, res, next) {
     console.log("MIDDLEWARE RUNNING:", req.method, req.originalUrl);
    const requestId = randomUUID();
    const startTime = process.hrtime.bigint();

    req.requestId = requestId;
    res.setHeader("x-request-id", requestId);

    res.on("finish", () => {
        const endTime = process.hrtime.bigint();

        const responseTimeMs =
            Number(endTime - startTime) / 1_000_000;

        logger.log({
            level: "http",
            message: "HTTP request completed",
            timestamp: new Date().toISOString(),
            requestId,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            responseTimeMs: Number(responseTimeMs.toFixed(2)),
            userId: req.user?.id ?? req.user?._id?.toString() ?? null,
            ip: req.ip
        });
    });

    next();
}

module.exports = requestHandler;
