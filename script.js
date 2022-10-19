const display = document.querySelector('.calculator-input');
const keys = document.querySelector('.calculator-keys');

let displayValue = '0';
let firstValue = null;
let operator = null;
let waitingForSecond = false;

updateValue();

function updateValue(){
    display.value = displayValue;
}

keys.addEventListener('click',(e)=>{
    const element = e.target;
    if(!element.matches('button')) {
        return;
    }
    
    if(element.classList.contains('operator')) {
        handleValue(element.value)
        updateValue();
        return;
    }
    if(element.classList.contains('decimal')) {
        İnputDecimal(element.value)
        updateValue();
        return;
    }
    if(element.classList.contains('clear')) {
        clear();
        updateValue();
        return
    }
    İnputValue(element.value)
    updateValue()
});
function handleValue(nextOperator){
    const value = parseFloat(displayValue);
    if (operator && waitingForSecond) {
        operator = nextOperator;
        return;
    }
    if(firstValue === null) {
        firstValue = value;
    }else if(operator){
        const result = calculate(firstValue,value,operator);

        displayValue = `${parseFloat(result.toFixed(7))}`;
        firstValue = result
    }
    waitingForSecond = true;
    operator = nextOperator;
    console.log(displayValue,firstValue,operator,waitingForSecond)
}

function calculate(first, second,operator){
    if (operator === '+') {
        return first + second;
    }else if (operator === '-') {
        return first - second;
    }else if (operator === '*') {
        return first * second;
    }else if (operator === '/') {
        return first / second;
    }

    return second;
}

function İnputValue(num){
    if(waitingForSecond){
        displayValue = num;
        waitingForSecond = false
    }
    else{
        displayValue = displayValue === '0' ? num : displayValue + num;
    }
    console.log(displayValue,firstValue,operator,waitingForSecond)

}

function İnputDecimal(){
    if (!displayValue.includes('.')) {
        displayValue += '.'
    }
} 
function clear(){
    displayValue = '0'
}
