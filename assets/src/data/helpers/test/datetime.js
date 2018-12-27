import {
	DATE_TIME_FORMAT_MYSQL,
	DATE_TIME_FORMAT_ISO8601,
	DATE_TIME_FORMAT_SITE,
	formatDateString,
	formatMysqlDateString,
	formatSiteDateString,
	stringToMoment,
	allDateTimesAsString,
} from '../datetime';
import moment from 'moment-timezone';

const testMoment = moment();
const testLocalMoment = moment( testMoment ).local();
const partialISO8601Format = 'YYYY-MM-DD[T]HH:mm';

describe( 'formatDateString()', () => {
	it( 'returns equivalent of now with no arguments provided.', () => {
		expect( formatDateString() ).toContain( moment()
			.format( partialISO8601Format ) );
	} );
	it( 'returns expected default format for incoming date string', () => {
		expect( formatDateString( testMoment.format() ) ).toEqual(
			testLocalMoment.format( DATE_TIME_FORMAT_ISO8601 ),
		);
	} );
	it( 'returns expected string when custom format provided and local set' +
		' to false', () => {
		expect( formatDateString( testMoment.format(), 'YY-MM-DD H', false ) )
			.toEqual(
				testMoment.format( 'YY-MM-DD H' ),
			);
	} );
} );

describe( 'formatMysqlDateString()', () => {
	it( 'returns the equivalent of now with no arguments provided.', () => {
		expect( formatMysqlDateString() ).toContain( moment()
			.format( 'YYYY-MM-DD HH:mm' ) );
	} );
	it( 'returns expected value for incoming date string', () => {
		expect( formatMysqlDateString( testMoment.format() ) ).toEqual(
			testLocalMoment.format( DATE_TIME_FORMAT_MYSQL ),
		);
	} );
	it( 'returns expected value for incoming date string and local set' +
		' false', () => {
		expect( formatMysqlDateString( testMoment.format() ) ).toEqual(
			testMoment.format( DATE_TIME_FORMAT_MYSQL ),
		);
	} );
} );

describe( 'formatSiteDateString()', () => {
	it( 'returns the equivalent of now with no arguments provided.', () => {
		expect( formatSiteDateString() ).toContain( moment()
			.format( 'YY-MM-DD HH:mm' ) );
	} );
	it( 'returns expected value for incoming date string', () => {
		expect( formatSiteDateString( testMoment.format() ) ).toEqual(
			testLocalMoment.format( DATE_TIME_FORMAT_SITE ),
		);
	} );
	it( 'returns expected value for incomign date string and local set' +
		' false', () => {
		expect( formatSiteDateString( testMoment.format() ) ).toEqual(
			testMoment.format( DATE_TIME_FORMAT_SITE ),
		);
	} );
} );

describe( 'stringToMoment()', () => {
	it( 'returns equivalent of now with no string provided', () => {
		// we can't get the exact match for the moment created, but this should
		// be close enough
		const now = moment();
		const actual = stringToMoment();
		expect( actual ).toBeInstanceOf( moment );
		expect( actual.format( 'YMDH' ) ).toEqual( now.format( 'YMDH' ) );
	} );
	it( 'returns a moment instance with given datestring', () => {
		expect( stringToMoment( testMoment.format() ) )
			.toBeInstanceOf( moment );
	} );
} );

describe( 'allDateTimesAsString()', () => {
	it( 'returns an empty string when no arguments provided', () => {
		expect( allDateTimesAsString() ).toEqual( '' );
	} );
	it( 'returns expected output with multiple datetime strings provided',
		() => {
			expect( allDateTimesAsString(
				' * ',
				testMoment.format(),
				testLocalMoment.format(),
				testMoment.format(),
			) ).toEqual(
				testMoment.format() +
				' * ' + testLocalMoment.format() +
				' * ' + testMoment.format(),
			);
		},
	);
} );
