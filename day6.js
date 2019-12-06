var parse = require("./parseInput.js").parseNewlineInputFile;
console.log("Day 6");
//test();
part1();
part2();

function part1() {
    let orbits = parse("day6");
    let orbitMap = parseOrbits(orbits);

    console.log("Part1:", countOrbits(orbitMap));
}

function part2() {
    let orbits = parse("day6");
    let orbitMap = parseOrbits(orbits);
    let ol1 = createOrbitLine(orbitMap, 'YOU', new Array());
    let ol2 = createOrbitLine(orbitMap, 'SAN', new Array());

    console.log("Part2:", transferOrbitPath(ol1, ol2));
}

function test() {
    let testOrbits = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L'];
    let testOrbitMap = parseOrbits(testOrbits);
    console.log(testOrbitMap);
    console.log(countOrbits(testOrbitMap));

    testOrbits = ['COM)B', 'B)C', 'C)D', 'D)E', 'E)F', 'B)G', 'G)H', 'D)I', 'E)J', 'J)K', 'K)L', 'K)YOU', 'I)SAN'];
    testOrbitMap = parseOrbits(testOrbits);
    let ol1 = createOrbitLine(testOrbitMap, 'YOU', new Array());
    let ol2 = createOrbitLine(testOrbitMap, 'SAN', new Array());
    console.log(transferOrbitPath(ol1, ol2), ol1, ol2);
}

function parseOrbits(orbits) {
    let orbitMap = new Map();
    orbits.forEach(val => {
        //console.log(val);
        let orbit = String(val).split(')');
        if (orbitMap.has(orbit[0])) {
            orbitMap.get(orbit[0]).add(orbit[1]);
        } else {
            let orbitedBy = new Set()
            orbitedBy.add(orbit[1]);
            orbitMap.set(orbit[0], orbitedBy);
        }
    });
    return orbitMap;
}

function countOrbits(orbitMap) {
    return recurseCount(orbitMap, 'COM');
}

function recurseCount(orbitMap, key, depth = 1) {
    let internalMap = new Map(orbitMap);
    if (!internalMap.has(key)) {
        return 0;
    }

    let subOrbits = new Set(internalMap.get(key));
    let subOrbitCount = subOrbits.size * depth;
    subOrbits.forEach(val => {
        subOrbitCount += recurseCount(internalMap, val, depth + 1);
    });
    return subOrbitCount;
}

function createOrbitLine(orbitMap, target, line) {
    let parent = findParent(orbitMap, target);
    if (parent == undefined) {
        return line.reverse();
    }
    line.push(parent);
    return createOrbitLine(orbitMap, parent, line);
}

function findParent(orbitMap, target) {
    let internalMap = new Map(orbitMap);
    for (let key of internalMap.keys()) {
        if (new Set(internalMap.get(key)).has(target)) {
            return key;
        }
    }
    return undefined;
}

function transferOrbitPath(orbitLine0, orbitLine1) {
    let tempLine0 = orbitLine0.slice();
    let tempLine1 = orbitLine1.slice();
    orbitLine0 = orbitLine0.filter((el) => !tempLine1.includes(el));
    orbitLine1 = orbitLine1.filter((el) => !tempLine0.includes(el));
    return orbitLine0.length + orbitLine1.length;
}