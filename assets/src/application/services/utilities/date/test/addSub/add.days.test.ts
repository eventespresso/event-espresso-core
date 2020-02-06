import { add } from '../../addSub';

describe('add.days', () => {
	it('adds the given number of days', () => {
		const result = add('days', new Date(2014, 8 /* Sep */, 1), 10);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 11));
	});

	it('accepts a timestamp', () => {
		const result = add('days', new Date(2014, 8 /* Sep */, 1).getTime(), 10);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 11));
	});

	it('converts a fractional number to an integer', () => {
		const result = add('days', new Date(2014, 8 /* Sep */, 1), 10.5);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 11));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 8 /* Sep */, 1);
		add('days', date, 11);
		expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = add('days', new Date(NaN), 10);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = add('days', new Date(2014, 8 /* Sep */, 1), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
