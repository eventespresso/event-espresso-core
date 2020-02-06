import toInteger from './toInteger';

const testCases = [
	{
		desc: 'returns 0 when input is 0',
		input: 0,
		result: 0,
	},
	{
		desc: 'rounds input DOWNWARDS to the nearest integer, when it is a +ve numeric string',
		input: '5.623',
		result: 5,
	},
	{
		desc: 'rounds input UPWARDS to the nearest integer, when it is a -ve numeric string',
		input: '-5.623',
		result: -5,
	},
	{
		desc: 'rounds input DOWNWARDS to the nearest integer, when it is a +ve number',
		input: 8.9,
		result: 8,
	},
	{
		desc: 'rounds input UPWARDS to the nearest integer, when it is a -ve number',
		input: -0.78,
		result: -0,
	},
	{
		desc: 'returns NaN when input is a non numeric string',
		input: 'icecream',
		result: NaN,
	},
	{
		desc: 'returns 0 when input is null',
		input: null,
		result: 0,
	},
	{
		desc: 'returns NaN when input is undefined',
		input: undefined,
		result: NaN,
	},
	{
		desc: 'returns NaN when input is NaN',
		input: NaN,
		result: NaN,
	},
];

describe('toInteger', () => {
	testCases.forEach(({ desc, input, result }) => {
		it(desc, () => {
			expect(toInteger(input)).toBe(result);
		});
	});
});
