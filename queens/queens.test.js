const { isEmpty, isCross, isQueen, getColumn, getRow, getColor } = require('.');

describe('isEmpty function', () => {
  test('should return true if text contains "Empty"', () => {
    const result = isEmpty('Empty cell of color Lavender, row 1, column 1');
    expect(result).toBe(true);
  });

  test('should return false if text does not contain "Empty"', () => {
    const result = isEmpty('This is not empty');
    expect(result).toBe(false);
  });

  test('should return false if text is an empty string', () => {
    const result = isEmpty('');
    expect(result).toBe(false);
  });
});


describe('isCross function', () => {
    test('should return true if text contains "Cross"', () => {
      const result = isCross('Cross of color Lavender, row 1, column 1');
      expect(result).toBe(true);
    });
  
    test('should return false if text does not contain "Cross"', () => {
      const result = isCross('nothing to see here');
      expect(result).toBe(false);
    });
  
    test('should return false if text is an empty string', () => {
      const result = isCross('');
      expect(result).toBe(false);
    });
});

describe('getRow function', () => {
    test('should return 1 if text contains "row 1"', () => {
      const result = getRow('Queen of color Lavender, row 1, column 1');
      expect(result).toBe(1);
    });
  
    test('should return 11 if text contains "row 11"', () => {
      const result = getRow('Queen of color Lavender, row 11, column 1');
      expect(result).toBe(11);
    });
  
    test('should return -1 if text does not contain "row <num>"', () => {
      const result = getRow('nothing here');
      expect(result).toBe(-1);
    });
});
  
describe('getColumn function', () => {
    test('should return 1 if text contains "column 1"', () => {
      const result = getColumn('Queen of color Lavender, row 1, column 1');
      expect(result).toBe(1);
    });
  
    test('should return 11 if text contains "column 11"', () => {
      const result = getColumn('Queen of color Lavender, row 1, column 11');
      expect(result).toBe(11);
    });
  
    test('should return -1 if text does not contain "column <num>"', () => {
      const result = getColumn('nothing here');
      expect(result).toBe(-1);
    });

    test('should return -1 if text contains "column <str>"', () => {
        const result = getColumn('column here');
        expect(result).toBe(-1);
    });
});
  
describe('getColor function', () => {
    test('should return Lavender if text contains "color Lavender"', () => {
      const result = getColor('Queen of color Lavender, row 1, column 1');
      expect(result).toBe("Lavender");
    });
  
    test('should return -1 if text does not contain "color <str>"', () => {
      const result = getColor('nothing here');
      expect(result).toBe(-1);
    });
});
