import {
	isFloat,
	isInteger,
	isNumeric,
	floatLessThanOrEqualTo,
	stringLengthLessThanOrEqualTo,
	numberLessThanOrEqualTo,
	floatGreaterThanOrEqualTo,
	stringLengthGreaterThanOrEqualTo,
	numberGreaterThanOrEqualTo,
} from '../validations';

const validations = [
	{
		name: 'isFloat',
		testCases: [
			{
				name: 'Integer Literals',
				tests: [
					{
						name: 'Negative integer string',
						value: '-10',
						result: false,
					},
					{ name: 'Zero string', value: '0', result: false },
					{
						name: 'Positive integer string',
						value: '5',
						result: false,
					},
					{
						name: 'Negative integer number',
						value: -16,
						result: false,
					},
					{ name: 'Zero integer number', value: 0, result: false },
					{
						name: 'Positive integer number',
						value: 32,
						result: false,
					},
					{
						name: 'Octal integer literal string',
						value: '040',
						result: false,
					},
					{
						name: 'Octal integer literal',
						value: 0o144,
						result: false,
					},
					{
						name: 'Hexadecimal integer literal string',
						value: '0xFF',
						result: false,
					},
					{
						name: 'Hexadecimal integer literal',
						value: 0xFFF,
						result: false,
					},
				],
			},
			{
				name: 'Floating-Point Literals',
				tests: [
					{
						name: 'Negative floating point string',
						value: '-1.6',
						result: false,
					},
					{
						name: 'Positive floating point string',
						value: '4.536',
						result: false,
					},
					{
						name: 'Negative floating point number',
						value: -2.6,
						result: true,
					},
					{
						name: 'Positive floating point number',
						value: 3.1415,
						result: true,
					},
					{
						name: 'Exponential notation with no decimal value',
						value: 8e5,
						result: false,
					},
					{
						name: 'Exponential notation with decimal value',
						value: 1.2345e+2,
						result: true,
					},
					{
						name: 'Exponential notation string',
						value: '123e-2',
						result: false,
					},
					{
						name: 'Integer with decimal value string',
						value: '1.00',
						result: false,
					},
				],
			},
			{
				name: 'Non-Numeric values',
				tests: [
					{ name: 'Empty string', value: '', result: false },
					{
						name: 'Whitespace characters string',
						value: '    ',
						result: false,
					},
					{
						name: 'Tab characters string',
						value: '\t\t',
						result: false,
					},
					{
						name: 'Alphanumeric character string',
						value: 'abcdefghijklm1234567890',
						result: false,
					},
					{
						name: 'Non-numeric character string',
						value: 'xabcdefx',
						result: false,
					},
					{
						name: 'Boolean true literal',
						value: true,
						result: false,
					},
					{
						name: 'Boolean false literal',
						value: false,
						result: false,
					},
					{
						name: 'Number with preceding non-numeric characters',
						value: 'bcfed5.2',
						result: false,
					},
					{
						name: 'Number with trailing non-numeric characters',
						value: '7.2acdgs',
						result: false,
					},
					{
						name: 'Undefined value',
						value: undefined,
						result: false,
					},
					{ name: 'Null value', value: null, result: false },
					{ name: 'NaN value', value: NaN, result: false },
					{
						name: 'Infinity primitive',
						value: Infinity,
						result: true,
					},
					{
						name: 'Positive Infinity',
						value: Number.POSITIVE_INFINITY,
						result: true,
					},
					{
						name: 'Negative Infinity',
						value: Number.NEGATIVE_INFINITY,
						result: true,
					},
					{
						name: 'Date object',
						value: new Date( 2009, 1, 1 ),
						result: false,
					},
					{ name: 'Empty object', value: {}, result: false },
					{
						name: 'Function instance',
						value: ( function() {} ),
						result: false,
					},
					{
						name: 'Numeric string in an Array',
						value: [ '4' ],
						result: false,
					},
					{ name: 'Number in an Array', value: [ 4 ], result: false },
					{
						name: 'Empty String in an Array',
						value: [ '' ],
						result: false,
					},
					{
						name: 'Whitespace in an Array',
						value: [ ' ' ],
						result: false,
					},
					{ name: 'Empty Array', value: [], result: false },
					{
						name: 'Boolean in an Array',
						value: [ true ],
						result: false,
					},
					{
						name: 'Null in an Array',
						value: [ null ],
						result: false,
					},
					{
						name: 'Comma in a number',
						value: '123,456',
						result: false,
					},
					{ name: 'new Number', value: Number(), result: false },
				],
			},
		],
	},
	{
		name: 'isInteger',
		testCases: [
			{
				name: 'Integer Literals',
				tests: [
					{
						name: 'Negative integer string',
						value: '-10',
						result: false,
					},
					{ name: 'Zero string', value: '0', result: false },
					{
						name: 'Positive integer string',
						value: '5',
						result: false,
					},
					{
						name: 'Negative integer number',
						value: -16,
						result: true,
					},
					{ name: 'Zero integer number', value: 0, result: true },
					{
						name: 'Positive integer number',
						value: 32,
						result: true,
					},
					{
						name: 'Octal integer literal string',
						value: '040',
						result: false,
					},
					{
						name: 'Octal integer literal',
						value: 0o144,
						result: true,
					},
					{
						name: 'Hexadecimal integer literal string',
						value: '0xFF',
						result: false,
					},
					{
						name: 'Hexadecimal integer literal',
						value: 0xFFF,
						result: true,
					},
				],
			},
			{
				name: 'Floating-Point Literals',
				tests: [
					{
						name: 'Negative floating point string',
						value: '-1.6',
						result: false,
					},
					{
						name: 'Positive floating point string',
						value: '4.536',
						result: false,
					},
					{
						name: 'Negative floating point number',
						value: -2.6,
						result: false,
					},
					{
						name: 'Positive floating point number',
						value: 3.1415,
						result: false,
					},
					{
						name: 'Exponential notation with no decimal value',
						value: 8e5,
						result: true,
					},
					{
						name: 'Exponential notation with decimal value',
						value: 1.2345e+2,
						result: false,
					},
					{
						name: 'Exponential notation string',
						value: '123e-2',
						result: false,
					},
					{
						name: 'Integer with decimal value string',
						value: '1.00',
						result: false,
					},
				],
			},
			{
				name: 'Non-Numeric values',
				tests: [
					{ name: 'Empty string', value: '', result: false },
					{
						name: 'Whitespace characters string',
						value: '    ',
						result: false,
					},
					{
						name: 'Tab characters string',
						value: '\t\t',
						result: false,
					},
					{
						name: 'Alphanumeric character string',
						value: 'abcdefghijklm1234567890',
						result: false,
					},
					{
						name: 'Non-numeric character string',
						value: 'xabcdefx',
						result: false,
					},
					{
						name: 'Boolean true literal',
						value: true,
						result: false,
					},
					{
						name: 'Boolean false literal',
						value: false,
						result: false,
					},
					{
						name: 'Number with preceding non-numeric characters',
						value: 'bcfed5.2',
						result: false,
					},
					{
						name: 'Number with trailing non-numeric characters',
						value: '7.2acdgs',
						result: false,
					},
					{
						name: 'Undefined value',
						value: undefined,
						result: false,
					},
					{ name: 'Null value', value: null, result: false },
					{ name: 'NaN value', value: NaN, result: false },
					{
						name: 'Infinity primitive',
						value: Infinity,
						result: false,
					},
					{
						name: 'Positive Infinity',
						value: Number.POSITIVE_INFINITY,
						result: false,
					},
					{
						name: 'Negative Infinity',
						value: Number.NEGATIVE_INFINITY,
						result: false,
					},
					{
						name: 'Date object',
						value: new Date( 2009, 1, 1 ),
						result: false,
					},
					{ name: 'Empty object', value: {}, result: false },
					{
						name: 'Function instance',
						value: ( function() {} ),
						result: false,
					},
					{
						name: 'Numeric string in an Array',
						value: [ '4' ],
						result: false,
					},
					{ name: 'Number in an Array', value: [ 4 ], result: false },
					{
						name: 'Empty String in an Array',
						value: [ '' ],
						result: false,
					},
					{
						name: 'Whitespace in an Array',
						value: [ ' ' ],
						result: false,
					},
					{ name: 'Empty Array', value: [], result: false },
					{
						name: 'Boolean in an Array',
						value: [ true ],
						result: false,
					},
					{
						name: 'Null in an Array',
						value: [ null ],
						result: false,
					},
					{
						name: 'Comma in a number',
						value: '123,456',
						result: false,
					},
					{ name: 'new Number', value: Number(), result: true },
				],
			},
		],
	},
	{
		name: 'isNumeric',
		testCases: [
			{
				name: 'Integer Literals',
				tests: [
					{
						name: 'Negative integer string',
						value: '-10',
						result: true,
					},
					{ name: 'Zero string', value: '0', result: true },
					{
						name: 'Positive integer string',
						value: '5',
						result: true,
					},
					{
						name: 'Negative integer number',
						value: -16,
						result: true,
					},
					{ name: 'Zero integer number', value: 0, result: true },
					{
						name: 'Positive integer number',
						value: 32,
						result: true,
					},
					{
						name: 'Octal integer literal string',
						value: '040',
						result: true,
					},
					{
						name: 'Octal integer literal',
						value: 0o144,
						result: true,
					},
					{
						name: 'Hexadecimal integer literal string',
						value: '0xFF',
						result: true,
					},
					{
						name: 'Hexadecimal integer literal',
						value: 0xFFF,
						result: true,
					},
				],
			},
			{
				name: 'Floating-Point Literals',
				tests: [
					{
						name: 'Negative floating point string',
						value: '-1.6',
						result: true,
					},
					{
						name: 'Positive floating point string',
						value: '4.536',
						result: true,
					},
					{
						name: 'Negative floating point number',
						value: -2.6,
						result: true,
					},
					{
						name: 'Positive floating point number',
						value: 3.1415,
						result: true,
					},
					{
						name: 'Exponential notation with no decimal value',
						value: 8e5,
						result: true,
					},
					{
						name: 'Exponential notation with decimal value',
						value: 1.2345e+2,
						result: true,
					},
					{
						name: 'Exponential notation string',
						value: '123e-2',
						result: true,
					},
					{
						name: 'Integer with decimal value string',
						value: '1.00',
						result: true,
					},
				],
			},
			{
				name: 'Non-Numeric values',
				tests: [
					{ name: 'Empty string', value: '', result: false },
					{
						name: 'Whitespace characters string',
						value: '    ',
						result: false,
					},
					{
						name: 'Tab characters string',
						value: '\t\t',
						result: false,
					},
					{
						name: 'Alphanumeric character string',
						value: 'abcdefghijklm1234567890',
						result: false,
					},
					{
						name: 'Non-numeric character string',
						value: 'xabcdefx',
						result: false,
					},
					{
						name: 'Boolean true literal',
						value: true,
						result: false,
					},
					{
						name: 'Boolean false literal',
						value: false,
						result: false,
					},
					{
						name: 'Number with preceding non-numeric characters',
						value: 'bcfed5.2',
						result: false,
					},
					{
						name: 'Number with trailing non-numeric characters',
						value: '7.2acdgs',
						result: false,
					},
					{
						name: 'Undefined value',
						value: undefined,
						result: false,
					},
					{ name: 'Null value', value: null, result: false },
					{ name: 'NaN value', value: NaN, result: false },
					{
						name: 'Infinity primitive',
						value: Infinity,
						result: false,
					},
					{
						name: 'Positive Infinity',
						value: Number.POSITIVE_INFINITY,
						result: false,
					},
					{
						name: 'Negative Infinity',
						value: Number.NEGATIVE_INFINITY,
						result: false,
					},
					{
						name: 'Date object',
						value: new Date( 2009, 1, 1 ),
						result: false,
					},
					{ name: 'Empty object', value: {}, result: false },
					{
						name: 'Function instance',
						value: ( function() {} ),
						result: false,
					},
					{
						name: 'Numeric string in an Array',
						value: [ '4' ],
						result: false,
					},
					{ name: 'Number in an Array', value: [ 4 ], result: false },
					{
						name: 'Empty String in an Array',
						value: [ '' ],
						result: false,
					},
					{
						name: 'Whitespace in an Array',
						value: [ ' ' ],
						result: false,
					},
					{ name: 'Empty Array', value: [], result: false },
					{
						name: 'Boolean in an Array',
						value: [ true ],
						result: false,
					},
					{
						name: 'Null in an Array',
						value: [ null ],
						result: false,
					},
					{
						name: 'Comma in a number',
						value: '123,456',
						result: false,
					},
					{ name: 'new Number', value: Number(), result: true },
				],
			},
		],
	},
	{
		name: 'floatLessThanOrEqualTo',
		testCases: [
			{
				name: 'Valid results',
				tests: [
					{
						name: '3.6 <= 3.7',
						value: 3.6,
						result: true,
						maxMin: 3.7,
					},
					{
						name: '3.69 <= 3.7',
						value: 3.69,
						result: true,
						maxMin: 3.7,
					},
					{
						name: '3 <= 3.7',
						value: 3,
						result: true,
						maxMin: 3.7,
					},
					{
						name: 'Negative Infinity <= 3.7',
						value: Number.NEGATIVE_INFINITY,
						result: true,
						maxMin: 3.7,
					},
					{
						name: 'new Number <= 3.7',
						value: Number(),
						result: true,
						maxMin: 3.7,
					},
				],
			},
			{
				name: 'Invalid results',
				tests: [
					{
						name: '3.888 <= 3.7',
						value: 3.888,
						result: false,
						maxMin: 3.7,
					},
					{
						name: '3.92 <= 3.7',
						value: 3.92,
						result: false,
						maxMin: 3.7,
					},
					{
						name: '4.5 <= 3.7',
						value: 4.5,
						result: false,
						maxMin: 3.7,
					},
					{
						name: '50 <= 3.7',
						value: 50,
						result: false,
						maxMin: 3.7,
					},
					{
						name: '3.700001 <= 3.7',
						value: 3.700001,
						result: false,
						maxMin: 3.7,
					},
					{
						name: '3.71 <= 3.7',
						value: 3.71,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'String value "4" <= 3.7',
						value: '4',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Number with trailing non-numeric characters <= 3.7',
						value: '7.2acdgs',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'apple <= 3.7',
						value: 'apple',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Empty string <= 3.7',
						value: '',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Whitespace characters string <= 3.7',
						value: '    ',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Tab characters string <= 3.7',
						value: '\t\t',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Alphanumeric character string <= 3.7',
						value: 'abcdefghijklm1234567890',
						result: false,
					},
					{
						name: 'Non-numeric character string <= 3.7',
						value: 'xabcdefx',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Boolean true literal <= 3.7',
						value: true,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Boolean false literal <= 3.7',
						value: false,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Number with preceding non-numeric characters <= 3.7',
						value: 'bcfed5.2',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Undefined value <= 3.7',
						value: undefined,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Null value <= 3.7',
						value: null,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'NaN value <= 3.7',
						value: NaN,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Infinity primitive <= 3.7',
						value: Infinity,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Positive Infinity <= 3.7',
						value: Number.POSITIVE_INFINITY,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Numeric string in an Array <= 3.7',
						value: [ '4' ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Number in an Array <= 3.7',
						value: [ 4 ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Comma in a number <= 3.7',
						value: '123,456',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Date object <= 3.7',
						value: new Date( 2009, 1, 1 ),
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Empty object <= 3.7',
						value: {},
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Function instance <= 3.7',
						value: ( function() {} ),
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Empty String in an Array <= 3.7',
						value: [ '' ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Whitespace in an Array <= 3.7',
						value: [ ' ' ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Empty Array <= 3.7',
						value: [],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Boolean in an Array <= 3.7',
						value: [ true ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Null in an Array <= 3.7',
						value: [ null ],
						result: false,
						maxMin: 3.7,
					},
				],
			},
		],
	},
	{
		name: 'floatGreaterThanOrEqualTo',
		testCases: [
			{
				name: 'Valid results',
				tests: [
					{
						name: '13.6 >= 3.7',
						value: 13.6,
						result: true,
						maxMin: 3.7,
					},
					{
						name: '13.69 >= 3.7',
						value: 13.69,
						result: true,
						maxMin: 3.7,
					},
					{
						name: '13 >= 3.7',
						value: 13,
						result: true,
						maxMin: 3.7,
					},
					{
						name: 'Infinity primitive >= 3.7',
						value: Infinity,
						result: true,
						maxMin: 3.7,
					},
					{
						name: 'Positive Infinity >= 3.7',
						value: Number.POSITIVE_INFINITY,
						result: true,
						maxMin: 3.7,
					},
				],
			},
			{
				name: 'Invalid results',
				tests: [
					{
						name: '2.888 >= 3.7',
						value: 2.888,
						result: false,
						maxMin: 3.7,
					},
					{
						name: '1.92 >= 3.7',
						value: 1.92,
						result: false,
						maxMin: 3.7,
					},
					{
						name: '1 >= 3.7',
						value: 1,
						result: false,
						maxMin: 3.7,
					},
					{
						name: '0 >= 3.7',
						value: 0,
						result: false,
						maxMin: 3.7,
					},
					{
						name: '3.69999999 >= 3.7',
						value: 3.69999999,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'String value "2" >= 3.7',
						value: '2',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Number with trailing non-numeric characters >= 3.7',
						value: '1.2acdgs',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'apple >= 3.7',
						value: 'apple',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Empty string >= 3.7',
						value: '',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Whitespace characters string >= 3.7',
						value: '    ',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Tab characters string >= 3.7',
						value: '\t\t',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Alphanumeric character string >= 3.7',
						value: 'abcdefghijklm1234567890',
						result: false,
					},
					{
						name: 'Non-numeric character string >= 3.7',
						value: 'xabcdefx',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Boolean true literal >= 3.7',
						value: true,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Boolean false literal >= 3.7',
						value: false,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Number with preceding non-numeric characters >= 3.7',
						value: 'bcfed5.2',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Undefined value >= 3.7',
						value: undefined,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Null value >= 3.7',
						value: null,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'NaN value >= 3.7',
						value: NaN,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Negative Infinity >= 3.7',
						value: Number.NEGATIVE_INFINITY,
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Numeric string in an Array >= 3.7',
						value: [ '2' ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Number in an Array >= 3.7',
						value: [ 2 ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Comma in a number >= 3.7',
						value: '1,234,567',
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Date object >= 3.7',
						value: new Date( 2009, 1, 1 ),
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Empty object >= 3.7',
						value: {},
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Function instance >= 3.7',
						value: ( function() {} ),
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Empty String in an Array >= 3.7',
						value: [ '' ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Whitespace in an Array >= 3.7',
						value: [ ' ' ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Empty Array >= 3.7',
						value: [],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Boolean in an Array >= 3.7',
						value: [ true ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'Null in an Array >= 3.7',
						value: [ null ],
						result: false,
						maxMin: 3.7,
					},
					{
						name: 'new Number >= 3.7',
						value: Number(),
						result: false,
						maxMin: 3.7,
					},
				],
			},
		],
	},
	{
		name: 'numberLessThanOrEqualTo',
		testCases: [
			{
				name: 'Valid results',
				tests: [
					{
						name: '3 <= 4',
						value: 3,
						result: true,
						maxMin: 4,
					},
					{
						name: '3.69 <= 4',
						value: 3.69,
						result: true,
						maxMin: 4,
					},
					{
						name: 'new Number <= 4',
						value: Number(),
						result: true,
						maxMin: 4,
					},
				],
			},
			{
				name: 'Invalid results',
				tests: [
					{
						name: '5 <= 4',
						value: 5,
						result: false,
						maxMin: 4,
					},
					{
						name: '5.5 <= 4',
						value: 5.5,
						result: false,
						maxMin: 4,
					},
					{
						name: '50 <= 4',
						value: 50,
						result: false,
						maxMin: 4,
					},
					{
						name: '400000 <= 4',
						value: 400000,
						result: false,
						maxMin: 4,
					},
					{
						name: 'String value "5" <= 4',
						value: '5',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Number with trailing non-numeric characters <= 4',
						value: '7.2acdgs',
						result: false,
						maxMin: 4,
					},
					{
						name: 'apple <= 4',
						value: 'apple',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Empty string <= 4',
						value: '',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Whitespace characters string <= 4',
						value: '    ',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Tab characters string <= 4',
						value: '\t\t',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Alphanumeric character string <= 4',
						value: 'abcdefghijklm1234567890',
						result: false,
					},
					{
						name: 'Non-numeric character string <= 4',
						value: 'xabcdefx',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Boolean true literal <= 4',
						value: true,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Boolean false literal <= 4',
						value: false,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Number with preceding non-numeric characters <= 4',
						value: 'bcfed5.2',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Undefined value <= 4',
						value: undefined,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Null value <= 4',
						value: null,
						result: false,
						maxMin: 4,
					},
					{
						name: 'NaN value <= 4',
						value: NaN,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Infinity primitive <= 4',
						value: Infinity,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Positive Infinity <= 4',
						value: Number.POSITIVE_INFINITY,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Negative Infinity <= 4',
						value: Number.NEGATIVE_INFINITY,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Date object <= 4',
						value: new Date( 2009, 1, 1 ),
						result: false,
						maxMin: 4,
					},
					{
						name: 'Empty object <= 4',
						value: {},
						result: false,
						maxMin: 4,
					},
					{
						name: 'Function instance <= 4',
						value: ( function() {} ),
						result: false,
						maxMin: 4,
					},
					{
						name: 'Empty String in an Array <= 4',
						value: [ '' ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Whitespace in an Array <= 4',
						value: [ ' ' ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Empty Array <= 4',
						value: [],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Boolean in an Array <= 4',
						value: [ true ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Null in an Array <= 4',
						value: [ null ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Numeric string in an Array <= 4',
						value: [ '5' ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Number in an Array <= 4',
						value: [ 5 ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Comma in a number <= 4',
						value: '123,456',
						result: false,
						maxMin: 4,
					},
				],
			},
		],
	},
	{
		name: 'numberGreaterThanOrEqualTo',
		testCases: [
			{
				name: 'Valid results',
				tests: [
					{
						name: '13.6 >= 4',
						value: 13.6,
						result: true,
						maxMin: 4,
					},
					{
						name: '13.69 >= 4',
						value: 13.69,
						result: true,
						maxMin: 4,
					},
					{
						name: '13 >= 4',
						value: 13,
						result: true,
						maxMin: 4,
					},
				],
			},
			{
				name: 'Invalid results',
				tests: [
					{
						name: '3 >= 4',
						value: 3,
						result: false,
						maxMin: 4,
					},
					{
						name: '1.92 >= 4',
						value: 1.92,
						result: false,
						maxMin: 4,
					},
					{
						name: '1 >= 4',
						value: 1,
						result: false,
						maxMin: 4,
					},
					{
						name: '0 >= 4',
						value: 0,
						result: false,
						maxMin: 4,
					},
					{
						name: '3.69999999 >= 4',
						value: 3.69999999,
						result: false,
						maxMin: 4,
					},
					{
						name: 'String value "2" >= 4',
						value: '2',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Number with trailing non-numeric characters >= 4',
						value: '1.2acdgs',
						result: false,
						maxMin: 4,
					},
					{
						name: 'apple >= 4',
						value: 'apple',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Empty string >= 4',
						value: '',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Whitespace characters string >= 4',
						value: '    ',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Tab characters string >= 4',
						value: '\t\t',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Alphanumeric character string >= 4',
						value: 'abcdefghijklm1234567890',
						result: false,
					},
					{
						name: 'Non-numeric character string >= 4',
						value: 'xabcdefx',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Boolean true literal >= 4',
						value: true,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Boolean false literal >= 4',
						value: false,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Number with preceding non-numeric characters >= 4',
						value: 'bcfed5.2',
						result: false,
						maxMin: 4,
					},
					{
						name: 'Undefined value >= 4',
						value: undefined,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Null value >= 4',
						value: null,
						result: false,
						maxMin: 4,
					},
					{
						name: 'NaN value >= 4',
						value: NaN,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Infinity primitive >= 4',
						value: Infinity,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Positive Infinity >= 4',
						value: Number.POSITIVE_INFINITY,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Negative Infinity >= 4',
						value: Number.NEGATIVE_INFINITY,
						result: false,
						maxMin: 4,
					},
					{
						name: 'Date object >= 4',
						value: new Date( 2009, 1, 1 ),
						result: false,
						maxMin: 4,
					},
					{
						name: 'Empty object >= 4',
						value: {},
						result: false,
						maxMin: 4,
					},
					{
						name: 'Function instance >= 4',
						value: ( function() {} ),
						result: false,
						maxMin: 4,
					},
					{
						name: 'Empty String in an Array >= 4',
						value: [ '' ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Whitespace in an Array >= 4',
						value: [ ' ' ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Empty Array >= 4',
						value: [],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Boolean in an Array >= 4',
						value: [ true ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Null in an Array >= 4',
						value: [ null ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Numeric string in an Array >= 4',
						value: [ '2' ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Number in an Array >= 4',
						value: [ 2 ],
						result: false,
						maxMin: 4,
					},
					{
						name: 'Comma in a number >= 4',
						value: '1,234,567',
						result: false,
						maxMin: 4,
					},
					{
						name: 'new Number >= 4',
						value: Number(),
						result: false,
						maxMin: 4,
					},
				],
			},
		],
	},
	{
		name: 'stringLengthLessThanOrEqualTo',
		testCases: [
			{
				name: 'Valid results',
				tests: [
					{
						name: 'String value "abcdefg" <= 12',
						value: 'abcdefg',
						result: true,
						maxMin: 12,
					},
					{
						name: 'String value "abcdefghijkl" <= 12',
						value: 'abcdefghijkl',
						result: true,
						maxMin: 12,
					},
					{
						name: 'String value "干𩸽𠮷野家千竈通り" <= 12',
						value: '干𩸽𠮷野家千竈通り',
						result: true,
						maxMin: 12,
					},
					{
						name: 'String value "5" <= 12',
						value: '5',
						result: true,
						maxMin: 12,
					},
					{
						name: 'Whitespace characters string <= 12',
						value: '    ',
						result: true,
						maxMin: 12,
					},
					{
						name: 'Empty string <= 12',
						value: '',
						result: true,
						maxMin: 12,
					},
					{
						name: 'Undefined value <= 12',
						value: undefined,
						result: true,
						maxMin: 12,
					},
					{
						name: 'Null value <= 12',
						value: null,
						result: true,
						maxMin: 12,
					},
					{
						name: 'Tab characters string <= 12',
						value: '\t\t',
						result: true,
						maxMin: 12,
					},
					{
						name: 'Number with trailing non-numeric characters <= 12',
						value: '7.2acdgs',
						result: true,
						maxMin: 12,
					},
					{
						name: 'Numeric string in an Array <= 12',
						value: [ '5' ],
						result: true,
						maxMin: 12,
					},
					{
						name: 'Number in an Array <= 12',
						value: [ 5 ],
						result: true,
						maxMin: 12,
					},
					{
						name: 'Comma in a number <= 12',
						value: '123,456',
						result: true,
						maxMin: 12,
					},
					{
						name: 'Function instance <= 12',
						value: ( function() {} ),
						result: true,
						maxMin: 12,
					},
					{
						name: 'Empty String in an Array <= 12',
						value: [ '' ],
						result: true,
						maxMin: 12,
					},
					{
						name: 'Whitespace in an Array <= 12',
						value: [ ' ' ],
						result: true,
						maxMin: 12,
					},
					{
						name: 'Empty Array <= 12',
						value: [],
						result: true,
						maxMin: 12,
					},
					{
						name: 'Boolean in an Array <= 12',
						value: [ true ],
						result: true,
						maxMin: 12,
					},
					{
						name: 'Null in an Array <= 12',
						value: [ null ],
						result: true,
						maxMin: 12,
					},
					{
						name: 'Boolean true literal <= 12',
						value: true,
						result: true,
						maxMin: 12,
					},
					{
						name: 'Boolean false literal <= 12',
						value: false,
						result: true,
						maxMin: 12,
					},
					{
						name: 'NaN value <= 12',
						value: NaN,
						result: true,
						maxMin: 12,
					},
					{
						name: 'Infinity primitive <= 12',
						value: Infinity,
						result: true,
						maxMin: 12,
					},
					{
						name: 'Positive Infinity <= 12',
						value: Number.POSITIVE_INFINITY,
						result: true,
						maxMin: 12,
					},
					{
						name: 'Negative Infinity <= 12',
						value: Number.NEGATIVE_INFINITY,
						result: true,
						maxMin: 12,
					},
					{
						name: 'Date object <= 12',
						value: new Date( 2009, 1, 1 ),
						result: true,
						maxMin: 12,
					},
					{
						name: 'Empty object <= 12',
						value: {},
						result: true,
						maxMin: 12,
					},
					{
						name: 'new Number <= 12',
						value: Number(),
						result: true,
						maxMin: 12,
					},
				],
			},
			{
				name: 'Invalid results',
				tests: [
					{
						name: 'Alphanumeric character string <= 12',
						value: 'abcdefghijklm1234567890',
						result: false,
						maxMin: 12,
					},
				],
			},
		],
	},
	{
		name: 'stringLengthGreaterThanOrEqualTo',
		testCases: [
			{
				name: 'Valid results',
				tests: [
					{
						name: 'String value "abcdefghijkl" >= 12',
						value: 'abcdefghijklmnopqrstuvwxyz',
						result: true,
						maxMin: 12,
					},
					{
						name: 'String value "干𩸽𠮷野家千竈通り𠀋" >= 12',
						value: '干𩸽𠮷野家千竈通り𠀋',
						result: true,
						maxMin: 12,
					},
				],
			},
			{
				name: 'Invalid results',
				tests: [
					{
						name: 'String value "abcdefg" >= 12',
						value: 'abcdefg',
						result: false,
						maxMin: 12,
					},
					{
						name: 'String value "5" >= 12',
						value: '5',
						result: false,
						maxMin: 12,
					},
					{
						name: 'Whitespace characters string >= 12',
						value: '    ',
						result: false,
						maxMin: 12,
					},
					{
						name: 'Undefined value >= 12',
						value: undefined,
						result: false,
						maxMin: 12,
					},
					{
						name: 'Boolean true literal >= 12',
						value: true,
						result: false,
						maxMin: 12,
					},
					{
						name: 'Boolean false literal >= 12',
						value: false,
						result: false,
						maxMin: 12,
					},
					{
						name: 'NaN value >= 12',
						value: NaN,
						result: false,
						maxMin: 12,
					},
					{
						name: 'Infinity primitive >= 12',
						value: Infinity,
						result: false,
						maxMin: 12,
					},
					{
						name: 'Positive Infinity >= 12',
						value: Number.POSITIVE_INFINITY,
						result: false,
						maxMin: 12,
					},
					{
						name: 'Negative Infinity >= 12',
						value: Number.NEGATIVE_INFINITY,
						result: false,
						maxMin: 12,
					},
					{
						name: 'Date object >= 12',
						value: new Date( 2009, 1, 1 ),
						result: false,
						maxMin: 12,
					},
					{
						name: 'Empty object >= 12',
						value: {},
						result: false,
						maxMin: 12,
					},
					{
						name: 'new Number >= 12',
						value: Number(),
						result: false,
						maxMin: 12,
					},
					{
						name: 'Tab characters string >= 12',
						value: '\t\t',
						result: false,
						maxMin: 12,
					},
					{
						name: 'Number with trailing non-numeric characters >= 12',
						value: '7.2acdgs',
						result: false,
						maxMin: 12,
					},
					{
						name: 'Numeric string in an Array >= 12',
						value: [ '5' ],
						result: false,
						maxMin: 12,
					},
					{
						name: 'Number in an Array >= 12',
						value: [ 5 ],
						result: false,
						maxMin: 12,
					},
					{
						name: 'Comma in a number >= 12',
						value: '123,456',
						result: false,
						maxMin: 12,
					},
					{
						name: 'Empty String in an Array >= 12',
						value: [ '' ],
						result: false,
						maxMin: 12,
					},
					{
						name: 'Whitespace in an Array >= 12',
						value: [ ' ' ],
						result: false,
						maxMin: 12,
					},
					{
						name: 'Empty Array >= 12',
						value: [],
						result: false,
						maxMin: 12,
					},
					{
						name: 'Boolean in an Array >= 12',
						value: [ true ],
						result: false,
						maxMin: 12,
					},
					{
						name: 'Null in an Array >= 12',
						value: [ null ],
						result: false,
						maxMin: 12,
					},
				],
			},
		],
	},
];

let result = '';
validations.forEach( validation => {
	validation.testCases.forEach( testCase => {
		describe( testCase.name + ' with ' + validation.name + '()', () => {
			testCase.tests.forEach( test => {
				const isString = test.name.indexOf( 'string' ) !== -1;
				result = 'returns ' + ( test.result ? 'true' : 'false' );
				result += ' for ' + test.name;
				result += ' // ' + validation.name + '(';
				result += isString ? '"' + test.value + '"' : test.value;
				result += ') = ' + ( test.result ? 'true' : 'false' );
				it( result, () => {
					switch ( validation.name ) {
						case 'isFloat':
							expect( isFloat( test.value ) )
								.toEqual( test.result );
							break;
						case 'isInteger':
							expect( isInteger( test.value ) )
								.toEqual( test.result );
							break;
						case 'isNumeric':
							expect( isNumeric( test.value ) )
								.toEqual( test.result );
							break;
						case 'floatLessThanOrEqualTo':
							expect( floatLessThanOrEqualTo( test.maxMin, test.value ) )
								.toEqual( test.result );
							break;
						case 'floatGreaterThanOrEqualTo':
							expect( floatGreaterThanOrEqualTo( test.maxMin, test.value ) )
								.toEqual( test.result );
							break;
						case 'numberLessThanOrEqualTo':
							expect( numberLessThanOrEqualTo( test.maxMin, test.value ) )
								.toEqual( test.result );
							break;
						case 'numberGreaterThanOrEqualTo':
							expect( numberGreaterThanOrEqualTo( test.maxMin, test.value ) )
								.toEqual( test.result );
							break;
						case 'stringLengthLessThanOrEqualTo':
							expect( stringLengthLessThanOrEqualTo( test.maxMin, test.value ) )
								.toEqual( test.result );
							break;
						case 'stringLengthGreaterThanOrEqualTo':
							expect( stringLengthGreaterThanOrEqualTo( test.maxMin, test.value ) )
								.toEqual( test.result );
							break;
						default:
							throw TypeError( 'Invalid validation method' );
					}
				} );
			} );
		} );
	} );
} );

// /assets/src/data/helpers/test/validations.js
