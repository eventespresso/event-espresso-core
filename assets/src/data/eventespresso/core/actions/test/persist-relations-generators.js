/**
 * External imports
 */
import cuid from 'cuid';

/**
 * Internal imports
 */
import {
	persistAllAddRelations,
	persistAllDeleteRelations,
	persistAddRelationsForModel,
	persistDeleteRelationsForModel,
	persistRelationsForModel,
	persistRelationsForEntityId,
	persistRelationsForEntityIdAndRelation,
	persistRelationsForEntityIdAndRelationId,
	persistNewEntityAndRemoveDirtyRelations,
	getRelationState,
} from '../persist-relations-generators';
import {
	fetch,
	select,
	dispatch,
	resolveDispatch,
	resolveSelect,
} from '../../../base-controls';
import { removeDirtyRelationForType } from '../remove-relations';
import { EventEntities } from '../../../test/fixtures/base';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../../schema/constants';

describe( 'persistAllDeleteRelations()', () => {
	const fulfillment = persistAllDeleteRelations();
	it( 'yields select action for getting the model names for relations ' +
		'queued for deleting', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			select(
				CORE_REDUCER_KEY,
				'getRelationModelsQueuedForDeletion'
			)
		);
	} );
	it( 'yields dispatch action to persist delete relations for each model ' +
		'returned by previous yield', () => {
		const { value } = fulfillment.next( [ 'ticket', 'event' ] );
		expect( value ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistDeleteRelationsForModel',
				'event'
			)
		);
		const { value: nextValue } = fulfillment.next();
		expect( nextValue ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistDeleteRelationsForModel',
				'ticket'
			)
		);
	} );
} );

describe( 'persistAllAddRelations()', () => {
	const fulfillment = persistAllAddRelations();
	it( 'yields select action for getting the model names for relations ' +
		'queued for adding', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			select(
				CORE_REDUCER_KEY,
				'getRelationModelsQueuedForAddition'
			)
		);
	} );
	it( 'yields dispatch action to persist add relations for each model ' +
		'returned by previous yield', () => {
		const { value } = fulfillment.next( [ 'ticket', 'event' ] );
		expect( value ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistAddRelationsForModel',
				'event'
			)
		);
		const { value: nextValue } = fulfillment.next();
		expect( nextValue ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistAddRelationsForModel',
				'ticket'
			)
		);
	} );
} );

describe( 'persistAddRelationsForModel()', () => {
	const fulfillment = persistAddRelationsForModel( 'events' );
	it( 'yields resolve dispatch action for persisting relations for the ' +
		'given model', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistRelationsForModel',
				'event'
			)
		);
	} );
} );

describe( 'persistDeleteRelationsforModel()', () => {
	const fulfillment = persistDeleteRelationsForModel( 'events' );
	it( 'yields resolve dispatch action for persisting relations for the ' +
		'given model', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistRelationsForModel',
				'event',
				false
			)
		);
	} );
} );

describe( 'persistRelationsForModel()', () => {
	let fulfillment;
	const reset = () => fulfillment = persistRelationsForModel( 'events' );
	it( 'yields resolve dispatch action for getting relation state', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'getRelationState',
				'event',
				true
			)
		);
	} );
	it( 'returns an empty object if there is no relation state for the ' +
		'model', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
	it( 'yields dispatch action for persisting relations for each entity id ' +
		'in state for the given model.', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next( { 10: {} } );
		expect( value ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistRelationsForEntityId',
				'event',
				'10',
				true,
				{ 10: {} }
			)
		);
	} );
	it( 'returns expected object on successful completion', () => {
		const { value, done } = fulfillment.next( { datetime: [ 10 ] } );
		expect( value ).toEqual(
			{
				10: {
					datetime: [ 10 ],
				},
			}
		);
		expect( done ).toBe( true );
	} );
} );

describe( 'persistRelationsForEntityId()', () => {
	let fulfillment;
	const reset = () => fulfillment = persistRelationsForEntityId(
		'events',
		10
	);
	it( 'yields resolve dispatch action for getting relation state', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'getRelationState',
				'event',
				true,
				{},
			)
		);
	} );
	it( 'returns empty object when relation state doesn\'t exist for ' +
		'entity id', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
	it( 'returns empty object when there are no relation names ' +
		'retrieved', () => {
		reset();
		fulfillment.next();
		const { value, done } = fulfillment.next( { 10: {} } );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
	it( 'yields dispatch actions for each relation for persisting.', () => {
		reset();
		fulfillment.next();
		const { value: persistRelationsAction } = fulfillment.next(
			{ 10: { datetime: [], message_template: [] } }
		);
		expect( persistRelationsAction ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistRelationsForEntityIdAndRelation',
				'event',
				10,
				'message_template',
				true,
				{ 10: { datetime: [], message_template: [] } }
			)
		);
		const { value: persistRelationsAction2 } = fulfillment.next(
			[ 10, 20 ]
		);
		expect( persistRelationsAction2 ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistRelationsForEntityIdAndRelation',
				'event',
				10,
				'datetime',
				true,
				{ 10: { datetime: [], message_template: [] } }
			)
		);
	} );
	it( 'returns an object of relations and ids that were persisted', () => {
		const { value, done } = fulfillment.next( [ 30, 40 ] );
		expect( value ).toEqual( {
			datetime: [ 30, 40 ],
			message_template: [ 10, 20 ],
		} );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistRelationsForEntityIdAndRelation', () => {
	let fulfillment;
	const reset = () => fulfillment = persistRelationsForEntityIdAndRelation(
		'events',
		10,
		'datetime',
	);
	it( 'yields resolve dispatch action for getting relation state', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'getRelationState',
				'event',
				true,
				{}
			)
		);
	} );
	it( 'returns an empty array if there are no entity ids for the given ' +
		'relations', () => {
		const { value, done } = fulfillment.next( [] );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields dispatch actions for each relation id', () => {
		reset();
		fulfillment.next();
		const { value: relationAction } = fulfillment.next( {
			10: {
				datetime: [ 10, 20 ],
			},
		} );
		expect( relationAction ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistRelationsForEntityIdAndRelationId',
				'event',
				10,
				'datetime',
				20,
				true,
				{
					10: {
						datetime: [ 10, 20 ],
					},
				}
			)
		);
		const { value: relationAction2 } = fulfillment.next( 20 );
		expect( relationAction2 ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'persistRelationsForEntityIdAndRelationId',
				'event',
				10,
				'datetime',
				10,
				true,
				{
					10: {
						datetime: [ 10, 20 ],
					},
				}
			)
		);
	} );
	it( 'yields expected array of ids for successful persistence', () => {
		const { value, done } = fulfillment.next( 10 );
		expect( value ).toEqual( [ 20, 10 ] );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistRelationsForEntityIdAndRelationId()', () => {
	let fulfillment;
	const reset = ( entityId, relationId, addRelation = true ) => fulfillment =
		persistRelationsForEntityIdAndRelationId(
			'events',
			entityId,
			'datetime',
			relationId,
			addRelation,
		);
	const testCuid = cuid();
	const testRelationState = {
		event: {
			10: {
				datetime: [ 20 ],
			},
		},
	};
	it( 'yields resolve dispatch action for getting relation state', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveDispatch(
				CORE_REDUCER_KEY,
				'getRelationState',
				'event',
				true,
				{}
			)
		);
	} );
	it( 'returns 0 when there is no relation state for the given data', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
	it( 'yields resolve dispatch action for persisting new entity and ' +
		'removing dirty relations when the entityId is a cuid', () => {
		reset( testCuid, 20 );
		fulfillment.next();
		const { value } = fulfillment.next( testRelationState );
		expect( value ).toEqual( resolveDispatch(
			CORE_REDUCER_KEY,
			'persistNewEntityAndRemoveDirtyRelations',
			'datetime',
			20,
			'event',
			testCuid,
			true,
			[ 'event', testCuid ]
		) );
	} );
	it( 'returns 0 when the new entity id could not be persisted', () => {
		const { value, done } = fulfillment.next( 0 );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
	it( 'yields a resolve dispatch action for persisting new entity and ' +
		'removing dirty relations when the relationId is a cuid', () => {
		reset( 10, testCuid );
		fulfillment.next();
		const { value } = fulfillment.next( testRelationState );
		expect( value ).toEqual( resolveDispatch(
			CORE_REDUCER_KEY,
			'persistNewEntityAndRemoveDirtyRelations',
			'datetime',
			testCuid,
			'event',
			10,
			true,
			[ 'datetime', testCuid ],
			true,
		) );
	} );
	it( 'returns 0 when the new relation id could not be persisted', () => {
		const { value, done } = fulfillment.next( 0 );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
	it( 'yields expected resolve select action for getting the relation ' +
		'endpoint when adding a relation', () => {
		reset( 10, 20 );
		fulfillment.next();
		const { value } = fulfillment.next( testRelationState );
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getRelationEndpointForEntityId',
				'event',
				10,
				'datetime'
			)
		);
	} );
	it( 'yields expected fetch action for the relation endpoint when adding ' +
		'relation and schema store has it.', () => {
		reset( 10, 20 );
		fulfillment.next();
		fulfillment.next( testRelationState );
		const { value } = fulfillment.next( 'ee/v4.8.36/events/10/datetimes' );
		expect( value ).toEqual(
			fetch( {
				path: 'ee/v4.8.36/events/10/datetimes/20',
				method: 'PUT',
			} )
		);
	} );
	it( 'yields expected response when relation endpoint is not ' +
		'retrievable', () => {
		reset( 10, 20 );
		fulfillment.next();
		fulfillment.next( testRelationState );
		const { value } = fulfillment.next( '' );
		expect( value ).toBe( 0 );
	} );
	it( 'yields expected fetch action for the relation endpoint when removing ' +
		'a relation', () => {
		reset( 10, 20, false );
		fulfillment.next();
		fulfillment.next( testRelationState );
		const { value } = fulfillment.next( 'ee/v4.8.36/events/10/datetimes' );
		expect( value ).toEqual(
			fetch( {
				path: 'ee/v4.8.36/events/10/datetimes/20',
				method: 'DELETE',
			} )
		);
	} );
	it( 'yields removing dirty relations action when there is ' +
		'success', () => {
		const { value } = fulfillment.next( true );
		expect( value ).toEqual( removeDirtyRelationForType(
			'datetimes',
			20,
			'event',
			10,
			false
		) );
	} );
	it( 'returns relationId on successful request', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toBe( 20 );
		expect( done ).toBe( true );
	} );
	it( 'returns 0 when the request fails', () => {
		reset( 10, 20 );
		fulfillment.next();
		fulfillment.next( testRelationState );
		fulfillment.next( 'ee/v4.8.36/events/10/datetimes' );
		const { value, done } = fulfillment.next( false );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistNewEntityAndRemoveDirtyRelations()', () => {
	let fulfillment;
	const reset = ( doRelationRemoval = true ) => fulfillment =
		persistNewEntityAndRemoveDirtyRelations(
			'datetime',
			20,
			'events',
			10,
			true,
			[ 'event', 10 ],
			doRelationRemoval
		);
	it( 'yields resolve dispatch action for persisting the entity', () => {
		reset( false );
		const { value } = fulfillment.next();
		expect( value ).toEqual( resolveDispatch(
			CORE_REDUCER_KEY,
			'persistForEntityId',
			'event',
			10
		) );
	} );
	it( 'returns 0 if a model entity is not returned', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toBe( 0 );
		expect( done ).toBe( true );
	} );
	it( 'yields the action for removing dirty relations when ' +
		'doRelationRemoval is true', () => {
		reset( true );
		fulfillment.next();
		const { value } = fulfillment.next( EventEntities.b );
		expect( value ).toEqual(
			removeDirtyRelationForType(
				'datetimes',
				20,
				'event',
				10,
				true,
			)
		);
	} );
	it( 'returns the persisted entity id on complete', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toBe( EventEntities.b.id );
		expect( done ).toBe( true );
	} );
} );

describe( 'getRelationState()', () => {
	let fulfillment;
	const reset = ( addRelation, relationState ) => fulfillment =
		getRelationState( 'event', addRelation, relationState );
	it( 'yields select action for getting relation state when addRelation ' +
		'is true', () => {
		reset( true, {} );
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getRelationAdditionsQueuedForModel',
			'event'
		) );
	} );
	it( 'yields select action for getting relation state when addRelation ' +
		'is false', () => {
		reset( false, {} );
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getRelationDeletionsQueuedForModel',
			'event',
		) );
	} );
	it( 'returns relation state if one is already provided', () => {
		reset( true, { someState: 1 } );
		const { value, done } = fulfillment.next();
		expect( value ).toEqual( { someState: 1 } );
		expect( done ).toBe( true );
	} );
} );
