const generatedNumberText = document.querySelector('.generated-number');

let totalNosGenerated = JSON.parse(localStorage.getItem('count')) || 0;
const min = 1;
const arraySize = 90;
//const cols = 10;
function initializeArray() {
    return new Array(arraySize).fill(false);
}

function saveTambolaBoard(tambolaBoardArray) {
    localStorage.setItem('tamobolaBoardArray', JSON.stringify(tambolaBoardArray));
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

let tambolaBoardArray = getTambolaBoard();
function generateNewNumber(min, max) {
    let res = 0;
    do {
        res = Math.floor(Math.random() * (max - min + 1)) + 1;
    }
    while (tambolaBoardArray[res - 1] != false);
    tambolaBoardArray[res - 1] = true;
    saveTambolaBoard(tambolaBoardArray);
    totalNosGenerated = totalNosGenerated + 1;
    localStorage.setItem('count', JSON.stringify(totalNosGenerated));
    return res;
}
function resetTambolaBoard() {
    localStorage.removeItem('tamobolaBoardArray');
    tambolaBoardArray = initializeArray();
    totalNosGenerated = 0;
    localStorage.setItem('count', JSON.stringify(totalNosGenerated));
}
// function displayTambolaTable(tambolaBoardArray) {
//     const table = document.querySelector('.tambola-board')
//     table.innerHTML = '';
//     let tr;
//     for (let i = 0; i < tambolaBoardArray.length; i++) {
//         if (i % cols === 0) {
//             tr = document.createElement('tr');
//             table.appendChild(tr);
//         }
//         const td = document.createElement('td');
//         td.textContent = i + 1;
//         td.style.cursor = 'pointer';
//         if (tambolaBoardArray[i] === true) {
//             td.classList.add('filled');
//         }
//         else {
//             td.classList.add('unfilled');
//         }

//         tr.appendChild(td);
//     }
//     //tableContainer.appendChild(table);
// }
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
document.querySelector('.js-play-button').addEventListener('click', () => {

    if (totalNosGenerated === arraySize) {
        generatedNumberText.innerHTML = 'All Values are Generated!!';
    }
    else {
        var generatedNumberValue = generateNewNumber(min, arraySize);
        generatedNumberText.innerHTML = generatedNumberValue;
    }
    //displayTambolaTable(tambolaBoardArray);
    displayTambolaGrid(tambolaBoardArray);
});
document.querySelector('.js-reset-button').addEventListener('click', () => {
    resetTambolaBoard();
    generatedNumberText.innerHTML = 'Tambola Board has been reset!'
    // displayTambolaTable(tambolaBoardArray);
    displayTambolaGrid(tambolaBoardArray);
});