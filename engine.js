// calculation engine

"use strict"

function Engine() {

    // save context
    var engine = this;
    
    // internal data
    var pri = { // operation priority
        "Add"      : 0,
        "Subtract" : 0,
        "Multiply" : 1,
        "Divide"   : 1,
        "Sqrt"     : 2,
        "Result"   : 0
    };
    var cnt = { // operand count
        "Add"      : 2,
        "Subtract" : 2,
        "Multiply" : 2,
        "Divide"   : 2,
        "Sqrt"     : 1,
        "Result"   : 1
    };
    var valStack = [];
    var cmdStack = [];
    var replaceCmd = false;

    // public data
    this.error = false;

    // add new operand
    this.addOperand = function(operand) {
        valStack.push(operand);
        replaceCmd = false;
    };

    // run a command by its name
    // return result for a command
    this.runCommand = function(cmd) {
        // analyze command
        switch (cmd)
        {
        case 'Add':
        case 'Subtract':
        case 'Multiply':
        case 'Divide':
        case 'Sqrt':
            if(replaceCmd) {
                cmdStack.pop(); // replace last command
            }
            simplify(cmd);
            if(cnt[cmd] > 1) {
                replaceCmd = true;
            } else {
                replaceCmd = false;
            }
            return getTop(valStack); 
        case "Result":
            if(replaceCmd) {
                cmdStack.pop(); // replace last command
            }
            simplify(cmd);
            replaceCmd = false;
            if(this.error || cmdStack.length || valStack.length > 1) {
                this.error = true;
                return NaN;
            } else {
                return getTop(valStack); 
            }
        case "Reset":
            this.error = false;
            valStack.length = 0;
            cmdStack.length = 0;
            replaceCmd = false;
            return 0;
        default:
            this.error = true;
            return NaN;
        }
    };
    
    // try to do calculation
    function simplify(newCmd) {
        // get last operation priority
        var lastPri = cmdStack.length && pri[getTop(cmdStack)];
        if(lastPri < pri[newCmd]) {
            // we can't run last command
            cmdStack.push(newCmd);
        } else {
            // consider which command to use (1,2):
            var curCmd, pending;
            if(cmdStack.length) {// (1) stack cmd
                // not enough operands
                if(valStack.length < cnt[getTop(cmdStack)]) {
                    // error
                    engine.error = true;
                    return;
                }
                curCmd = cmdStack.pop();
                pending = true;
            } else { // (2) new cmd
                // do not have enough operands
                if(valStack.length < cnt[newCmd]) {
                    // maybe will got it later ...
                    cmdStack.push(newCmd);
                    // stop processing for now
                    return;
                }
                curCmd = newCmd;
                pending = false;
            }
            var curCnt = cnt[curCmd];
            var operands = [];
            for(curCnt--; curCnt > -1; curCnt--) {
                var val = valStack.pop();
                operands[curCnt] = val;
            }
            valStack.push(calculate(curCmd, operands));
            if(pending) simplify(newCmd);
        }
    }

    // return stack top
    function getTop(arr) {
        return arr[arr.length - 1];
    }

    // apply cmd to opperands
    function calculate(cmd, operand) {
        // choose an action
        switch (cmd)
        {
        case "Add":
            return operand[0] + operand[1];
        case "Subtract":
            return operand[0] - operand[1];
        case "Multiply":
            return operand[0] * operand[1];
        case "Divide":
            return operand[0] / operand[1];
        case "Sqrt":
            return Math.sqrt(operand[0]);
        case "Result":
            return operand[0];
        }
    }
}
