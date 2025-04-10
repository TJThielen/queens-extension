/**
 * Note: everything in this file currently assumes the board is in a good state.
 */

/**
 * Takes a specific set of nodes through every known rule.
 *
 * @param {number[]} set A given row or column group of cells to check against all known rules.
 * @param {number} length expected length of given set.
 * @param {({ side: 'right' | 'bottom', type: 'Cross' | 'Equal' } | null)[]} signs 
 */
function checkSet(set, length, signs) {
    checkOnly2(set);
    checkNumberOfTypes(set, length);
    checkCrossEquals(set, signs);

    return set;
}

/**
 * What are all the Tango rules?
 *
 * 1. No more than two of the same type can be next to each other.
 *   a) Check two next to each other
 *   b) Check with a gap between two of the same type
 * 2. Each row must contain the same number of moons and suns.
 * 3. Crosses or equals signs to the right or bottom must match. E.G.
 *   - Sun X ___ must become Sun X Moon
 *   - ___ = Moon must become Moon = Moon
 */

/**
 * Go through the set and find and locations with two of the same type back-to-back.
 * When they're found, place on each side a type of the opposite.
 *
 * @param {number[]} set The set to check against
 */
function checkOnly2(set) {
    // A. Check two next to each other
    for (let i = 0; i < set.length; i++) {
        if (!set[i]) continue;
        if (!set[i - 1]) continue;

        const prevCellIsSun = set[i - 1] === 1;
        const cellIsSun = set[i] === 1;

        // If they are different, do nothing.
        if (prevCellIsSun !== cellIsSun) {
            continue;
        }

        // If they are same, set next cell to the opposite.
        if (i - 2 >= 0) {
            set[i - 2] = cellIsSun ? 2 : 1;
        }
        if (i + 1 < set.length) {
            set[i + 1] = cellIsSun ? 2 : 1;
        }
    }

    // B. Check two with space between.
    for (let i = 0; i < set.length; i++) {
        if (!set[i - 1]) continue;
        if (!set[i + 1]) continue;

        const prevCellIsSun = set[i - 1] === 1;
        const cellIsSun = set[i + 1] === 1;

        // If they are different, do nothing.
        if (prevCellIsSun !== cellIsSun) {
            continue;
        }

        // If they are same, set center cell to the opposite.
        set[i] = cellIsSun ? 2 : 1;
    }
}

/**
 * Simply, go through set and see if we can make any assumptions based on the number
 *  of current types. I.E.
 * - If the length is four and there are 2 Suns, fill the remaining slots with Moons.
 * - If the length is six and there are 3 Moons, fill the remaining slots with Suns.
 *
 * @param {number[]} set The set to check against.
 * @param {number} length The number of types that should be in set.
 */
function checkNumberOfTypes(set, length) {
    if (numberOfMoons(set) === length * 0.5) {
        for (let s = 0; s < length; s++) {
            if (set[s] !== 2) {
                set[s] = 1;
            }
        }

        return;
    }

    if (numberOfSuns(set) === length * 0.5) {
        for (let s = 0; s < length; s++) {
            if (set[s] !== 1) {
                set[s] = 2;
            }
        }

        return;
    }
}

/**
 * 
 * @param {number[]} set
 * @param {(string | null)[]} signs
 */
function checkCrossEquals(set, signs) {
    for (let setIndex = 0; setIndex < set.length; setIndex++) {
        const sign = signs[setIndex];
        if (!sign) {
            continue;
        }

        // Check for signs to right and bottom.
        if (!set[setIndex] && !set[setIndex + 1]) {
            // Check further left and right
            if (sign === 'Equal' && set[setIndex - 1]) {
                set[setIndex] = set[setIndex - 1] === 2 ? 1 : 2;
                set[setIndex + 1] = set[setIndex - 1] === 2 ? 1 : 2;
            } else if (sign === 'Equal' && set[setIndex + 2]) {
                set[setIndex] = set[setIndex + 2] === 2 ? 1 : 2;
                set[setIndex + 1] = set[setIndex + 2] === 2 ? 1 : 2;
            }

            return;
        }

        if (sign === 'Equal') {
            set[setIndex] = set[setIndex] || set[setIndex + 1];
            set[setIndex + 1] = set[setIndex] || set[setIndex + 1];
            return;
        }

        if (set[setIndex]) {
            set[setIndex + 1] = set[setIndex] === 2 ? 1 : 2;
        } else {
            set[setIndex] = set[setIndex + 1] === 2 ? 1 : 2;
        }
    }
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
        cellHint.innerHTML = c === 2 ? MoonHTML : c === 1 ? SunHTML : '0';
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
