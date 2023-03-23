//Getting all the button
const numBtn = document.querySelectorAll('.black');
const equalBtn = document.getElementById('=');
const operatorBtn = document.querySelectorAll('.gray');
const clearEntry = document.getElementById('ce');
const clearAll = document.getElementById('ac');
const plusMinusBtn = document.getElementById('+/-');

//Getting the display screen
const bottomScreen = document.querySelector('#userInput');
const topScreen = document.querySelector('#inputHistory');
const bottomContainer = document.querySelector('#userInputScreen');

//Boolean to see if the screen need to be reset
let needReset = false;

let firstNumber = "";
let secondNumber = "";
let operators = null;

//Equal button
equalBtn.addEventListener('click', () => setOperation());

//Clear All button
clearAll.addEventListener('click', () => clearScreen());

//clear last entry button
clearEntry.addEventListener('click', () => clearLastEntry());

//Plus Minus button
// plusMinusBtn.addEventListener('click', () => plusMinus());

//Operators button
operatorBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        // printOperators(btn.textContent);
        btn.id === "+/-" ? plusMinus() : printOperators(btn.textContent);
    });
});

//Numbers button
numBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
        btn.id === "." ? printDot() : printNumbers(btn.textContent);
    });
});

//Keyboard listener
window.addEventListener('keydown', keyInput);

//Function to clear everything
function clearScreen() {
    topScreen.textContent = "";
    bottomScreen.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    operators = null;
}

//Function to clear the last entry
function clearLastEntry() {
    if (bottomScreen.textContent === "0") {
        return;
    } else {
        bottomScreen.textContent = bottomScreen.textContent.slice(0, -1);

        if (bottomScreen.textContent === "") {
            bottomScreen.textContent = "0";
        }
    }
}

//Function to print operators
function printOperators(oper) {
    firstNumber = bottomScreen.textContent;
    operators = oper;
    topScreen.textContent = `${firstNumber} ${operators}`;
    needReset = true;
}

//Function to evaluate the current operation
function setOperation() {
    if (operators === "÷" && bottomScreen.textContent === "0") {
        bottomScreen.textContent = "Infinity";
        return;
    } else {
        secondNumber = bottomScreen.textContent;
        bottomScreen.textContent = Math.round(calculate(operators, firstNumber, secondNumber) * 1000) / 1000;
        topScreen.textContent = `${firstNumber} ${operators} ${secondNumber} =`;
        operators = null;
    }
}

//Function to print the number on the screen
function printNumbers(num) {
    if (bottomScreen.textContent === "0" || needReset === true) {
        screenReset();
    } 
    if (maximumInput() === false) {
        bottomScreen.textContent += num;
    }
}

//Function to print the dot
function printDot() {
    if (bottomScreen.textContent.includes(".")) {
        return;
    }

    if (bottomScreen.textContent !== "" && maximumInput() === false) {
        bottomScreen.textContent += ".";
    }
}

//Function to reset the screen
function screenReset() {
    bottomScreen.textContent = "";
    needReset = false;
}

//Function to set a maximum numbers input
function maximumInput() {
    if (bottomScreen.textContent.length >= 10) {
        return true;
    } else {
        return false;
    }
}

//Function to change the number to a negative or positive number
function plusMinus() {
    let num = bottomScreen.textContent;

    if (num > 0) {
        bottomScreen.prepend("-");
    } else if (num < 0) {
        num = num * (-1);
        bottomScreen.textContent = num;
    }
}

//Function to be able to use the keyboard inputs
function keyInput(event) {
    if (event.key >= 0 && event.key <= 9) {
        printNumbers(event.key);
    } else {
        switch (event.key) {
            case ".":
                printDot();
                break;
            case "=":
            case "Enter": {
                setOperation();
                break;
            }
            case "+":
            case "-": {
                printOperators(event.key);
                break;
            }
            case "*":
                printOperators("x");
                break;
            case "/":
                printOperators("÷");
                break;
            case "Backspace":
                clearLastEntry();
                break;
            case "Escape":
                clearScreen();
                break;
        }
    }
}

//Functions to add, substract, multiply and divide
function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

//Function to see which operator the user choose
function calculate(operator, num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return substract(num1, num2);
        case "x":
            return multiply(num1, num2);
        case "÷":
            return divide(num1, num2);
        default:
            return null;
    }
}
