// Import the function to be tested
const {renderArrayAsTableInLogs} = require('./t-utils'); // Replace 'yourFile' with the actual file name

// Mock console.log and console.error
console.log = jest.fn();
console.error = jest.fn();

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
