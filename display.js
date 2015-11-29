// display class

"use strict"

function Display(maxDigits) {
    
    // init default parameters
    if(typeof maxDigits == 'undefined' || maxDigits < 3) {
        maxDigits = 10;
    }
    
    // calcualte constans for overflow handling
    var highestValue = Math.pow(10, maxDigits) - 1;
    var lowesetValue = highestValue * (-1);
    
    // fetch output DOM-objects
    var domNumber = document.getElementById("number");
    var domError  = document.getElementById("error");
    var domMemory = document.getElementById("memory");
    
    // internal data
    var dispStack = [];
    var fractional = false;
    var negative = false;
    
    // public data
    this.overflow = false;
    this.error = false;
    this.memory = false;
    
    // convert number and put its digits into dispaly stack
    // handle overflow, round and clear trailing zeros
    this.setNumber = function(num) {
        // check sign
        if (num < 0) negative = true;
        else negative = false;
        // push digits to stack
        dispStack = num.toFixed(maxDigits).split('');
        // check fractional
        var pt = dispStack.indexOf('.');
        if (~pt) fractional = true;
        else fractional = false;
        // calcualate max stack length
        var maxLength = maxDigits + fractional + negative;
        if((num > highestValue) || (num < lowesetValue)) {
            // slice to fit max digits constraint
            this.overflow = true;
            if(isFinite(num)) {
                dispStack = dispStack.slice(0, maxLength);
            } else {
                dispStack = highestValue.toString(10).split('');
                if(num < 0) {
                    dispStack.unshift('-');
                }
            }
        } else if(dispStack.length > maxLength) {
            // round visible number
            dispStack = dispStack.slice(0, maxLength + 1); // + 1 digit for rounding
            var modulusLength = dispStack.length - fractional; // without sign
            var lastIndex = dispStack.length - 1;
            var carry = Number(dispStack[lastIndex]) > 4; // carry flag
            for(var i = 1; i < modulusLength; i++) {
                var idx = lastIndex - i;
                if(idx == pt) continue; // skip point
                var val = Number(dispStack[idx]) + carry;
                if(val < 10) {
                    dispStack[idx] = val.toString();
                    break;
                } else {
                    dispStack[idx] = '0';
                }
            }
            dispStack.pop(); // pop rounding digit
            // for fractional - clear trailing zeros (if there are)
            if(fractional) {
                var fracLength = dispStack.length - pt;
                lastIndex = dispStack.length - 1;
                for(var i = 0; i < fracLength; i++) {
                    idx = lastIndex - i;
                    if((dispStack[idx] == '0') || (dispStack[idx] == '.')) {
                        dispStack.pop();
                    } else break;
                }
            }
        }
    };
    
    // clear number data
    this.clearNumber = function(update) {
        dispStack.length = 0;
        fractional = false;
        negative = false;
    };
    
    // fetch stack values and convert it into number
    // return converted value
    this.getNumber = function() {
        if (dispStack.length) {
            var str = dispStack.join('');
            if (fractional) {
                return parseFloat(str);
            } else {
                return parseInt(str);
            }
        } else {
            return 0;
        }
    };

    // add digit to the end of the number
    this.pushDigit = function(digit) {
        // eliminate zero fill
        if(digit != '0' || dispStack.length) {
            // add sign for negative number
            if(negative && dispStack.length == 0) {
                dispStack.push('-');
            }
            // put digits into the stack until size not excide max length
            if (dispStack.length < maxDigits + fractional + negative) {
                dispStack.push(digit);
            }
        }
    };

    // clear last number digit
    this.backspace = function() {
        switch(dispStack.length) {
            case 0:
                // nothing to do here
                break;
            case 2:
                if(negative) {
                    dispStack.pop();
                }
            default:
                dispStack.pop();
                break;
        }
    };
    
    // add decimal point at the end of the number
    this.setPoint = function() {
        // one point per number
        if (fractional == false) {
            // set flag
            fractional = true;
            // check if there are no digits
            if (dispStack.length == 0) {
                if(negative) {
                    // push sign
                    dispStack.push('-');
                }
                // push zero before decimal point
                dispStack.push('0');
            }
            // if there are place for at least one additional digit
            if (dispStack.length < maxDigits + negative) {
                // add point
                dispStack.push('.');
            }
        }
    };
    
    // change sign of the number to opposite
    this.switchSign = function() {
        if(negative) {
            negative = false;
            if(dispStack.length) {
                dispStack.shift();
            }
        } else {
            negative = true;
            if(dispStack.length) {
                dispStack.unshift('-');
            }
        }
    };
    
    // transfer dispaly state to the DOM-elements
    this.update = function() {
        // update number
        if (dispStack.length) {
            domNumber.innerHTML = dispStack.join('');
        } else {
            domNumber.innerHTML = '0';
        }
        // update memory label
        if(this.memory) {
            domMemory.innerHTML = "memory";
        } else {
            domMemory.innerHTML = "";
        }
        // update error label
        if(this.error) {
            domError.innerHTML = "error";
        } else if(this.overflow) {
            domError.innerHTML = "overflow";
        } else {
            domError.innerHTML = "";
        }
    };
}
