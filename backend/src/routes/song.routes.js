let {Router} = require('express')
let songrouter = Router()
let SongModel =require('../models/song.model')
let upload = require('../middleware/upload.middleware')
let songcontroller = require('../controller/song.controller')

songrouter.post('/',upload.single('songs'),songcontroller.addsong)
songrouter.get('/',songcontroller.getsong)


songrouter.get('/next', songcontroller.getnextsong)


module.exports = songrouter