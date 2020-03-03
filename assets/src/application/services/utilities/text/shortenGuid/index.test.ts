import shortenGuid from './';

const testCases = [
	{
		desc: 'returns last 6 characters if the string is of more than 6 characters',
		guid: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
		result: 'UVWXYZ',
	},
	{
		desc: 'returns the actual string if it is of exactly 6 characters',
		guid: 'ABCD==',
		result: 'ABCD==',
	},
	{
		desc: 'returns the actual string if it is of less than 6 characters',
		guid: 'ABCD',
		result: 'ABCD',
	},
	{
		desc: 'returns empty string if it is empty',
		guid: '',
		result: '',
	},
];

describe('shortenGuid', () => {
	testCases.forEach((testCase) => {
		it(testCase.desc, () => {
			const expectedResult = shortenGuid(testCase.guid);

			expect(testCase.result).toBe(expectedResult);
		});
	});

	it('throws TypeError if null or undefined is passed', () => {
		[null, undefined].forEach((guid) => {
			const getShortenedGuid = (): string => shortenGuid(guid);
			expect(getShortenedGuid).toThrow(TypeError);
		});
	});
});
