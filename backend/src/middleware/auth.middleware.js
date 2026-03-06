let usermodel = require('../models/user.model')
let jwt = require('jsonwebtoken')
let redis = require('../config/cache')


async function Authuser(req, res, next) {
    let token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "token required"
        })
    }
    let istokenblacklisted = await redis.get('token')
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()

    }
    catch (err) {
       return res.status(401).json({
            message: "token invalid"
        })

    }

}
module.exports = Authuser