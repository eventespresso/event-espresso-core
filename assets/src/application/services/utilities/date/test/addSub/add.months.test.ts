import { add } from '../../addSub';

describe('add.months', () => {
	it('adds the given number of months', () => {
		const result = add('months', new Date(2014, 8 /* Sep */, 1), 5);
		expect(result).toEqual(new Date(2015, 1 /* Feb */, 1));
	});

	it('accepts a timestamp', () => {
		const result = add('months', new Date(2014, 8 /* Sep */, 1).getTime(), 12);
		expect(result).toEqual(new Date(2015, 8 /* Sep */, 1));
	});

	it('converts a fractional number to an integer', () => {
		const result = add('months', new Date(2014, 8 /* Sep */, 1), 5.75);
		expect(result).toEqual(new Date(2015, 1 /* Feb */, 1));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 8 /* Sep */, 1);
		add('months', date, 12);
		expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('works well if the desired month has fewer days and the provided date is in the last day of a month', () => {
		const date = new Date(2014, 11 /* Dec */, 31);
		const result = add('months', date, 2);
		expect(result).toEqual(new Date(2015, 1 /* Feb */, 28));
	});

	it('handles dates before 100 AD', () => {
		const initialDate = new Date(0);
		initialDate.setFullYear(0, 0 /* Jan */, 31);
		initialDate.setHours(0, 0, 0, 0);
		const expectedResult = new Date(0);
		expectedResult.setFullYear(0, 1 /* Feb */, 29);
		expectedResult.setHours(0, 0, 0, 0);
		const result = add('months', initialDate, 1);
		expect(result).toEqual(expectedResult);
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = add('months', new Date(NaN), 5);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = add('months', new Date(2014, 8 /* Sep */, 1), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
