/**
 * External imports
 */
import { EventFactory } from '@test/fixtures';

/**
 * Internal dependencies
 */
import {
	receiveEntity,
	receiveEntityRecords,
	removeEntityById,
} from '../entities';
import { EventEntities } from '../../../test/fixtures/base';
import { mockStateForTests } from '../../test/fixtures';
import { ACTION_TYPES } from '../../actions/action-types';

const { entities: types } = ACTION_TYPES;
const originalState = mockStateForTests.get( 'entities' );

describe( 'receiveEntity()', () => {
	const testAction = ( entity ) => ( {
		type: types.RECEIVE_ENTITY,
		entity,
	} );
	it( 'returns original state if the entity already exists in state', () => {
		expect( receiveEntity( originalState, testAction( EventEntities.a ) ) )
			.toBe( originalState );
	} );
	describe( 'returns expected state for new entity no existing in state', () => {
		const newEvent = EventFactory.createNew(
			{ EVT_name: 'Test Event' }
		);
		const resultState = receiveEntity(
			originalState,
			testAction( newEvent )
		);
		it( 'returns different state', () => {
			expect( resultState ).not.toBe( originalState );
		} );
		it( 'new state has expected event in it', () => {
			expect( resultState.getIn( [ 'event', newEvent.id ] ) )
				.toBe( newEvent );
		} );
		it( 'result has expected shape', () => {
			expect( resultState ).toEqual(
				originalState.setIn( [ 'event', newEvent.id ], newEvent )
			);
		} );
	} );
} );

describe( 'receiveEntityRecords()', () => {
	const testAction = ( type ) => ( modelName, entities ) => ( {
		type,
		modelName,
		entities,
	} );
	describe( types.RECEIVE_ENTITY_RECORDS + ' action type', () => {
		const action = testAction( types.RECEIVE_ENTITY_RECORDS );
		it( 'returns original state when the incoming model name does ' +
			'not exist in the state', () => {
			expect( receiveEntityRecords(
				originalState,
				action( 'cheeseburgers', [ EventEntities.a ] )
			) ).toBe( originalState );
		} );
		it( 'returns original state when the incoming entities is ' +
			'empty', () => {
			expect( receiveEntityRecords(
				originalState,
				action( 'event', [] )
			) ).toBe( originalState );
		} );
		describe( 'returns original state when provided entities already exist in ' +
			'the state.', () => {
			it( 'returns original state', () => {
				expect( receiveEntityRecords(
					originalState,
					action( 'event', [ EventEntities.a, EventEntities.b ] )
				) ).toBe( originalState );
			} );
			it( 'returns original state (and original entities are in the ' +
				'state) even when a new entity with similar values is ' +
				'received', () => {
				const newEntity = EventFactory.fromExisting(
					EventEntities.a.originalFieldsAndValues
				);
				newEntity.name = 'Testing an Event Name Change';
				expect( receiveEntityRecords(
					originalState,
					action( 'event', [ newEntity ] )
				) ).toBe( originalState );
				expect( originalState.getIn( [ 'event', 10 ] ).EVT_name )
					.toEqual( 'Test Event' );
			} );
		} );
		it( 'returns expected state when provided entities do not exist in ' +
			'the state', () => {
			const newEntity = EventFactory.createNew(
				{ EVT_name: 'Test Event Brand New' }
			);
			const resultState = receiveEntityRecords(
				originalState,
				action( 'event', [ newEntity ] )
			);
			expect( resultState ).not.toBe( originalState );
			expect( resultState.getIn(
				[ 'event', newEntity.id ]
			) ).toBe( newEntity );
			expect( resultState ).toEqual(
				originalState.setIn( [ 'event', newEntity.id ], newEntity )
			);
		} );
	} );
	describe( types.RECEIVE_AND_REPLACE_ENTITY_RECORDS + ' action type', () => {
		const action = testAction( types.RECEIVE_AND_REPLACE_ENTITY_RECORDS );
		it( 'returns original state when the incoming model name does ' +
			'not exist in the state', () => {
			expect( receiveEntityRecords(
				originalState,
				action( 'cheeseburgers', [ EventEntities.a ] )
			) ).toBe( originalState );
		} );
		it( 'returns original state when the incoming entities is ' +
			'empty', () => {
			expect( receiveEntityRecords(
				originalState,
				action( 'event', [] )
			) ).toBe( originalState );
		} );
		it( 'returns new state when receiving an entity record with the same ' +
			'id but has changes', () => {
			const newEntity = EventFactory.createNew(
				{ EVT_name: 'Test Event Brand New' }
			);
			const resultState = receiveEntityRecords(
				originalState,
				action( 'event', [ newEntity ] )
			);
			expect( resultState ).not.toBe( originalState );
			expect( resultState.getIn(
				[ 'event', newEntity.id ]
			) ).toBe( newEntity );
			expect( resultState ).toEqual(
				originalState.setIn( [ 'event', newEntity.id ], newEntity )
			);
		} );
	} );
} );

describe( 'removeEntityById()', () => {
	const testAction = ( modelName, entityId ) => (
		{
			type: types.REMOVE_ENTITY_BY_ID,
			modelName,
			entityId,
		}
	);
	it( 'returns originalState when modelName does not exist in the ' +
		'state', () => {
		expect( removeEntityById(
			originalState,
			testAction( 'cheeseburgers', 12
			)
		) ).toBe( originalState );
	} );
	it( 'returns originalState when the entity id does not exist in the ' +
		'state', () => {
		expect( removeEntityById(
			originalState,
			testAction( 'event', 144 )
		) ).toBe( originalState );
	} );
	it( 'returns new state when entity id exists for the model ' +
		'and the entity is removed from the new state', () => {
		const resultState = removeEntityById(
			originalState,
			testAction( 'event', 10 )
		);
		expect( resultState ).not.toBe( originalState );
		expect( resultState ).toEqual(
			originalState.deleteIn( [ 'event', 10 ] )
		);
	} );
} );
