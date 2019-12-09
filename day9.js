var parse = require("./parseInput.js").parseCommaInputFile;
var handleIntCode = require("./intcode.js").handleIntCode;
console.log("Day 9");
//test();
part1();
part2();

function part1() {
    let input = parse("day9");
    let boostCode = handleIntCode(input, 1)[1];

    console.log("Part1:", boostCode);
}

function part2() {
    let input = parse("day9");
    let distressCoords = handleIntCode(input, 2)[1];

    console.log("Part2:", distressCoords);
}

function test() {
    console.log(handleIntCode([104, 1125899906842624, 99])[1] == 1125899906842624);
    console.log(String(handleIntCode([1102, 34915192, 34915192, 7, 4, 7, 99, 0])[1]).length == 16);
    console.log(handleIntCode([109, 200, 203, 0, 204, 0, 99], 10)[1] == 10);
}