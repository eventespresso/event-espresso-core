import { add } from '../../addSub';

describe('add.weeks', () => {
	it('adds the given number of weeks', () => {
		const result = add('weeks', new Date(2014, 8 /* Sep */, 1), 4);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 29));
	});

	it('accepts a timestamp', () => {
		const result = add('weeks', new Date(2014, 8 /* Sep */, 1).getTime(), 1);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 8));
	});

	it('converts a fractional number to an integer', () => {
		const result = add('weeks', new Date(2014, 8 /* Sep */, 1), 4.95);
		expect(result).toEqual(new Date(2014, 8 /* Sep */, 29));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 8 /* Sep */, 1);
		add('weeks', date, 2);
		expect(date).toEqual(new Date(2014, 8 /* Sep */, 1));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = add('weeks', new Date(NaN), 4);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = add('weeks', new Date(2014, 8 /* Sep */, 1), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
