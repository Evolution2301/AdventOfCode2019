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

    let crossings = [];
    for (let i in wires[0]) {
        let found = wires[1].find(val => positionsIdentical(val, wires[0][i]));
        if (found !== undefined) {
            //console.log("Crossing:", found);
            crossings.push(found);
        }
    }

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

    let crossings = [];
    for (let i in wires[0]) {
        let found = wires[1].find(val => positionsIdentical(val, wires[0][i]));
        if (found !== undefined) {
            //console.log("Crossing:", found);
            crossings.push(found);
        }
    }

    let minSteps = 0;
    for (let i in crossings) {
        let steps0 = countSteps(crossings[i], wires[0]);
        let steps1 = countSteps(crossings[i], wires[1]);
        let steps = steps0 + steps1;
        if (minSteps == 0 || minSteps > steps) {
            minSteps = steps;
        }
    }

    console.log("Part2:");
}

function calculateManhattanDistance(position) {
    return Math.abs(position[0]) + Math.abs(position[1]);
}

function calculateWirePositions(inputLine) {
    let wireMoves = parseInput(inputLine);
    let positions = [];
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
                    positions.push([currentX, currentY]);
                }
                break;
            case 'D':
                for (let y = 1; y <= value; y++) {
                    currentY--;
                    positions.push([currentX, currentY]);
                }
                break;
            case 'R':
                for (let x = 1; x <= value; x++) {
                    currentX++;
                    positions.push([currentX, currentY]);
                }
                break;
            case 'L':
                for (let x = 1; x <= value; x++) {
                    currentX--;
                    positions.push([currentX, currentY]);
                }
                break;
        }
    }
    return positions;
}

function positionsIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function countSteps(crossing, wirePositions) {
    let steps = [];
    for(let i = 0; i < wirePositions.length && !positionsIdentical(crossing, wirePositions[i]);i++){
        
    }
}