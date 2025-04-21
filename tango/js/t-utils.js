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

/**
 * Queries for a specific element in the DOM.
 *
 * @param {string} query Specific query to run ('div', '#my-id', '.my-class', etc.)
 *
 * @returns {Node | Node[] | null}
 */
function $(query) {
    // check for iframe.
    let results = document.querySelectorAll(query);

    if (!results.length) {
        // check for iframe ability
        try {
            results = document.querySelector('iframe')?.contentWindow?.document?.body?.querySelectorAll(query);
            if (results.length === 1) {
                return results[0];
            } else if (results.length) {
                return results;
            }
        } catch (_e) { }

        return null;
    }

    if (results.length === 1) {
        return results[0];
    }

    return results;
}

/**
 * Creates a new element with a given id and class.
 *
 * @param {{ element: string, id?: string, classList?: string }} param The inputs for the generated element
 *
 * @returns {Node}
 */
function $create({ element, id, classList }) {
    const el = document.createElement(element);
    if (id) {
        el.id = id;
    }
    if (classList) {
        el.classList = classList;
    }

    return el;
}

const MoonHTML = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Moon" class="lotka-cell-content-img">
  <g id="Moon">
    <g clip-path="url(#clip0_3574_67936)">
      <path class="lotka-cell-one-path" id="Subtract" d="M8.10583 19.9024C15.2282 18.6466 19.2619 11.9868 17.0757 5.09295C16.8785 4.47115 16.6376 3.86915 16.3574 3.28957C16.3507 3.27584 16.3467 3.26256 16.3446 3.24986C20.5748 4.17473 24.0337 7.5648 24.8316 12.0899C25.8865 18.0727 21.8917 23.778 15.9088 24.8329C11.4675 25.616 7.17692 23.6165 4.82974 20.0826C4.84051 20.0805 4.85231 20.0796 4.86526 20.0804C5.93904 20.1476 7.02621 20.0928 8.10583 19.9024Z" stroke-width="2"></path>
      <circle id="Cut" cx="12" cy="12" r="12" transform="matrix(0.984808 -0.173648 0.302281 0.953219 -11.1387 -1.87585)"></circle>
    </g>
  </g>
  <defs>
    <clipPath id="clip0_3574_67936">
      <rect x="0.0976562" y="4.26611" width="24" height="24" rx="12" transform="rotate(-10 0.0976562 4.26611)" fill="white"></rect>
    </clipPath>
  </defs>
</svg>`;

const SunHTML = `<svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sun" class="lotka-cell-content-img">
  <g id="Sun">
    <path class="lotka-cell-zero-path" id="Vector" d="M29.25 15.4989C29.25 23.0943 23.0937 29.25 15.5 29.25C7.90629 29.25 1.75 23.0943 1.75 15.4989C1.75 7.90583 7.90619 1.75 15.5 1.75C23.0938 1.75 29.25 7.90583 29.25 15.4989Z" stroke-width="2"></path>
  </g>
</svg>`;

/**
 * Appends solution to the grrid.
 *
 * @param {number[]} finished Array of solution.
 * @param {Node[]} cells DOM cells to attach solution to.
 */
function renderSolution(finished, cells) {
    finished.forEach((c, index) => {
        const cell = cells[index];

        // Don't display for locked cells (the starter types).
        if (cell.classList.contains('lotka-cell--locked')) {
            return;
        }

        const cellHint = $create({ element: 'div', classList: 'solver-answer-hint' });
        cellHint.innerHTML = c === 2 ? MoonHTML : c === 1 ? SunHTML : '';
        cellHint.style = `
    background: transparent;
    position: absolute;
    height: 32px;
    width: 32px;
    top: 0px;
    left: 0px;
    display: flex;
    justify-content: start;
    align-items: start;
    padding-left: 2px;
    padding-top: 2px;`;

        cell.append(cellHint);
    });
}

module.exports = {
    $,
    $create,
    convertToSimple,
    cellHasType,
    numberOfMoons,
    numberOfSuns,
    hasNumberArrayChanged,
    renderArrayAsTableInLogs,
    renderSolution,
};
