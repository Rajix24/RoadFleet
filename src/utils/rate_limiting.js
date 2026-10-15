const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    // Time window in milliseconds (15 minutes)
    windowMs: 15 * 60 * 1000,

    // Maximum number of requests allowed per window
    max: 100,

    // Response message when limit is exceeded
    message: {
        status: 429,
        error: 'Too many requests',
        message: 'You have exceeded the rate limit. Please try again later.'
    },

    // Enable standard rate limit headers (RateLimit-*)
    standardHeaders: true,

    // Disable legacy X-RateLimit-* headers
    legacyHeaders: false
});
module.exports = limiter;


/* 
    //TODO: 
*/