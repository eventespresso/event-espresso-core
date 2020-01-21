import { amountsMatch } from '../';

const testCases = [
	{
		desc: 'checks for equality for same amounts as string',
		amount1: '5.623',
		amount2: '5.623',
		result: true,
	},
	{
		desc: 'checks for equality for same amounts as string and number',
		amount1: '7.453',
		amount2: 7.453,
		result: true,
	},
	{
		desc: 'checks for unequality for different amounts',
		amount1: '8.453',
		amount2: '7.453',
		result: false,
	},
	{
		desc: 'returns false when one value is not a number',
		amount1: 'cabbage',
		amount2: '7.453',
		result: false,
	},
	{
		desc: 'returns false when one value is null',
		amount1: null,
		amount2: '0',
		result: false,
	},
	{
		desc: 'returns false when both are null',
		amount1: null,
		amount2: null,
		result: false,
	},
	{
		desc: 'returns false when both are empty strings',
		amount1: '',
		amount2: '',
		result: false,
	},
	{
		desc: 'returns false when one is empty string and another is numeric 0',
		amount1: '',
		amount2: 0,
		result: false,
	},
	{
		desc: 'returns false when one is empty string and another is string 0',
		amount1: '',
		amount2: '0',
		result: false,
	},
	{
		desc: 'returns true when both are string 0',
		amount1: '0',
		amount2: '0',
		result: true,
	},
];

describe('amountsMatch', () => {
	for (const testCase of testCases) {
		it(testCase.desc, () => {
			const result = amountsMatch(testCase.amount1, testCase.amount2);
			expect(result).toBe(testCase.result);
		});
	}
});
