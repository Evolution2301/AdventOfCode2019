var parse = require("./parseInput.js").parseCommaInputFile;
var handleIntCode = require("./intcode.js").handleIntCode;
console.log("Day 5");
//test();
part1();
part2();

function part1() {
    let code = parse("day5");

    let result = handleIntCode(code, 1);

    console.log("Part1:", result[1]);
}

function part2() {
    let code = parse("day5");

    let result = handleIntCode(code, 5);

    console.log("Part2:", result[1]);
}

function test() {
    console.log("Tests:")
    console.log(handleIntCode([3, 0, 4, 0, 99], 123)[1], 123);
    console.log(handleIntCode([1002, 4, 3, 4, 33])[0]);
    console.log(handleIntCode([3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99], 7)[1], 999);
    console.log(handleIntCode([3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99], 8)[1], 1000);
    console.log(handleIntCode([3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99], 9)[1], 1001);
    console.log(handleIntCode([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 123)[1], 1);
    console.log(handleIntCode([3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9], 0)[1], 0);
    console.log(handleIntCode([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 123)[1], 1);
    console.log(handleIntCode([3,3,1105,-1,9,1101,0,0,12,4,12,99,1], 0)[1], 0);
}