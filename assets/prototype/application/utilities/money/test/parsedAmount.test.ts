import { parsedAmount } from '../';

const testCases = [
	{
		desc: 'checks for parsed amount to be a number',
		amount: 5,
		testFn: (val: any): boolean => typeof val === 'number',
		result: true,
	},
	{
		desc: 'returns a numeric float for a numeric float',
		amount: 8.256,
		result: 8.256,
	},
	{
		desc: 'returns a numeric float for a string float',
		amount: '8.256',
		result: 8.256,
	},
	{
		desc: 'returns NaN for a non-numeric string',
		amount: 'carrot',
		testFn: (val: any): boolean => isNaN(val),
		result: true,
	},
	{
		desc: 'returns NaN for an empty string',
		amount: '',
		testFn: (val: any): boolean => isNaN(val),
		result: true,
	},
	{
		desc: 'returns NaN when amount is null',
		amount: null,
		testFn: (val: any): boolean => isNaN(val),
		result: true,
	},
	{
		desc: 'returns NaN when amount is undefined',
		amount: undefined,
		testFn: (val: any): boolean => isNaN(val),
		result: true,
	},
];

describe('formatAmount', () => {
	for (const testCase of testCases) {
		it(testCase.desc, () => {
			const result = parsedAmount(testCase.amount);
			const expectedResult = testCase.testFn ? testCase.testFn(result) : result;

			expect(testCase.result).toBe(expectedResult);
		});
	}
});
