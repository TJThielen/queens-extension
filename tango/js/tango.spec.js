const { checkOnly2, checkNumberOfTypes, checkCrossEquals, checkSet } = require("./tango");

describe("checkSet", () => {
    // Everything is properly testing past this function, but the helper that wraps all three functions needs to run otherwise
    //  we can't have perfect coverage :)
    it('should run', () => {
        const input = {
            set: [1, 1, 0, 0],
            signs: [null, null, null, null]
        };

        checkSet(input.set, input.set.length, input.signs);

        const expected = [1, 1, 2, 2];
        expect(input.set).toStrictEqual(expected);
    });

    describe("checkOnly2", () => {
        /**
         * Go through the set and find and locations with two of the same type back-to-back.
         * When they're found, place on each side a type of the opposite.
         */
        it.each([
            {
                input: [0, 2, 2, 0],
                expected: [1, 2, 2, 1],
            },
            {
                input: [1, 1, 0, 0, 0, 0],
                expected: [1, 1, 2, 0, 0, 0],
            },
        ])(
            "should place opposite types around if there are two of the same type next to each other given $input",
            ({ input, expected }) => {
                checkOnly2(input);

                expect(input).toStrictEqual(expected);
            }
        );

        /**
         * Go through the set and find and locations with two of the same type with an opening between.
         * When they're found, place an opposite type between them.
         */
        it.each([
            {
                input: [2, 0, 2, 0],
                expected: [2, 1, 2, 0],
            },
            {
                input: [0, 0, 1, 0, 1, 2],
                expected: [0, 0, 1, 2, 1, 2],
            },
        ])(
            "should place an opposite type between if there are two of the same type with an opening between given $input",
            ({ input, expected }) => {
                checkOnly2(input);

                expect(input).toStrictEqual(expected);
            }
        );
    });

    describe("checkNumberOfTypes", () => {
        it.each([{
            input: [2, 1, 0, 2, 2, 0],
            expected: [2, 1, 1, 2, 2, 1]
        }, {
            input: [1, 0, 1, 0],
            expected: [1, 2, 1, 2],
        }])('should fill remaining slots if the inputs has a certain type equal to half the length', ({ input, expected }) => {
            checkNumberOfTypes(input, input.length);

            expect(input).toStrictEqual(expected);
        });

        it('should handle two identical types at the start and end of a row', () => {
            const input = [2, 0, 1, 0, 0, 2];

            checkNumberOfTypes(input, input.length);

            expect(input).toStrictEqual([2, 1, 1, 0, 1, 2]);
        })
    });

    describe("checkCrossEquals", () => {
        it.each([{
            input: {
                set: [1, 2, 0, 0],
                signs: [],
            },
            expected: [1, 2, 0, 0],
        }, {
            input: {
                set: [2, 2, 0, 0, 0, 0],
                signs: [],
            },
            expected: [2, 2, 0, 0, 0, 0],
        }])('should skip all checks and do nothing if there are no signs', ({ input, expected }) => {
            checkCrossEquals(input.set, input.signs);

            expect(input.set).toStrictEqual(expected);
        });

        describe('when there are no types within the sign', () => {
            it.each([{
                input: {
                    set: [1, 0, 0, 0],
                    signs: [null, 'Equal', null],
                },
                expected: [1, 2, 2, 0],
            }, {
                input: {
                    set: [0, 0, 2, 0],
                    signs: ['Equal', null, null],
                },
                expected: [1, 1, 2, 0],
            }, {
                input: {
                    set: [2, 0, 0, 2, 0, 0],
                    signs: [null, null, null, null, 'Equal'],
                },
                expected: [2, 0, 0, 2, 1, 1],
            }, {
                input: {
                    set: [0, 0, 0, 0, 2, 1],
                    signs: ['Equal', null, null, null, null],
                },
                expected: [2, 0, 0, 0, 2, 1],
            }, {
                input: {
                    set: [1, 0, 0, 0, 0, 0],
                    signs: [null, null, null, null, 'Equal'],
                },
                expected: [1, 0, 0, 0, 2, 0]
            }])('should fill the sign if there is a type to either side of the Equal sign', ({ input, expected }) => {
                checkCrossEquals(input.set, input.signs);

                expect(input.set).toStrictEqual(expected);
            });

            it('should fill non-sign openings if there are two types outside of a Cross sign', () => {
                const input = {
                    set: [1, 1, 0, 0, 0, 0],
                    signs: [null, null, null, 'Cross', null],
                };

                checkCrossEquals(input.set, input.signs);

                const expected = [1, 1, 2, 0, 0, 2];
                expect(input.set).toStrictEqual(expected);
            });
        });

        describe('when there is a type within the sign', () => {
            describe('and the sign is Equal', () => {
                it('should completely fill signs if there are two equals', () => {
                    const input = {
                        set: [2, 0, 0, 0, 0, 0],
                        signs: ['Equal', null, null, 'Equal', null],
                    };

                    checkCrossEquals(input.set, input.signs);

                    const expected = [2, 2, 0, 1, 1, 0];
                    expect(input.set).toStrictEqual(expected);
                });

                it.each([{
                    input: {
                        set: [0, 0, 1, 0],
                        signs: [null, 'Equal', null],
                    },
                    expected: [0, 1, 1, 0],
                }, {
                    input: {
                        set: [1, 2, 0, 1, 0, 2],
                        signs: [null, null, null, 'Equal', null],
                    },
                    expected: [1, 2, 0, 1, 1, 2],
                }])('should set the types to each other within the side', ({ input, expected }) => {
                    checkCrossEquals(input.set, input.signs);

                    expect(input.set).toStrictEqual(expected);
                });

                it.each([{
                    input: {
                        set: [1, 0, 0, 0, 0, 0],
                        signs: ['Equal', null, null, null, null],
                    },
                    expected: [1, 1, 0, 0, 0, 2],
                }, {
                    input: {
                        set: [1, 2, 0, 0, 0, 2],
                        signs: [null, null, null, null, 'Equal'],
                    },
                    expected: [1, 2, 0, 0, 2, 2],
                }])('should fill the opposite side opening if the equals is all the way to one side', ({ input, expected }) => {
                    checkCrossEquals(input.set, input.signs);

                    expect(input.set).toStrictEqual(expected);
                });
            });

            describe('and the sign is Cross', () => {
                it.each([{
                    input: {
                        set: [1, 0, 0, 0, 0, 2],
                        signs: ['Cross', null, null, null, null],
                    },
                    expected: [1, 2, 0, 0, 0, 2],
                }, {
                    input: {
                        set: [1, 2, 0, 0],
                        signs: [null, 'Cross', null],
                    },
                    expected: [1, 2, 1, 0],
                }, {
                    input: {
                        set: [0, 0, 1, 0],
                        signs: [null, 'Cross', null],
                    },
                    expected: [0, 2, 1, 0],
                }])('should set the opposite number in the next position', ({ input, expected }) => {
                    checkCrossEquals(input.set, input.signs);

                    expect(input.set).toStrictEqual(expected);
                });
            });
        });
    });
});
