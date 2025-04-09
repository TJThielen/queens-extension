/**
 * Note: everything in this file currently assumes the board is in a good state.
 */

/**
 * Takes a specific set of nodes through every known rule.
 *
 * @param {Node[]} set A given row or column group of cells to check against all known rules.
 * @param {number} setLength The total number of elements that should be in the set.
 */
function checkSet(set, setLength) {
    console.log(set);
    checkOnly2(set);
}

/**
 * What are all the Tango rules?
 *
 * 1. No more than two of the same type can be next to each other.
 * 2. Each row must contain the same number of moons and suns.
 */

/**
 * Go through the set and find and locations with two of the same type back-to-back.
 * When they're found, place on each side a type of the opposite.
 *
 * @param {Node[]} set The set to check against
 */
function checkOnly2(set) {
    for (let i = 0; i < set.length; i++) {
        if (!cellHasType(set[i])) continue;
        if (!cellHasType(set[i - 1])) continue;

        const prevCellIsSun = isTypeSun(set[i - 1]);
        const cellIsSun = isTypeSun(set[i]);

        // If they are different, do nothing.
        if (!prevCellIsSun || !cellIsSun) {
            continue;
        }

        // If they are same, set next cell to the opposite.
        console.log('SETTING', set[i + 1], 'TO', cellIsSun ? 'Moon' : 'Sun');
        setCell(set[i + 1], cellIsSun ? 'Moon' : 'Sun');
    }
}


function checkMaxType() {

}