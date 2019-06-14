/**
 * External imports
 */
import { EventFactory } from '@test/fixtures';
import { InvalidModelEntity } from '@eventespresso/eejs';
import { fromJS, Map, Set } from 'immutable';
/**
 * Internal imports
 */
import {
	getRelatedEntities,
	getRelatedEntitiesForIds,
	getRelationIdsForEntityRelation,
	getRelationAdditionsQueuedForModel,
	getRelationDeletionsQueuedForModel,
	countRelationModelsIndexedForEntity,
} from '../relations';
import { mockStateForTests } from '../../test/fixtures';
import {
	EventEntities,
	DateTimeEntities,
} from '../../../test/fixtures/base';

describe( 'getRelationIdsForEntityRelation()', () => {
	beforeEach( () => getRelationIdsForEntityRelation.clear() );
	it( 'throws InvalidModelEntity when the provided entity is not a model ' +
		'entity', () => {
		const test = () => getRelationIdsForEntityRelation(
			mockStateForTests,
			{},
			'cheese'
		);
		expect( test ).toThrow( InvalidModelEntity );
	} );
	it( 'returns empty array when the given entity is not in state', () => {
		const testEvent = EventFactory.createNew( {
			EVT_name: 'Test Event',
		} );
		expect( getRelationIdsForEntityRelation(
			mockStateForTests,
			testEvent,
			'datetime'
		) ).toEqual( [] );
	} );
	it( 'returns empty array when the given entity exists but the relation is' +
		'not in state', () => {
		expect( getRelationIdsForEntityRelation(
			mockStateForTests,
			EventEntities.a,
			'cheese'
		) ).toEqual( [] );
	} );
	it( 'returns expected array for the given entity and relation', () => {
		expect( getRelationIdsForEntityRelation(
			mockStateForTests,
			EventEntities.a,
			'datetime'
		) ).toEqual( [ 52 ] );
	} );
	it( 'returns cached copy when state has not changed for the given ' +
		'query', () => {
		const testResult = getRelationIdsForEntityRelation(
			mockStateForTests,
			EventEntities.a,
			'datetime'
		);
		expect( getRelationIdsForEntityRelation(
			mockStateForTests,
			EventEntities.a,
			'datetime'
		) ).toBe( testResult );
	} );
	it( 'breaks cache when state has changed', () => {
		const testResult = getRelationIdsForEntityRelation(
			mockStateForTests,
			EventEntities.a,
			'datetime',
		);
		const modifiedState = { ...mockStateForTests };
		modifiedState.relations = modifiedState.relations.setIn(
			[
				'event',
				10,
				'datetime',
			],
			Set.of( 52, 88 )
		);
		const modifiedResult = getRelationIdsForEntityRelation(
			modifiedState,
			EventEntities.a,
			'datetime',
		);
		expect( modifiedResult ).not.toBe( testResult );
		expect( modifiedResult ).toEqual( [ 52, 88 ] );
	} );
} );
describe( 'getRelatedEntities()', () => {
	beforeEach( () => getRelatedEntities.clear() );
	it( 'throws InvalidModelEntity when entity is not a BaseEntity ' +
		'instance', () => {
		const testResult = () => getRelatedEntities(
			mockStateForTests,
			{},
			'datetimes'
		);
		expect( testResult ).toThrow( InvalidModelEntity );
	} );
	it( 'returns an empty array when the given entity is not in state', () => {
		const testEvent = EventFactory.createNew( {
			EVT_name: 'Test Event',
		} );
		expect( getRelatedEntities(
			mockStateForTests,
			testEvent,
			'datetime'
		) ).toEqual( [] );
	} );
	it( 'returns an empty array when there are no relations for the given ' +
		'relation name in the state', () => {
		expect( getRelatedEntities(
			mockStateForTests,
			EventEntities.a,
			'cheese'
		) ).toEqual( [] );
	} );
	it( 'returns the expected array of entities for entity and relation that ' +
		'exist in state', () => {
		expect( getRelatedEntities(
			mockStateForTests,
			EventEntities.a,
			'datetime'
		) ).toEqual( [
			DateTimeEntities.a,
		] );
	} );
	it( 'returns cached copy when state has not changed for the given ' +
		'query', () => {
		const testResult = getRelatedEntities(
			mockStateForTests,
			EventEntities.a,
			'datetime'
		);
		expect( getRelatedEntities(
			mockStateForTests,
			EventEntities.a,
			'datetime'
		) ).toBe( testResult );
	} );
	it( 'breaks cache when state has changed', () => {
		const testResult = getRelatedEntities(
			mockStateForTests,
			EventEntities.a,
			'datetime',
		);
		const modifiedStateA = { ...mockStateForTests };
		modifiedStateA.relations = modifiedStateA.relations.setIn(
			[
				'event',
				10,
				'datetime',
			],
			Set.of( 52, 88 )
		);
		const modifiedStateB = { ...mockStateForTests };
		modifiedStateB.entities = modifiedStateB.entities.deleteIn(
			[
				'datetime',
				52,
			]
		).setIn(
			[
				'datetime',
				52,
			],
			DateTimeEntities.a
		);
		const modifiedResultA = getRelatedEntities(
			modifiedStateA,
			EventEntities.a,
			'datetime',
		);
		const modifiedResultB = getRelatedEntities(
			modifiedStateB,
			EventEntities.a,
			'datetime'
		);
		expect( modifiedResultA ).not.toBe( testResult );
		expect( modifiedResultA ).toEqual( [ DateTimeEntities.a ] );
		expect( modifiedResultB ).not.toBe( testResult );
		expect( modifiedResultB ).toEqual( [ DateTimeEntities.a ] );
	} );
} );
describe( 'Dirty relations tests', () => {
	const originalState = { ...mockStateForTests };
	beforeEach( () => {
		const getState = ( incomingState = Map() ) => {
			return incomingState.withMutations( ( subState ) => {
				subState.set(
					'index',
					Map().setIn(
						[ 'datetime', 20 ],
						fromJS( {
							event: { delete: Set( [ 10 ] ) },
							ticket: {
								delete: Set( [ 50 ] ),
								add: Set( [ 60 ] ),
							},
						} ),
					)
				);
				subState.set(
					'delete',
					Map().set(
						'event',
						Map().set(
							10,
							fromJS( { datetime: Set( [ 20 ] ) } ),
						)
					)
				);
				subState.setIn(
					[ 'delete', 'ticket' ],
					Map().set(
						50,
						fromJS( { datetime: Set( [ 20 ] ) } )
					)
				);
				subState.set(
					'add',
					Map().set(
						'ticket',
						Map().set(
							60,
							fromJS( { datetime: Set( [ 20 ] ) } )
						)
					)
				);
			} );
		};
		originalState.dirty.relations = getState( originalState.dirty.relations );
	} );
	describe( 'getRelationAdditionsQueuedForModel()', () => {
		beforeEach( () => getRelationAdditionsQueuedForModel.clear() );
		it( 'returns an empty object when there are no records for the ' +
			'given model name', () => {
			expect( getRelationAdditionsQueuedForModel(
				originalState,
				'cheese'
			) ).toEqual( {} );
		} );
		it( 'returns expected object when there are records for the given ' +
			'modelName', () => {
			expect( getRelationAdditionsQueuedForModel(
				originalState,
				'ticket',
			) ).toEqual( {
				60: { datetime: [ 20 ] },
			} );
		} );
		it( 'returns expected object when there are records for the given ' +
			'relation (reverse lookup)', () => {
			expect( getRelationAdditionsQueuedForModel(
				originalState,
				'datetime'
			) ).toEqual( {
				20: { ticket: [ 60 ] },
			} );
		} );
		it( 'returns cached copy when state has not changed', () => {
			const testResult = getRelationAdditionsQueuedForModel(
				originalState,
				'ticket'
			);
			expect( getRelationAdditionsQueuedForModel(
				originalState,
				'ticket'
			) ).toBe( testResult );
		} );
		it( 'breaks cache when state changes', () => {
			const testResult = getRelationAdditionsQueuedForModel(
				originalState,
				'ticket',
			);
			// This mimics how the dirty-relations reducer updates the map
			// because it updates the entire "add" branch in the state.
			const modifiedState = { ...originalState };
			modifiedState.dirty.relations = modifiedState.dirty.relations.set(
				'add',
				modifiedState.dirty.relations.get( 'add' ).setIn(
					[
						'ticket',
						60,
						'datetime',
					],
					Set.of( 20, 80 )
				)
			);
			const modifiedResult = getRelationAdditionsQueuedForModel(
				modifiedState,
				'ticket'
			);
			expect( modifiedResult ).not.toBe( testResult );
			expect( modifiedResult ).toEqual( {
				60: { datetime: [ 20, 80 ] },
			} );
		} );
	} );
	describe( 'getRelationDeletionsQueuedForModel()', () => {
		beforeEach( () => getRelationDeletionsQueuedForModel.clear() );
		it( 'returns an empty object when there are no records for the ' +
			'given model name', () => {
			expect( getRelationDeletionsQueuedForModel(
				originalState,
				'cheese'
			) ).toEqual( {} );
		} );
		it( 'returns expected object when there are records for the given ' +
			'modelName', () => {
			expect( getRelationDeletionsQueuedForModel(
				originalState,
				'event',
			) ).toEqual( {
				10: { datetime: [ 20 ] },
			} );
		} );
		it( 'returns expected object when there are records for the given ' +
			'relation (reverse lookup)', () => {
			expect( getRelationDeletionsQueuedForModel(
				originalState,
				'datetime'
			) ).toEqual( {
				20: { event: [ 10 ], ticket: [ 50 ] },
			} );
		} );
		it( 'returns cached copy when state has not changed', () => {
			const testResult = getRelationDeletionsQueuedForModel(
				originalState,
				'event'
			);
			expect( getRelationDeletionsQueuedForModel(
				originalState,
				'event'
			) ).toBe( testResult );
		} );
		it( 'breaks cache when state changes', () => {
			const testResult = getRelationDeletionsQueuedForModel(
				originalState,
				'event',
			);
			// This mimics how the dirty-relations reducer updates the map
			// because it updates the entire "add" branch in the state.
			const modifiedState = { ...originalState };
			modifiedState.dirty.relations = modifiedState.dirty.relations.set(
				'delete',
				modifiedState.dirty.relations.get( 'delete' ).setIn(
					[
						'event',
						10,
						'datetime',
					],
					Set.of( 20, 80 )
				)
			);
			const modifiedResult = getRelationDeletionsQueuedForModel(
				modifiedState,
				'event'
			);
			expect( modifiedResult ).not.toBe( testResult );
			expect( modifiedResult ).toEqual( {
				10: { datetime: [ 20, 80 ] },
			} );
		} );
	} );
} );
describe( 'countRelationModelsIndexedForEntity()', () => {
	it( 'returns 0 for entity models not existing in the state', () => {
		expect( countRelationModelsIndexedForEntity(
			mockStateForTests,
			'cheese',
			10
		) ).toBe( 0 );
	} );
	it( 'returns 0 for entity id not existing in the state', () => {
		expect( countRelationModelsIndexedForEntity(
			mockStateForTests,
			'event',
			80
		) ).toBe( 0 );
	} );
	it( 'returns expected value for entity existing in state when id is a ' +
		'string (testing normalization)', () => {
		expect( countRelationModelsIndexedForEntity(
			mockStateForTests,
			'events',
			'10'
		) ).toBe( 1 );
	} );
	it( 'returns expected value for entity existing in the state (no ' +
		'normalization needed)', () => {
		expect( countRelationModelsIndexedForEntity(
			mockStateForTests,
			'event',
			10,
		) ).toBe( 1 );
	} );
	it( 'returns expected value for entity existing in the state when ' +
		'it is in the index, not entityMap', () => {
		expect( countRelationModelsIndexedForEntity(
			mockStateForTests,
			'datetime',
			'52',
		) ).toBe( 1 );
	} );
	it( 'returns cached value for repeated call', () => {
		const testResult = countRelationModelsIndexedForEntity(
			mockStateForTests,
			'events',
			20,
		);
		expect( testResult ).toBe( 1 );
		expect( countRelationModelsIndexedForEntity(
			mockStateForTests,
			'event',
			'20'
		) ).toBe( testResult );
	} );
	describe( 'busts cache when state has changed', () => {
		const testResult = countRelationModelsIndexedForEntity(
			mockStateForTests,
			'event',
			10,
		);
		const modifiedState = { ...mockStateForTests };
		modifiedState.relations = modifiedState.relations.setIn(
			[ 'datetime', 44 ],
			Map().set( 'ticket', Set.of( 30, 20 ) )
		).setIn(
			[ 'ticket', 30 ],
			Map().set( 'datetime', Set.of( 44 ) )
		).setIn(
			[ 'ticket', 20 ],
			Map().set( 'datetime', Set.of( 44 ) )
		);
		const modifiedStateResult = countRelationModelsIndexedForEntity(
			modifiedState,
			'event',
			10,
		);
		it( 'has expected result for initial cached result', () => {
			expect( testResult ).toBe( 1 );
		} );
		it( 'busts cache when monitored state modified', () => {
			expect( testResult ).not.toBe( modifiedState );
		} );
		it( 'has expected result for modified state with same ' +
			'initial query', () => {
			expect( modifiedStateResult ).toBe( 1 );
		} );
		it( 'has expected result for new modified state and different ' +
			'query', () => {
			expect( countRelationModelsIndexedForEntity(
				modifiedState,
				'datetime',
				'44',
			) ).toBe( 1 );
		} );
	} );
} );

describe( 'getRelatedEntitiesForIds()', () => {
	beforeEach( () => getRelatedEntitiesForIds.clear() );
	it( 'returns expected entities for given arguments', () => {
		expect( getRelatedEntitiesForIds(
			mockStateForTests,
			'event',
			[ 10, 20 ],
			'datetimes'
		) ).toEqual(
			[
				DateTimeEntities.a,
				DateTimeEntities.b,
			]
		);
	} );
	it( 'returns expected entities for given arguments when the same ' +
		'relation entity is shared across multiple model entity ids', () => {
		const testState = {
			...mockStateForTests,
			relations: mockStateForTests.relations.setIn(
				[ 'datetime', 54 ],
				Map().set( 'event', Set.of( 10, 30 ) )
			).setIn(
				[ 'event', 10 ],
				Map().set( 'datetime', Set.of( 52, 54 ) )
			),
		};
		expect( getRelatedEntitiesForIds(
			testState,
			'event',
			[ 10, 30 ],
			'datetimes',
		) ).toEqual(
			[
				DateTimeEntities.a,
				DateTimeEntities.c,
			]
		);
	} );
} );
