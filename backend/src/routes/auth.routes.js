let { Router } = require('express')
let authcontroller = require('../controller/auth.controller')
let authuser = require('../middleware/auth.middleware')

let router = Router()
router.post('/register', authcontroller.userregister)
router.post('/login', authcontroller.userlogin)
router.get('/get-me',authuser,authcontroller.getme)
router.get('/logout',authuser,authcontroller.userlogout)






module.exports = router