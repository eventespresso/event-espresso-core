/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { listItems } from '../reducers';

describe( 'listItems()', () => {
	it( 'returns an empty object by default', () => {
		const state = listItems( undefined, {} );
		expect( state ).toEqual( {} );
	} );

	it( 'assigns requested model and queryString to null (for known model)',
		() => {
			const originalState = deepFreeze( { event: {} } );
			const state = listItems( originalState, {
				type: 'SET_REQUESTED',
				modelName: 'event',
				queryString: '?some_value=1',
			} );
			expect( state ).toEqual( {
				event: {
					'?some_value=1': null,
				},
			} );
		},
	);
	it( 'does not assign requested model and queryString to null for unknown model',
		() => {
			const originalState = deepFreeze( {} );
			const state = listItems( originalState, {
				type: 'SET_REQUESTED',
				modelName: 'nonExistent',
				queryString: '?some_value=1',
			} );
			expect( state ).toEqual( {} );
		},
	);
	it( 'does not assign set the state for requested model and queryString to null for existing values already in state',
		() => {
			const originalState = deepFreeze( { event: { '?some_value=1': [] } } );
			const state = listItems( originalState, {
				type: 'SET_REQUESTED',
				modelName: 'event',
				queryString: '?some_value=1',
			} );
			expect( state ).toBe( originalState );
		},
	);
	it( 'returns with received events for known model', () => {
		const originalState = deepFreeze( { event: {} } );
		const state = listItems( originalState, {
			type: 'RECEIVE_LIST',
			modelName: 'event',
			queryString: '?some_value=1',
			items: [ { id: 1 } ],
		} );
		expect( state ).toEqual( {
			event: {
				'?some_value=1': [ { id: 1 } ],
			},
		} );
	} );
} );
