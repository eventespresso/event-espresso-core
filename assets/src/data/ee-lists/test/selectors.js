/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { getItems, isRequestingItems } from '../selectors';

describe( 'getItems()', () => {
	const state = deepFreeze( {
		event: {
			'some_query_string=1': [ { id: 1 } ],
		},
	} );
	it( 'returns empty array when modelName or queryString not found in state',
		() => {
			expect( getItems( state, 'event', 'notPresent=0' ) ).toEqual( [] );
			expect( getItems( state, 'invalid', 'some_query_string=1' ) )
				.toEqual( [] );
		},
	);

	it( 'returns value of model and queryString', () => {
		expect( getItems( state, 'event', 'some_query_string=1' ) )
			.toEqual( [ { id: 1 } ] );
	} );
} );

describe( 'isRequestingItems', () => {
	const state = deepFreeze( {
		event: {
			'some_query_string=1': [ { id: 1 } ],
		},
	} );
	it( 'returns true when invalid model name provided', () => {
		expect( isRequestingItems( state, 'invalid', 'some_query_string=1' ) )
			.toBe( true );
		expect( isRequestingItems( state, 'event', 'invalid_query_string' ) )
			.toBe( true );
	} );
	it( 'returns false when the provided arguments are set and there\'s a non null value in the state for them',
		() => {
			expect( isRequestingItems( state, 'event', 'some_query_string=1' ) )
				.toBe( false );
		},
	);
	it( 'returns true when the provided arguments are set and the value is null for them in the state',
		() => {
			const nullState = deepFreeze( {
				event: {
					'some_query_string=1': null,
				},
			} );
			expect( isRequestingItems( nullState,
				'event',
				'some_query_string=1',
			) )
				.toBe( true );
		},
	);
} );
