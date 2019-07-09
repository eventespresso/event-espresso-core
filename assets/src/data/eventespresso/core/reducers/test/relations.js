/**
 * External imports
 */
import { Set, Map, fromJS } from 'immutable';
import cuid from 'cuid';
import { DEFAULT_CORE_STATE } from '@eventespresso/model';

/**
 * Internal imports
 */
import {
	default as reducer,
	normalizedReceiveAndRemoveRelations,
	updateEntityIdForRelations,
	removeRelatedEntitiesForEntity,
} from '../relations';
import { mockStateForTests } from '../../test/fixtures';
import { EventEntities, DateTimeEntities } from '../../../test/fixtures/base';
import { ACTION_TYPES } from '../../actions/action-types';

const { relations: types, resets: resetTypes } = ACTION_TYPES;
const testCuid = cuid();

/**
 * Fixture is in this shape (js representation)
 *
 * {
 *   datetime: {
 *   	55: { event: [ 10, testCuid ] },
 *   	52: { event: [ 10 ] },
 *   	53: { event: [ 20 ] },
 *   	54: { event: [ 30 ] },
 *   	cuidD: { event: [ cuidE ] },
 *   },
 *   event: {
 *     10: { datetime: [ 55, 52 ] },
 *     testCuid: { datetime: [ 55 ] },
 *     20: { datetime: [ 53 ] },
 *     30: { datetime: [ 54 ] },
 *     cuidE: { datetime: [ cuidD ] },
 *   },
 *   price: {
 *   	200: { priceType: [ 10 ] },
 *   },
 *   priceType: {
 *     10: { price: [ 200 ] }
 *   }
 * }
 * @type {Map}
 */
const originalState = mockStateForTests.relations
	.setIn(
		[ 'datetime', 55 ],
		Map().set( 'event', Set.of( 10, testCuid ) )
	).setIn(
		[ 'event', 10, 'datetime' ],
		Set.of( 52, 55 )
	).setIn(
		[ 'datetime', 52 ],
		Map().set( 'event', Set.of( 10 ) ),
	).setIn(
		[ 'event', testCuid, 'datetime' ],
		Set.of( 55 )
	).setIn(
		[ 'price', 200 ],
		Map().set( 'priceType', Set.of( 10 ) )
	).setIn(
		[ 'priceType', 10, 'price' ],
		Set.of( 200 )
	);

describe( normalizedReceiveAndRemoveRelations.name + '()', () => {
	const testAction = (
		modelName,
		relationName,
		entityId,
		relatedEntityIds,
		type
	) => (
		{
			modelName,
			relationName,
			entityId,
			relatedEntityIds,
			type,
		}
	);
	[ types.RECEIVE_RELATED_ENTITY_IDS, types.REMOVE_RELATED_ENTITY_IDS ]
		.forEach( ( type ) => {
			describe( type + ' action type', () => {
				[
					[
						'original state remains on adding same relation and ' +
						'correctly removes existing relation',
						'datetime',
						'event',
						52,
						[ 10 ],
						originalState,
						originalState
							.deleteIn( [ 'datetime', 52 ] )
							.setIn(
								[ 'event', 10, 'datetime' ],
								Set.of( 55 )
							),
					],
					[
						'update state correctly for new relation where one of ' +
						'the models already exists in the state',
						'price',
						'ticket',
						200,
						[ testCuid ],
						originalState
							.setIn(
								[ 'price', 200, 'ticket' ],
								Set.of( testCuid ),
							).setIn(
								[ 'ticket', testCuid, 'price' ],
								Set.of( 200 )
							),
						originalState,
					],
					[
						'expected state for existing entities relations in state',
						'event',
						'datetime',
						10,
						[ 52 ],
						originalState,
						originalState
							.deleteIn( [ 'datetime', 52 ] )
							.setIn(
								[ 'event', 10, 'datetime' ],
								Set.of( 55 )
							),
					],
					[
						'expected state for new entities relations in state',
						'event',
						'datetime',
						10,
						[ 60, 52 ],
						originalState
							.setIn(
								[ 'datetime', 60, 'event' ],
								Set.of( 10 )
							)
							.setIn(
								[ 'event', 10, 'datetime' ],
								Set.of( 52, 60, 55 )
							),
						originalState
							.deleteIn( [ 'datetime', 52 ] )
							.setIn(
								[ 'event', 10, 'datetime' ],
								Set.of( 55 )
							),
					],
				].forEach( ( [
					description,
					modelName,
					relationName,
					entityId,
					relationIds,
					expectedReceiveState,
					expectedRemoveState,
				] ) => {
					const expectedState =
						type === types.RECEIVE_RELATED_ENTITY_IDS ?
							expectedReceiveState :
							expectedRemoveState;
					it( description, () => {
						const resultState = normalizedReceiveAndRemoveRelations(
							originalState,
							testAction(
								modelName,
								relationName,
								entityId,
								relationIds,
								type
							)
						);
						expect( resultState ).toEqual( expectedState );
					} );
				} );
			} );
		} );
} );

describe( updateEntityIdForRelations.name + '()', () => {
	const testAction = ( modelName, oldEntityId, newEntityId ) => ( {
		modelName,
		oldEntityId,
		newEntityId,
	} );
	[
		[
			'returns original state if there are no existing entries for the ' +
			'id',
			[ 'events', 70, 10 ],
			originalState,
		],
		[
			'returns original state if the model is not in the state',
			[ 'ticket', 10, 20 ],
			originalState,
		],
		[
			'replaces old Id with new id',
			[ 'event', EventEntities.d.id, 90 ],
			originalState
				.deleteIn( [ 'datetime', DateTimeEntities.d.id ] )
				.setIn(
					[ 'datetime', DateTimeEntities.d.id ],
					Map().set( 'event', Set.of( 90 ) )
				)
				.deleteIn( [ 'event', EventEntities.d.id ] )
				.setIn(
					[ 'event', 90 ],
					Map().set( 'datetime', Set.of( DateTimeEntities.d.id ) )
				),
		],
		[
			'replaces old id with new id with normalized id',
			[ 'event', EventEntities.d.id, '90' ],
			originalState
				.deleteIn( [ 'datetime', DateTimeEntities.d.id ] )
				.setIn(
					[ 'datetime', DateTimeEntities.d.id ],
					Map().set( 'event', Set.of( 90 ) )
				)
				.deleteIn( [ 'event', EventEntities.d.id ] )
				.setIn(
					[ 'event', 90 ],
					Map().set( 'datetime', Set.of( DateTimeEntities.d.id ) )
				),
		],

	].forEach( ( [
		description,
		args,
		expectedState,
	] ) => {
		it( description, () => {
			expect(
				updateEntityIdForRelations( originalState, testAction( ...args ) )
			).toEqual( expectedState );
		} );
	} );
} );
describe( removeRelatedEntitiesForEntity.name + '()', () => {
	const testAction = ( modelName, entityId ) => ( {
		modelName,
		entityId,
	} );
	[
		[
			'returns original state if there are no existing entries for the ' +
			'id',
			[ 'events', 70 ],
			originalState,
		],
		[
			'returns original state if the model is not in the state',
			[ 'ticket', 10 ],
			originalState,
		],
		[
			'removes requested cuid',
			[ 'events', EventEntities.d.id ],
			originalState
				.deleteIn( [ 'datetime', DateTimeEntities.d.id ] )
				.deleteIn( [ 'event', EventEntities.d.id ] ),
		],
		[
			'removes requested normalized id',
			[ 'events', '10' ],
			originalState
				.deleteIn( [ 'datetime', 52 ] )
				.setIn(
					[ 'datetime', 55, 'event' ],
					Set.of( testCuid )
				)
				.deleteIn( [ 'event', 10 ] ),
		],
	].forEach( ( [
		description,
		args,
		expectedState,
	] ) => {
		it( description, () => {
			expect(
				removeRelatedEntitiesForEntity(
					originalState,
					testAction( ...args )
				)
			).toEqual( expectedState );
		} );
	} );
} );

describe( 'RESET_ALL_STATE', () => {
	it( 'returns default state', () => {
		const newState = reducer(
			originalState,
			{
				type: resetTypes.RESET_ALL_STATE,
			}
		);
		expect( newState ).toEqual( fromJS( DEFAULT_CORE_STATE.relations ) );
	} );
} );

describe( 'RESET_STATE_FOR_MODEL', () => {
	it( 'returns original state if the model does not exist in it', () => {
		const newState = reducer(
			originalState,
			{
				type: resetTypes.RESET_STATE_FOR_MODEL,
				modelName: 'checkin',
			}
		);
		expect( originalState ).toBe( newState );
	} );
	it( 'returns expected state for model existing in state (when it would ' +
		'clear the entire state)', () => {
		const firstClear = reducer(
			originalState,
			{
				type: resetTypes.RESET_STATE_FOR_MODEL,
				modelName: 'event',
			}
		);
		const secondClear = reducer(
			firstClear,
			{
				type: resetTypes.RESET_STATE_FOR_MODEL,
				modelName: 'price',
			}
		);
		expect( secondClear.toJS() ).toEqual( DEFAULT_CORE_STATE.relations );
	} );
	it( 'returns expected state for model existing in state (when there are ' +
		'other relations in the state', () => {
		const testState = originalState.setIn(
			[ 'datetime', 55 ],
			Map().set( 'ticket', Set.of( 20, testCuid ) )
		).setIn(
			[ 'ticket', testCuid, 'datetime' ],
			Set.of( 55 )
		);
		const expectedState = testState.deleteIn(
			[ 'datetime', 55, 'event' ]
		).deleteIn(
			[ 'datetime', 52 ]
		).deleteIn(
			[ 'datetime', 53 ]
		).deleteIn(
			[ 'datetime', 54 ]
		).deleteIn(
			[ 'datetime', DateTimeEntities.d.id ]
		).deleteIn(
			[ 'event' ]
		);
		const newState = reducer(
			testState,
			{
				type: resetTypes.RESET_STATE_FOR_MODEL,
				modelName: 'event',
			}
		);
		expect( newState.toJS() ).toEqual( expectedState.toJS() );
	} );
} );
