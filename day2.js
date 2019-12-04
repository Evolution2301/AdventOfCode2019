var parse = require("./parseInput.js").parseCommaInputFile;
console.log("Day 2");
part1();
part2();

function part1() {
    //let input = parse("day2Test");
    let input = parse("day2");
    for (var i in input) {
        input[i] = Number(input[i]);
    }
    //console.log("Input: ", input);
    input[1] = 12;
    input[2] = 2;
    input = handleInputCode(input);

    console.log("Part1:", input[0]);
}

function part2() {
    let input = parse("day2");
    for (var i in input) {
        input[i] = Number(input[i]);
    }

    let targetOutput = 19690720;
    let noun = 0;
    let verb = 0;
    let breakLoop = false;

    for (; noun < 100; noun++) {
        for (; verb < 100; verb++) {
            let tempInput = input.slice();
            tempInput[1] = noun;
            tempInput[2] = verb;
            tempInput = handleInputCode(tempInput);
            //console.log(noun, verb, tempInput[0]);
            if (tempInput[0] == targetOutput) {
                breakLoop = true;
                break;
            }
        }
        if (!breakLoop) {
            verb = 0;
        } else {
            break;
        }
    }

    let result = noun * 100 + verb;
    console.log("Part2:", result)
}

function handleInputCode(input) {
    let pos = 0;
    do {
        input = handleOpcode(input, pos);
        pos += 4;
    } while (input[pos] != 99);
    return input;
}

function handleOpcode(input, pos) {
    let opcode = input[pos];
    let var1 = input[pos + 1];
    let var2 = input[pos + 2];
    let targetPos = input[pos + 3];
    switch (opcode) {
        case 1:
            input[targetPos] = input[var1] + input[var2];
            break;
        case 2:
            input[targetPos] = input[var1] * input[var2];
            break;
        case 99:
            break;
    }
    //    console.log("Opcode: ", opcode, input);
    return input;
}