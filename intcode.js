let debugEnabled = false;
let inputPos = 0;
let relativeBase = 0;

function debug() {
    if (debugEnabled) {
        console.log.apply('', arguments);
    }
}

function error() {
    console.error(arguments);
}

exports.handleIntCode = function (code, input = undefined) {
    relativeBase = 0;
    inputPos = 0;
    for (let i in code) {
        code[i] = Number(code[i]);
    }

    let pos = 0;
    let output = -1;
    do {
        let result = handleOpcode(code, pos, input);
        code = result[0];
        pos += Number(result[1]);
        if (result[2] != undefined) {
            output = result[2];
            if (output == NaN) {
                error("Output is NaN??", code);
            } else if (output != 0 && code[pos] != 99) {
                error("Opcode handling failed? Position:", pos, "Output:", output);
            }
        }
    } while (code[pos] != 99);
    return [code, output];
}

function handleOpcode(code, pos, input) {
    let output = undefined;
    let nextStepSize = 0;

    let opcode = Number(code[pos]);
    let parameterMode = '0';
    let instruction = String(code[pos]);
    if (instruction.length > 2) {
        parameterMode = instruction.substring(0, instruction.length - 2);
        opcode = Number(instruction.substring(instruction.length - 2));
    }
    debug("Opcode:", opcode, "Pos:", pos, "Input:", input === undefined ? 'undefined' : input[inputPos], "Instr.:", instruction, "PM:", parameterMode);

    switch (opcode) {
        case 1:
            opcode1(code, pos, parameterMode);
            nextStepSize = 4;
            break;
        case 2:
            opcode2(code, pos, parameterMode);
            nextStepSize = 4;
            break;
        case 3:
            opcode3(code, pos, input, parameterMode);
            nextStepSize = 2;
            break;
        case 4:
            output = opcode4(code, pos, parameterMode);
            nextStepSize = 2;
            break;
        case 5:
            nextStepSize = opcode5(code, pos, parameterMode);
            break
        case 6:
            nextStepSize = opcode6(code, pos, parameterMode);
            break
        case 7:
            opcode7(code, pos, parameterMode);
            nextStepSize = 4;
            break
        case 8:
            opcode8(code, pos, parameterMode);
            nextStepSize = 4;
            break
        case 9:
            opcode9(code, pos, parameterMode);
            nextStepSize = 2;
            break
        case 99:
            break;
        default:
            console.error("Unknown opcode: ", opcode, "At pos:", pos, code);
            throw "Unknown opcode: " + opcode;
    }
    return [code, nextStepSize, output];
}

function isPositionMode(parameterMode, paramIndex) {
    if (parameterMode.length < paramIndex) {
        return true;
    }
    return parameterMode[parameterMode.length - paramIndex] == '0';
}

function handleParameterMode(code, pos, parameterMode, paramIndex) {
    if (isPositionMode(parameterMode, paramIndex)) {
        return code[code[pos + paramIndex]];
    } else if (parameterMode[parameterMode.length - paramIndex] == '1') {
        // direct mode
        return code[pos + paramIndex];
    } else if (parameterMode[parameterMode.length - paramIndex] == '2') {
        // relative mode
        return code[relativeBase + code[pos + paramIndex]];
    }
}

function writeWithParameterMode(code, pos, input, parameterMode, paramIndex) {
    let param = undefined;
    if (isPositionMode(parameterMode, paramIndex)) {
        param = code[pos + paramIndex];
    } else if (parameterMode[parameterMode.length - paramIndex] == '2') {
        //relative mode
        param = relativeBase + code[pos + paramIndex]
    }

    let val = undefined;
    if (input.constructor === Array) {
        val = Number(input[inputPos]);
        inputPos++;
    } else {
        val = Number(input);
    }
    code[param] = val;
    debug("Wrote:", val, "To pos:", param);
}

function opcode1(code, pos, parameterMode) {
    let valParam1 = handleParameterMode(code, pos, parameterMode, 1);
    let valParam2 = handleParameterMode(code, pos, parameterMode, 2);
    let val = Number(valParam1) + Number(valParam2);
    writeWithParameterMode(code, pos, val, parameterMode, 3);
    debug("Op1", valParam1, valParam2, val);
}

function opcode2(code, pos, parameterMode) {
    let valParam1 = handleParameterMode(code, pos, parameterMode, 1);
    let valParam2 = handleParameterMode(code, pos, parameterMode, 2);;
    let val = Number(valParam1) * Number(valParam2);
    writeWithParameterMode(code, pos, val, parameterMode, 3);
    debug("Op2", valParam1, valParam2, val);
}

function opcode3(code, pos, input, parameterMode) {
    writeWithParameterMode(code, pos, input, parameterMode, 1);
    debug("Op3", input);
}

function opcode4(code, pos, parameterMode) {
    let output = handleParameterMode(code, pos, parameterMode, 1);
    debug("Op4", output);
    return Number(output);
}

function opcode5(code, pos, parameterMode) {
    let valParam1 = handleParameterMode(code, pos, parameterMode, 1);
    let valParam2 = handleParameterMode(code, pos, parameterMode, 2);
    let nextStep = Number(valParam1) != 0 ? Number(valParam2) - pos : 3;
    debug("Op5", valParam1, valParam2, nextStep);
    return Number(nextStep);
}

function opcode6(code, pos, parameterMode) {
    let valParam1 = handleParameterMode(code, pos, parameterMode, 1);
    let valParam2 = handleParameterMode(code, pos, parameterMode, 2);
    let nextStep = Number(valParam1) == 0 ? Number(valParam2) - pos : 3;
    debug("Op6", valParam1, valParam2, nextStep);
    return Number(nextStep);
}

function opcode7(code, pos, parameterMode) {
    let valParam1 = handleParameterMode(code, pos, parameterMode, 1);
    let valParam2 = handleParameterMode(code, pos, parameterMode, 2);
    let val = Number(valParam1) < Number(valParam2) ? 1 : 0;
    writeWithParameterMode(code, pos, val, parameterMode, 3);
    debug("Op7", valParam1, valParam2, val);
}

function opcode8(code, pos, parameterMode) {
    let valParam1 = handleParameterMode(code, pos, parameterMode, 1);
    let valParam2 = handleParameterMode(code, pos, parameterMode, 2);
    let val = Number(valParam1) == Number(valParam2) ? 1 : 0;
    writeWithParameterMode(code, pos, val, parameterMode, 3);
    debug("Op8", valParam1, valParam2, val);
}

function opcode9(code, pos, parameterMode) {
    let valParam1 = handleParameterMode(code, pos, parameterMode, 1);
    relativeBase += valParam1;
    debug("Op9", valParam1, relativeBase);
}