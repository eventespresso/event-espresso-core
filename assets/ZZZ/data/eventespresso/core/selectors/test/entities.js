/**
 * External imports
 */
import { Set, Map } from 'immutable';

/**
 * Internal imports
 */
import {
	getEntityRecordsForModel,
	getEntitiesForModel,
	getEntityById,
	getEntitiesByIds,
	getEntityIdsQueuedForTrash,
	getEntityIdsQueuedForDelete,
	getModelsQueuedForDelete,
	getModelsQueuedForTrash,
} from '../entities';
import { mockStateForTests } from '../../test/fixtures';
import { EventEntities, DateTimeEntities } from '../../../test/fixtures/base';

describe( 'getEntityRecordsForModel()', () => {
	beforeEach( () => getEntityRecordsForModel.clear() );
	it( 'returns null when the model does not exist in the state', () => {
		expect(
			getEntityRecordsForModel( mockStateForTests, 'cheeseburgers' )
		).toBe( null );
	} );
	it( 'returns expected object when the model exists in the state', () => {
		const records = getEntityRecordsForModel( mockStateForTests, 'event' );
		expect( records )
			.toEqual(
				mockStateForTests.entities.get( 'event' ).toJS()
			);
		expect( records[ 10 ] ).toEqual( EventEntities.a );
	} );
	it( 'returns cached copy when selector executed multiple times', () => {
		const records = getEntityRecordsForModel( mockStateForTests, 'event' );
		const records2 = getEntityRecordsForModel( mockStateForTests, 'event' );
		const records3 = getEntityRecordsForModel(
			mockStateForTests,
			'datetime'
		);
		const records4 = getEntityRecordsForModel( mockStateForTests, 'event' );
		expect( records ).toBe( records2 );
		expect( records ).not.toBe( records3 );
		expect( records ).toBe( records4 );
	} );
} );
describe( 'getEntitiesForModel', () => {
	// beforeEach( () => getEntitiesForModel.clear() );
	it( 'returns an empty array when the model does not exist in the ' +
		'state', () => {
		expect(
			getEntitiesForModel( mockStateForTests, 'cheeseburgers' )
		).toEqual( [] );
	} );
	it( 'returns expected array when the model exists in the state', () => {
		const records = getEntitiesForModel( mockStateForTests, 'event' );
		expect( records )
			.toEqual(
				mockStateForTests.entities
					.get( 'event' )
					.valueSeq()
					.toArray()
			);
		expect( records[ 0 ] ).toEqual( EventEntities.a );
	} );
	/* it( 'returns cached copy when selector executed multiple times', () => {
		const records = getEntitiesForModel( mockStateForTests, 'event' );
		const records2 = getEntitiesForModel( mockStateForTests, 'event' );
		const records3 = getEntitiesForModel( mockStateForTests, 'datetime' );
		expect( records ).toBe( records2 );
		expect( records ).not.toBe( records3 );
	} ); */
} );
describe( 'getEntityById()', () => {
	it( 'returns null if the model does not exist in the state', () => {
		expect( getEntityById(
			mockStateForTests,
			'cheese',
			10
		) ).toBe( null );
	} );
	it( 'returns null if the entity id does not exist in the state', () => {
		expect( getEntityById(
			mockStateForTests,
			'event',
			44
		) ).toBe( null );
	} );
	it( 'returns expected entity for id that exists in state ' +
		'(when id is given as string)', () => {
		expect( getEntityById(
			mockStateForTests,
			'event',
			'10'
		) ).toEqual( EventEntities.a );
	} );
	it( 'returns expected entity for id that exists in state', () => {
		expect( getEntityById(
			mockStateForTests,
			'datetime',
			52
		) ).toEqual( DateTimeEntities.a );
	} );
} );
describe( 'getEntitiesByIds()', () => {
	beforeEach( () => getEntitiesByIds.clear() );
	it( 'returns an empty array if the model does not exist in the ' +
		'state', () => {
		expect( getEntitiesByIds( mockStateForTests, 'cheese', [] ) )
			.toEqual( [] );
	} );
	it( 'returns an empty array if none of the provided ids exist in the ' +
		'state', () => {
		expect( getEntitiesByIds( mockStateForTests, 'event', [ 44, 55 ] ) )
			.toEqual( [] );
	} );
	it( 'returns expected entities when some of the ids exist in the ' +
		'state', () => {
		expect( getEntitiesByIds( mockStateForTests, 'event', [ 10, 44, 20 ] ) )
			.toEqual( [ EventEntities.a, EventEntities.b ] );
	} );
	it( 'returns expected cached result when called multiple times', () => {
		const testResult = () => getEntitiesByIds(
			mockStateForTests,
			'event',
			[ 10, 20 ]
		);
		const firstState = testResult();
		expect( testResult() ).toBe( firstState );
	} );
} );
describe( 'getEntityIdsQueuedForTrash()', () => {
	const originalState = { ...mockStateForTests };
	beforeEach( () => {
		getEntityIdsQueuedForTrash.clear();
		originalState.dirty.trash = originalState.dirty.trash.set(
			'event',
			Set.of( 44, 60, 77 )
		);
	} );
	it( 'returns an empty array if the model does not exist in the ' +
		'state', () => {
		expect( getEntityIdsQueuedForTrash( originalState, 'cheese' ) )
			.toEqual( [] );
	} );
	it( 'returns expected entity ids for what is queued for trash for the ' +
		'given model in state', () => {
		expect( getEntityIdsQueuedForTrash( originalState, 'event' ) )
			.toEqual( [ 44, 60, 77 ] );
	} );
	it( 'returns expected cached result when called multiple times', () => {
		const testResult = () => getEntityIdsQueuedForTrash(
			originalState,
			'event'
		);
		const firstResult = testResult();
		expect( testResult() ).toBe( firstResult );
	} );
} );
describe( 'getEntityIdsQueuedForDelete()', () => {
	const originalState = { ...mockStateForTests };
	beforeEach( () => {
		getEntityIdsQueuedForDelete.clear();
		originalState.dirty.delete = originalState.dirty.delete.set(
			'event',
			Set.of( 44, 60, 77 )
		);
	} );
	it( 'returns an empty array if the model does not exist in the ' +
		'state', () => {
		expect( getEntityIdsQueuedForDelete( originalState, 'cheese' ) )
			.toEqual( [] );
	} );
	it( 'returns expected entity ids for what is queued for delete for the ' +
		'given model in state', () => {
		expect( getEntityIdsQueuedForDelete( originalState, 'event' ) )
			.toEqual( [ 44, 60, 77 ] );
	} );
	it( 'returns expected cached result when called multiple times', () => {
		const testResult = () => getEntityIdsQueuedForDelete(
			originalState,
			'event'
		);
		const firstResult = testResult();
		expect( testResult() ).toBe( firstResult );
	} );
} );
describe( 'getModelsQueuedForTrash', () => {
	const originalState = { ...mockStateForTests };
	beforeEach( () => {
		getModelsQueuedForTrash.clear();
		originalState.dirty.trash = Map();
	} );
	it( 'returns an empty array if there are no models queues for ' +
		'trash', () => {
		expect( getModelsQueuedForTrash( originalState ) ).toEqual( [] );
	} );
	it( 'returns the expected array of models queued for trash', () => {
		originalState.dirty.trash = originalState.dirty.trash
			.set( 'event', Set() )
			.set( 'datetime', Set() )
			.set( 'ticket', Set() );
		expect( getModelsQueuedForTrash( originalState ) ).toEqual(
			[ 'event', 'datetime', 'ticket' ]
		);
	} );
	it( 'returns expected cached result when called multiple times', () => {
		originalState.dirty.trash = originalState.dirty.trash
			.set( 'event', Set() )
			.set( 'datetime', Set() )
			.set( 'ticket', Set() );
		const testResult = () => getModelsQueuedForTrash( originalState );
		const firstResult = testResult();
		expect( testResult() ).toBe( firstResult );
	} );
} );
describe( 'getModelsQueuedForDelete', () => {
	const originalState = { ...mockStateForTests };
	beforeEach( () => {
		getModelsQueuedForDelete.clear();
		originalState.dirty.delete = Map();
	} );
	it( 'returns an empty array if there are no models queues for ' +
		'delete', () => {
		expect( getModelsQueuedForDelete( mockStateForTests ) ).toEqual( [] );
	} );
	it( 'returns the expected array of models queued for delete', () => {
		originalState.dirty.delete = originalState.dirty.delete
			.set( 'event', Set() )
			.set( 'datetime', Set() )
			.set( 'ticket', Set() );
		expect( getModelsQueuedForDelete( originalState ) ).toEqual(
			[ 'event', 'datetime', 'ticket' ]
		);
	} );
	it( 'returns expected cached result when called multiple times', () => {
		originalState.dirty.delete = originalState.dirty.delete
			.set( 'event', Set() )
			.set( 'datetime', Set() )
			.set( 'ticket', Set() );
		const testResult = () => getModelsQueuedForDelete( originalState );
		const firstResult = testResult();
		expect( testResult() ).toBe( firstResult );
	} );
} );
