import {
	mapOrderBy,
	whereConditions,
	getQueryString,
} from '../';
import * as statusModel from 'assets/src/data/model/status/index';

const testParams = [
	{
		statusType: statusModel.STATUS_TYPE_EMAIL,
		expected: 'email',
	},
	{
		statusType: statusModel.STATUS_TYPE_EVENT,
		expected: 'event',
	},
	{
		statusType: statusModel.STATUS_TYPE_MESSAGE,
		expected: 'message',
	},
	{
		statusType: statusModel.STATUS_TYPE_PAYMENT,
		expected: 'payment',
	},
	{
		statusType: statusModel.STATUS_TYPE_REGISTRATION,
		expected: 'registration',
	},
	{
		statusType: statusModel.STATUS_TYPE_TRANSACTION,
		expected: 'transaction',
	},
];

describe( 'mapOrderBy()', () => {
	it( 'correctly maps incoming values to the correct expectation', () => {
		const incomingToExpectedMap = {
			statusCode: 'STS_code',
		};
		for ( const incomingOrderBy in incomingToExpectedMap ) {
			const expectedValue = incomingToExpectedMap[ incomingOrderBy ];
			expect( mapOrderBy( incomingOrderBy ) ).toEqual( expectedValue );
		}
	} );
} );

describe( 'whereConditions()', () => {
	for ( let i = 0; i < testParams.length; i++ ) {
		it( 'returns expected where clause for statusType: ' + testParams[ i ].expected,
			() => {
				expect( whereConditions( testParams[ i ] ) )
					.toEqual( 'where[STS_type]=' + testParams[ i ].expected );
			}
		);
	}
} );

describe( 'getQueryString()', () => {
	for ( let i = 0; i < testParams.length; i++ ) {
		it( 'returns expected query string for statusType: ' + testParams[ i ].expected,
			() => {
				expect( getQueryString( testParams[ i ] ) )
					.toEqual(
						'limit=25&' +
						'order=ASC&' +
						'order_by=STS_code&' +
						'where[STS_type]=' + testParams[ i ].expected
					);
			}
		);
	}
} );
