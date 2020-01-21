import { parsedAmount } from '../';

describe('parsedAmount', () => {
	it('checks for parsed amount to be a number', () => {
		const result = parsedAmount('5.256');

		expect(typeof result).toBe('number');
	});

	it('checks for parsed amount to be same as expected', () => {
		const result = parsedAmount('8.256');

		expect(result).toEqual(8.256);
	});
});
