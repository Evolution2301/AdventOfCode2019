var parse = require("./parseInput.js").readFileInput;
console.log("Day 8");
test();
part1();
part2();

function part1() {
    let input = parse('day8');
    let layers = parseLayers(input, 25, 6);

    console.log("Part1:", analyzeLayersForPart1(layers));
}

function part2() {
    let input = parse('day8');
    let layers = parseLayers(input, 25, 6);
    let resultLayer = renderLayers(layers, 25, 6);

    console.log("Part2:");
    printLayer(resultLayer);
}

function test() {
    let testlayers = parseLayers('123456789012', 3, 2);
    printLayer(testlayers[0]);
    console.log(analyzeLayersForPart1(testlayers), 1);

    testlayers = parseLayers('0222112222120000', 2, 2);
    let resultLayer = renderLayers(testlayers, 2, 2);
    printLayer(resultLayer)
}

function parseLayers(input, width, height) {
    let layers = new Array();
    let layerSize = width * height;
    let layerCount = input.length / layerSize;
    for (let l = 0; l < layerCount; l++) {
        let layer = new Array(height);
        for (let x = 0; x < height; x++) {
            layer[x] = new Array(width);
            for (let y = 0; y < width; y++) {
                let pos = (l * layerSize) + ((x * width) + y);
                layer[x][y] = Number(input[pos]);
            }
        }
        layers.push(layer);
    }
    return layers;
}

function analyzeLayersForPart1(layers) {
    let layerFewestZeros = undefined;
    let numFewestZeros = undefined;
    for (let layer of layers) {
        let zeros = countInLayer(layer, 0);
        if (layerFewestZeros == undefined) {
            layerFewestZeros = layer;
            numFewestZeros = zeros;
        } else if (numFewestZeros > zeros) {
            layerFewestZeros = layer;
            numFewestZeros = zeros;
        }
    }
    return countInLayer(layerFewestZeros, 1) * countInLayer(layerFewestZeros, 2);
}

function countInLayer(layer, digit) {
    let count = 0;
    for (let x = 0; x < layer.length; x++) {
        for (let y = 0; y < layer[x].length; y++) {
            if (Number(layer[x][y]) == Number(digit)) {
                count++;
            }
        }
    }
    return count;
}

function renderLayers(layers, width, height) {
    let resultLayer = new Array(height);
    for (let x = 0; x < height; x++) {
        resultLayer[x] = new Array(width);
        for (let y = 0; y < width; y++) {
            for (let l = 0; l < layers.length; l++) {
                if (Number(layers[l][x][y]) != 2) {
                    resultLayer[x][y] = layers[l][x][y];
                    break;
                }
            }
        }
    }
    return resultLayer;
}

function printLayer(layer) {
    let blackZero = '<span style="color:hsl(0, 0%, 100%);background-color:hsl(0, 0%, 0%);">0</span>';
    let whiteOne = '<span style="color:hsl(0, 0%, 0%);background-color:hsl(0, 0%, 100%);">1</span>';
    for (let x = 0; x < layer.length; x++) {
        let layerString = '';
        for (let y = 0; y < layer[x].length; y++) {
            if (layer[x][y] == 0) {
                layerString += blackZero;
            } else {
                layerString += whiteOne;
            }
        }
        //console.log(layerString);
        styledConsoleLog(layerString);
    }
}

/* see comment of 'Hans' https://stackoverflow.com/a/13017382 */
function styledConsoleLog() {
    var argArray = [];

    if (arguments.length) {
        var startTagRe = /<span\s+style=(['"])([^'"]*)\1\s*>/gi;
        var endTagRe = /<\/span>/gi;

        var reResultArray;
        argArray.push(arguments[0].replace(startTagRe, '%c').replace(endTagRe, '%c'));
        while (reResultArray = startTagRe.exec(arguments[0])) {
            argArray.push(reResultArray[2]);
            argArray.push('');
        }

        // pass through subsequent args since chrome dev tools does not (yet) support console.log styling of the following form: console.log('%cBlue!', 'color: blue;', '%cRed!', 'color: red;');
        for (var j = 1; j < arguments.length; j++) {
            argArray.push(arguments[j]);
        }
    }

    console.log.apply(console, argArray);
}
