const {getNums , getMean , getMedian , getMode} = require('./helper');
const ExpressError = require("./expressError");

describe("Helper functions", function () {

    test('getNums', function () {
        expect(() =>{getNums(undefined)}).toThrow(ExpressError);
        expect(() => {getNums("")}).toThrow(ExpressError);
        expect(() => {getNums("   ")}).toThrow(ExpressError);

        expect(getNums("1,2,3,4")).toEqual([1,2,3,4]);
    });


    test('getMean', function () {

        expect(getMean([1,2])).toBeCloseTo(1.5);
        expect(getMean([1,3])).toBe(2);
        expect(getMean([1,2,3,4])).toBeCloseTo(2.5);
    });


    test('getMedian', function () {

        expect(getMedian([1,2])).toBeCloseTo(1.5);
        expect(getMedian([3,2,1])).toBe(2);
        expect(getMedian([1,2,3,4])).toBeCloseTo(2.5);
    });


    test('getMode', function () {

        expect(getMode([1,2])).toStrictEqual([]);
        expect(getMode([3,2,1])).toStrictEqual([]);
        expect(getMode([1,2,3,4,1])).toStrictEqual([1]);
    });

});