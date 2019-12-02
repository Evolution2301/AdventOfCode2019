let fs = require('fs');
let path = require('path');

function getPath(fileName) {
    return path.join(__dirname, 'inputs', fileName);
}

function readFile(fileName) {
    return fs.readFileSync(getPath(fileName), {
        encoding: 'utf8'
    });
}

exports.parseNewlineInput = function (fileName) {
    return readFile(fileName).split("\r\n");
}

exports.parseCommaInput = function (fileName) {
    return readFile(fileName).split(",");
}