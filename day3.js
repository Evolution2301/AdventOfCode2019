var parseFile = require("./parseInput.js").parseNewlineInputFile,
    parseInput = require("./parseInput.js").parseCommaInput;
console.log("Day 3");
part1();
part2();

function part1() {
    let inputLines = parseFile("day3");
    let wires = [];
    for (let i in inputLines) {
        wires[i] = calculateWirePositions(inputLines[i]);
    }
    //console.log(wires);

    let wire1Set = new Set(wires[1]);
    let crossings = [];
    for (let i in wires[0]) {
        if (wire1Set.has(wires[0][i]) && wires[0][i] != '0,0') {
            crossings.push(wires[0][i]);
        }
    }
    //console.log("Crossings:", crossings);

    let minManhattanDistance = 0;
    for (let i in crossings) {
        let md = calculateManhattanDistance(crossings[i]);
        if (minManhattanDistance == 0 || minManhattanDistance > md) {
            minManhattanDistance = md;
        }
    }

    console.log("Part1:", minManhattanDistance);
}

function part2() {
    let inputLines = parseFile("day3");
    let wires = [];
    for (let i in inputLines) {
        wires[i] = calculateWirePositions(inputLines[i]);
    }
    //console.log(wires);

    let wire1Set = new Set(wires[1]);
    let crossings = [];
    for (let i in wires[0]) {
        if (wire1Set.has(wires[0][i]) && wires[0][i] != '0,0') {
            crossings.push(wires[0][i]);
        }
    }
    //console.log("Crossings:", crossings);

    let minSteps = 0;
    for (let i in crossings) {
        let steps0 = countSteps(crossings[i], wires[0]);
        let steps1 = countSteps(crossings[i], wires[1]);
        let steps = steps0 + steps1;
        if (minSteps == 0 || minSteps > steps) {
            minSteps = steps;
        }
        //console.log(crossings[i], steps0, steps1, steps, minSteps);
    }

    console.log("Part2:", minSteps);
}

function calculateManhattanDistance(position) {
    let coords = position.split(',');
    return Math.abs(coords[0]) + Math.abs(coords[1]);
}

function calculateWirePositions(inputLine) {
    let wireMoves = parseInput(inputLine);
    let positions = ['0,0'];
    let currentX = 0;
    let currentY = 0;
    for (let i in wireMoves) {
        let move = wireMoves[i];
        let direction = move.substring(0, 1);
        let value = Number(move.substring(1));
        switch (direction) {
            case 'U':
                for (let y = 1; y <= value; y++) {
                    currentY++;
                    positions.push(currentX + ',' + currentY);
                }
                break;
            case 'D':
                for (let y = 1; y <= value; y++) {
                    currentY--;
                    positions.push(currentX + ',' + currentY);
                }
                break;
            case 'R':
                for (let x = 1; x <= value; x++) {
                    currentX++;
                    positions.push(currentX + ',' + currentY);
                }
                break;
            case 'L':
                for (let x = 1; x <= value; x++) {
                    currentX--;
                    positions.push(currentX + ',' + currentY);
                }
                break;
        }
    }
    return positions;
}

function countSteps(crossing, wirePositions) {
    for (let i = 0; i < wirePositions.length; i++) {
        if (crossing == wirePositions[i]) {
            return i;
        }
    }
    return -1;
}