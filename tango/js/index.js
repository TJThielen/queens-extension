const { checkSet } = require('./tango');
const { $, $create, convertToSimple, hasNumberArrayChanged, renderSolution } = require('./t-utils');

// Ready us up by adding a "Solve" button
window.onload = systemStart;
window.addEventListener('popstate', systemStart);
const tangoURL = '/games/tango';

async function systemStart() {
    let url = window.location.href;
    let controlsContainer = $('.aux-controls-wrapper');

    if (!controlsContainer || !url.includes(tangoURL)) {
        await new Promise((resolve) => {
            let controlsCheckInterval = null;
            function findControls() {
                controlsContainer = $('.aux-controls-wrapper');
                url = window.location.href;

                if (controlsContainer && url.includes(tangoURL)) {
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

async function initiateSolve() {
    const clear = $('#aux-controls-clear');
    if (clear) {
        clear.click();

        const clearConfirmSelector = '.artdeco-modal span.artdeco-button__text';
        let clearConfirm = $(clearConfirmSelector);
        if (!clearConfirm) {
            await new Promise((resolve) => {
                let clearConfirmCheckInterval = null;
                function findControls() {
                    clearConfirm = $(clearConfirmSelector);

                    if (clearConfirm) {
                        clearInterval(clearConfirmCheckInterval);
                        resolve();
                    }
                }

                clearConfirmCheckInterval = setInterval(findControls, 500);
            });
        }

        clearConfirm[2]?.click();
    }

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

    renderSolution(finished, cells);
}
