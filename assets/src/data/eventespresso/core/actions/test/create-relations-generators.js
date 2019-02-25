/**
 * Internal imports
 */
import {
	createRelation,
	createRelations,
} from '../create-relations-generators';
import { dispatch } from '../../../base-controls';
import { REDUCER_KEY } from '../../constants';
import { EventEntities } from '../../../test/fixtures/base';

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
					'event',
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
					'events',
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
					'events',
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
				'events',
				[ 20, 30 ]
			)
		);
	} );
	describe( 'yields dispatch actions for receiving dirty relations (for all ' +
		'expected ids)', () => {
		[ 30, 20 ].forEach( ( relationId ) => {
			it( 'yields dispatch action for id:' + relationId, () => {
				const { value } = fulfillment.next();
				const args = [ 'events', relationId, 'datetime', 40 ];
				expect( value ).toEqual(
					dispatch(
						REDUCER_KEY,
						'receiveDirtyRelationAddition',
						...args
					)
				);
			} );
		} );
	} );
} );
