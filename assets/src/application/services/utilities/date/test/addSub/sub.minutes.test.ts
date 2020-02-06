import { sub } from '../../addSub';

describe('sub.minutes', () => {
	it('subtracts the given number of minutes', () => {
		const result = sub('minutes', new Date(2014, 6 /* Jul */, 10, 12, 0), 30);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 11, 30));
	});

	it('accepts a timestamp', () => {
		const result = sub('minutes', new Date(2014, 6 /* Jul */, 10, 12, 0).getTime(), 20);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 11, 40));
	});

	it('converts a fractional number to an integer', () => {
		const result = sub('minutes', new Date(2014, 6 /* Jul */, 10, 12, 0), 30.4);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 11, 30));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 6 /* Jul */, 10, 12, 0);
		sub('minutes', date, 25);
		expect(date).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 0));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = sub('minutes', new Date(NaN), 30);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = sub('minutes', new Date(2014, 6 /* Jul */, 10, 12, 0), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
