/**
 * Internal imports
 */
import { removeEmptyFromState } from '../remove-empty-from-state';

/**
 * External imports
 */
import { fromJS } from 'immutable';

describe( 'removeEmptyFromState()', () => {
	const testState = fromJS( {
		level1: {
			level2a: {
				level3: {
					level4: [],
				},
			},
			level2b: {
				level3: {
					10: 'not empty',
					level4: [],
				},
			},
		},
	} );
	[
		[
			'level 1 remaining',
			[ 'level1', 'level2a', 'level3', 'level4' ],
			1,
			testState.deleteIn( [ 'level1', 'level2a' ] ),
		],
		[
			'2 levels remaining',
			[ 'level1', 'level2a', 'level3', 'level4' ],
			2,
			testState.deleteIn( [ 'level1', 'level2a', 'level3' ] ),
		],
		[
			'0 levels remaining',
			[ 'level1', 'level2a' ],
			0,
			testState.deleteIn( [ 'level1', 'level2a' ] ),
		],
		[
			'keeping non empty level',
			[ 'level1', 'level2b', 'level3', 'level4' ],
			1,
			testState.deleteIn( [ 'level1', 'level2b', 'level3', 'level4' ] )
		],
	].forEach( ( [
		description,
		path,
		length,
		expectedResult,
	] ) => {
		it( description + ' withMutations is true', () => {
			const resultState = removeEmptyFromState(
				testState,
				[ ...path ],
				length
			);
			expect( resultState ).toEqual( expectedResult );
		} );
		it( description + ' withMutations is not true', () => {
			const resultState = testState.withMutations( subState => {
				removeEmptyFromState(
					subState,
					path,
					length,
					false,
				);
			} );
			expect( resultState ).toEqual( expectedResult );
		} );
	} );
} );
