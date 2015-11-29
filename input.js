// input handling

"use strict"


function Input(eventHandler) {
    // set default handler
    eventHandler = eventHandler || function(x) {
        console.log(x);
    };
    // codes for used keyboard keys
    var KeyCode = {
        Backspace : 8,
        Enter     : 13,
        Escape    : 27,
        Numpad0   : 96,
        Numpad1   : 97,
        Numpad2   : 98,
        Numpad3   : 99,
        Numpad4   : 100,
        Numpad5   : 101,
        Numpad6   : 102,
        Numpad7   : 103,
        Numpad8   : 104,
        Numpad9   : 105,
        Multiply  : 106,
        Add       : 107,
        Subtract  : 109,
        Point     : 110,
        Divide    : 111
    };
    
    // fetch buttons objects from DOM
    var buttons = document.getElementsByClassName("button");
    // set click event handler for each button
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            buttonHandler(this.id);
        }
    }

    // set key down event handler
    document.onkeydown = function(event) {
        keyHandler(event.keyCode);
        if (event.keyCode === KeyCode.Backspace)
            event.preventDefault();
    };

    // convert button id to input event
    function buttonHandler(buttonId) {
        switch (buttonId) {
        case "memory-add":
            eventHandler('MemAdd');
            break;
        case "digit-7":
            eventHandler('7');
            break;
        case "digit-8":
            eventHandler('8');
            break;
        case "digit-9":
            eventHandler('9');
            break;
        case "plus-sign":
            eventHandler('Add');
            break;
        case "minus-sign":
            eventHandler('Subtract');
            break;
        case "memory-subtract":
            eventHandler('MemSub');
            break;
        case "digit-4":
            eventHandler('4');
            break;
        case "digit-5":
            eventHandler('5');
            break;
        case "digit-6":
            eventHandler('6');
            break;
        case "multiple-sign":
            eventHandler('Multiply');
            break;
        case "divide-sign":
            eventHandler('Divide');
            break;
        case "memory-read":
            eventHandler('MemRead');
            break;
        case "digit-1":
            eventHandler('1');
            break;
        case "digit-2":
            eventHandler('2');
            break;
        case "digit-3":
            eventHandler('3');
            break;
        case "square-root":
            eventHandler('Sqrt');
            break;
        case "minus-plus":
            eventHandler('Sign');
            break;
        case "memory-clear":
            eventHandler('MemClear');
            break;
        case "point-sign":
            eventHandler('.');
            break;
        case "digit-0":
            eventHandler('0');
            break;
        case "clear":
            eventHandler('Reset');
            break;
        case "backspace":
            eventHandler('Backspace');
            break;
        case "equal-sign":
            eventHandler('Result');
            break;
        }
    }

    // convert key code to input event
    function keyHandler(keyCode) {
        switch (keyCode) {
        case KeyCode.Backspace:
            eventHandler('Backspace');
            break;
        case KeyCode.Enter:
            eventHandler('Result');
            break;
        case KeyCode.Escape:
            eventHandler('Reset');
            break;
        case KeyCode.Numpad0:
            eventHandler('0');
            break;
        case KeyCode.Numpad1:
            eventHandler('1');
            break;
        case KeyCode.Numpad2:
            eventHandler('2');
            break;
        case KeyCode.Numpad3:
            eventHandler('3');
            break;
        case KeyCode.Numpad4:
            eventHandler('4');
            break;
        case KeyCode.Numpad5:
            eventHandler('5');
            break;
        case KeyCode.Numpad6:
            eventHandler('6');
            break;
        case KeyCode.Numpad7:
            eventHandler('7');
            break;
        case KeyCode.Numpad8:
            eventHandler('8');
            break;
        case KeyCode.Numpad9:
            eventHandler('9');
            break;
        case KeyCode.Multiply:
            eventHandler('Multiply');
            break;
        case KeyCode.Add:
            eventHandler('Add');
            break;
        case KeyCode.Subtract:
            eventHandler('Subtract');
            break;
        case KeyCode.Point:
            eventHandler('.');
            break;
        case KeyCode.Divide:
            eventHandler('Divide');
            break;
        }
    }
}
