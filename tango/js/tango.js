/**
 * Note: everything in this file currently assumes the board is in a good state.
 */
const { numberOfMoons, numberOfSuns } = require('./t-utils');

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
 * - If the length is six and there are two of the same types at the start and end of set,
 *    set the one in from each of those to the opposite.
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

    if (length === 6 && set[0] && set[0] === set[5]) {
        const oppositeType = set[0] === 2 ? 1 : 2;

        set[1] = oppositeType;
        set[4] = oppositeType;
    }
}

/**
 * 
 * @param {number[]} set
 * @param {(string | null)[]} signs
 *
 * Current cases:
 * - If there is not any sign:
 *  - skip
 * - If there is no types within the sign:
 *  - If there's an equals sign and a type to the left or right:
 *    Fill the whole Equals with the opposite type
 *  - If there's a cross sign and two types somewhere else on a 6-length set:
 *    Fill remaining, non-sign openings
 *  skip
 * - If the sign is Equals:
 *  - If the Equals sign is all the way to one side or the other on a 6-length set:
 *   - Fill the opposite side opening to the opposite type
 *   - Or if the opposite side has a type, take that
 *  - If there are two equals in a single row:
 *   - we can fill each fully to the opposite types
 *  - Set the openings to the same type
 * - If the sign is a Cross:
 *   Fill with opposite type
 * skip
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

            // Check for length 6 and count of opposite type
            if (sign === 'Cross' && set.length === 6) {
                const checkCrossType = numberOfMoons(set) === 2 ? 1 : numberOfSuns(set) === 2 ? 2 : 0;
                if (checkCrossType) {
                    // Set any unset positions not part of the cross to Sun.
                    set.forEach((s, i) => {
                        if (i === setIndex || i === setIndex + 1) {
                            return;
                        }

                        if (!s) {
                            set[i] = checkCrossType;
                        }
                    });
                }
            }
        }

        // Check for cross row equals.
        // If we have an equals at the start of the row or the very end of the row, I think this is
        //  only true for 6 length (TODO, confirm).

        if (sign === 'Equal') {
            set[setIndex] = set[setIndex] || set[setIndex + 1];
            set[setIndex + 1] = set[setIndex] || set[setIndex + 1];

            // If there are two equals in a row in a size six, we know they must be opposites.
            if (set.length === 6 && signs.filter(sign => sign === 'Equal').length === 2) {
                // Set to opposite of the other equals (if there are values there).
                const otherSignIndex = signs.findIndex((sign, signIndex) => sign === 'Equal' && signIndex !== setIndex);
                const otherSign = set[otherSignIndex] || set[otherSignIndex + 1];

                if (otherSign) {
                    set[setIndex] = otherSign === 2 ? 1 : 2;
                    set[setIndex + 1] = otherSign === 2 ? 1 : 2;
                }

                continue;
            }

            // Set far edge to opposite because we must.
            if ((setIndex === 0 || setIndex === set.length - 1) && set.length === 6) {
                set[set.length - 1] = set[setIndex] === 2 ? 1 : set[setIndex] === 1 ? 2 : set[set.length - 1];
                set[setIndex] = set[set.length - 1] === 2 ? 1 : set[set.length - 1] === 1 ? 2 : set[setIndex];
            } else if (setIndex === set.length - 2 && set.length === 6) {
                set[0] = set[setIndex] === 2 ? 1 : set[setIndex] === 1 ? 2 : set[0];
                set[setIndex] = set[0] === 2 ? 1 : set[0] === 1 ? 2 : set[setIndex];
            }

            continue;
        }

        if (set[setIndex]) {
            set[setIndex + 1] = set[setIndex] === 2 ? 1 : 2;
        } else if (set[setIndex + 1]) {
            set[setIndex] = set[setIndex + 1] === 2 ? 1 : 2;
        }
    }
}

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

module.exports = {
    checkOnly2,
    checkNumberOfTypes,
    checkCrossEquals,
    checkSet,
};
