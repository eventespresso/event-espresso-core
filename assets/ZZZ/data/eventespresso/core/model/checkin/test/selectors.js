/**
 * External imports
 */
import { Map } from 'immutable';
import { AuthedCheckinEntity } from '@test/fixtures';

/**
 * Internal imports
 */
import { getLatestCheckin } from '../selectors';

describe( 'getLatestCheckin()', () => {
	const mockState = {
		modelSpecific: Map()
			.setIn( [
				'getLatestCheckin',
				JSON.stringify( [ 10, 20 ] ),
			], 42 ),
		entities: Map()
			.setIn( [ 'checkin', 42 ], AuthedCheckinEntity ),
	};
	it( 'returns null when there is no value in the state for the given ' +
		'arguments', () => {
		expect( getLatestCheckin( mockState, 10, 30 ) )
			.toBeNull();
	} );
	it( 'returns expected value when it exists in the state for the given ' +
		'arguments', () => {
		expect( getLatestCheckin( mockState, 10, 20 ) )
			.toEqual( AuthedCheckinEntity );
	} );
} );
