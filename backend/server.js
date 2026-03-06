require('dotenv').config()

let app = require('./src/app')
let connectToDb = require('./src/config/database')


app.listen(process.env.PORT || 3000, () => {
    console.log('server is running on port ' + (process.env.PORT || 3000))
})
connectToDb()