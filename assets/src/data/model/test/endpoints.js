import { Exception } from '@eventespresso/eejs';

import {
	endpoints,
	getEndpoint,
	applyQueryString,
} from '../endpoints';

describe( 'endpoints', () => {
	it( 'has the expected values from eejs.data', () => {
		expect( endpoints ).toEqual(
			{
				datetime: '/ee/v4.8.36/datetimes',
				event: '/ee/v4.8.36/events',
				ticket: '/ee/v4.8.36/tickets',
				venue: '/ee/v4.8.36/venues',
				term: '/ee/v4.8.36/terms',
				checkin: '/ee/v4.8.36/checkins',
				registration: '/ee/v4.8.36/registrations',
			},
		);
	} );
} );

describe( 'getEndpoint()', () => {
	it( 'throws an Exception if requested model is not' +
		' available.', () => {
		const t = () => {
			getEndpoint( 'model_not_exist' );
		};
		expect( t ).toThrowError( Exception );
	} );

	it( 'returns the correct endpoint value for the requested model', () => {
		expect(
			getEndpoint( 'event' ),
		).toEqual( '/ee/v4.8.36/events' );
	} );
} );

describe( 'applyQueryString()', () => {
	it( 'returns the expected value for the provided query string' +
		' for a valid model', () => {
		const queryString = 'something=1';
		expect(
			applyQueryString( 'event', queryString ),
		).toEqual( '/ee/v4.8.36/events?' + queryString );
	} );
} );
