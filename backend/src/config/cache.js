let Redis = require('ioredis').default
let redis = new Redis({
    host: process.env.Redis_HOST,
    port: process.env.Redis_PORT,
    password: process.env.Redis_PASSWORD
})

redis.on('connect', () => {
    console.log('connect to redis');
})
redis.on('error', (err) => {
    console.log(err)
})
module.exports = redis