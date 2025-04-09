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
