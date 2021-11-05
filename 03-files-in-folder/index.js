const fs = require("fs");
const path = require("path");
const folderPath = path.join(__dirname, "secret-folder")

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
        console.log(err);
    } else {
        files.forEach(file => {
            let fileName = file.name.split('.').slice(0, -1).join('.')
            let filePath = path.join(__dirname, "secret-folder", file.name)
            let fileExtension = path.extname(file.name).slice(1)
            let fileSize;
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.log(err);
                } else {
                    fileSize = stats.size
                    if (file.isFile()) {
                        console.log(`${fileName} - ${fileExtension} - ${fileSize}b`)
                    }
                }
            })
        })
    }
})
