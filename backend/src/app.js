let express = require('express')
let cookieparser = require('cookie-parser')
let cors = require('cors')
let router = require('../src/routes/auth.routes')
let songrouter = require('../src/routes/song.routes')
let path = require('path')

let app = express()


app.use(express.json())
app.use(cors({
    origin: 'https://moodify-ny2y.onrender.com'',
    credentials: true,
}))
app.use(cookieparser())
app.use('/api/auth', router)
app.use('/api/songs', songrouter)
app.use(express.static(path.join(__dirname, "../public/dist")));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../public/dist/index.html"));
});
module.exports = app