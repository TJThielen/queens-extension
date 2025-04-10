/**
 * Takes the complex DOM representation of the tango board and
 *  simplifies it to a basic array of numbers where:
 * - 0 represents no type
 * - 1 represents a Sun
 * - 2 represents a Moon
 *
 * @param {Node[]} cells All the givens cells in a tango board
 *
 * @returns {number[]}
 */
function convertToSimple(cells) {
    const simple = [];

    cells.forEach(cell => simple.push(isTypeMoon(cell) ? 2 : isTypeSun(cell) ? 1 : 0));

    return simple;
};

/**
 * Check if this cell has any type (Sun or Moon).
 *
 * @param {Node | null} cell The cell to check.
 *
 * @returns {boolean}
 */
function cellHasType(cell) {
    if (!cell) {
        return false;
    }

    return cell.querySelector('#Sun') || cell.querySelector('#Moon');
}

/**
 * Check if this cell has a sun.
 *
 * @param {Node | null} cell The cell to check.
 *
 * @returns {boolean}
 */
function isTypeSun(cell) {
    if (!cell) {
        return false;
    }

    return !!cell.querySelector('#Sun');
}

/**
 * Check if this cell has a moon.
 *
 * @param {Node | null} cell The cell to check.
 *
 * @returns {boolean}
 */
function isTypeMoon(cell) {
    if (!cell) {
        return false;
    }

    return !!cell.querySelector('#Moon');
}

/**
 * Sets the specific cell to the type.
 * This assumes the following:
 * - if a cell is empty, clicking once adds Sun;
 * - if a cell has Sun, clicking once adds Moon;
 * - if a cell has Moon, clicking once makes empty
 * 
 * @param {Node | null} cell The cell to set to.
 * @param {'Sun' | 'Moon'} type The type to convert to.
 */
function setCell(cell, type) {
    if (!cell) {
        return;
    }

    // Make the cell empty
    if (isTypeMoon(cell) || isTypeSun(cell)) {
        cell.click();

        if (isTypeMoon(cell)) {
            cell.click();
        }
    }


    cell.click();
    if (type === 'Moon') {
        cell.click();
    }
}

/**
 * Check the number of moons(2) in a given set.
 *
 * @param {number[]} set a set of numbers 0 to 2.
 *
 * @returns {number}
 */
function numberOfMoons(set) {
    return set.filter(s => s === 2).length;
}

/**
 * Check the number of suns(1) in a given set.
 *
 * @param {number[]} set a set of numbers 0 to 2.
 *
 * @returns {number}
 */
function numberOfSuns(set) {
    return set.filter(s => s === 1).length;
}

function hasNumberArrayChanged(oldArray, newArray) {
    // Check if both inputs are arrays
    if (!Array.isArray(oldArray) || !Array.isArray(newArray)) {
        throw new Error("Both inputs must be arrays");
    }

    // Check if the arrays have different lengths
    if (oldArray.length !== newArray.length) {
        return true;
    }

    // Compare each number
    for (let i = 0; i < oldArray.length; i++) {
        // Check if both elements are numbers and if they're different
        if (typeof oldArray[i] !== 'number' || typeof newArray[i] !== 'number' || oldArray[i] !== newArray[i]) {
            return true;
        }
    }

    // If we've made it this far, the arrays are equal
    return false;
}

function renderArrayAsTableInLogs(numbers, columns = 3) {
    if (!Array.isArray(numbers)) {
        console.error("Input must be an array of numbers");
        return;
    }

    const twoDArray = [];
    for (let i = 0; i < numbers.length; i += columns) {
        twoDArray.push(numbers.slice(i, i + columns));
    }

    console.log(twoDArray);
}
