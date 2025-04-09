function findCells(){
    const queensGrid = document.querySelector('#queens-grid');

    if (queensGrid) {
        console.log("found");
        const divsInsideQueensGrid = queensGrid.querySelectorAll('div');
        const cells = [];
        divsInsideQueensGrid.forEach(rawCell => {
            const cellInfo = rawCell.getAttribute('aria-label');
            
            if(cellInfo){
                // Cross of color Lavender, row 1, column 1
                // Empty cell of color Lavender, row 1, column 1
                // Queen of color Lavender, row 1, column 6
                
                const cell = {
                    row: getRow(cellInfo),
                    column: getColumn(cellInfo),
                    type: getType(cellInfo),
                    color: getColor(cellInfo)
                }

                cells.push(cell);
            }
        })
        console.log("cells: "  + cells);
    } 
}


function isEmpty(text) {
    const regex = /Empty/;
    const result = text.match(regex);
    return result ? true : false;
}

function isCross(text) {
    const regex = /Cross/;
    const result = text.match(regex);
    return result ? true : false;
}

function isQueen(text) {
    const regex = /Queen/;
    const result = text.match(regex);
    return result ? true : false;
}

function getRow(text) {
    const regex = /row [0-9]+/;
    const result = text.match(regex);
    if(result) {
        const num = parseInt(result[0].slice(4));
        return num;
    }
    return -1;
}

function getColumn(text) {
    const regex = /column [0-9]+/;
    const result = text.match(regex);
    if(result) {
        const num = parseInt(result[0].slice(7));
        return num;
    }
    return -1;
}

function getType(text) {
    if(isEmpty(text)) {
        return 'empty';
    } else if(isCross(text)){
        return 'cross';
    } else if(isQueen(text)){
        return 'queen';
    } else {
        return 'invalid';
    }
}

function getColor(text) {
    const regex = /color [A-Za-z]+/;
    const result = text.match(regex);
    if(result) {
        const color = result[0].slice(6);
        return color;
    }
    return -1;
}

module.exports = { isEmpty, isCross, isQueen, getColumn, getRow, getColor, findCells };
