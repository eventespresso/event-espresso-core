/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { listItems } from '../reducers';

describe( 'listItems()', () => {
	it( 'returns the expected default object (from mock data)', () => {
		const state = listItems( undefined, {} );
		expect( state ).toEqual(
			{ events: [], terms: [], tickets: [], venues: [] },
		);
	} );
	it( 'returns with received events for known model and does not affect' +
		' original state', () => {
		const originalState = deepFreeze( { event: {} } );
		const state = listItems( originalState, {
			type: 'RECEIVE_LIST',
			modelName: 'event',
			queryString: '?some_value=1',
			items: [ { id: 1 } ],
		} );
		expect( state ).not.toEqual( originalState );
		expect( state ).toEqual( {
			event: {
				'?some_value=1': [ { id: 1 } ],
			},
		} );
	} );
	it( 'returns correct state for multiple consecutive queries', () => {
		const originalState = deepFreeze( { event: {} } );
		const state1 = listItems( originalState, {
			type: 'RECEIVE_LIST',
			modelName: 'event',
			queryString: '?some_value=1',
			items: [ { id: 1 } ],
		} );
		const state2 = listItems( state1, {
			type: 'RECEIVE_LIST',
			modelName: 'event',
			queryString: '?some_other_value=1',
			items: [ { id: 1 } ],
		} );
		const state3 = listItems( state2, {
			type: 'RECEIVE_LIST',
			modelName: 'event',
			queryString: '?some_value=1',
			items: [ { id: 1 } ],
		} );
		expect( state1 ).not.toEqual( originalState );
		expect( state1 ).toEqual( {
			event: {
				'?some_value=1': [ { id: 1 } ],
			},
		} );
		expect( state2 ).toEqual( {
			event: {
				'?some_value=1': [ { id: 1 } ],
				'?some_other_value=1': [ { id: 1 } ],
			},
		} );
		expect( state3 ).toBe( state2 );
	} );
} );
