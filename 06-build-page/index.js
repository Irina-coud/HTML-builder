const fs = require("fs");
const path = require("path");

let distPath = path.join(__dirname, "project-dist");
let componentsPath = path.join(__dirname, "components");
let templatePath = path.join(__dirname, "template.html");
let template;
let regexp = /[{]+(\w)+[}]+/g

let filePathDist = path.join(__dirname, "project-dist", "style.css")
let filePathStyle = path.join(__dirname, "styles")

let assetsPathDist = path.join(__dirname, "project-dist", "assets");
let assetsPath = path.join(__dirname, "assets");

fs.mkdir(distPath, { recursive: true }, err => {
    if (err) {
        console.log(err);
    }
    fs.readFile(templatePath, 'utf8', (err, itemTemplate) => {
        if (err) {
            console.log(err);
        } else {
            template = itemTemplate;
            let templates = template.match(regexp);
            fs.readdir(componentsPath, { withFileTypes: true }, (err, files) => {
                if (err) {
                    console.log(err);
                } else {
                    let arrCompPath = files.map(function (itemComp) {
                        return path.join(__dirname, "components", itemComp.name)
                    })
                    let readFiles = [];
                    templates.forEach(itemTemp => {
                        let currentNameTemp = itemTemp.slice(2, -2)
                        let index;
                        arrCompPath.forEach((itemComp, indexComp) => {
                            if (itemComp.indexOf(currentNameTemp) !== -1) {
                                index = indexComp;
                            }
                        })
                        let read = fs.promises.readFile(arrCompPath[index], 'utf8').then((itemComp) => {
                            if (err) {
                                console.log(err);
                            } else {
                                template = template.replace(`${itemTemp}`, `${itemComp}`)
                            }
                        })
                        readFiles.push(read)
                    })
                    Promise.all(readFiles).then((results) => {
                        let indexHtmlPath = path.join(__dirname, "project-dist", "index.html")
                        fs.writeFile(indexHtmlPath, template, err => {
                            if (err) {
                                console.log(err);
                            }
                        })
                    })
                }
            })
        }
    })
    fs.open(filePathDist, 'w', (err) => {
        if (err) {
            console.log(err);
        }
        fs.readdir(filePathStyle, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.log(err);
            } else {
                files.forEach(file => {
                    let filePath = path.join(__dirname, "styles", file.name)
                    let fileExtension = path.extname(file.name).slice(1)
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                        } else {
                            if (fileExtension === "css") {
                                fs.appendFile(filePathDist, data, (err) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                })
                            }
                        }
                    })
                });
            }
        })
    });
    fs.mkdir(assetsPathDist, { recursive: true }, err => {
        if (err) {
            console.log(err);
        }
        fs.readdir(assetsPath, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.log(err);
            }
            else {
                files.forEach(file => {
                    let filePath = path.join(__dirname, "assets", file.name)
                    let filePathCopy = path.join(__dirname, "project-dist", "assets", file.name)
                    if (file.isFile()) {
                        fs.copyFile(filePath, filePathCopy, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        })
                    } else {
                        fs.readdir(filePath, { withFileTypes: true }, (err, filesDep) => {
                            if (err) {
                                console.log(err);
                            } else {
                                fs.mkdir(`06-build-page/project-dist/assets/${file.name}`, { recursive: true }, err => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        filesDep.forEach(fileDep => {
                                            let filePathDep = path.join(__dirname, "assets", file.name, fileDep.name)
                                            let filePathCopyDep = path.join(__dirname, "project-dist", "assets", file.name, fileDep.name)
                                            fs.copyFile(filePathDep, filePathCopyDep, (err) => {
                                                if (err) {
                                                    console.log(err);
                                                }
                                            })
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    });
})
// fs.open(filePathDist, 'w', (err) => {
//     if (err) {
//         console.log(err);
//     }
//     fs.readdir(filePathStyle, { withFileTypes: true }, (err, files) => {
//         if (err) {
//             console.log(err);
//         } else {
//             files.forEach(file => {
//                 let filePath = path.join(__dirname, "styles", file.name)
//                 let fileExtension = path.extname(file.name).slice(1)
//                 fs.readFile(filePath, 'utf8', (err, data) => {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         if (fileExtension === "css") {
//                             fs.appendFile(filePathDist, data, (err) => {
//                                 if (err) {
//                                     console.log(err);
//                                 }
//                             })
//                         }
//                     }
//                 })
//             });
//         }
//     })
// });

// fs.mkdir(assetsPathDist, { recursive: true }, err => {
//     if (err) {
//         console.log(err);
//     }
//     fs.readdir(assetsPath, { withFileTypes: true }, (err, files) => {
//         if (err) {
//             console.log(err);
//         }
//         else {
//             files.forEach(file => {
//                 let filePath = path.join(__dirname, "assets", file.name)
//                 let filePathCopy = path.join(__dirname, "project-dist", "assets", file.name)
//                 if (file.isFile()) {
//                     fs.copyFile(filePath, filePathCopy, (err) => {
//                         if (err) {
//                             console.log(err);
//                         }
//                     })
//                 } else {
//                     fs.readdir(filePath, { withFileTypes: true }, (err, filesDep) => {
//                         if (err) {
//                             console.log(err);
//                         } else {
//                             fs.mkdir(`06-build-page/project-dist/assets/${file.name}`, { recursive: true }, err => {
//                                 if (err) {
//                                     console.log(err);
//                                 }
//                                 else {
//                                     filesDep.forEach(fileDep => {
//                                         let filePathDep = path.join(__dirname, "assets", file.name, fileDep.name)
//                                         let filePathCopyDep = path.join(__dirname, "project-dist", "assets", file.name, fileDep.name)
//                                         fs.copyFile(filePathDep, filePathCopyDep, (err) => {
//                                             if (err) {
//                                                 console.log(err);
//                                             }
//                                         })
//                                     })
//                                 }
//                             })
//                         }
//                     })
//                 }
//             })
//         }
//     })
// });