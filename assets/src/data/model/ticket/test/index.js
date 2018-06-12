import {
	mapOrderBy,
	whereConditions,
	getQueryString,
	nowDateAndTime,
} from '../';
import moment from 'moment';

describe( 'mapOrderBy()', () => {
	it( 'correctly maps incoming values to the correct expectation', () => {
		const incomingToExpectedMap = {
			start_date: 'TKT_start_date',
			end_date: 'TKT_end_date',
		};
		for ( const incomingOrderBy in incomingToExpectedMap ) {
			const expectedValue = incomingToExpectedMap[ incomingOrderBy ];
			expect( mapOrderBy( incomingOrderBy ) ).toEqual( expectedValue );
		}
	} );
} );

describe( 'whereConditions()', () => {
	it( 'returns expected default for empty object passed in', () => {
		expect( whereConditions( {} ) ).toEqual( '' );
	} );
	it( 'returns expected string for values passed in', () => {
		const expectedEndofDate = moment()
			.month( 'may' )
			.endOf( 'month' )
			.local()
			.format();
		const expectedStartofDate = moment()
			.month( 'may' )
			.startOf( 'month' )
			.local()
			.format();
		const GREATER_AND_EQUAL = encodeURIComponent( '>=' );
		const LESS_AND_EQUAL = encodeURIComponent( '<=' );
		const testObject = {
			showExpired: false,
			forEventId: 20,
			forDatetimeId: 123,
			month: 'may',
		};
		expect( whereConditions( testObject ) ).toEqual(
			'where[TKT_end_date**expired][]=>' +
			'&where[TKT_end_date**expired][]=' +
			nowDateAndTime.local().format() +
			'&where[TKT_start_date][]=' +
			GREATER_AND_EQUAL +
			'&where[TKT_start_date][]=' +
			expectedStartofDate +
			'&where[TKT_end_date][]=' +
			LESS_AND_EQUAL +
			'&where[TKT_end_date][]=' +
			expectedEndofDate +
			'&where[Event.EVT_ID]=' + 20 +
			'&where[Datetime.DTT_ID]=' + 123
		);
	} );
} );

describe( 'getQueryString', () => {
	it( 'returns expected default for no arguments passed in', () => {
		expect( getQueryString() ).toEqual(
			'limit=100&order=DESC&order_by=TKT_start_date' +
			'&where[TKT_end_date**expired][]=>' +
			'&where[TKT_end_date**expired][]=' +
			nowDateAndTime.local().format()
		);
	} );
} );
