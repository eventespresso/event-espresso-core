
/**
 * Internal dependencies
 */
import parseInfinity from '../parse-infinity';

const testData = [
	{
		doesThis: 'returns original value if it is a positive integer and "asInt" and "forDb" are true',
		input: 100,
		asInt: true,
		forDb: true,
		expectedResult: 100,
	},
	{
		doesThis: 'returns original value if it is a positive integer and "asInt" is false and "forDb" is true',
		input: 100,
		asInt: false,
		forDb: true,
		expectedResult: 100,
	},
	{
		doesThis: 'returns original value if it is a positive integer and "asInt" and "forDb" are false',
		input: 100,
		asInt: false,
		forDb: false,
		expectedResult: 100,
	},
	{
		doesThis: 'returns original value if it is a positive integer and "asInt" is true and "forDb" is false',
		input: 100,
		asInt: true,
		forDb: false,
		expectedResult: 100,
	},
	{
		doesThis: 'returns a positive integer value if the input is a decimal number and "asInt" and "forDb" are true',
		input: 101.98,
		asInt: true,
		forDb: true,
		expectedResult: 101,
	},
	{
		doesThis: 'returns a positive integer value if the input is a numeric string and "asInt" and "forDb" are true',
		input: '99',
		asInt: true,
		forDb: true,
		expectedResult: 99,
	},
	{
		doesThis: 'returns a positive integer value if the input is a numeric decimal string and "asInt" and "forDb" are true',
		input: '99.9',
		asInt: true,
		forDb: true,
		expectedResult: 99,
	},
	{
		doesThis: 'returns -1 if the input is an empty string and "asInt" and "forDb" are true',
		input: '',
		asInt: true,
		forDb: true,
		expectedResult: -1,
	},
	{
		doesThis: 'returns -1 if the input is an empty string and "asInt" is false and "forDb" is true',
		input: '',
		asInt: false,
		forDb: true,
		expectedResult: -1,
	},
	{
		doesThis: 'returns Infinity if the input is an empty string and "asInt" is false and "forDb" is false',
		input: '',
		asInt: false,
		forDb: false,
		expectedResult: Infinity,
	},
	{
		doesThis: 'returns -1 if the input is a negative integer and "asInt" and "forDb" are true',
		input: -5,
		asInt: true,
		forDb: true,
		expectedResult: -1,
	},
	{
		doesThis: 'returns -1 if the input is a negative integer and "asInt" is false and "forDb" is true',
		input: -5,
		asInt: false,
		forDb: true,
		expectedResult: -1,
	},
	{
		doesThis: 'returns Infinity if the input is a negative integer and "asInt" is false and "forDb" is false',
		input: -5,
		asInt: false,
		forDb: false,
		expectedResult: Infinity,
	},
	{
		doesThis: 'returns -1 if the input is Infinity and "asInt" and "forDb" are true',
		input: Infinity,
		asInt: true,
		forDb: true,
		expectedResult: -1,
	},
	{
		doesThis: 'returns -1 if the input is "INF" and "asInt" and "forDb" are true',
		input: 'INF',
		asInt: true,
		forDb: true,
		expectedResult: -1,
	},
	{
		doesThis: 'returns -1 if the input is undefined and "asInt" and "forDb" are true',
		input: undefined,
		asInt: true,
		forDb: true,
		expectedResult: -1,
	},
	{
		doesThis: 'returns -1 if the input is null and "asInt" and "forDb" are true',
		input: null,
		asInt: true,
		forDb: true,
		expectedResult: -1,
	},
	{
		doesThis: 'returns -1 if the input is a non-numeric string and "asInt" and "forDb" are true',
		input: 'hello',
		asInt: true,
		forDb: true,
		expectedResult: -1,
	},
	{
		doesThis: 'returns Infinity if the input is a non-numeric string and "asInt" is false',
		input: 'hello',
		asInt: false,
		expectedResult: Infinity,
	},
	{
		doesThis: 'returns -1 if the input is a non-numeric string and "asInt" is true and "forDb" is false',
		input: 'hello',
		asInt: true,
		forDb: false,
		expectedResult: -1,
	},
];

describe( 'parseInfinity', () => {
	testData.forEach( ( test ) => {
		const {
			doesThis,
			input,
			asInt,
			forDb,
			expectedResult,
		} = test;
		it( doesThis, () => {
			const result = parseInfinity( input, asInt, forDb );
			expect( result ).toEqual( expectedResult );
		} );
	} );
} );
