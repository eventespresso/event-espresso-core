/**
 * WordPress dependencies
 */
import apiRequest from '@wordpress/api-request';

/**
 * Internal dependencies
 */
import { getItems } from '../resolvers';
import { receiveResponse } from '../actions';

jest.mock( '@wordpress/api-request' );
jest.mock( '@eventespresso/eejs', () => ( {
	data: {
		paths: {
			collection_endpoints: { event: '/ee/v4.8.36/events' },
		},
	},
} ) );

describe( 'getItems', () => {
	const EVENTS = [ { id: 1 } ];

	beforeAll( () => {
		apiRequest.mockImplementation( ( options ) => {
			if ( options.path === '/ee/v4.8.36/events?some_event=1' ) {
				return Promise.resolve( EVENTS );
			}
		} );
	} );

	it( 'yields with requested events', async () => {
		const fulfillment = getItems( {}, 'event', 'some_event=1' );
		const recieved = ( await fulfillment.next() ).value;
		expect( recieved ).toEqual(
			receiveResponse( 'event', 'some_event=1', EVENTS ),
		);
	} );
} );
