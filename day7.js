var parse = require("./parseInput.js").parseCommaInputFile;
var handleIntCode = require("./intcode.js").handleIntCode;
console.log("Day 7");
test();
part1();
part2();

function part1() {
    let maxResult = 0;
    let maxPhases = [];

    let input = parse("day7");
    for (let p1 = 0; p1 < 5; p1++) {
        for (let p2 = 0; p2 < 5; p2++) {
            if (p2 == p1) {
                continue;
            }
            for (let p3 = 0; p3 < 5; p3++) {
                if (p3 == p2 || p3 == p1) {
                    continue;
                }
                for (let p4 = 0; p4 < 5; p4++) {
                    if (p4 == p3 || p4 == p2 || p4 == p1) {
                        continue;
                    }
                    for (let p5 = 0; p5 < 5; p5++) {
                        if (p5 == p4 || p5 == p3 || p5 == p2 || p5 == p1) {
                            continue;
                        }
                        let phases = [p1, p2, p3, p4, p5];
                        let result = runPhases(input, phases);
                        if (result > maxResult) {
                            maxResult = result;
                            maxPhases = phases;
                        }
                    }
                }
            }
        }
    }

    console.log("Part1:", maxResult, maxPhases);
}

function part2() {

    console.log("Part2:");
}

function test() {
    console.log('Tests:')
    let testCode = [3, 15, 3, 16, 1002, 16, 10, 16, 1, 16, 15, 15, 4, 15, 99, 0, 0];
    let testPhases = [4, 3, 2, 1, 0];
    console.log('43210', runPhases(testCode, testPhases));
    testCode = [3, 23, 3, 24, 1002, 24, 10, 24, 1002, 23, -1, 23, 101, 5, 23, 23, 1, 24, 23, 23, 4, 23, 99, 0, 0];
    testPhases = [0, 1, 2, 3, 4];
    console.log('54321', runPhases(testCode, testPhases));
    testCode = [3, 31, 3, 32, 1002, 32, 10, 32, 1001, 31, -2, 31, 1007, 31, 0, 33, 1002, 33, 7, 33, 1, 33, 31, 31, 1, 32, 31, 31, 4, 31, 99, 0, 0, 0];
    testPhases = [1, 0, 4, 3, 2];
    console.log('65210', runPhases(testCode, testPhases));
}

function runPhases(code, phases) {
    let outA = handleIntCode(code, [phases[0], 0]);
    let outB = handleIntCode(code, [phases[1], outA[1]]);
    let outC = handleIntCode(code, [phases[2], outB[1]]);
    let outD = handleIntCode(code, [phases[3], outC[1]]);
    let outE = handleIntCode(code, [phases[4], outD[1]]);
    return outE[1];
}