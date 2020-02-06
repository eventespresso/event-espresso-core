import { add } from '../../addSub';

describe('add.minutes', () => {
	it('adds the given number of minutes', () => {
		const result = add('minutes', new Date(2014, 6 /* Jul */, 10, 12, 0), 30);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 30));
	});

	it('accepts a timestamp', () => {
		const result = add('minutes', new Date(2014, 6 /* Jul */, 10, 12, 0).getTime(), 20);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 20));
	});

	it('converts a fractional number to an integer', () => {
		const result = add('minutes', new Date(2014, 6 /* Jul */, 10, 12, 0), 30.99);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 30));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 6 /* Jul */, 10, 12, 0);
		add('minutes', date, 25);
		expect(date).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 0));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = add('minutes', new Date(NaN), 30);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = add('minutes', new Date(2014, 6 /* Jul */, 10, 12, 0), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
