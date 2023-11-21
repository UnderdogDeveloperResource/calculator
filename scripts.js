let leftOperand = '';
let rightOperand = '';
let operator = '';

const validOperators = ['/', '*', '-', '+'];

initialize();

function initialize() {
    // Hookup keypad buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        btn.addEventListener('click', processKeypadInput);
    })    

    const btnSubmit = document.querySelector('.submit');
    btnSubmit.addEventListener('click', _ => { 
        try {            
            if(canOperate()) {
                operate(leftOperand, rightOperand, operator);            
            }
        }
        catch(error) {
            const display = document.querySelector('.display');
            display.textContent = "ERROR";
        }
    });
}

function processKeypadInput(event) {
    const display = document.querySelector('.display');
    if(display.textContent === "ERROR") {
        clear();
    }

    const btn = event.target;
    var input = btn.textContent;

    // Handle numeric input
    if(!isNaN(input) || input === '.') {
        processNumpadInput(input);
    }
    // Handle operator selection    
    else if(validOperators.includes(input)) {
        if(leftOperand) {
            if(operator.length > 0) {
                // Handle calculation strings
                const submit = document.querySelector('.submit');
                submit.dispatchEvent(new Event('click'));
            }
            operator = input;
            updateDisplay();
        }
    }    
    else if(input === 'C') {
        clear();
    }
    else if(input === 'Del') {
        deleteLastInput();
    }    
}

function processNumpadInput(num) {        
    if(!leftOperand || !operator) {
        leftOperand += String(num);
    }
    else {
        rightOperand += String(num);
    }

    updateDisplay();
}

function updateDisplay(content = null) {
    const display = document.querySelector('.display');
    if(content) {
        display.textContent = content;
    }
    else {
        
        display.textContent = `${leftOperand ?? '0'}${operator ?? ''}${rightOperand ?? ''}`;
    }
}


function clear() {
    leftOperand = '';
    rightOperand = '';
    operator = '';
    
    const display = document.querySelector('.display');
    if(display) {
        display.textContent = '0';
    }
}

function deleteLastInput() {
    const display = document.querySelector('.display');    
    let newDisplayText = '';
    if(rightOperand) {
        rightOperand = rightOperand.slice(0, rightOperand.length - 1);
    }
    else if(operator) {
        operator = '';
    }
    else {
        leftOperand = leftOperand.slice(0, leftOperand.length - 1);
    }

    // Remove last element from display text.
    // Return the default display state (shows as zero) if nothing to display
    newDisplayText = display.textContent.slice(0, display.textContent.length - 1);
    updateDisplay(newDisplayText.length > 0 ? newDisplayText : '0');
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(numerator, denominator) {
    if(denominator <= 0) {
        throw new Error('Divide by zero is not allowed');
    }

    return numerator / denominator;
}

function operate(leftOp, rightOp, operation) {
    leftOp = Number(leftOp);
    rightOp = Number(rightOp);
    let result = null;
    switch(operation) {
        case '+':
            result = add(leftOp, rightOp);
            break;
        case '-':
            result = subtract(leftOp, rightOp);
            break;
        case '*':
            result = multiply(leftOp, rightOp);
            break;
        case '/':
            result = divide(leftOp, rightOp);
            break;
        default:
            throw new Error(`Invalid operation. ${operation} is not a supported function.`);
    }    
    
    // Store current result
    leftOperand = String(result);
    clear();    
    updateDisplay(result);    
}

function canOperate() {
    return leftOperand.length > 0 && operator.length > 0 && rightOperand.length > 0;
}