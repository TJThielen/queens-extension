/**
 * Queries for a specific element in the DOM.
 *
 * @param {string} query Specific query to run ('div', '#my-id', '.my-class', etc.)
 *
 * @returns {Node | Node[] | null}
 */
function $(query) {
    // check for iframe.
    const body = document.querySelector('iframe')?.contentWindow?.document?.body || document;

    const results = body.querySelectorAll(query);

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
window.onload = systemStart;

async function systemStart() {
    console.log('LOAD EXTENSION', document);
    let controlsContainer = $('.aux-controls-wrapper');

    if (!controlsContainer) {
        await new Promise((resolve) => {
            let controlsCheckInterval = null;
            function findControls() {
                controlsContainer = $('.aux-controls-wrapper');

                if (controlsContainer) {
                    clearInterval(controlsCheckInterval);
                    resolve();
                }
            }

            controlsCheckInterval = setInterval(findControls, 500);
        });
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

    const simpleEdges = [];
    cells.forEach(cell => {
        const queryForEdges = cell.querySelectorAll('.lotka-cell-edge');
        if (queryForEdges.length) {
            const cellEdge = {}

            queryForEdges.forEach(edge => {
                const side = edge.classList.contains('lotka-cell-edge--right') ? 'right' : 'bottom';
                const type = edge.querySelector('svg').getAttribute('aria-label');

                cellEdge[side] = type;
            });

            simpleEdges.push(cellEdge);
        } else {
            simpleEdges.push(null);
        }
    });

    const styles = boardCellWrapper.style.cssText.split(';');
    const width = parseInt(styles.find(style => style.includes('rows')).split(':')[1]);
    const height = parseInt(styles.find(style => style.includes('cols')).split(':')[1]);

    const simple = convertToSimple(cells);
    renderArrayAsTableInLogs(simple, width);
    const finished = [...simple];
    let previousArray = [];

    while (hasNumberArrayChanged(previousArray, finished)) {
        previousArray = [...finished];

        // Loop over rows.
        for (let y = 0; y < height; y++) {
            const set = [];
            const signs = [];

            for (let x = 0; x < width; x++) {
                const flatPos = (y * width) + x;
                set.push(finished[flatPos]);
                signs.push(simpleEdges[flatPos]?.right);
            }

            checkSet(set, width, signs);

            for (let x = 0; x < width; x++) {
                const flatPos = (y * width) + x;
                finished[flatPos] = set[x];
            }
        }

        // Loop over columns.
        for (let x = 0; x < width; x++) {
            const set = [];
            const signs = [];

            for (let y = 0; y < height; y++) {
                const flatPos = (y * width) + x;
                set.push(finished[flatPos]);
                signs.push(simpleEdges[flatPos]?.bottom);
            }

            checkSet(set, width, signs);

            for (let y = 0; y < height; y++) {
                const flatPos = (y * width) + x;
                finished[flatPos] = set[y];
            }
        }
    }

    renderArrayAsTableInLogs(finished, width);
    renderSolution(finished, cells);
}
