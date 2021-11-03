const fs = require("fs");
const path = require("path");
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const filePath = path.join(__dirname, "text.txt")
const writeStream = fs.createWriteStream(filePath, "utf-8");
const rl = readline.createInterface({ input, output });


output.write("Доброго времени суток, вы можете написать все, о чём так долго молчали =)\n")

const exit = () => {
    rl.close();
    writeStream.end();
    output.write("Всего доброго!\n")
}

rl.on('line', input => {
    if (input === "exit") {
        exit();
    } else {
        writeStream.write(`${input}\n`);
        output.write("Есть что добавить? =)\n")
    }
});
rl.on('SIGINT', () => {
    exit();
});