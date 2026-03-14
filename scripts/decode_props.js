const fs = require('fs');
function decodeAndSave(inputFile, outputFile) {
    try {
        const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));
        if (data && data.data && data.data[0] && data.data[0].base64) {
            const b64 = data.data[0].base64;
            const buffer = Buffer.from(b64, 'base64');
            fs.writeFileSync(outputFile, buffer);
            console.log(`Saved ${outputFile}`);
        }
    } catch(e) {}
}
decodeAndSave('./scripts/fence_b64.json', './public/assets/fence.png');
decodeAndSave('./scripts/apple_b64.json', './public/assets/apple.png');
