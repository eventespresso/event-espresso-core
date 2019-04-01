/**
 * External imports
 */
import { InvalidModelEntity } from '@eventespresso/eejs';
import { AuthedDateTimeResponse, AuthedEventResponse } from '@test/fixtures';

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
	const reset = (
		entity = EventEntities.a,
		relationName = 'datetime',
		calculatedFields = [],
	) => {
		fulfillment = getRelatedEntities(
			entity,
			relationName,
			calculatedFields
		);
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
	it( 'yields a fetch action for getting relations (no calculated ' +
		'fields)', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual( fetch(
			{
				path: 'ee/v4.8.36/events/10/datetimes',
			}
		) );
	} );
	it( 'yields expected path when there are multiple calculated ' +
		'fields', () => {
		reset( undefined, undefined, [ 'foo', 'bar' ] );
		fulfillment.next();
		fulfillment.next();
		const { value } = fulfillment.next();
		expect( value.request.path )
			.toBe( 'ee/v4.8.36/events/10/datetimes?calculate=foo%2Cbar' );
	} );
	it( 'yields expected path when there is a single calculated ' +
		'field passed in as a string', () => {
		reset( undefined, undefined, 'foo' );
		fulfillment.next();
		fulfillment.next();
		const { value } = fulfillment.next();
		expect( value.request.path )
			.toBe( 'ee/v4.8.36/events/10/datetimes?calculate=foo' );
	} );
	it( 'returns an empty array if there are no relations for the given ' +
		'entity and relationName', () => {
		reset();
		fulfillment.next();
		fulfillment.next();
		fulfillment.next();
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
		calculatedFields = []
	) => fulfillment = getRelatedEntitiesForIds(
		modelName,
		entityIds,
		relationName,
		calculatedFields
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
		it( 'yields expected fetch control when relationSchema is available ' +
			'(no calculated fields)', () => {
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
		it( 'yields expected path when there are multiple calculated ' +
			'fields', () => {
			reset(
				undefined,
				undefined,
				undefined,
				[ 'foo', 'bar' ]
			);
			fulfillment.next();
			fulfillment.next( true );
			fulfillment.next( { joining_model_name: 'Datetime_Ticket' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value.request.path )
				.toBe(
					'/ee/v4.8.36/datetime_tickets/?where' +
					'%5BTKT_ID%5D%5BIN%5D=10%2C20&include=Datetime.%2A' +
					'&calculate=Datetime.foo%2CDatetime.bar'
				);
		} );
		it( 'yields expected path when multiple a single calculated field ' +
			'is passed in as an argument', () => {
			reset(
				undefined,
				undefined,
				undefined,
				'foo'
			);
			fulfillment.next();
			fulfillment.next( true );
			fulfillment.next( { joining_model_name: 'Datetime_Ticket' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value.request.path )
				.toBe(
					'/ee/v4.8.36/datetime_tickets/?where' +
					'%5BTKT_ID%5D%5BIN%5D=10%2C20&include=Datetime.%2A' +
					'&calculate=Datetime.foo'
				);
		} );
		describe( 'yields expected action for each item in the response but ' +
			'only once for each same relation record', () => {
			it( 'yields first control action for dispatching ' +
				'resolveRelationRecordForRelation', () => {
				reset();
				fulfillment.next();
				fulfillment.next( true );
				fulfillment.next( { joining_model_name: 'Datetime_Ticket' } );
				fulfillment.next( dateTimeFactory );
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
		it( 'yields expected fetch control when relationSchema is present ' +
			'and relation type is `EE_Belongs_To_Relation` and there are ' +
			'no calculated fields', () => {
			reset(
				'event',
				[ 10, 20 ],
				'datetimes'
			);
			fulfillment.next();
			fulfillment.next( false );
			fulfillment.next( { relation_type: 'EE_Belongs_To_Relation' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value ).toEqual(
				fetch(
					{
						path: '/ee/v4.8.36/events/?where' +
							'[EVT_ID][IN]=10,20&include=Datetime.*',
					}
				)
			);
		} );
		it( 'yields expected path when relationSchema is present ' +
			'and relation type is `EE_Belongs_To_Relation` and there are ' +
			'multiple calculated fields', () => {
			reset(
				'event',
				[ 10, 20 ],
				'datetimes',
				[ 'foo', 'bar' ]
			);
			fulfillment.next();
			fulfillment.next( false );
			fulfillment.next( { relation_type: 'EE_Belongs_To_Relation' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value.request.path ).toBe(
				'/ee/v4.8.36/events/?where' +
				'%5BEVT_ID%5D%5BIN%5D=10%2C20&include=Datetime.%2A' +
				'&calculate=Datetime.foo%2CDatetime.bar'
			);
		} );
		it( 'yields expected path when relationSchema is present ' +
			'and relation type is `EE_Belongs_To_Relation` and there is a ' +
			'single calculated fields', () => {
			reset(
				'event',
				[ 10, 20 ],
				'datetimes',
				'foo'
			);
			fulfillment.next();
			fulfillment.next( false );
			fulfillment.next( { relation_type: 'EE_Belongs_To_Relation' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value.request.path ).toBe(
				'/ee/v4.8.36/events/?where' +
				'%5BEVT_ID%5D%5BIN%5D=10%2C20' +
				'&include=Datetime.%2A&calculate=Datetime.foo'
			);
		} );
		describe( 'yields expected action for each item in the response but ' +
			'only once for each same relation record', () => {
			// this test will only yield one action because the test deliberately
			// sends the same DateTimeResponse (which will have the same event
			// ids each time through the loop)
			it( 'yields first control action for dispatching ' +
				'resolveRelationRecordForRelation', () => {
				reset(
					'event',
					[ 10, 20 ],
					'datetimes'
				);
				fulfillment.next();
				fulfillment.next( false );
				fulfillment.next( { relation_type: 'EE_Belongs_To_Relation' } );
				fulfillment.next( dateTimeFactory );
				const { value } = fulfillment.next( [
					{ ...AuthedEventResponse, datetime: AuthedDateTimeResponse },
					{ ...AuthedEventResponse, datetime: AuthedDateTimeResponse },
				] );
				expect( value.type ).toBe( 'DISPATCH' );
				expect( value.reducerKey ).toBe( CORE_REDUCER_KEY );
				expect( value.dispatchName ).toBe( 'resolveRelationRecordForRelation' );
				expect( value.args[ 0 ].modelName ).toBe( 'datetime' );
				expect( value.args[ 1 ] ).toBe( 'event' );
				expect( value.args[ 2 ] ).toBe( AuthedEventResponse.EVT_ID );
			} );
			it( 'yields no more actions', () => {
				const { value, done } = fulfillment.next();
				expect( value ).toBeUndefined();
				expect( done ).toBe( true );
			} );
		} );
		it( 'yields expected fetch control when relationSchema is present ' +
			'and relation type is not `EE_Belongs_To_Relation (no calculated ' +
			'fields)', () => {
			reset(
				'event',
				[ 10, 20 ],
				'datetimes'
			);
			fulfillment.next();
			fulfillment.next( false );
			fulfillment.next( { relation_type: 'EE_Has_Many_Relation' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value ).toEqual(
				fetch(
					{
						path: '/ee/v4.8.36/datetimes/?where' +
							'[EVT_ID][IN]=10,20&include=Event.*',
					}
				)
			);
		} );
		it( 'yields expected fetch path when relationSchema is present ' +
			'and relation type is not `EE_Belongs_To_Relation and there ' +
			'are multiple calculated fields', () => {
			reset(
				'event',
				[ 10, 20 ],
				'datetimes',
				[ 'foo', 'bar' ]
			);
			fulfillment.next();
			fulfillment.next( false );
			fulfillment.next( { relation_type: 'EE_Has_Many_Relation' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value.request.path ).toBe(
				'/ee/v4.8.36/datetimes/?where' +
				'%5BEVT_ID%5D%5BIN%5D=10%2C20' +
				'&include=Event.%2A&calculate=foo%2Cbar'
			);
		} );
		it( 'yields expected fetch path when relationSchema is present ' +
			'and relation type is not `EE_Belongs_To_Relation and there ' +
			'is a single calculated field', () => {
			reset(
				'event',
				[ 10, 20 ],
				'datetimes',
				'foo'
			);
			fulfillment.next();
			fulfillment.next( false );
			fulfillment.next( { relation_type: 'EE_Has_Many_Relation' } );
			const { value } = fulfillment.next( dateTimeFactory );
			expect( value.request.path ).toBe(
				'/ee/v4.8.36/datetimes/?where' +
				'%5BEVT_ID%5D%5BIN%5D=10%2C20' +
				'&include=Event.%2A&calculate=foo'
			);
		} );
	} );
} );
