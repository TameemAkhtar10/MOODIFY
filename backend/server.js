require('dotenv').config()

let app = require('./src/app')
let connectToDb = require('./src/config/database')


app.listen(3000,()=> {
    console.log('server is running on port 3000');
    
})
connectToDb()