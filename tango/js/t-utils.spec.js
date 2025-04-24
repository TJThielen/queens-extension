// Import the function to be tested
const { renderArrayAsTableInLogs, hasNumberArrayChanged, numberOfMoons, numberOfSuns } = require('./t-utils'); // Replace 'yourFile' with the actual file name

// Mock console.log and console.error
console.log = jest.fn();
console.error = jest.fn();

describe('numberOfTypes', () => {
    it.each([
        {
            set: [2, 1, 0, 0, 2, 1],
            expected: 2,
        },
        {
            set: [2, 2, 0, 0],
            expected: 2,
        },
        {
            set: [0, 2, 2, 0, 0, 2],
            expected: 3,
        },
        {
            set: [0, 0, 0, 0],
            expected: 0,
        }
    ])('should count the correct number of moons', ({ set, expected }) => {
        const result = numberOfMoons(set);

        expect(result).toEqual(expected);
    });


    it.each([
        {
            set: [2, 1, 0, 0, 2, 1],
            expected: 2,
        },
        {
            set: [1, 1, 0, 0],
            expected: 2,
        },
        {
            set: [0, 1, 1, 0, 0, 1],
            expected: 3,
        },
        {
            set: [0, 0, 0, 0],
            expected: 0,
        }
    ])('should count the correct number of suns', ({ set, expected }) => {
        const result = numberOfSuns(set);

        expect(result).toEqual(expected);
    });
});

describe('renderArrayAsTableInLogs', () => {
    beforeEach(() => {
        // Clear mock calls before each test
        console.log.mockClear();
        console.error.mockClear();
    });

    test('should render a 1D array as a 2D array with default 3 columns', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        renderArrayAsTableInLogs(input);
        expect(console.log).toHaveBeenCalledWith([[1, 2, 3], [4, 5, 6], [7, 8]]);
    });

    test('should render a 1D array as a 2D array with specified number of columns', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8];
        renderArrayAsTableInLogs(input, 4);
        expect(console.log).toHaveBeenCalledWith([[1, 2, 3, 4], [5, 6, 7, 8]]);
    });

    test('should handle an empty array', () => {
        renderArrayAsTableInLogs([]);
        expect(console.log).toHaveBeenCalledWith([]);
    });

    test('should handle an array with fewer elements than columns', () => {
        const input = [1, 2];
        renderArrayAsTableInLogs(input, 3);
        expect(console.log).toHaveBeenCalledWith([[1, 2]]);
    });

    test('should log an error for non-array input', () => {
        renderArrayAsTableInLogs('not an array');
        expect(console.error).toHaveBeenCalledWith('Input must be an array of numbers');
        expect(console.log).not.toHaveBeenCalled();
    });

    test('should handle an array with non-number elements', () => {
        const input = [1, 'two', 3, true, 5];
        renderArrayAsTableInLogs(input);
        expect(console.log).toHaveBeenCalledWith([[1, 'two', 3], [true, 5]]);
    });
});

describe('hasNumberArrayChanged', () => {
    test('returns false for identical number arrays', () => {
        const arr1 = [1, 2, 3, 4, 5];
        const arr2 = [1, 2, 3, 4, 5];
        expect(hasNumberArrayChanged(arr1, arr2)).toBe(false);
    });

    test('returns true for arrays with different numbers', () => {
        const arr1 = [1, 2, 3, 4, 5];
        const arr2 = [1, 2, 3, 4, 6];
        expect(hasNumberArrayChanged(arr1, arr2)).toBe(true);
    });

    test('returns true for arrays with different lengths', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [1, 2, 3, 4];
        expect(hasNumberArrayChanged(arr1, arr2)).toBe(true);
    });

    test('returns true if one array contains a non-number', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [1, 2, '3'];
        expect(hasNumberArrayChanged(arr1, arr2)).toBe(true);
    });

    test('returns false for empty arrays', () => {
        expect(hasNumberArrayChanged([], [])).toBe(false);
    });

    test('throws error if first argument is not an array', () => {
        expect(() => hasNumberArrayChanged('not an array', [1, 2, 3])).toThrow('Both inputs must be arrays');
    });

    test('throws error if second argument is not an array', () => {
        expect(() => hasNumberArrayChanged([1, 2, 3], 'not an array')).toThrow('Both inputs must be arrays');
    });

    test('returns true for arrays with same numbers in different order', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [3, 2, 1];
        expect(hasNumberArrayChanged(arr1, arr2)).toBe(true);
    });

    test('handles arrays with floating point numbers', () => {
        const arr1 = [1.1, 2.2, 3.3];
        const arr2 = [1.1, 2.2, 3.3];
        expect(hasNumberArrayChanged(arr1, arr2)).toBe(false);
    });

    test('returns true for arrays with different floating point numbers', () => {
        const arr1 = [1.1, 2.2, 3.3];
        const arr2 = [1.1, 2.2, 3.30001];
        expect(hasNumberArrayChanged(arr1, arr2)).toBe(true);
    });

    test('handles arrays with negative numbers', () => {
        const arr1 = [-1, -2, -3];
        const arr2 = [-1, -2, -3];
        expect(hasNumberArrayChanged(arr1, arr2)).toBe(false);
    });

    test('returns true for arrays with different negative numbers', () => {
        const arr1 = [-1, -2, -3];
        const arr2 = [-1, -2, -4];
        expect(hasNumberArrayChanged(arr1, arr2)).toBe(true);
    });
});
