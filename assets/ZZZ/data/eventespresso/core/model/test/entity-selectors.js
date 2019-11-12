/**
 * Internal dependencies
 */
import * as selectors from '../../selectors';
import { createSelectors } from '../entity-selectors';
import { mockStateForTests } from '../../test/fixtures';

jest.mock( '@eventespresso/model', () => ( {
	...require.requireActual( '@eventespresso/model' ),
	MODEL_NAMES: [ 'event' ],
} ) );

describe( 'createSelectors()', () => {
	const newSelectors = createSelectors( selectors );
	const expectedSelectors = [
		[
			'getEventRecords',
			[ mockStateForTests ],
			selectors.getEntityRecordsForModel(
				mockStateForTests, 'event'
			),
		],
		[
			'getEventById',
			[ mockStateForTests, 10 ],
			selectors.getEntityById(
				mockStateForTests,
				'event',
				10
			),
		],
		[
			'getEventsByIds',
			[ mockStateForTests, [ 10, 20 ] ],
			selectors.getEntitiesByIds(
				mockStateForTests,
				'event',
				[ 10, 20 ]
			),
		],
		[
			'getEventIdsQueuedForTrash',
			[ mockStateForTests ],
			selectors.getEntityIdsQueuedForTrash(
				mockStateForTests,
				'event'
			),
		],
		[
			'getEventIdsQueuedForDelete',
			[ mockStateForTests ],
			selectors.getEntityIdsQueuedForDelete(
				mockStateForTests,
				'event',
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
