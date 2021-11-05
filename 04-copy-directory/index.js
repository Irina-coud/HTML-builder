const fs = require("fs");
const path = require("path");

fs.mkdir("04-copy-directory/files_copy", { recursive: true }, err => {
    if (err) {
        console.log(err);
    }
    fs.readdir("04-copy-directory/files", { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file => {
                let filePath = path.join(__dirname, "files", file.name)
                let filePathCopy = path.join(__dirname, "files_copy", file.name)
                fs.copyFile(filePath, filePathCopy, (err) => {
                    if (err) {
                        console.log(err);
                    }
                })
            })
        }
    });
});


