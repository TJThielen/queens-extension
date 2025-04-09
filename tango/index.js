/**
 * Queries for a specific element in the DOM.
 *
 * @param {string} query Specific query to run ('div', '#my-id', '.my-class', etc.)
 *
 * @returns {Node | Node[] | null}
 */
function $(query) {
    const results = document.querySelectorAll(query);

    if (!results.length) {
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

// Ready us up by adding a "Solve" button
window.onload = function () {
    console.log('LOAD EXTENSION');
    const controlsContainer = $('.aux-controls-wrapper');

    console.log(controlsContainer);
    if (!controlsContainer) {
        // Screwed
        return;
    }

    const controlsButton = $create({ element: 'button', id: 'solve-tango-button', class: 'controls' });
    controlsButton.innerHTML = 'Solve';
    controlsButton.addEventListener('click', initiateSolve)
    controlsContainer.prepend(controlsButton);
};

function initiateSolve() {
    this.remove();
    const boardCellWrapper = $('.grid-board > div');
    const cells = $('.grid-board > div > div');

    const styles = boardCellWrapper.style.cssText.split(';');
    const width = parseInt(styles.find(style => style.includes('rows')).split(':')[1]);
    const height = parseInt(styles.find(style => style.includes('cols')).split(':')[1]);

    // Loop over rows.
    for (let y = 0; y < height; y++) {
        const set = [];

        for (let x = 0; x < width; x++) {
            const flatPos = (y * width) + x;
            set.push(cells[flatPos]);
        }

        checkSet(set, width);
    }

    // Loop over columns.
    for (let x = 0; x < width; x++) {
        const set = [];

        for (let y = 0; y < height; y++) {
            const flatPos = (y * width) + x;
            set.push(cells[flatPos]);
        }

        checkSet(set, height);
    }
}
