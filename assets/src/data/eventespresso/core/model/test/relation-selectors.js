/**
 * Internal dependencies
 */
import * as selectors from '../../selectors';
import { createSelectors } from '../relation-selectors';
import { mockStateForTests } from '../../test/fixtures';

jest.mock( '@eventespresso/model', () => ( {
	...require.requireActual( '@eventespresso/model' ),
	MODEL_NAMES: [ 'event' ],
} ) );

describe( 'createSelectors()', () => {
	const newSelectors = createSelectors( selectors );
	const expectedSelectors = [
		[
			'getQueuedEventAdditionRelations',
			[ mockStateForTests ],
			selectors.getRelationAdditionsQueuedForModel(
				mockStateForTests, 'event'
			),
		],
		[
			'getQueuedEventDeleteRelations',
			[ mockStateForTests, 10 ],
			selectors.getRelationDeletionsQueuedForModel(
				mockStateForTests,
				'event',
			),
		],
		[
			'countRelationModelsIndexedForEventId',
			[ mockStateForTests, 10 ],
			selectors.countRelationModelsIndexedForEntity(
				mockStateForTests,
				'event',
				10
			),
		],
	];
	describe( 'creates expected actions for given model name', () => {
		expectedSelectors.forEach( ( [
			expectedSelector,
			args,
			expectedResponse,
		] ) => {
			describe( expectedSelector + '()', () => {
				it( 'is defined.', () => {
					expect( newSelectors[ expectedSelector ] ).toBeDefined();
				} );
				it( 'returns expectedValue', () => {
					expect( newSelectors[ expectedSelector ](
						...args
					) ).toEqual( expectedResponse );
				} );
			} );
		} );
	} );
} );
