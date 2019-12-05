let debugEnabled = false;

function debug() {
    if (debugEnabled) {
        console.log(arguments);
    }
}

exports.handleIntCode = function (code, input = undefined) {
    for (let i in code) {
        code[i] = Number(code[i]);
    }

    let pos = 0;
    let output = -1;
    do {
        let result = handleOpcode(code, pos, input);
        code = result[0];
        if (result[2] != undefined) {
            output = result[2];
            if (output != 0) {
                debug("Opcode handling failed? Position:", pos);
            }
        }
        pos += Number(result[1]);
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
    debug(pos, input, instruction, parameterMode, opcode);

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
        case 99:
            break;
        default:
            console.error("Unknown opcode: ", opcode, "At pos:", pos, code);
            throw "Unknown opcode: " + opcode;
    }
    debug("Opcode: ", opcode, input);
    return [code, nextStepSize, output];
}

function isPositionMode(parameterMode, paramIndex) {
    if (parameterMode.length < paramIndex) {
        return true;
    }
    return parameterMode[parameterMode.length - paramIndex] == '0';
}

function opcode1(code, pos, parameterMode) {
    let valParam1 = isPositionMode(parameterMode, 1) ? code[code[pos + 1]] : code[pos + 1];
    let valParam2 = isPositionMode(parameterMode, 2) ? code[code[pos + 2]] : code[pos + 2];
    let posParam3 = code[pos + 3];
    code[posParam3] = Number(valParam1) + Number(valParam2);
    debug("Op1", valParam1, valParam2, posParam3, code[posParam3]);
}

function opcode2(code, pos, parameterMode) {
    let valParam1 = isPositionMode(parameterMode, 1) ? code[code[pos + 1]] : code[pos + 1];
    let valParam2 = isPositionMode(parameterMode, 2) ? code[code[pos + 2]] : code[pos + 2];
    let posParam3 = code[pos + 3];
    code[posParam3] = Number(valParam1) * Number(valParam2);
    debug("Op2", valParam1, valParam2, posParam3, code[posParam3]);
}

function opcode3(code, pos, input, parameterMode) {
    let param1 = code[pos + 1];
    code[param1] = Number(input);
    debug("Op3", param1, input, code[param1]);
}

function opcode4(code, pos, parameterMode) {
    let param1 = code[pos + 1];
    let output = isPositionMode(parameterMode, 1) ? code[param1] : param1;
    debug("Op4", param1, output);
    return Number(output);
}

function opcode5(code, pos, parameterMode) {
    let valParam1 = isPositionMode(parameterMode, 1) ? code[code[pos + 1]] : code[pos + 1];
    let valParam2 = isPositionMode(parameterMode, 2) ? code[code[pos + 2]] : code[pos + 2];
    let nextStep = Number(valParam1) != 0 ? Number(valParam2) - pos : 3;
    debug("Op5", valParam1, valParam2, nextStep);
    return Number(nextStep);
}

function opcode6(code, pos, parameterMode) {
    let valParam1 = isPositionMode(parameterMode, 1) ? code[code[pos + 1]] : code[pos + 1];
    let valParam2 = isPositionMode(parameterMode, 2) ? code[code[pos + 2]] : code[pos + 2];
    let nextStep = Number(valParam1) == 0 ? Number(valParam2) - pos : 3;
    debug("Op6", valParam1, valParam2, nextStep);
    return Number(nextStep);
}

function opcode7(code, pos, parameterMode) {
    let valParam1 = isPositionMode(parameterMode, 1) ? code[code[pos + 1]] : code[pos + 1];
    let valParam2 = isPositionMode(parameterMode, 2) ? code[code[pos + 2]] : code[pos + 2];
    let posParam3 = code[pos + 3];
    code[posParam3] = Number(valParam1) < Number(valParam2) ? 1 : 0;
    debug("Op7", valParam1, valParam2, posParam3, code[posParam3]);
}

function opcode8(code, pos, parameterMode) {
    let valParam1 = isPositionMode(parameterMode, 1) ? code[code[pos + 1]] : code[pos + 1];
    let valParam2 = isPositionMode(parameterMode, 2) ? code[code[pos + 2]] : code[pos + 2];
    let posParam3 = code[pos + 3];
    code[posParam3] = Number(valParam1) == Number(valParam2) ? 1 : 0;
    debug("Op8", valParam1, valParam2, posParam3, code[posParam3]);
}