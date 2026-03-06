let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        select: false,
        required: true,
    }
}, {
    timestamps: true
}
)

let usermodel = mongoose.model ('users',userSchema)
module.exports = usermodel