import {
	mapOrderBy,
	whereConditions,
	getQueryString,
	nowDateAndTime,
} from '../';
import {
	GREATER_THAN,
	GREATER_THAN_AND_EQUAL,
	LESS_THAN_AND_EQUAL,
} from '../../base';

import moment from 'moment-timezone';

const expectedNow = nowDateAndTime.local().format();

describe( 'mapOrderBy()', () => {
	it( 'correctly maps incoming values to the correct expectation', () => {
		const incomingToExpectedMap = {
			start_date: 'Datetime.DTT_EVT_start',
			end_date: 'Datetime.DTT_EVT_end',
			ticket_start: 'Datetime.Ticket.TKT_start_date',
			ticket_end: 'Datetime.Ticket.TKT_end_date',
			EVT_ID: 'EVT_ID',
		};
		for ( const incomingOrderBy in incomingToExpectedMap ) {
			const expectedValue = incomingToExpectedMap[ incomingOrderBy ];
			expect( mapOrderBy( incomingOrderBy ) ).toEqual( expectedValue );
		}
	} );
} );

describe( 'whereConditions()', () => {
	it( 'returns expected default for empty object passed in', () => {
		expect( whereConditions( {} ) ).toEqual(
			'where[Datetime.DTT_EVT_end**expired][]=' + GREATER_THAN +
			'&where[Datetime.DTT_EVT_end**expired][]=' + expectedNow
		);
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
		const testObject = {
			showExpired: false,
			categorySlug: 'test',
			month: 'may',
		};
		expect( whereConditions( testObject ) ).toEqual(
			'where[Datetime.DTT_EVT_end**expired][]=' + GREATER_THAN +
			'&where[Datetime.DTT_EVT_end**expired][]=' + expectedNow +
			'&where[Term_Relationship.Term_Taxonomy.Term.slug]=test' +
			'&where[Datetime.DTT_EVT_start][]=' + GREATER_THAN_AND_EQUAL +
			'&where[Datetime.DTT_EVT_start][]=' + expectedStartofDate +
			'&where[Datetime.DTT_EVT_end][]=' + LESS_THAN_AND_EQUAL +
			'&where[Datetime.DTT_EVT_end][]=' + expectedEndofDate,
		);
	} );
} );

describe( 'getQueryString', () => {
	it( 'returns expected default for no arguments passed in', () => {
		expect( getQueryString() ).toEqual(
			'limit=100&order=DESC&order_by=Datetime.DTT_EVT_start' +
			'&where[Datetime.DTT_EVT_end**expired][]=' + GREATER_THAN +
			'&where[Datetime.DTT_EVT_end**expired][]=' + expectedNow
		);
	} );
} );
