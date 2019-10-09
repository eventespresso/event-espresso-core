
/**
 * Internal dependencies
 */
import parseHtmlPlaceholders from '../parse-html-placeholders';

const PLACEHOLDER = '%%var%%';
const stringA = '%%var%% the preceding text should be replaced';
const stringB = 'ths text %%var%% should be replaced';
const stringC = 'the following text should be replaced: %%var%%';
const stringD = '%%var%%this text should be between two placeholders%%var%%';
const noPlaceholders = 'this string is missing placeholders';

const testData = [
	{
		testName: 'returns original text if "replacements" is empty array',
		testString: stringA,
		replacements: [],
		expectedResult: stringA,
		throwsError: false,
	},
	{
		testName: 'returns original text if "replacements" is empty string',
		testString: stringA,
		replacements: '',
		expectedResult: stringA,
		throwsError: false,
	},
	{
		testName: 'returns original text if "replacements" is null',
		testString: stringA,
		replacements: null,
		expectedResult: stringA,
		throwsError: false,
	},
	{
		testName: 'throws RangeError if string is missing placeholders',
		testString: noPlaceholders,
		replacements: [ 'turtle' ],
		expectedResult: null,
		throwsError: true,
	},
	{
		testName: 'throws RangeError if string has too many placeholders',
		testString: stringD,
		replacements: [ 'turtle' ],
		expectedResult: null,
		throwsError: true,
	},
	{
		testName: 'throws RangeError if too many replacements',
		testString: stringA,
		replacements: [ 'turtle', 'tortoise', 'terrapin' ],
		expectedResult: null,
		throwsError: true,
	},
	{
		testName: 'correctly substitutes placeholder at start of string',
		testString: stringA,
		replacements: [ 'turtle' ],
		expectedResult: stringA.replace( PLACEHOLDER, 'turtle' ),
		throwsError: false,
	},
	{
		testName: 'correctly substitutes placeholder in middle of string',
		testString: stringB,
		replacements: [ 'turtle' ],
		expectedResult: stringB.replace( PLACEHOLDER, 'turtle' ),
		throwsError: false,
	},
	{
		testName: 'correctly substitutes placeholder at end of string',
		testString: stringC,
		replacements: [ 'turtle' ],
		expectedResult: stringC.replace( PLACEHOLDER, 'turtle' ),
		throwsError: false,
	},
	{
		testName: 'correctly substitutes placeholders at both ends of string',
		testString: stringD,
		replacements: [ 'before', 'after' ],
		expectedResult: 'before' +
			stringD.replace( new RegExp( PLACEHOLDER, 'g' ), '' ) +
			'after',
		throwsError: false,
	},
	{
		testName: 'correctly substitutes linebreak for placeholder',
		testString: stringB,
		replacements: [ '<br />' ],
		expectedResult: stringB.replace( PLACEHOLDER, '<br />' ),
		throwsError: false,
	},
	{
		testName: 'correctly substitutes linebreak for HTML header tags',
		testString: stringD,
		replacements: [ '<h1>', '</h1>' ],
		expectedResult: '<h1>' +
			stringD.replace( new RegExp( PLACEHOLDER, 'g' ), '' ) +
			'</h1>',
		throwsError: false,
	},
];

describe( 'parseHtmlPlaceholders', () => {
	testData.forEach( ( test ) => {
		const {
			testName,
			testString,
			replacements,
			expectedResult,
			throwsError,
		} = test;
		it( testName, () => {
			const result = () => parseHtmlPlaceholders( testString, replacements );
			if ( throwsError ) {
				expect( result ).toThrow( RangeError );
			} else {
				expect( result() ).toEqual( expectedResult );
			}
		} );
	} );
} );
