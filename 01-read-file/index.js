const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "text.txt")

let readStream = fs.createReadStream(filePath, "utf-8");

readStream.on('readable', () => {
    let data = readStream.read();
    if (null !== data) {
        console.log(data);
    }
});