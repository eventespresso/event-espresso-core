import {
	mapOrderBy,
	whereConditions,
	getQueryString,
} from '../query';
import { CHECKIN_STATUS_ID } from '../constants';

describe( 'mapOrderBy()', () => {
	it( 'correctly maps incoming values to the correct expectation', () => {
		const incomingToExpectedMap = {
			timestamp: 'CHK_timestamp',
			id: 'CHK_ID',
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
		const testObject = {
			forDatetimeId: 10,
			forEventId: 20,
			forRegistrationId: 15,
			forTicketId: 3,
			forStatusId: CHECKIN_STATUS_ID.STATUS_CHECKED_IN,
		};
		expect( whereConditions( testObject ) ).toEqual(
			'where[Registration.EVT_ID]=20' +
			'&where[DTT_ID]=10' +
			'&where[REG_ID]=15' +
			'&where[Registration.TKT_ID]=3' +
			'&where[CHK_in]=' + CHECKIN_STATUS_ID.STATUS_CHECKED_IN
		);
	} );
} );

describe( 'getQueryString', () => {
	it( 'returns expected default for no arguments passed in', () => {
		expect( getQueryString() ).toEqual(
			'limit=100&order=DESC&order_by=CHK_timestamp'
		);
	} );
} );
