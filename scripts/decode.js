const fs = require('fs');

function decodeAndSave(inputFile, outputFile) {
    try {
        const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
        if (data && data.data && data.data[0] && data.data[0].base64) {
            const b64 = data.data[0].base64;
            const buffer = Buffer.from(b64, 'base64');
            fs.writeFileSync(outputFile, buffer);
            console.log(`Saved ${outputFile}`);
        } else {
            console.log(`No base64 data found in ${inputFile}`);
        }
    } catch(e) {
        console.error(`Error processing ${inputFile}:`, e.message);
    }
}

decodeAndSave('./scripts/sky_b64.json', './public/assets/sky.png');
decodeAndSave('./scripts/mountains_b64.json', './public/assets/mountains.png');
decodeAndSave('./scripts/ground_b64.json', './public/assets/track.png');
decodeAndSave('./scripts/trees_b64.json', './public/assets/trees.png');
