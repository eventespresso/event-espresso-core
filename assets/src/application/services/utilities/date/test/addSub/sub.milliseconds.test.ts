import { sub } from '../../addSub';

describe('sub.milliseconds', () => {
	it('subtracts the given number of milliseconds', () => {
		const result = sub('milliseconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0), 750);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 45, 29, 250));
	});

	it('accepts a timestamp', () => {
		const result = sub('milliseconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0).getTime(), 500);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 45, 29, 500));
	});

	it('converts a fractional number to an integer', () => {
		const result = sub('milliseconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0), 750.75);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 45, 29, 250));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0);
		sub('milliseconds', date, 250);
		expect(date).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = sub('milliseconds', new Date(NaN), 750);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = sub('milliseconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
