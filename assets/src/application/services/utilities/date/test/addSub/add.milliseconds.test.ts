import { add } from '../../addSub';

describe('add.milliseconds', () => {
	it('adds the given number of milliseconds', () => {
		const result = add('milliseconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0), 750);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 750));
	});

	it('accepts a timestamp', () => {
		const result = add('milliseconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0).getTime(), 500);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 500));
	});

	it('converts a fractional number to an integer', () => {
		const result = add('milliseconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0), 750.75);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 750));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0);
		add('milliseconds', date, 250);
		expect(date).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = add('milliseconds', new Date(NaN), 750);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = add('milliseconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 30, 0), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
