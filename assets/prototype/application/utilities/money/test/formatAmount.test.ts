import { formatAmount } from '../';

describe('formatAmount', () => {
	it('checks for formatted amount to be a string', () => {
		const decimalPlaces = 2;

		const format = formatAmount(decimalPlaces);
		const result = format(5);

		expect(typeof result).toBe('string');
	});

	it('checks for formatted amount for positive number of deicmal places', () => {
		const decimalPlaces = 2;

		const format = formatAmount(decimalPlaces);

		expect(format(5)).toEqual('5.00');
		expect(format(5.2)).toEqual('5.20');
		expect(format(-0.5)).toEqual('-0.50');
	});

	it('checks for formatted amount for 0 deicmal places', () => {
		const decimalPlaces = 0;

		const format = formatAmount(decimalPlaces);

		expect(format(5.0)).toEqual('5');
		expect(format(5.2)).toEqual('5');
		expect(format(-0.5)).toEqual('-1');
	});
});
