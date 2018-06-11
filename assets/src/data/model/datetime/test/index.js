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
			start_date: 'DTT_EVT_start',
			end_date: 'DTT_EVT_end',
			DTT_ID: 'DTT_ID',
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
			month: 'may',
		};
		expect( whereConditions( testObject ) ).toEqual(
			'where[DTT_EVT_end**expired][]=>' +
			'&where[DTT_EVT_end**expired][]=' +
			nowDateAndTime.local().format() +
			'&where[DTT_EVT_start][]=' +
			GREATER_AND_EQUAL +
			'&where[DTT_EVT_start][]=' +
			expectedStartofDate +
			'&where[DTT_EVT_end][]=' +
			LESS_AND_EQUAL +
			'&where[DTT_EVT_end][]=' +
			expectedEndofDate +
			'&where[Event.EVT_ID]=' + 20
		);
	} );
} );

describe( 'getQueryString', () => {
	it( 'returns expected default for no arguments passed in', () => {
		expect( getQueryString() ).toEqual(
			'limit=100&order=desc&order_by=DTT_EVT_start' +
			'&where[DTT_EVT_end**expired][]=>' +
			'&where[DTT_EVT_end**expired][]=' +
			nowDateAndTime.local().format()
		);
	} );
} );
