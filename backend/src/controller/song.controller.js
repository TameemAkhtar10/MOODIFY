let songmodel = require('../models/song.model');
let storage = require('../services/storage.services');
let id3 = require('node-id3');

let addsong = async (req, res) => {
     console.log('req.file:', req.file)
    console.log('req.body:', req.body)
    try {
        let buffer = req.file.buffer;
        let { mood } = req.body;
        const tags = id3.read(buffer);
        console.log(tags);

        const [songfile, posterfile] = await Promise.all([
            storage.uploadfile({
                buffer: buffer,
                filename: tags.title + '-' + tags.artist + '.mp3',
                folder: 'Moodify/songs'
            }),
            storage.uploadfile({
                buffer: tags.image.imageBuffer,
                filename: tags.title + '-' + tags.artist + '.jpg',
                folder: 'Moodify/posters'
            })
        ]);

        let song = await songmodel.create({
            url: songfile.url,
            posterurl: posterfile.url,
            title: tags.title,
            mood: mood
        });

        res.status(201).json({
            message: 'song added successfully',
            song: song
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
let getsong = async (req, res) => {
    let { mood } = req.query
    console.log(req.query);

    let song = await songmodel.findOne({
        mood
    })
    res.status(200).json({
        message: "song fetched successfully",
        song
    })

}
let getnextsong = async (req, res) => {
    try {
        let { mood, excludeId } = req.query
        let songs = await songmodel.find({
            mood: { $regex: new RegExp(mood, 'i') },
            _id: { $ne: excludeId }
        })
        if (!songs.length) {
            return res.status(404).json({ message: 'no more songs' })
        }
        let random = songs[Math.floor(Math.random() * songs.length)]
        res.status(200).json({ message: 'next song fetched', song: random })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { addsong, getsong ,getnextsong};