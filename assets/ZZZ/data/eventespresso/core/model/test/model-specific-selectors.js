/**
 * External imports
 */
import { Map } from 'immutable';

/**
 * Internal imports
 */
import { getSelectorValue } from '../model-specific-selectors';

describe( 'getLatestCheckin', () => {
	it( 'returns null when the selector does not exist in the state', () => {
		const mockState = { modelSpecific: Map() };
		expect( getSelectorValue( mockState, 'foo', 'bar' ) ).toBeNull();
	} );
	describe( 'testing selecting from the things in the state with different ' +
		'args', () => {
		let mockState;
		beforeEach( () => {
			mockState = {
				modelSpecific: Map()
					.setIn( [
						'foo',
						JSON.stringify( [ 10, 20 ] ),
					], 'bar' )
					.setIn( [
						'foo',
						JSON.stringify( [ 20, 30 ] ),
					], 'dally' )
					.setIn( [
						'bar',
						JSON.stringify( [ { 10: 'hello' }, 20 ] ),
					],
					{ foo: 'bar' } ),
			};
		} );
		[
			[ 'for value on foo that should exist', 'foo', [ 10, 20 ], 'bar' ],
			[
				'for value on foo that should exist',
				'foo',
				[ 20, 30 ],
				'dally',
			],
			[
				'for value on foo that should not exist',
				'foo',
				[ 40, 50 ],
				null,
			],
			[
				'for value on bar that should exist',
				'bar',
				[ { 10: 'hello' }, 20 ],
				{ foo: 'bar' },
			],
		].forEach( ( [
			description,
			selector,
			args,
			expectedValue,
		] ) => {
			it( description, () => {
				expect( getSelectorValue(
					mockState,
					selector,
					...args,
				) ).toEqual( expectedValue );
			} );
		} );
	} );
} );

