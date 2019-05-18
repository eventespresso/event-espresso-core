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
const originalState = mockStateForTests.relations
	.setIn(
		[ 'index', 'datetimes', 55 ],
		Map().set( 'event', Set.of( 10, testCuid ) )
	).setIn(
		[ 'entityMap', 'event', 10, 'datetimes' ],
		Set.of( 52, 55 )
	).setIn(
		[ 'entityMap', 'event', testCuid, 'datetimes' ],
		Set.of( 55 )
	).setIn(
		[ 'index', 'prices', 22 ],
		Map().set( 'priceType', Set.of( 10 ) )
	).setIn(
		[ 'entityMap', 'priceType', 10, 'prices' ],
		Set.of( 22 )
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
						'correctly normalize incoming relation and return expected state',
						'datetime',
						'event',
						52,
						[ 10 ],
						originalState,
						originalState
							.deleteIn( [ 'index', 'datetimes', 52 ] )
							.setIn(
								[ 'entityMap', 'event', 10, 'datetimes' ],
								Set.of( 55 )
							),
					],
					[
						'correctly normalize incoming relation and return expected state' +
						'for datetime for when index has multiple relation ids and ' +
						'entity map does not',
						'datetime',
						'event',
						55,
						[ testCuid ],
						originalState,
						originalState
							.setIn(
								[ 'index', 'datetimes', 55, 'event' ],
								Set.of( 10 ),
							).deleteIn( [ 'entityMap', 'event', testCuid ] ),
					],
					[
						'correctly normalize incoming relation and return ' +
						'expected state for prices when prices exists in ' +
						'the index already and the relation does not exist yet',
						'price',
						'ticket',
						200,
						[ testCuid ],
						originalState
							.setIn(
								[ 'index', 'prices', 200, 'ticket' ],
								Set.of( testCuid ),
							).setIn(
								[ 'entityMap', 'ticket', testCuid, 'prices' ],
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
							.deleteIn( [ 'index', 'datetimes', 52 ] )
							.setIn(
								[ 'entityMap', 'event', 10, 'datetimes' ],
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
								[ 'index', 'datetimes', 60, 'event' ],
								Set.of( 10 )
							)
							.setIn(
								[ 'entityMap', 'event', 10, 'datetimes' ],
								Set.of( 52, 60, 55 )
							),
						originalState
							.deleteIn( [ 'index', 'datetimes', 52 ] )
							.setIn(
								[ 'entityMap', 'event', 10, 'datetimes' ],
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
			[ 'events', EventEntities.d.id, 90 ],
			originalState
				.deleteIn( [ 'index', 'datetimes', DateTimeEntities.d.id ] )
				.setIn(
					[ 'index', 'datetimes', DateTimeEntities.d.id ],
					Map().set( 'event', Set.of( 90 ) )
				)
				.deleteIn( [ 'entityMap', 'event', EventEntities.d.id ] )
				.setIn(
					[ 'entityMap', 'event', 90 ],
					Map().set( 'datetimes', Set.of( DateTimeEntities.d.id ) )
				),
		],
		[
			'replaces old id with new id with normalized id',
			[ 'events', EventEntities.d.id, '90' ],
			originalState
				.deleteIn( [ 'index', 'datetimes', DateTimeEntities.d.id ] )
				.setIn(
					[ 'index', 'datetimes', DateTimeEntities.d.id ],
					Map().set( 'event', Set.of( 90 ) )
				)
				.deleteIn( [ 'entityMap', 'event', EventEntities.d.id ] )
				.setIn(
					[ 'entityMap', 'event', 90 ],
					Map().set( 'datetimes', Set.of( DateTimeEntities.d.id ) )
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
				.deleteIn( [ 'index', 'datetimes', DateTimeEntities.d.id ] )
				.deleteIn( [ 'entityMap', 'event', EventEntities.d.id ] ),
		],
		[
			'removes requested normalized id',
			[ 'events', '10' ],
			originalState
				.deleteIn( [ 'index', 'datetimes', 52 ] )
				.setIn(
					[ 'index', 'datetimes', 55, 'event' ],
					Set.of( testCuid )
				)
				.deleteIn( [ 'entityMap', 'event', 10 ] ),
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
			[ 'index', 'datetimes', 55 ],
			Map().set( 'ticket', Set.of( 20, testCuid ) )
		).setIn(
			[ 'entityMap', 'ticket', testCuid, 'datetimes' ],
			Set.of( 55 )
		);
		const expectedState = testState.deleteIn(
			[ 'index', 'datetimes', 55, 'event' ]
		).deleteIn(
			[ 'index', 'datetimes', 52 ]
		).deleteIn(
			[ 'index', 'datetimes', 53 ]
		).deleteIn(
			[ 'index', 'datetimes', 54 ]
		).deleteIn(
			[ 'index', 'datetimes', DateTimeEntities.d.id ]
		).deleteIn(
			[ 'entityMap', 'event' ]
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
