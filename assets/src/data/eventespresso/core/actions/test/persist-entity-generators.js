/**
 * External imports
 */
import { isGenerator } from '@eventespresso/validators';

/**
 * Internal imports
 */
import {
	persistEntityRecord,
	persistForEntityId,
	persistForEntityIds,
	persistDeletesForModel,
	persistTrashesForModel,
	persistAllDeletes,
} from '../persist-entity-generators';
import { fetch, select, dispatch } from '../../../base-controls';
import {
	receiveAndReplaceEntityRecords,
} from '../receive-entities';
import {
	removeEntityById,
	removeDeleteEntityId,
	removeTrashEntityId,
} from '../remove-entities';
import {
	receiveUpdatedEntityIdForRelations,
} from '../receive-relations';
import {
	EventEntities,
	eventFactory,
	EventResponses,
} from '../../../test/fixtures/base';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../constants';

describe( 'persistEntityRecord()', () => {
	let fulfillment;
	const reset = ( modelName, entity ) => {
		fulfillment = persistEntityRecord( modelName, entity );
	};
	const TestEvent = EventEntities.b;
	const TestEventResponse = EventResponses.b;
	it( 'throws a console error if entity is not a model entity for the ' +
		'given model', () => {
		reset( 'datetime', TestEvent );
		const { value, done } = fulfillment.next();
		expect( console ).toHaveErroredWith(
			'Warning: The provided entity is not a BaseEntity child for the ' +
			'provided model'
		);
		expect( value ).toBe( null );
		expect( done ).toBe( true );
	} );
	it( 'throws a console error if entity is clean', () => {
		reset( 'event', TestEvent );
		const { value, done } = fulfillment.next();
		expect( console ).toHaveErroredWith(
			'Warning: The entity provided has no changes to persist.'
		);
		expect( value ).toBe( null );
		expect( done ).toBe( true );
	} );
	it( 'yields a generator for retrieving factory', () => {
		const ChangedEvent = EventEntities.a;
		ChangedEvent.desc = 'Changed Event';
		reset( 'event', ChangedEvent );
		const { value } = fulfillment.next();
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns null if there is no retrievable factory for the given ' +
		'model', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toBe( null );
		expect( done ).toBe( true );
	} );
	it( 'yields expected action object for fetch', () => {
		const ChangedEvent = EventEntities.a;
		ChangedEvent.desc = 'Changed Event';
		reset( 'event', ChangedEvent );
		fulfillment.next();
		const { value } = fulfillment.next( eventFactory );
		expect( value ).toEqual( fetch( {
			path: '/ee/v4.8.36/events',
			method: 'PUT',
			data: ChangedEvent.forPersist,
		} ) );
	} );
	it( 'returns null if the updated entity is not returned in the ' +
		'REST response', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toBe( null );
		expect( done ).toBe( true );
	} );
	describe( 'yields expected actions when entity is new', () => {
		const NewEvent = eventFactory.createNew(
			{ EVT_name: 'Test Event' }
		);
		it( 'yields expected action object for ' +
			removeEntityById.name, () => {
			reset( 'event', NewEvent );
			fulfillment.next();
			fulfillment.next( eventFactory );
			const { value } = fulfillment.next( TestEventResponse );
			expect( value ).toEqual(
				removeEntityById(
					'event',
					NewEvent.id
				)
			);
		} );
		it( 'yields generator for resolving getting the new entity by ' +
			'id', () => {
			const { value } = fulfillment.next();
			expect( isGenerator( value ) ).toBe( true );
		} );
		it( 'yields expected action object for adding updated entity id to ' +
			'existing relations in the state', () => {
			const { value } = fulfillment.next();
			expect( value ).toEqual(
				receiveUpdatedEntityIdForRelations(
					'event',
					NewEvent.id,
					TestEvent.id
				)
			);
		} );
	} );
	it( 'yields expected action for replacing existing entity records', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			receiveAndReplaceEntityRecords(
				'event',
				new Map( [ [ 20, TestEvent ] ] )
			)
		);
	} );
	it( 'returns expected entity on successful "done"', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toEqual( TestEvent );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistForEntityId()', () => {
	const TestEvent = EventEntities.b;
	let fulfillment;
	const reset = () => fulfillment = persistForEntityId(
		'event',
		20
	);
	it( 'yields action for selecting the entity by id', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			select(
				CORE_REDUCER_KEY,
				'getEntityById',
				'event',
				20
			)
		);
	} );
	it( 'yields empty object when there is no BaseEntity in the ' +
		'response', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
	it( 'yields dispatch action for adding entity record to the store', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next( TestEvent );
		expect( value ).toEqual(
			dispatch(
				CORE_REDUCER_KEY,
				'persistEntityRecord',
				[ 'event', TestEvent ]
			)
		);
	} );
	it( 'yields persisted entity when done', () => {
		const { value, done } = fulfillment.next( TestEvent );
		expect( value ).toEqual( TestEvent );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistForEntityIds()', () => {
	const testEntities = [ EventEntities.b, EventEntities.c ];
	let fulfillment;
	const reset = () => fulfillment = persistForEntityIds(
		'event',
		[ 20, 30 ]
	);
	it( 'yields select action for getting the entities for the given ' +
		'ids', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getEntitiesByIds',
			'event',
			[ 20, 30 ]
		) );
	} );
	it( 'returns empty object when there are no entities for the given ' +
		'ids', () => {
		const { value, done } = fulfillment.next( null );
		expect( value ).toEqual( {} );
		expect( done ).toBe( true );
	} );
	it( 'yields dispatch actions for persisting each entity record', () => {
		reset();
		fulfillment.next();
		let { value } = fulfillment.next( testEntities );
		expect( value ).toEqual( dispatch(
			CORE_REDUCER_KEY,
			'persistEntityRecord',
			[ 'event', EventEntities.b ]
		) );
		value = fulfillment.next( EventEntities.b ).value;
		expect( value ).toEqual( dispatch(
			CORE_REDUCER_KEY,
			'persistEntityRecord',
			[ 'event', EventEntities.c ]
		) );
	} );
	it( 'returns expected response for successful persistence', () => {
		const { value, done } = fulfillment.next( EventEntities.c );
		expect( value ).toEqual(
			{
				20: EventEntities.b,
				30: EventEntities.c,
			}
		);
		expect( done ).toBe( true );
	} );
} );
describe( 'persistDeletesForModel', () => {
	let fulfillment;
	const reset = () => fulfillment = persistDeletesForModel( 'event' );
	it( 'yields select action for getting entity ids queued for delete', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getEntityIdsQueuedForDelete',
			'event'
		) );
	} );
	it( 'returns an empty array when there are no entities to delete', () => {
		const { value, done } = fulfillment.next( [] );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields expected fetch actions for each entity id retrieved ' +
		'that is queued for delete', () => {
		reset();
		fulfillment.next();
		const { value: fetchAction } = fulfillment.next( [ 10, 20 ] );
		expect( fetchAction ).toEqual( fetch( {
			path: '/ee/v4.8.36/events/10',
			data: { force: true },
			method: 'DELETE',
		} ) );
		const { value: removeAction } = fulfillment.next( true );
		expect( removeAction ).toEqual( removeDeleteEntityId(
			'event',
			10
		) );
		const { value: fetchAction2 } = fulfillment.next();
		expect( fetchAction2 ).toEqual( fetch( {
			path: '/ee/v4.8.36/events/20',
			data: { force: true },
			method: 'DELETE',
		} ) );
		const { value: removeAction2 } = fulfillment.next( true );
		expect( removeAction2 ).toEqual( removeDeleteEntityId(
			'event',
			20,
		) );
	} );
	it( 'returns expected array of ids for persisted deletes', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toEqual( [ 10, 20 ] );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistTrashesForModel()', () => {
	let fulfillment;
	const reset = () => fulfillment = persistTrashesForModel(
		'event'
	);
	it( 'yields select action for getting entity ids queued for trash', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getEntityIdsQueuedForTrash',
			'event'
		) );
	} );
	it( 'returns an empty array when there are no entities to trash', () => {
		const { value, done } = fulfillment.next( [] );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields expected fetch actions for each entity id retrieved ' +
		'that is queued for delete', () => {
		reset();
		fulfillment.next();
		const { value: fetchAction } = fulfillment.next( [ 10, 20 ] );
		expect( fetchAction ).toEqual( fetch( {
			path: '/ee/v4.8.36/events/10',
			method: 'DELETE',
		} ) );
		const { value: removeAction } = fulfillment.next( true );
		expect( removeAction ).toEqual( removeTrashEntityId(
			'event',
			10
		) );
		const { value: fetchAction2 } = fulfillment.next();
		expect( fetchAction2 ).toEqual( fetch( {
			path: '/ee/v4.8.36/events/20',
			method: 'DELETE',
		} ) );
		const { value: removeAction2 } = fulfillment.next( true );
		expect( removeAction2 ).toEqual( removeTrashEntityId(
			'event',
			20,
		) );
	} );
	it( 'returns expected array of ids for persisted trashes', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toEqual( [ 10, 20 ] );
		expect( done ).toBe( true );
	} );
} );

describe( 'persistAllDeletes()', () => {
	const fulfillment = persistAllDeletes();
	it( 'yields select action for models queued for delete', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getModelsQueuedForDelete'
		) );
	} );
	it( 'yields expected generators for persisting deletes on entities ' +
		'queued', () => {
		const { value: deleteAction } = fulfillment.next(
			[ 'event', 'datetime' ]
		);
		expect( isGenerator( deleteAction ) ).toBe( true );
		const { value: deleteAction2 } = fulfillment.next( [ 10, 20 ] );
		expect( isGenerator( deleteAction2 ) ).toBe( true );
	} );
	it( 'yields expected select action for models queued for trash', () => {
		const { value } = fulfillment.next( [ 30, 40 ] );
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getModelsQueuedForTrash'
		) );
	} );
	it( 'yields expected generators for persisting trash on deletes ' +
		'queued', () => {
		const { value: trashAction } = fulfillment.next(
			[ 'ticket', 'registration' ]
		);
		expect( isGenerator( trashAction ) ).toBe( true );
		const { value: trashAction2 } = fulfillment.next( [ 50, 60 ] );
		expect( isGenerator( trashAction2 ) ).toBe( true );
	} );
	it( 'returns expected object on completion', () => {
		const { value, done } = fulfillment.next( [ 70, 80 ] );
		expect( value ).toEqual( {
			deleted: {
				event: [ 10, 20 ],
				datetime: [ 30, 40 ],
			},
			trashed: {
				ticket: [ 50, 60 ],
				registration: [ 70, 80 ],
			},
		} );
		expect( done ).toBe( true );
	} );
} );
