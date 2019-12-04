var parse = require("./parseInput.js").readFileInput;
console.log("Day 4");
//test();
part1();
part2();

function part1() {
    let input = parse("day4").split("-");
    let start = Number(input[0]);
    let end = Number(input[1]);
    let validOnes = 0;
    for (; start < end; start++) {
        if (valueMatchesCriteria(start)) {
            validOnes++;
        }
    }

    console.log("Part1:", validOnes);
}

function part2() {
    let input = parse("day4").split("-");
    let start = Number(input[0]);
    let end = Number(input[1]);
    let validOnes = 0;
    for (; start < end; start++) {
        if (valueMatchesCriteria(start, true)) {
            validOnes++;
        }
    }

    console.log("Part2:", validOnes);
}

function test() {
    console.log("111111", valueMatchesCriteria("111111"), true);
    console.log("223450", valueMatchesCriteria("223450"), false);
    console.log("123789", valueMatchesCriteria("123789"), false);
    console.log("122345", valueMatchesCriteria("122345"), true);
    console.log("111123", valueMatchesCriteria("111123"), true);
    console.log("135679", valueMatchesCriteria("135679"), false);

    console.log("Part2 Tests");
    console.log("112233", valueMatchesCriteria("112233", true), true);
    console.log("123444", valueMatchesCriteria("123444", true), false);
    console.log("111122", valueMatchesCriteria("111122", true), true);
    console.log("225555", valueMatchesCriteria("225555", true), true);
    console.log("255577", valueMatchesCriteria("255577", true), true);
    console.log("255567", valueMatchesCriteria("255567", true), false);
    console.log("158888", valueMatchesCriteria("158888", true), false);
    console.log("111111", valueMatchesCriteria("111111", true), false);
}

function valueMatchesCriteria(value, checkMoreThanDouble = false) {
    let val = String(value);
    if (val.length != 6 || (Number(val[0]) > Number(val[val.length - 1]))) {
        return false;
    }

    let hasDouble = false;
    let notDecreasing = true;
    let lastDigit;
    let digitCounter = 1;
    let doubleDigit;

    for (let i = 0; i < val.length && notDecreasing; i++) {
        if (Number(lastDigit) > Number(val[i])) {
            notDecreasing = false;
        }
        if (lastDigit == val[i]) {
            digitCounter++;
            if (digitCounter == 2 && !hasDouble) {
                doubleDigit = val[i];
                hasDouble = true;
            } else if (checkMoreThanDouble && digitCounter > 2 && doubleDigit == val[i]) {
                doubleDigit = undefined;
                hasDouble = false;
            }
        } else {
            digitCounter = 1;
        }
        lastDigit = val[i];
    }

    return hasDouble && notDecreasing;
}