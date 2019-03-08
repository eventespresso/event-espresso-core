/**
 * External imports
 */
import { InvalidModelEntity } from '@eventespresso/eejs';
import { AuthedDateTimeResponse } from '@test/fixtures';

/**
 * Internal imports
 */
import {
	fetch,
	dispatch,
	select,
	resolveSelect,
	resolveGetEntityByIdForIds,
} from '../../../base-controls';
import { getRelatedEntities, getRelatedEntitiesForIds } from '../relations';
import { dateTimeFactory, EventEntities } from '../../../test/fixtures/base';
import { receiveRelatedEntities } from '../../actions';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../../schema/constants';

describe( getRelatedEntities.name + '()', () => {
	let fulfillment;
	const reset = ( entity = EventEntities.a, relationName = 'datetime' ) => {
		fulfillment = getRelatedEntities( entity, relationName );
	};
	it( 'throws InvalidModelEntity when incoming entity value is not a ' +
		'model entity instance', () => {
		reset( 'cheesburgers', 'events' );
		const testFulfillment = () => fulfillment.next();
		expect( testFulfillment ).toThrow( InvalidModelEntity );
	} );
	it( 'generates a console warning when there is no relation endpoint ' +
		'on the entity for the given relation name', () => {
		reset( EventEntities.a, 'cheeseburgers' );
		const { value, done } = fulfillment.next();
		expect( console ).toHaveErrored(
			'There is no relation resource for the given model (event) and ' +
			'requested relation (cheesburgers)'
		);
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields a dispatch action for ' +
		'receiveRelationEndpointForModelEntity', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual( dispatch(
			SCHEMA_REDUCER_KEY,
			'receiveRelationEndpointForModelEntity',
			'event',
			EventEntities.a.id,
			'datetimes',
			'ee/v4.8.36/events/10/datetimes'
		) );
	} );
	it( 'yields a dispatch action for finishing resolution for ' +
		'receiveRelationEndpointForModelEntity', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual( dispatch(
			'core/data',
			'finishResolution',
			SCHEMA_REDUCER_KEY,
			'receiveRelationEndpointForModelEntity',
			[
				'event',
				EventEntities.a.id,
				'datetimes',
				'ee/v4.8.36/events/10/datetimes',
			]
		) );
	} );
	it( 'yields a fetch action for getting relations', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual( fetch(
			{
				path: 'ee/v4.8.36/events/10/datetimes',
			}
		) );
	} );
	it( 'returns an empty array if there are no relations for the given ' +
		'entity and relationName', () => {
		const { value, done } = fulfillment.next( [] );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields a control action for getting the factory for the ' +
		'relation', () => {
		reset();
		fulfillment.next();
		fulfillment.next();
		fulfillment.next();
		const { value } = fulfillment.next( [ AuthedDateTimeResponse ] );
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getFactoryForModel',
				'datetime'
			)
		);
	} );
	it( 'yields an empty array if the value retrieved is not a factory for ' +
		'given relation', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields a select action for getEntitiesByIds', () => {
		reset();
		fulfillment.next();
		fulfillment.next();
		fulfillment.next();
		fulfillment.next( [ AuthedDateTimeResponse ] );
		const { value } = fulfillment.next( dateTimeFactory );
		expect( value ).toEqual( select(
			CORE_REDUCER_KEY,
			'getEntitiesByIds',
			'datetime',
			[ AuthedDateTimeResponse.DTT_ID ]
		) );
	} );
	it( 'yields receiveEntityRecords action for retrieved relations', () => {
		const { value } = fulfillment.next( {} );
		expect( value.modelName ).toEqual( 'datetime' );
		expect( value.entities[ 0 ].id ).toEqual( AuthedDateTimeResponse.DTT_ID );
	} );
	it( 'yields receiveRelatedEntities action for retrieved relations', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			receiveRelatedEntities(
				'event',
				EventEntities.a.id,
				'datetimes',
				[ AuthedDateTimeResponse.DTT_ID ]
			)
		);
	} );
	it( 'yields control action for resolving related entities', () => {
		const { value } = fulfillment.next();
		expect( value.type ).toBe( 'RESOLVE_GET_RELATED_ENTITIES' );
		expect( value.relationIds ).toEqual( [ AuthedDateTimeResponse.DTT_ID ] );
	} );
	it( 'yields control action for resolving get entity by id for ids', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveGetEntityByIdForIds(
				'datetime',
				[ AuthedDateTimeResponse.DTT_ID ]
			)
		);
	} );
	it( 'returns the related model entity instances', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toHaveLength( 1 );
		expect( value[ 0 ].id ).toEqual( AuthedDateTimeResponse.DTT_ID );
		expect( done ).toBe( true );
	} );
} );

describe( 'getRelatedEntitiesForIds()', () => {
	let fulfillment;
	const simulatedDatetimeTicketResponse = [
		{
			DTT_ID: 50,
			TKT_ID: 10,
			datetimes: [
				AuthedDateTimeResponse,
			],
		},
		{
			DTT_ID: 50,
			TKT_ID: 20,
			datetimes: [
				AuthedDateTimeResponse,
			],
		},
	];
	const reset = (
		modelName = 'ticket',
		entityIds = [ 10, 20 ],
		relationName = 'datetimes',
	) => fulfillment = getRelatedEntitiesForIds(
		modelName,
		entityIds,
		relationName
	);
	it( 'yields resolveSelect for hasJoinTableRelation selector', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'hasJoinTableRelation',
				'ticket',
				'datetimes'
			)
		);
	} );
	it( 'yields resolveSelect control for getRelationSchema', () => {
		const { value } = fulfillment.next( true );
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getRelationSchema',
				'ticket',
				'datetimes'
			)
		);
	} );
	it( 'returns empty array if relationSchema is not available', () => {
		const { value, done } = fulfillment.next( null );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields resolveSelect control for getFactoryForModel when ' +
		'relationSchema available', () => {
		reset();
		fulfillment.next();
		fulfillment.next( true );
		const { value } = fulfillment.next(
			{ joining_model_name: 'Datetime_Ticket' }
		);
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getFactoryForModel',
				'datetime'
			)
		);
	} );
	describe( 'when relation has join table', () => {
		it( 'yields expected fetch control when relationSchema is available', () => {
			reset();
			fulfillment.next();
			fulfillment.next( true );
			fulfillment.next( { joining_model_name: 'Datetime_Ticket' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value ).toEqual(
				fetch(
					{
						path: '/ee/v4.8.36/datetime_tickets/?where' +
							'[TKT_ID][IN]=10,20&include=Datetime.*',
					}
				)
			);
		} );
		describe( 'yields expected action for each item in the response but ' +
			'only once for each same relation record', () => {
			it( 'yields first control action for dispatching ' +
				'resolveRelationRecordForRelation', () => {
				const { value } = fulfillment.next( simulatedDatetimeTicketResponse );
				expect( value.type ).toBe( 'DISPATCH' );
				expect( value.reducerKey ).toBe( CORE_REDUCER_KEY );
				expect( value.dispatchName ).toBe( 'resolveRelationRecordForRelation' );
				expect( value.args[ 0 ].modelName ).toBe( 'datetime' );
				expect( value.args[ 1 ] ).toBe( 'ticket' );
				expect( value.args[ 2 ] ).toBe( 20 );
			} );
			it( 'yields second control action for dispatching ' +
				'resolveRelationRecordForRelation', () => {
				const { value } = fulfillment.next();
				expect( value.type ).toBe( 'DISPATCH' );
				expect( value.reducerKey ).toBe( CORE_REDUCER_KEY );
				expect( value.dispatchName ).toBe( 'resolveRelationRecordForRelation' );
				expect( value.args[ 0 ].modelName ).toBe( 'datetime' );
				expect( value.args[ 1 ] ).toBe( 'ticket' );
				expect( value.args[ 2 ] ).toBe( 10 );
			} );
		} );
	} );
	describe( 'when relation does not have join table', () => {
		it( 'yields expected fetch control when relationSchema is available', () => {
			reset(
				'event',
				[ 10, 20 ],
				'datetimes'
			);
			fulfillment.next();
			fulfillment.next( false );
			fulfillment.next( { joining_model_name: 'Datetime_Ticket' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value ).toEqual(
				fetch(
					{
						path: '/ee/v4.8.36/datetimes/?where' +
							'[EVT_ID][IN]=10,20',
					}
				)
			);
		} );
		describe( 'yields expected action for each item in the response but ' +
			'only once for each same relation record', () => {
			// this test will only yield one action because the test deliberately
			// sends the same DateTimeResponse (which will have the same event
			// ids each time through the loop)
			it( 'yields first control action for dispatching ' +
				'resolveRelationRecordForRelation', () => {
				const { value } = fulfillment.next( [
					AuthedDateTimeResponse,
					AuthedDateTimeResponse,
				] );
				expect( value.type ).toBe( 'DISPATCH' );
				expect( value.reducerKey ).toBe( CORE_REDUCER_KEY );
				expect( value.dispatchName ).toBe( 'resolveRelationRecordForRelation' );
				expect( value.args[ 0 ].modelName ).toBe( 'datetime' );
				expect( value.args[ 1 ] ).toBe( 'event' );
				expect( value.args[ 2 ] ).toBe( 523 );
			} );
			it( 'yields no more actions', () => {
				const { value, done } = fulfillment.next();
				expect( value ).toBeUndefined();
				expect( done ).toBe( true );
			} );
		} );
	} );
} );
