import { sub } from '../../addSub';

describe('sub.quarters', () => {
	it('subtracts the given number of quarters', () => {
		const result = sub('quarters', new Date(2014, 8 /* Sep */, 1), 3);
		expect(result).toEqual(new Date(2013, 11 /* Dec */, 1));
	});

	it('accepts a timestamp', () => {
		const result = sub('quarters', new Date(2014, 8 /* Sep */, 1).getTime(), 4);
		expect(result).toEqual(new Date(2013, 8 /* Sep */, 1));
	});

	it('converts a fractional number to an integer', () => {
		const result = sub('quarters', new Date(2014, 8 /* Sep */, 1), 3.33);
		expect(result).toEqual(new Date(2013, 11 /* Dec */, 1));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 8 /* Sep */, 1);
		sub('quarters', date, 3);
		expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('works well if the desired month has fewer days and the provided date is in the last day of a month', () => {
		const date = new Date(2014, 11 /* Dec */, 31);
		const result = sub('quarters', date, 1);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 30));
	});

	it('handles dates before 100 AD', () => {
		const initialDate = new Date(0);
		initialDate.setFullYear(0, 10 /* Nov */, 30);
		initialDate.setHours(0, 0, 0, 0);
		const expectedResult = new Date(0);
		expectedResult.setFullYear(0, 1 /* Feb */, 29);
		expectedResult.setHours(0, 0, 0, 0);
		const result = sub('quarters', initialDate, 3);
		expect(result).toEqual(expectedResult);
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = sub('quarters', new Date(NaN), 3);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = sub('quarters', new Date(2014, 8 /* Sep */, 1), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
