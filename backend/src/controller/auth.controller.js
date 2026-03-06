let usermodel = require('../models/user.model')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcryptjs')
let redis = require('../config/cache')
async function userregister(req, res) {
    let { username, email, password } = req.body


    let isuserexisted = await usermodel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isuserexisted) {
        return res.status(400).json({
            message: " user is already existed"
        })
    }
    let hash = await bcrypt.hash(password, 10)
    let user = await usermodel.create({
        username,
        email,
        password: hash
    })
    let token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    })
    if (!token) {
        return res.status(401).json({
            message: 'token provided'
        })
    }
    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
    res.status(201).json({
        message: 'user registered successfullyy',
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        }
    })

}
async function userlogin(req, res) {
    try {
        let { identifier, password } = req.body

        if (!identifier || !password) {
            return res.status(400).json({ message: "all fields required" })
        }
        console.log("BODY:", req.body)

        identifier = identifier.toLowerCase()

        let user = await usermodel.findOne({
            $or: [
                { username: identifier },
                { email: identifier }
            ]
        }).select('+password')
        console.log("USER FOUND:", user)

        if (!user) {
            return res.status(400).json({ message: "invalid credentials" })
        }

        let ismatch = await bcrypt.compare(password, user.password)

        if (!ismatch) {
            return res.status(400).json({ message: "invalid credentials" })
        }
        if (!ismatch) {
            return res.status(400).json({ message: "invalid credentials" })
        }
        console.log("PASSWORD MATCH:", ismatch)
        let token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.cookie("token", token, {
            httpOnly: true,
            secure: false
        })

        res.status(200).json({
            message: "login success",
            user
        })

    } catch (err) {
        res.status(500).json({ message: "server error" })
    }
}


async function getme(req, res) {
    let user = await usermodel.findById(req.user.id)

    res.status(200).json({
        message: "data fetched successfullyy",
        user
    })

}
async function userlogout(req, res) {
    try {
        let token = req.cookies.token
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })
        if (token && redis) {
            await redis.set(token, Date.now().toString(), "EX", 30 * 60)
        }
        res.status(200).json({ message: 'log out successfully' })
    } catch (err) {
        res.clearCookie('token')
        res.status(200).json({ message: 'log out successfully' })
    }
}
module.exports = {
    userregister,
    userlogin,
    getme,
    userlogout

}