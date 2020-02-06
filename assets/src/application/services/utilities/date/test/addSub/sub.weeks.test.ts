import { sub } from '../../addSub';

describe('sub.weeks', () => {
	it('subtracts the given number of weeks', () => {
		const result = sub('weeks', new Date(2014, 8 /* Sep */, 1), 4);
		expect(result).toEqual(new Date(2014, 7 /* Aug */, 4));
	});

	it('accepts a timestamp', () => {
		const result = sub('weeks', new Date(2014, 8 /* Sep */, 1).getTime(), 1);
		expect(result).toEqual(new Date(2014, 7 /* Aug */, 25));
	});

	it('converts a fractional number to an integer', () => {
		const result = sub('weeks', new Date(2014, 8 /* Sep */, 1), 4.2);
		expect(result).toEqual(new Date(2014, 7 /* Aug */, 4));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 8 /* Sep */, 1);
		sub('weeks', date, 2);
		expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = sub('weeks', new Date(NaN), 4);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = sub('weeks', new Date(2014, 8 /* Sep */, 1), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
