const screenElement = document.getElementById("screen")
const errorValue = "Error"

function clear() {
    screenElement.innerText = ""
}

function backspace() {
    const screenText = String(screenElement.innerText)
    const textLength = screenText.length

    if (screenText != errorValue && textLength > 0) {screenElement.innerText = screenText.substring(0,textLength-1)}
}

function doTheMath (operand1, operand2, operator) {
    // console.log('Operand 1:', operand1)
    // console.log('Operand 2:', operand2)
    // console.log('Operator:', operator)

    if (operator == "+") {
        // console.log("Add:", `${operand1} and ${operand2}`)
        return operand1 + operand2
    }
    else if (operator == "-") {
        // console.log("Subtract:", `${operand2} from ${operand1}`)
        return operand1 - operand2
    }
    else if (operator == "x") {
        // console.log("Multiply:", `${operand1} by ${operand2}`)
        return operand1 * operand2
    }
    else if (operator == "÷"){
        // console.log("Divide:", `${operand1} by ${operand2}`)
        return operand1 / operand2
    }
    else {
        return errorValue
    }
}

function evaluateExpression (expression) {
    validExpression = RegExp('^(-?[0-9]*([.][0-9]*)?)([+-x÷])(-?[0-9]*([.][0-9]*)?)$')
    let parsedExpression = []
    let operands = []
    let operator = ""

    if(expression.search(validExpression) < 0) {return null}

    parsedExpression = validExpression.exec(expression)
    operands[0] = Number(parsedExpression[1])
    operands[1] = Number(parsedExpression[4])
    operator = parsedExpression[3]

    if (operator == "÷" && operands[1] == 0) {return null}
    else {return doTheMath(operands[0], operands[1], operator)}
}

function evaluate() {
    const screenValue = screenElement.innerText
    const evaluationResult = evaluateExpression(screenValue)

    if (evaluationResult == null) {screenElement.innerText = errorValue}
    else {screenElement.innerText = evaluationResult}
}

function keyboardAppendOperandOperator(keyStroke) {
    const screenValue = screenElement.innerText

    if (screenValue != errorValue) {screenElement.innerText = screenValue.concat(keyStroke)}    
}

function appendOperandOperator() {
    const operandOperator = event.target.innerText
    const screenValue = screenElement.innerText

    if (screenValue != errorValue) {screenElement.innerText = screenValue.concat(operandOperator)}    
}

function executeKeyboardAction(e) {
    const keyCode = e.keyCode

    if (keyCode == 13)       {evaluate()} //either enter key
    else if (keyCode == 27)  {clear()} //escape key
    else if (keyCode == 8)   {backspace()} //backspace key
    else if (keyCode == 45)  {keyboardAppendOperandOperator('0')} //numpad 0 key
    else if (keyCode == 35)  {keyboardAppendOperandOperator('1')} //numpad 1 key
    else if (keyCode == 40)  {keyboardAppendOperandOperator('2')} //numpad 2 key
    else if (keyCode == 34)  {keyboardAppendOperandOperator('3')} //numpad 3 key
    else if (keyCode == 37)  {keyboardAppendOperandOperator('4')} //numpad 4 key
    else if (keyCode == 12)  {keyboardAppendOperandOperator('5')} //numpad 5 key
    else if (keyCode == 39)  {keyboardAppendOperandOperator('6')} //numpad 6 key
    else if (keyCode == 36)  {keyboardAppendOperandOperator('7')} //numpad 7 key
    else if (keyCode == 38)  {keyboardAppendOperandOperator('8')} //numpad 8 key
    else if (keyCode == 33)  {keyboardAppendOperandOperator('9')} //numpad 9 key
    else if (keyCode == 111) {keyboardAppendOperandOperator('÷')} //numpad / key
    else if (keyCode == 106) {keyboardAppendOperandOperator('x')} //numpad * key
    else if (keyCode == 109) {keyboardAppendOperandOperator('-')} //numpad - key
    else if (keyCode == 107) {keyboardAppendOperandOperator('+')} //numpad + key
    else {}
}

function addEventListeners() {
    // Click Events
    // Clear Button
    document.getElementById("clear").addEventListener("click", clear)
    // Equal Button
    document.getElementById("equals").addEventListener("click", evaluate)
    // Operator Buttons
    for (let i = 1; i < 5; i++) {
        document.getElementsByClassName("operator")[i].addEventListener("click", appendOperandOperator)
    }
    // Operand (Number) Buttons
    for (let i = 0; i < document.getElementsByTagName("span").length; i++) {
        if (i == 3 || i == 4 || i == 5 || i == 7 || i == 8 || i == 9 || i == 11 || i == 12 || i == 13 || i == 15) {
            document.getElementsByTagName("span")[i].addEventListener("click", appendOperandOperator)
        }
    }

    //Keyboard Events
    document.addEventListener('keyup', executeKeyboardAction);
}

addEventListeners()