let mongoose = require('mongoose')

let songSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    posterurl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        enum: {
            values: ['happy', 'sad', 'surprised', 'calm', 'neutral', 'angry'],
            message: '{VALUE} is not supported'
        }
        },
},
{
    timestamps: true
})
let SongModel = mongoose.model('Songs', songSchema)
module.exports = SongModel