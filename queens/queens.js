// test();

function main() {
    const cells = readQueens();
    findQueens(cells);
}

function test() {
    const grid = [
        [
          { color: 'Lavender', type: 'cross' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Peach', type: 'empty' }
        ],
        [
          { color: 'Lavender', type: 'empty' },
          { color: 'Soft', type: 'empty' },
          { color: 'Pastel', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Light', type: 'empty' },
          { color: 'Light', type: 'empty' },
          { color: 'Light', type: 'empty' },
          { color: 'Peach', type: 'empty' }
        ],
        [
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Pastel', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Light', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Light', type: 'empty' },
          { color: 'Peach', type: 'empty' }
        ],
        [
          { color: 'Pastel', type: 'empty' },
          { color: 'Pastel', type: 'empty' },
          { color: 'Pastel', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Vibrant', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Light', type: 'empty' },
          { color: 'Peach', type: 'empty' }
        ],
        [
          { color: 'Pastel', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Vibrant', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Lime', type: 'empty' },
          { color: 'Peach', type: 'empty' }
        ],
        [
          { color: 'Warm', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Lavender', type: 'empty' },
          { color: 'Vibrant', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Lime', type: 'empty' },
          { color: 'Peach', type: 'empty' }
        ],
        [
          { color: 'Warm', type: 'empty' },
          { color: 'Warm', type: 'empty' },
          { color: 'Warm', type: 'empty' },
          { color: 'Vibrant', type: 'empty' },
          { color: 'Vibrant', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Lime', type: 'empty' },
          { color: 'Peach', type: 'empty' }
        ],
        [
          { color: 'Peach', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Peach', type: 'empty' },
          { color: 'Peach', type: 'empty' }
        ]
    ];

    const qPositions = getQueenPositions(grid);
    placeType(grid, qPositions, 'queen');
    const cPositions = getCrossPositions(grid);
    placeType(grid, cPositions, 'cross')
    console.log('here');
}

function placeType(grid, positions, type) {
    positions.forEach(p => {
        grid[p[0]][p[1]].type = type;
    })
}

function findQueens(cells) {
    const grid = makeGrid(cells);
    console.log(JSON.stringify(grid));
}

function makeGrid(cellObjects) {
    const grid = [];
    cellObjects.forEach(cell => {
        console.log(cell);
        if(!grid[cell.row-1]){
            grid[cell.row-1] = [];
        }
        grid[cell.row-1][cell.column-1] = { color: cell.color, type: cell.type}
    })
    console.log(grid);
}

function readQueens() {
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
        return cells;
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

function getQueenPositions(grid) {
    const queenPositions = [];

    //one per row
    const emptyRows = [];
    //one per column
    const emptyColumns = [];
    //one per color
    const emptyColors = {};
    //queen tracker
    const queens = [];

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            if(grid[i][j].type === 'empty') { 
                if(!emptyRows[i]) {
                    emptyRows[i] = [];
                }
                if(!emptyColumns[j]) {
                    emptyColumns[j] = [];
                }
                if(!emptyColors[grid[i][j].color]){
                    emptyColors[grid[i][j].color] = [];
                }
                emptyRows[i].push(j);
                emptyColumns[j].push(i);
                emptyColors[grid[i][j].color].push([i,j]);
            }
            if(grid[i][j].type === 'queen') {
                queens[i] = j;
            }
        }
    }

    for(const rowIndex in emptyRows){
        if(emptyRows[rowIndex].length == 1){
            queenPositions.push([rowIndex, emptyRows[rowIndex]]);
        }
    }

    for(const rowIndex in emptyColumns){
        if(emptyColumns[rowIndex].length == 1){
            queenPositions.push([emptyColumns[rowIndex], rowIndex]);
        }
    }

    for(const val of Object.values(emptyColors)){
        if(val.length == 1){
            queenPositions.push(val[0]);
        }
    }

    return queenPositions;
}

function getCrossPositions(grid){
    const crosses = new Set(); //make set and use strings to remove duplicates
    const consumedColors = [];  //collect colors that have a queen in them
    const emptyColors = {}; //keep track of the squares belonging to each color

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            // populate emptyColors
            if(!emptyColors[grid[i][j].color]){
                emptyColors[grid[i][j].color] = [];
            }

            if(grid[i][j].type == 'empty'){
                emptyColors[grid[i][j].color].push([i,j]);
            }


            if(grid[i][j].type == 'queen') {
                //touching a queen
                const squares = getSurroundingSquares(i, j, grid.length, grid[0].length);
                squares.forEach(s => {
                    if(grid[s[0]][s[1]].type == 'empty'){
                        crosses.add(`${s[0]}${s[1]}`);
                    }
                })

                //same row as a queen
                for(let k = 0; k < grid[i].length; k++){
                    if(k != i){
                        crosses.add(`${i}${k}`);
                    }
                }

                //same column as a queen
                for(let k = 0; k < grid.length; k++){
                    if(k != j){
                        crosses.add(`${k}${j}`);
                    }
                }

                //collect colors that already have a queen
                consumedColors.push(grid[i][j].color);
            }
        }
    }

    //iterate through again
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            if(grid[i][j].type == 'empty') {
                //same color as a queen
                if(consumedColors.includes(grid[i][j].color)){
                    crosses.add(`${i}${j}`);
                }
                console.log('here')

                //touching all of the empties of one color
                for(const [key, val] of Object.entries(emptyColors)){   //for each color
                    if(key != grid[i][j].color){    //if the current square is a different color as the empty color we are iterating through
                        let invalidCrossLocation = false;
                        if(val.length > 0) {
                            for(const coords of val){   //for each empty square in the color
                                if(Math.abs(coords[0] - i) > 1 || Math.abs(coords[1] - j) > 1) {    //check if the empty square in the color touches the current square
                                    invalidCrossLocation = true;    //if not, move onto the next color
                                    break;
                                }
                            }
                            if(!invalidCrossLocation){
                                crosses.add(`${i}${j}`);
                                break;  //move onto next square in grid
                            }
                        }
                    }
                }
            }
        }
    }
    console.log('hello')

    return crosses;
}

function getSurroundingSquares(x, y, xLen, yLen){
    const coords = [];
    for(let i = x-1; i <= x + 1; i++) {
        for (let j = y-1; j <= y+1; j++){
            if(i >= 0 && j >= 0 && i < xLen && j < yLen && !(i == x && j == y)){  //i and j must be in bounds and don't count the center square
                coords.push([i, j]);
            }
        }
    }
    return coords;
}


module.exports = { isEmpty, isCross, isQueen, getColumn, getRow, getColor, findQueens, getQueenPositions, getSurroundingSquares};
