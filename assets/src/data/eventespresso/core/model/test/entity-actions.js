/**
 * External imports
 */
import { isGenerator } from '@eventespresso/validators';

/**
 * Internal dependencies
 */
import { EventEntities } from '../../../test/fixtures/base';
import * as actions from '../../actions';
import { createActions } from '../entity-actions';
import { ACTION_TYPES } from '../../actions/action-types';

const types = { ...ACTION_TYPES.entities, ...ACTION_TYPES.relations };

jest.mock( '@eventespresso/model', () => ( {
	...require.requireActual( '@eventespresso/model' ),
	MODEL_NAMES: [ 'event' ],
} ) );

describe( 'createActions()', () => {
	const newActions = createActions( actions );
	const expectedActions = [
		[
			'createEvent',
			[ EventEntities.a ],
			'generator',
		],
		[
			'deleteEventById',
			[ 10 ],
			'generator',
		],
		[
			'trashEventById',
			[ 10 ],
			'generator',
		],
		[
			'persistEventRecord',
			[ EventEntities.a ],
			'generator',
		],
		[
			'persistForEventId',
			[ 10 ],
			'generator',
		],
		[
			'persistForEventIds',
			[ 10, 20 ],
			'generator',
		],
		[
			'persistDeletesForEvent',
			[],
			'generator',
		],
		[
			'persistTrashesForEvent',
			[],
			'generator',
		],
		[
			'removeEventById',
			[ 10 ],
			{
				type: types.REMOVE_ENTITY_BY_ID,
				modelName: 'event',
				entityId: 10,
			},
		],
		[
			'removeDeleteEventId',
			[ 10 ],
			{
				type: types.REMOVE_DELETE_ENTITY_ID,
				modelName: 'event',
				entityId: 10,
			},
		],
		[
			'removeTrashEventId',
			[ 10 ],
			{
				type: types.REMOVE_TRASH_ENTITY_ID,
				modelName: 'event',
				entityId: 10,
			},
		],
		[
			'receiveEventsAndResolve',
			[ [ 10, 20 ] ],
			'generator',
		],
		[
			'receiveAndReplaceEventRecords',
			[ [ 10, 20 ] ],
			{
				type: types.RECEIVE_AND_REPLACE_ENTITY_RECORDS,
				modelName: 'event',
				entities: [ 10, 20 ],
			},
		],
		[
			'receiveTrashEventId',
			[ 10 ],
			{
				type: types.RECEIVE_TRASH_ENTITY_ID,
				modelName: 'event',
				entityId: 10,
			},
		],
		[
			'receiveDeleteEventId',
			[ 10 ],
			{
				type: types.RECEIVE_DELETE_ENTITY_ID,
				modelName: 'event',
				entityId: 10,
			},
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
