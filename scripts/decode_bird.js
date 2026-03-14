const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./scripts/bird_b64.json', 'utf8'));
if (data?.data?.[0]?.base64) {
    fs.writeFileSync('./public/assets/bird.png', Buffer.from(data.data[0].base64, 'base64'));
    console.log('Saved bird.png');
}
