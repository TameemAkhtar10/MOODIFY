const ImageKit = require("imagekit");

const client = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadfile({ buffer, filename, folder = '' }) {
    const base64 = buffer.toString('base64');
    const file = await client.upload({
        file: base64,
        fileName: filename,
        folder
    });
    return file;
}

module.exports = { uploadfile };