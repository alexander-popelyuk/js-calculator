// main script file

"use strict"

// start after all files are loaded
window.onload = InitCalculator;

// startup initialization
function InitCalculator() {

    // create calculator object
    window.calc = {};
    
    // create components
    calc.input = new Input(inputHandler);
    calc.display = new Display(10);
    calc.engine = new Engine();

    // internal data
    var exprDone = true;
    var inputDone = true;
    var newInput = true;
    var memoryStorage = 0;
    
    // proc input events
    function inputHandler(ev) {
        // block on error
        if ((calc.engine.error || calc.display.overflow) && (ev != 'Reset')) return;
        // handle event
        switch(ev)
        {
        case 'Reset':
            calc.display.clearNumber();
            calc.display.error = false;
            calc.display.overflow = false;
            calc.display.update();
            calc.engine.runCommand("Reset");
            exprDone = true;
            inputDone = true;
            newInput = true;
            break;
        case 'Backspace':
            if(!inputDone) {
                calc.display.backspace();
                calc.display.update();
            }
            break;
        case 'Sign':
            calc.display.switchSign();
            calc.display.update();
            break;
        case 'MemAdd':
            memoryStorage += calc.display.getNumber();
            calc.display.memory = memoryStorage?true:false;
            calc.display.update();
            inputDone = true;
            break;
        case 'MemSub':
            memoryStorage -= calc.display.getNumber();
            calc.display.memory = memoryStorage?true:false;
            calc.display.update();
            inputDone = true;
            break;
        case 'MemRead':
            if(memoryStorage) {
                calc.display.setNumber(memoryStorage);
                calc.display.update();
                inputDone = true;
                newInput = true;
            }
            break;
        case 'MemClear':
            memoryStorage = 0;
            calc.display.memory = false;
            calc.display.update();
            break;
        case 'Add':
        case 'Subtract':
        case 'Multiply':
        case 'Divide':
        case 'Sqrt':
        case 'Rate':
        case 'Result':
            if(newInput) {
                var operand = calc.display.getNumber();
                calc.engine.addOperand(operand);
            }
            var result = calc.engine.runCommand(ev);
            if(isNaN(result)) {
                if(ev == 'Result') {
                    calc.display.error = true;
                    calc.display.update();
                }
            } else {
                if(ev == 'Result') {
                    calc.engine.runCommand("Reset");
                    exprDone = true;
                    newInput = true;
                }
                calc.display.setNumber(result);
                calc.display.update();
            }
            if(ev != 'Result') {
                newInput = false;
            }
            inputDone = true;
            break;
        default: // '.' '0-9'
            if(inputDone) {
                calc.display.clearNumber();
                inputDone = false;
                exprDone = false;
            }
            if(ev == '.') {
                calc.display.setPoint();
            } else {
                calc.display.pushDigit(ev);
            }
            calc.display.update();
            newInput = true;
            break;
        }
    }
}
