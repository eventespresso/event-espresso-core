import {
	mapOrderBy,
	whereConditions,
	getQueryString,
} from '../';

describe( 'mapOrderBy()', () => {
	it( 'correctly maps incoming values to the correct expectation', () => {
		const incomingToExpectedMap = {
			id: 'ATT_ID',
			lastNameOnly: 'ATT_lname',
			firstNameOnly: 'ATT_fname',
			firstThenLastName: [ 'ATT_fname', 'ATT_lname' ],
			lastThenFirstName: [ 'ATT_lname', 'ATT_fname' ],
		};
		for ( const incomingOrderBy in incomingToExpectedMap ) {
			const expectedValue = incomingToExpectedMap[ incomingOrderBy ];
			expect( mapOrderBy( incomingOrderBy ) ).toEqual( expectedValue );
		}
	} );
} );

describe( 'whereConditions()', () => {
	it( 'returns empty string when NO parameters provided', () => {
		expect( whereConditions( {} ) ).toEqual( 'where[Registration.Status.STS_ID]=RAP' );
	} );
	it( 'returns expected string for supplied Event ID', () => {
		const testObject = { forEventId: 123 };
		expect( whereConditions( testObject ) ).toEqual(
			'where[Registration.EVT_ID]=123&where[Registration.Status.STS_ID]=RAP'
		);
	} );
	it( 'returns expected string for supplied Datetime ID', () => {
		const testObject = { forDatetimeId: 123 };
		expect( whereConditions( testObject ) ).toEqual(
			'where[Registration.Ticket.Datetime.DTT_ID]=123&where[Registration.Status.STS_ID]=RAP'
		);
	} );
	it( 'returns expected string for supplied Ticket ID', () => {
		const testObject = { forTicketId: 123 };
		expect( whereConditions( testObject ) ).toEqual(
			'where[Registration.Ticket.TKT_ID]=123&where[Registration.Status.STS_ID]=RAP'
		);
	} );
	it( 'returns expected string for supplied Status ID', () => {
		const testObject = { forStatusId: 'RPP' };
		expect( whereConditions( testObject ) ).toEqual(
			'where[Registration.Status.STS_ID]=RPP'
		);
	} );
	it( 'returns expected string when showGravatar is true', () => {
		const testObject = { showGravatar: true };
		expect( whereConditions( testObject ) ).toEqual(
			'where[Registration.Status.STS_ID]=RAP&calculate=user_avatar'
		);
	} );
	it( 'returns expected string when ALL parameters provided not' +
		' including Registration ID', () => {
		const testObject = {
			forEventId: 1,
			forDatetimeId: 2,
			forTicketId: 3,
			forStatusId: 'RNA',
			showGravatar: true,
		};
		expect( whereConditions( testObject ) ).toEqual(
			'where[Registration.Ticket.TKT_ID]=3' +
			'&where[Registration.Status.STS_ID]=RNA' +
			'&calculate=user_avatar'
		);
	} );
	it( 'returns expected string for supplied Registration ID', () => {
		const testObject = { forRegistrationId: 123 };
		expect( whereConditions( testObject ) ).toEqual(
			'where[Registration.REG_ID]=123&where[Registration.Status.STS_ID]=RAP'
		);
	} );
	it( 'returns expected string when ALL parameters provided including' +
		' Registration ID', () => {
		const testObject = {
			forEventId: 1,
			forDatetimeId: 2,
			forTicketId: 3,
			forRegistrationId: 123,
			forStatusId: 'RNA',
			showGravatar: true,
		};
		expect( whereConditions( testObject ) ).toEqual(
			'where[Registration.REG_ID]=123' +
			'&where[Registration.Status.STS_ID]=RNA' +
			'&calculate=user_avatar'
		);
	} );
} );

describe( 'getQueryString', () => {
	it( 'returns expected default for no arguments passed in', () => {
		expect( getQueryString() ).toEqual(
			'limit=100&order_by[ATT_lname]=ASC&order_by[ATT_fname]=ASC&where[Registration.Status.STS_ID]=RAP'
		);
	} );
} );

// location: assets/ZZZ/data/model/attendee/test/index.js
