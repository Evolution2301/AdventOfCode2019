var parse = require("./parseInput.js").parseNewlineInput;
console.log("Day 1");
day1Part1();
day1Part2();

function calculateFuel(mass) {
    let temp = Math.floor(mass / 3);
    //console.log(mass, temp, (temp-2));
    return (temp - 2);
}

function day1Part1() {
    let shipModules = parse("day1");
    //console.log(shipModules);
    let sum = 0;
    for (var i in shipModules) {
        sum += calculateFuel(Number(shipModules[i]));
    }
    console.log("Part1:", sum);
}


function calculateRequiredFuel(startingMass) {
    let additionalFuel = calculateFuel(startingMass);
    //console.log(startingMass, additionalFuel);
    let mass = 0;
    do {
        mass += additionalFuel;
        additionalFuel = calculateFuel(additionalFuel);
    } while (additionalFuel > 0);
    //console.log(startingMass, mass);
    return mass;
}

function day1Part2() {
    let shipModules = parse("day1");
    //console.log(shipModules);
    let sum = 0;
    for (var i in shipModules) {
        sum += calculateRequiredFuel(Number(shipModules[i]));
    }
    console.log("Part2:", sum);
}