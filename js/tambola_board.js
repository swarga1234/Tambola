const generatedNumberText = document.querySelector('.generated-number');

// let totalNosGenerated = JSON.parse(localStorage.getItem('count')) || 0;
const arraySize = 90;
//const cols = 10;
function initializeArray() {
    return new Array(arraySize).fill(false);
}

function initializeNumbersArray(){
    const numbers=Array.from({length:arraySize},(_,i)=>i+1);
    return numbers;
}
function saveTambolaBoard(tambolaBoardArray,numbers) {
    localStorage.setItem('tamobolaBoardArray', JSON.stringify(tambolaBoardArray));
    localStorage.setItem('numbersArray',JSON.stringify(numbers));
}

function getTambolaBoard() {
    const tambolaBoardString = localStorage.getItem('tamobolaBoardArray');
    if (tambolaBoardString) {
        return JSON.parse(tambolaBoardString);
    }
    else {
        return initializeArray();
    }
}
function getNumbersArray(){
    const numbersArrayString = localStorage.getItem('numbersArray');
    if (numbersArrayString) {
        return JSON.parse(numbersArrayString);
    }
    else {
        return initializeNumbersArray();
    }
}

let tambolaBoardArray = getTambolaBoard();
let numbers = getNumbersArray();
function generateNewNumber(numbers) {
    let res = 0;
    let index=Math.floor(Math.random() * numbers.length);
    [numbers[numbers.length-1],numbers[index]]=[numbers[index],numbers[numbers.length-1]];
    res=numbers.pop();
    console.log("Number picked: "+res)
    console.log("Numbers left:"+numbers.length)
    tambolaBoardArray[res - 1] = true;
    saveTambolaBoard(tambolaBoardArray,numbers);

    return res;
}
function resetTambolaBoard() {
    localStorage.removeItem('tamobolaBoardArray');
    localStorage.removeItem('numbersArray');
    tambolaBoardArray = initializeArray();
    numbers = initializeNumbersArray();
}

function displayTambolaGrid(tambolaBoardArray) {
    const gridContainer = document.querySelector('.tambola-board-grid');
    gridContainer.innerHTML = '';
    let div;
    for (let i = 0; i < tambolaBoardArray.length; i++) {

        div = document.createElement('div');
        div.className = 'grid-element';
        div.textContent = i + 1;
        if (tambolaBoardArray[i] === true) {
            div.classList.add('filled');
        }
        else {
            div.classList.add('unfilled');
        }

        gridContainer.appendChild(div);
    }

}
// displayTambolaTable(tambolaBoardArray);
displayTambolaGrid(tambolaBoardArray);
document.getElementById('button-next').addEventListener('click', () => {

    // const numbersArrayString = localStorage.getItem('numbersArray');
    // numbers=JSON.parse(numbersArrayString);
    if (numbers.length===0) {
        generatedNumberText.innerHTML = 'All Values are Generated!!';
    }
    else {
        var generatedNumberValue = generateNewNumber(numbers);
        generatedNumberText.innerHTML = generatedNumberValue;
    }
    displayTambolaGrid(tambolaBoardArray);
});
document.getElementById('button-reset').addEventListener('click', () => {
    resetTambolaBoard();
    generatedNumberText.innerHTML = 'Tambola Board has been reset!'
    displayTambolaGrid(tambolaBoardArray);
});