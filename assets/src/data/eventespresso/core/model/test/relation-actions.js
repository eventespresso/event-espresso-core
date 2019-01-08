/**
 * External imports
 */
import { isGenerator } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import * as actions from '../../actions';
import { createActions } from '../relation-actions';

jest.mock( '@eventespresso/model', () => ( {
	...require.requireActual( '@eventespresso/model' ),
	MODEL_NAMES: [ 'event' ],
} ) );

describe( 'createActions()', () => {
	const newActions = createActions( actions );
	const expectedActions = [
		[
			'createEventRelation',
			[ 10, 'datetimes', { DTT_name: test } ],
			'generator',
		],
		[
			'createEventRelations',
			[ 10, 'datetime', [ 20, 30 ] ],
			'generator',
		],
		[
			'removeDirtyEventRelationForAddition',
			[ 10, 'datetime', 20 ],
			'generator',
		],
		[
			'removeRelationForEvent',
			[ 10, 'datetime', 20 ],
			'generator',
		],
		[
			'persistAddRelationsForEvent',
			[],
			'generator',
		],
		[
			'persistDeleteRelationsForEvent',
			[],
			'generator',
		],
		[
			'persistRelationsForEvent',
			[],
			'generator',
		],
		[
			'persistEventRelationsForId',
			[ 10 ],
			'generator',
		],
		[
			'persistEventRelationsForIdAndRelation',
			[ 10, 'datetimes' ],
			'generator',
		],
		[
			'removeDirtyRelationsForEventId',
			[ 10, 'datetimes', 20 ],
			'generator',
		],
		[
			'receiveRelatedEntitiesForEventId',
			[ 10, 'datetimes', [ 20, 30 ] ],
			actions.receiveRelatedEntities(
				'event',
				10,
				'datetimes',
				[ 20, 30 ]
			),
		],
		[
			'receiveDirtyRelationIndexForEventId',
			[ 'datetimes', 20, 10 ],
			actions.receiveDirtyRelationIndex(
				'datetimes',
				20,
				'event',
				10
			),
		],
		[
			'receiveDirtyRelationAdditionForEventId',
			[ 'datetimes', 20, 10 ],
			actions.receiveDirtyRelationAddition(
				'datetimes',
				20,
				'event',
				10,
			),
		],
		[
			'receiveDirtyRelationDeletionForEventId',
			[ 'datetimes', 20, 10 ],
			actions.receiveDirtyRelationDeletion(
				'datetimes',
				20,
				'event',
				10
			),
		],
		[
			'receiveUpdatedEntityIdForEventRelations',
			[ 10, 20 ],
			actions.receiveUpdatedEntityIdForRelations(
				'event',
				10,
				20
			),
		],
		[
			'removeAllRelatedEntitiesForEventId',
			[ 10 ],
			actions.removeAllRelatedEntitiesForModelEntity(
				'event',
				10
			),
		],
		[
			'removeRelatedEntitiesForEventIdAndRelation',
			[ 10, 'datetimes', [ 20, 30 ] ],
			actions.removeRelatedEntities(
				'event',
				10,
				'datetimes',
				[ 20, 30 ]
			),
		],
		[
			'removeDirtyRelationIndexForEventIdAndRelation',
			[ 'datetimes', 20, 10 ],
			actions.removeDirtyRelationIndex(
				'datetimes',
				20,
				'event',
				10,
			),
		],
		[
			'removeDirtyRelationAdditionForEventIdAndRelation',
			[ 'datetimes', 20, 10 ],
			actions.removeDirtyRelationAddition(
				'datetimes',
				20,
				'event',
				10
			),
		],
		[
			'removeDirtyRelationDeletionForEventIdAndRelation',
			[ 'datetimes', 20, 10 ],
			actions.removeDirtyRelationDeletion(
				'datetimes',
				20,
				'event',
				10,
			),
		],
	];
	describe( 'creates expected actions for given model name', () => {
		expectedActions.forEach( ( [
			expectedAction,
			args,
			expectedResponse,
		] ) => {
			describe( expectedAction + '()', () => {
				it( 'is defined.', () => {
					expect( newActions[ expectedAction ] ).toBeDefined();
				} );
				it( 'returns expectedValue', () => {
					if ( expectedResponse === 'generator' ) {
						expect( isGenerator(
							newActions[ expectedAction ]( ...args )
						) ).toBe( true );
					} else {
						expect( newActions[ expectedAction ](
							...args
						) ).toEqual( expectedResponse );
					}
				} );
			} );
		} );
	} );
} );
