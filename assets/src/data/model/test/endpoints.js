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
				events: '/ee/v4.8.36/events',
				tickets: '/ee/v4.8.36/tickets',
				venues: '/ee/v4.8.36/venues',
				terms: '/ee/v4.8.36/terms',
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
			getEndpoint( 'events' ),
		).toEqual( '/ee/v4.8.36/events' );
	} );
} );

describe( 'applyQueryString()', () => {
	it( 'returns the expected value for the provided query string' +
		' for a valid model', () => {
		const queryString = 'something=1';
		expect(
			applyQueryString( 'events', queryString ),
		).toEqual( '/ee/v4.8.36/events?' + queryString );
	} );
} );
