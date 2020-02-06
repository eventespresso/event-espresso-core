import { sub } from '../../addSub';

describe('sub.months', () => {
	it('subtracts the given number of months', () => {
		const result = sub('months', new Date(2015, 1 /* Feb */, 1), 5);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('accepts a timestamp', () => {
		const result = sub('months', new Date(2015, 8 /* Sep */, 1).getTime(), 12);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('converts a fractional number to an integer', () => {
		const result = sub('months', new Date(2015, 1 /* Feb */, 1), 5.999);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 8 /* Sep */, 1);
		sub('months', date, 12);
		expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('works well if the desired month has fewer days and the provided date is in the last day of a month', () => {
		const date = new Date(2014, 11 /* Dec */, 31);
		const result = sub('months', date, 3);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 30));
	});

	it('handles dates before 100 AD', () => {
		const initialDate = new Date(0);
		initialDate.setFullYear(1, 2 /* Mar */, 31);
		initialDate.setHours(0, 0, 0, 0);
		const expectedResult = new Date(0);
		expectedResult.setFullYear(1, 1 /* Feb */, 28);
		expectedResult.setHours(0, 0, 0, 0);
		const result = sub('months', initialDate, 1);
		expect(result).toEqual(expectedResult);
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = sub('months', new Date(NaN), 5);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = sub('months', new Date(2015, 1 /* Feb */, 1), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
