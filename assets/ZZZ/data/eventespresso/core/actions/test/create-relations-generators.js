/**
 * Internal imports
 */
import {
	createRelation,
	createRelations,
	resolveRelationRecordForRelation,
} from '../create-relations-generators';
import { dispatch, resolveSelect, select } from '../../../base-controls';
import { REDUCER_KEY } from '../../constants';
import { EventEntities, DateTimeEntities } from '../../../test/fixtures/base';

describe( 'createRelation()', () => {
	describe( 'yields with expected response', () => {
		const TestEvent = EventEntities.b;
		let fulfillment;
		const reset = ( event ) => fulfillment = createRelation(
			'datetime',
			40,
			'event',
			event
		);
		it( 'throws a console error when provided entity is not a BaseEntity',
			() => {
				reset( { EVT_name: 'test event' } );
				const { value, done } = fulfillment.next();
				expect( console ).toHaveErrored();
				expect( value ).toBeUndefined();
				expect( done ).toBe( true );
			} );
		it( 'yields a dispatch action for receiving and resolving entities', () => {
			reset( TestEvent );
			const { value } = fulfillment.next();
			expect( value ).toEqual(
				dispatch(
					REDUCER_KEY,
					'receiveEntityAndResolve',
					TestEvent
				)
			);
		} );
		it( 'yields a dispatch action for receiving related entities', () => {
			const { value } = fulfillment.next();
			expect( value ).toEqual(
				dispatch(
					REDUCER_KEY,
					'receiveRelatedEntities',
					'datetime',
					40,
					'event',
					[ 20 ],
				)
			);
		} );
		it( 'yields a dispatch action for receiving dirty relation ' +
			'addition', () => {
			const { value } = fulfillment.next();
			expect( value ).toEqual(
				dispatch(
					REDUCER_KEY,
					'receiveDirtyRelationAddition',
					'event',
					20,
					'datetime',
					40,
				)
			);
		} );
	} );
} );

describe( 'createRelations()', () => {
	const TestEvents = [
		EventEntities.b,
		EventEntities.c,
	];
	let fulfillment;
	const reset = ( entities, relationName ) => fulfillment = createRelations(
		'datetime',
		40,
		relationName,
		entities
	);
	it( 'throws a console error if the entities are not for the given ' +
		'model', () => {
		reset( TestEvents, 'datetime' );
		const { value, done } = fulfillment.next();
		expect( console ).toHaveErroredWith(
			'Warning: Incoming relation Entities do not contain BaseEntity ' +
			'instances for the given relation model (datetime)'
		);
		expect( value ).toBeUndefined();
		expect( done ).toBe( true );
	} );
	it( 'yields a dispatch action for receiving entity records', () => {
		reset( TestEvents, 'events' );
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				REDUCER_KEY,
				'receiveEntitiesAndResolve',
				'event',
				TestEvents
			)
		);
	} );
	it( 'yields dispatch action for receiving related entity ids', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				REDUCER_KEY,
				'receiveRelatedEntities',
				'datetime',
				40,
				'event',
				[ 20, 30 ]
			)
		);
	} );
	it( 'yields resolveSelect control for getting the entity by id', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveSelect(
				REDUCER_KEY,
				'getEntityById',
				'datetime',
				40,
			)
		);
	} );
	it( 'yields dispatch control action for finishing the resolution on ' +
		'getRelatedEntities', () => {
		const { value } = fulfillment.next( DateTimeEntities.a );
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'finishResolution',
				REDUCER_KEY,
				'getRelatedEntities',
				[ DateTimeEntities.a, 'event' ]
			)
		);
	} );
	describe( 'yields dispatch actions for receiving dirty relations (for all ' +
		'expected ids)', () => {
		[ EventEntities.c, EventEntities.b ].forEach( ( relationEntity ) => {
			it( 'yields dispatch action for id:' + relationEntity.id, () => {
				const { value } = fulfillment.next();
				const args = [ 'event', relationEntity.id, 'datetime', 40 ];
				expect( value ).toEqual(
					dispatch(
						REDUCER_KEY,
						'receiveDirtyRelationAddition',
						...args
					)
				);
			} );
			it( 'yields dispatch action for finishing the resolution for ' +
				'get relatedEntities for id: ' + relationEntity.id, () => {
				const { value } = fulfillment.next();
				expect( value ).toEqual(
					dispatch(
						'core/data',
						'finishResolution',
						REDUCER_KEY,
						'getRelatedEntities',
						[ relationEntity, 'datetime' ]
					)
				);
			} );
		} );
	} );
} );

describe( 'resolveRelationRecordForRelation', () => {
	let fulfillment;
	const reset = () => fulfillment = resolveRelationRecordForRelation(
		DateTimeEntities.a,
		'event',
		20
	);
	it( 'yields select control action for whether the resolution has ' +
		'finished for the getEntityById selector for the incoming relation ' +
		'id', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			select(
				'core/data',
				'hasFinishedResolution',
				REDUCER_KEY,
				'getEntityById',
				[ 'datetime', DateTimeEntities.a.id ]
			)
		);
	} );
	it( 'if entity exists in the state, then yields select action for ' +
		'getting that entity from the state (it serves as authority)', () => {
		const { value } = fulfillment.next( true );
		expect( value ).toEqual(
			select(
				REDUCER_KEY,
				'getEntityById',
				'datetime',
				DateTimeEntities.a.id
			)
		);
	} );
	it( 'if entity does not exist in the state, then yields dispatch control ' +
		'for receiveEntityAndResolve', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next( false );
		expect( value ).toEqual(
			dispatch(
				REDUCER_KEY,
				'receiveEntityAndResolve',
				DateTimeEntities.a
			)
		);
	} );
	it( 'yields dispatch control action for receiveRelatedEntities', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				REDUCER_KEY,
				'receiveRelatedEntities',
				'event',
				20,
				'datetime',
				[ DateTimeEntities.a.id ]
			)
		);
	} );
	it( 'yields resolveSelect control action for getEntityById', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveSelect(
				REDUCER_KEY,
				'getEntityById',
				'event',
				20,
			)
		);
	} );
	it( 'yields dispatch control action for finishing the resolution on the ' +
		'getRelatedEntities selector for the relation on the model', () => {
		const { value } = fulfillment.next( EventEntities.a );
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'finishResolution',
				REDUCER_KEY,
				'getRelatedEntities',
				[ EventEntities.a, 'datetime' ]
			)
		);
	} );
	it( 'yields dispatch control action for finishing the resolution on the ' +
		'getRelatedEntities selector for the model on the relation', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				'core/data',
				'finishResolution',
				REDUCER_KEY,
				'getRelatedEntities',
				[ DateTimeEntities.a, 'event' ]
			)
		);
	} );
} );
