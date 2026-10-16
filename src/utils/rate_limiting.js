const { rateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { createClient } = require('redis');


// node-redis expects an options object; passing REDIS_URL directly is not a
// valid createClient argument. Prefer the URL, with host settings as fallback.
const client = createClient({
    url: process.env.REDIS_URL || undefined,
    socket: process.env.REDIS_URL ? undefined : {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT || 6379),
    },
    ...(process.env.REDIS_PASSWORD
        ? { password: process.env.REDIS_PASSWORD }
        : {}),
});

client.on('error', (err) => {
    console.error('Redis error:', err);
});

// Start connecting once. The Redis store can run its initialization command as
// soon as the limiter is created, so its command handler must wait for this.
const clientReady = client.connect();

const limiter = rateLimit({
    windowMs:  60 * 1000,
    max: 5,
    message: {
        status: 429,
        error: 'Too many requests',
        message: 'You have exceeded the rate limit. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    store: new RedisStore({
        sendCommand: async (...args) => {
            await clientReady;
            return client.sendCommand(args);
        }
    }),
});

module.exports = {limiter, clientReady};
