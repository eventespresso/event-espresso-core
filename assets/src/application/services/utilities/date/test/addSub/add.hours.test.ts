import { add } from '../../addSub';

describe('add.hours', () => {
	it('adds the given numbers of hours', () => {
		const result = add('hours', new Date(2014, 6 /* Jul */, 10, 23, 0), 2);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 11, 1, 0));
	});

	it('accepts a timestamp', () => {
		const result = add('hours', new Date(2014, 6 /* Jul */, 10, 23, 0).getTime(), 26);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 12, 1, 0));
	});

	it('converts a fractional number to an integer', () => {
		const result = add('hours', new Date(2014, 6 /* Jul */, 10, 23, 0), 2.5);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 11, 1, 0));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 6 /* Jul */, 10, 23, 0);
		add('hours', date, 10);
		expect(date).toEqual(new Date(2014, 6 /* Jul */, 10, 23, 0));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = add('hours', new Date(NaN), 2);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = add('hours', new Date(2014, 6 /* Jul */, 10, 23, 0), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
