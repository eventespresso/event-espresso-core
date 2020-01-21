import { amountsMatch } from '../';

describe('amountsMatch', () => {
	it('checks for equality for same amounts as string', () => {
		const amount1 = '5.623';
		const amount2 = '5.623';

		const result = amountsMatch(amount1, amount2);

		expect(result).toBe(true);
	});

	it('checks for equality for same amounts as string and number', () => {
		const amount1 = '7.453';
		const amount2 = 7.453;

		const result = amountsMatch(amount1, amount2);

		expect(result).toBe(true);
	});

	it('checks for unequality for different amounts', () => {
		const amount1 = '8.453';
		const amount2 = '7.453';

		const result = amountsMatch(amount1, amount2);

		expect(result).toBe(false);
	});
});
