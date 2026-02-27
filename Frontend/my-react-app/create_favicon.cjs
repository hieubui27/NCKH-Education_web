const Jimp = require('jimp');

const inPath = 'D:\\VS\\education_web\\NCKH-Education_web\\Frontend\\my-react-app\\src\\assets\\logo_vienkey.png';
const outPath = 'D:\\VS\\education_web\\NCKH-Education_web\\Frontend\\my-react-app\\public\\favicon.png';

async function processImage() {
    try {
        const image = await Jimp.read(inPath);
        console.log("Image loaded.");

        // Make the image square by padding with transparent color
        const width = image.bitmap.width;
        const height = image.bitmap.height;
        const size = Math.max(width, height);

        // Create new image with transparent background
        new Jimp(size, size, 0x00000000, async (err, newImage) => {
            if (err) throw err;

            const x = Math.round((size - width) / 2);
            const y = Math.round((size - height) / 2);

            newImage.composite(image, x, y);
            await newImage.writeAsync(outPath);
            console.log("Square favicon created successfully!");
        });
    } catch (err) {
        console.error(err);
    }
}

processImage();
