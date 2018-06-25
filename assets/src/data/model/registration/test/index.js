import {
	mapOrderBy,
	whereConditions,
	getQueryString,
} from '../';

describe( 'mapOrderBy()', () => {
	it( 'correctly maps incoming values to the correct expectation', () => {
		const incomingToExpectedMap = {
			reg_id: 'REG_ID',
			reg_date: 'REG_date',
		};
		for ( const incomingOrderBy in incomingToExpectedMap ) {
			const expectedValue = incomingToExpectedMap[ incomingOrderBy ];
			expect( mapOrderBy( incomingOrderBy ) ).toEqual( expectedValue );
		}
	} );
} );

describe( 'whereConditions()', () => {
	it( 'returns empty string when no parameters provided', () => {
		expect( whereConditions( {} ) ).toEqual( '' );
	} );
	it( 'returns expected string for supplied Event ID', () => {
		const testObject = { forEventId: 123 };
		expect( whereConditions( testObject ) ).toEqual( 'where[EVT_ID]=' + 123 );
	} );
	it( 'returns expected string for supplied Attendee ID', () => {
		const testObject = { forAttendeeId: 123 };
		expect( whereConditions( testObject ) ).toEqual( 'where[ATT_ID]=' + 123 );
	} );
	it( 'returns expected string for supplied Transaction ID', () => {
		const testObject = { forTransactionId: 123 };
		expect( whereConditions( testObject ) ).toEqual( 'where[TXN_ID]=' + 123 );
	} );
	it( 'returns expected string for supplied Ticket ID', () => {
		const testObject = { forTicketId: 123 };
		expect( whereConditions( testObject ) ).toEqual( 'where[TKT_ID]=' + 123 );
	} );
	it( 'returns expected string for supplied Status ID', () => {
		const testObject = { forStatusId: 'RPP' };
		expect( whereConditions( testObject ) ).toEqual( 'where[STS_ID]=RPP' );
	} );
} );

describe( 'getQueryString', () => {
	it( 'returns expected default for no arguments passed in', () => {
		expect( getQueryString() ).toEqual( 'limit=100&order=DESC&order_by=REG_date' );
	} );
} );
