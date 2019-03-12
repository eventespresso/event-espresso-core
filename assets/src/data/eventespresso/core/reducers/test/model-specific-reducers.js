/**
 * External imports
 */
import { Map } from 'immutable';

/**
 * Internal imports
 */
import handleReceiveSelector from '../model-specific-reducers';
import { receiveSelectorValue } from '../../model/model-specific-actions';
import { ACTION_TYPES } from '../../actions/action-types';

const { resets: resetTypes } = ACTION_TYPES;

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
	it( 'resets completely for RESET_ALL_MODEL_SPECIFIC', () => {
		const originalState = Map()
			.setIn(
				[ 'foo', JSON.stringify( [ 'bar', 10 ] ) ],
				'bar'
			).setIn(
				[ 'bar', JSON.stringify( [ 'foo', 42 ] ) ],
				'foo'
			);
		expect( handleReceiveSelector(
			originalState,
			{
				type: resetTypes.RESET_ALL_MODEL_SPECIFIC,
			}
		) ).toEqual( Map() );
	} );
	it( 'resets only the given selector and args leaving any other selectors' +
		' in state', () => {
		const originalState = Map()
			.setIn(
				[ 'foo', JSON.stringify( [ 'bar', 10 ] ) ],
				'bar'
			).setIn(
				[ 'foo', JSON.stringify( [ 'bar', 30 ] ) ],
				'jully'
			).setIn(
				[ 'bar', JSON.stringify( [ 'foo', 42 ] ) ],
				'foo'
			);
		const expectedState = originalState.deleteIn( [
			'foo',
			JSON.stringify( [ 'bar', 10 ] ),
		] );
		expect(
			handleReceiveSelector(
				originalState,
				{
					type: resetTypes.RESET_MODEL_SPECIFIC_FOR_SELECTOR,
					selector: 'foo',
					args: [ 'bar', 10 ],
				}
			)
		).toEqual( expectedState );
	} );
} );
