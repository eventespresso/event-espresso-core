import { formatAmount } from '../';

const testCases = [
	{
		desc: 'checks for formatted amount to be a string',
		decimalPlaces: 2,
		amount: 5,
		testFn: (val: any): boolean => typeof val === 'string',
		result: true,
	},
	{
		desc: 'adds leading zeros for integers',
		decimalPlaces: 2,
		amount: 5,
		result: '5.00',
	},
	{
		desc: 'adds leading zeros for positive float',
		decimalPlaces: 2,
		amount: 5.2,
		result: '5.20',
	},
	{
		desc: 'adds leading zeros for negative float',
		decimalPlaces: 2,
		amount: -0.5,
		result: '-0.50',
	},
	{
		desc: 'returns the same result for positive integer when decimalplaces is 0',
		decimalPlaces: 0,
		amount: 5,
		result: '5',
	},
	{
		desc: 'removes leading zeros for float when decimalplaces is 0',
		decimalPlaces: 0,
		amount: 5.0,
		result: '5',
	},
	{
		desc: 'rounds off positive float to integer when decimalplaces is 0',
		decimalPlaces: 0,
		amount: 5.2,
		result: '5',
	},
	{
		desc: 'rounds off negative float to integer when decimalplaces is 0',
		decimalPlaces: 0,
		amount: -0.5,
		result: '-1',
	},
	{
		desc: 'returns empty string when amount is null',
		decimalPlaces: 3,
		amount: null,
		result: '',
	},
	{
		desc: 'returns empty string when amount is empty string',
		decimalPlaces: 3,
		amount: '',
		result: '',
	},
	{
		desc: 'returns empty string when amount is undefined',
		decimalPlaces: 3,
		amount: undefined,
		result: '',
	},
];

describe('formatAmount', () => {
	for (const testCase of testCases) {
		it(testCase.desc, () => {
			const format = formatAmount(testCase.decimalPlaces);
			const result = format(testCase.amount);
			const expectedResult = testCase.testFn ? testCase.testFn(result) : result;

			expect(testCase.result).toBe(expectedResult);
		});
	}
});
