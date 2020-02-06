import { sub } from '../../addSub';

describe('sub.seconds', () => {
	it('subtracts the given number of seconds', () => {
		const result = sub('seconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 0), 30);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 44, 30));
	});

	it('accepts a timestamp', () => {
		const result = sub('seconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 0).getTime(), 20);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 44, 40));
	});

	it('converts a fractional number to an integer', () => {
		const result = sub('seconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 0), 30.5);
		expect(result).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 44, 30));
	});

	it('does not mutate the original date', () => {
		const date = new Date(2014, 6 /* Jul */, 10, 12, 45, 0);
		sub('seconds', date, 15);
		expect(date).toEqual(new Date(2014, 6 /* Jul */, 10, 12, 45, 0));
	});

	it('returns `Invalid Date` if the given date is invalid', () => {
		const result = sub('seconds', new Date(NaN), 30);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});

	it('returns `Invalid Date` if the given amount is NaN', () => {
		const result = sub('seconds', new Date(2014, 6 /* Jul */, 10, 12, 45, 0), NaN);

		expect(result).toBeInstanceOf(Date);
		expect(isNaN(Number(result))).toBe(true);
	});
});
