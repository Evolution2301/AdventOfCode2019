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

exports.parseNewlineInput = function (newlineInput) {
    return newlineInput.split("\r\n");
}

exports.parseNewlineInputFile = function (fileName) {
    return readFile(fileName).split("\r\n");
}

exports.parseCommaInput = function (commaInput) {
    return commaInput.split(",");
}

exports.parseCommaInputFile = function (fileName) {
    return readFile(fileName).split(",");
}