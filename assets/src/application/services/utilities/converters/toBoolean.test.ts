import toBoolean from './toBoolean';

const testCases = [
	{
		desc: 'returns true when input is true',
		input: true,
		result: true,
	},
	{
		desc: 'returns false when input is false',
		input: false,
		result: false,
	},
	{
		desc: 'returns true when input is "true"',
		input: 'true',
		result: true,
	},
	{
		desc: 'returns true when input is "1"',
		input: '1',
		result: true,
	},
	{
		desc: 'returns true when input is "yes"',
		input: 'yes',
		result: true,
	},
	{
		desc: 'returns false when input is a non-empty string',
		input: 'hello',
		result: false,
	},
	{
		desc: 'returns false when input is an empty string',
		input: '',
		result: false,
	},
	{
		desc: 'returns false when input is an empty array',
		input: [],
		result: false,
	},
	{
		desc: 'returns false when input is a non-empty array',
		input: ['abc'],
		result: false,
	},
	{
		desc: 'returns false when input is an empty object',
		input: {},
		result: false,
	},
	{
		desc: 'returns false when input is a non-empty object',
		input: { hi: 'Hello' },
		result: false,
	},
	{
		desc: 'returns true when input is a positive number',
		input: 56,
		result: true,
	},
	{
		desc: 'returns true when input is a negative number',
		input: -56,
		result: true,
	},
	{
		desc: 'returns false when input is 0',
		input: 0,
		result: false,
	},
	{
		desc: 'returns false when input is null',
		input: null,
		result: false,
	},
	{
		desc: 'returns false when input is undefined',
		input: undefined,
		result: false,
	},
	{
		desc: 'returns false when input is NaN',
		input: NaN,
		result: false,
	},
];

describe('toBoolean', () => {
	testCases.forEach(({ desc, input, result }) => {
		it(desc, () => {
			expect(toBoolean(input)).toBe(result);
		});
	});
});
