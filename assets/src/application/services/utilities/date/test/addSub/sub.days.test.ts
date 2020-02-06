import { sub } from '../../addSub';

describe('sub.days', () => {
	it('subtracts the given number of days', () => {
		const result = sub('days', new Date(2014, 8 /* Sep */, 1), 10);
		expect(result).toEqual(new Date(2014, 7 /* Aug */, 22));
	});

	it('accepts a timestamp', () => {
		const result = sub('days', new Date(2014, 8 /* Sep */, 1).getTime(), 10);
		expect(result).toEqual(new Date(2014, 7 /* Aug */, 22));
	});

	it('converts a fractional number to an integer', () => {
		const result = sub('days', new Date(2014, 8 /* Sep */, 1), 10.85);
		expect(result).toEqual(new Date(2014, 7 /* Aug */, 22));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 8 /* Sep */, 1);
		sub('days', date, 11);
		expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = sub('days', new Date(NaN), 10);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = sub('days', new Date(2014, 8 /* Sep */, 1), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
