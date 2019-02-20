/**
 * External imports
 */
import { Map } from 'immutable';

/**
 * Internal imports
 */
import handleReceiveSelector from '../model-specific-reducers';
import { receiveSelectorValue } from '../../model/model-specific-actions';

describe( 'handleReceiveSelector()', () => {
	it( 'returns expected default state with no change in action', () => {
		expect( handleReceiveSelector(
			undefined,
			{ type: 'SOME' },
		).toJS() ).toEqual( Map().toJS() );
	} );
	it( 'returns expected state with corresponding valid action', () => {
		const expectedState = Map().setIn( [
			'foo',
			JSON.stringify( [ 10, 20 ] ),
		], 'bar' );
		expect( handleReceiveSelector(
			Map(),
			receiveSelectorValue(
				'foo',
				'bar',
				10,
				20
			)
		).toJS() ).toEqual( expectedState.toJS() );
	} );
} );
