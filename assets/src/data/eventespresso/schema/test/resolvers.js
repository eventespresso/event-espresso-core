/**
 * External dependencies
 */
import { EventSchema } from '@test/fixtures';
import { getEndpoint } from '@eventespresso/model';

/**
 * Internal imports
 */
import {
	getSchemaForModel,
	getFactoryForModel,
	getRelationEndpointForEntityId,
	hasJoinTableRelation,
	getRelationType,
	getRelationSchema,
	getRelationResponseType,
	getRelationPrimaryKeyString,
} from '../resolvers';
import {
	receiveSchemaForModel,
	receiveFactoryForModel,
	receiveRelationEndpointForModelEntity,
	receiveRelationSchema,
} from '../actions';
import { eventFactory, EventEntities } from '../../test/fixtures/base';
import { fetch, resolveSelect } from '../../base-controls';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../core/constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../constants';

const poorManSerializer = ( item ) => {
	return JSON.parse( JSON.stringify( item ) );
};

describe( 'getSchemaForModel()', () => {
	describe( 'yields with expected response', () => {
		const fulfillment = getSchemaForModel( 'event' );
		it( 'yields expected result for api fetch action object', () => {
			const { value: apiFetchAction } = fulfillment.next();
			expect( apiFetchAction.request ).toEqual(
				{ path: '/ee/v4.8.36/events', method: 'OPTIONS' }
			);
		} );
		it( 'yields expected result for received schema action ' +
			'object', () => {
			const { value: schemaAction } = fulfillment.next( EventSchema );
			expect( schemaAction ).toEqual(
				receiveSchemaForModel( 'event', EventSchema )
			);
		} );
		it( 'returns schema', () => {
			const { value, done } = fulfillment.next();
			expect( value ).toBe( EventSchema );
			expect( done ).toBe( true );
		} );
	} );
} );

describe( 'getFactoryForModel()', () => {
	describe( 'yields with expected response', () => {
		let fulfillment;
		const reset = ( schema = {} ) => fulfillment = getFactoryForModel(
			'event',
			schema
		);
		const assertFactoryActionsAreEqual = ( actualAction ) => {
			// we're using poorManSerializer to compare because
			// the modelEntityFactory constructor uses Symbols for
			// properties and thus no two built factories will EVER be
			// the same. So for the purpose of this test, we just need to know
			// that the action object is as expected on a shallow comparison.
			expect( poorManSerializer( actualAction ) )
				.toEqual( poorManSerializer(
					receiveFactoryForModel( 'event', eventFactory )
				) );
		};
		it( 'yields expected action object for received factory when schema ' +
			'is provided', () => {
			reset( EventSchema );
			const { value } = fulfillment.next();
			assertFactoryActionsAreEqual( value );
		} );
		it( 'yields expected generator for schema selector when no ' +
			'schema provided', () => {
			reset();
			const { value } = fulfillment.next();
			expect( value ).toEqual(
				resolveSelect(
					SCHEMA_REDUCER_KEY,
					'getSchemaForModel',
					'event'
				)
			);
		} );
		it( 'returns null when there is no schema for the given model', () => {
			const { value, done } = fulfillment.next( {} );
			expect( value ).toBe( null );
			expect( done ).toBe( true );
		} );
		it( 'yields expected action object for received factory ' +
			'action', () => {
			reset();
			fulfillment.next();
			const { value } = fulfillment.next( EventSchema );
			assertFactoryActionsAreEqual( value );
		} );
		it( 'returns factory on successful generation', () => {
			const { value, done } = fulfillment.next();
			expect( poorManSerializer( value ) )
				.toEqual( poorManSerializer( eventFactory ) );
			expect( done ).toBe( true );
		} );
	} );
} );

describe( 'getRelationEndpointForEntityId()', () => {
	let fulfillment;
	const reset = () => fulfillment = getRelationEndpointForEntityId(
		'event',
		10,
		'datetimes'
	);
	it( 'yields resolve select control action for getting entity by id', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual( resolveSelect(
			CORE_REDUCER_KEY,
			'getEntityById',
			'event',
			10
		) );
	} );
	it( 'when entity endpoint is available for retrieved entity yields receive' +
		' relation endpoint active', () => {
		const { value } = fulfillment.next( EventEntities.a );
		expect( value ).toEqual(
			receiveRelationEndpointForModelEntity(
				'event',
				10,
				'datetimes',
				'ee/v4.8.36/events/10/datetimes'
			)
		);
	} );
	it( 'yields fetch action for retrieving the entity', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next( {} );
		expect( value ).toEqual( fetch(
			{
				path: getEndpoint( 'event' ) + '/' + 10,
			}
		) );
	} );
	it( 'returns empty string when there is no response for that ' +
		'endpoint', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( '' );
		expect( done ).toBe( true );
	} );
	it( 'returns empty string when there is no endpoint for the given ' +
		'relation', () => {
		reset();
		fulfillment.next();
		fulfillment.next( {} );
		const { value, done } = fulfillment.next( {
			_links: {
				'https://api.eventespresso.com/tickets': 'https://some_endpoint',
			},
		} );
		expect( value ).toEqual( '' );
		expect( done ).toBe( true );
	} );
	it( 'yields receive relation endpoint action object for relation existing ' +
		'in the response', () => {
		reset();
		fulfillment.next();
		fulfillment.next( {} );
		const { value } = fulfillment.next( {
			_links: {
				'https://api.eventespresso.com/datetimes':
					'https://some_endpoint',
			},
		} );
		expect( value ).toEqual(
			receiveRelationEndpointForModelEntity(
				'event',
				10,
				'datetimes',
				'https://some_endpoint'
			)
		);
	} );
	it( 'returns endpoint for valid data', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toEqual( 'https://some_endpoint' );
		expect( done ).toBe( true );
	} );
} );

describe( 'hasJoinTableRelation()', () => {
	let fulfillment;
	const reset = () => fulfillment = hasJoinTableRelation(
		'event',
		'datetimes'
	);
	it( 'yields resolveSelect control for getting the relation type', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getRelationType',
				'event',
				'datetimes'
			)
		);
	} );
	it( 'returns expected value when relation type is not a join table', () => {
		const { value, done } = fulfillment.next( 'BELONGS_TO' );
		expect( value ).toBe( false );
		expect( done ).toBe( true );
	} );
} );

describe( 'getRelationType()', () => {
	let fulfillment;
	const reset = () => fulfillment = getRelationType( 'event', 'datetimes' );
	it( 'yields resolveSelect control action for getting the relation ' +
		'schema', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getRelationSchema',
				'event',
				'datetimes',
			)
		);
	} );
	it( 'returns empty string if schema returns null', () => {
		const { value, done } = fulfillment.next( null );
		expect( value ).toBe( '' );
		expect( done ).toBe( true );
	} );
	it( 'returns relation type from schema if schema is not null', () => {
		reset();
		fulfillment.next();
		const { value, done } = fulfillment.next( { relation_type: 'foo' } );
		expect( value ).toBe( 'foo' );
		expect( done ).toBe( true );
	} );
} );
describe( 'getRelationResponseType', () => {
	let fulfillment;
	const reset = () => fulfillment = getRelationResponseType(
		'event',
		'datetimes'
	);
	it( 'yields resolve select control for getRelationSchema', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getRelationSchema',
				'event',
				'datetimes',
			)
		);
	} );
	it( 'returns empty string if relationSchema not available', () => {
		const { value, done } = fulfillment.next( null );
		expect( value ).toBe( '' );
		expect( done ).toBe( true );
	} );
	it( 'returns expected value if relationSchema available', () => {
		reset();
		fulfillment.next();
		const { value, done } = fulfillment.next( { type: 'array' } );
		expect( value ).toBe( 'array' );
		expect( done ).toBe( true );
	} );
} );
describe( 'getRelationSchema()', () => {
	let fulfillment;
	const reset = () => fulfillment = getRelationSchema( 'event', 'datetimes' );
	it( 'yields resolveSelect control for getting the Schema for the ' +
		'model', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getSchemaForModel',
				'event'
			)
		);
	} );
	it( 'throws an error if a schema is not returned', () => {
		const test = () => fulfillment.next( null );
		expect( test ).toThrowError();
	} );
	it( 'throws an error if there is no schema for the relation in the returned' +
		'model schema', () => {
		reset();
		fulfillment.next();
		const test = () => fulfillment.next( {} );
		expect( test ).toThrowError();
	} );
	it( 'yields the receiveRelationSchema action when a schema is ' +
		'returned', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next( {
			schema: {
				properties: {
					datetimes: 'foo',
				},
			},
		} );
		expect( value ).toEqual(
			receiveRelationSchema(
				'event',
				'datetimes',
				'foo'
			)
		);
	} );
} );
describe( 'getRelationPrimaryKeyString()', () => {
	let fulfillment;
	const reset = () => fulfillment = getRelationPrimaryKeyString(
		'event',
		'datetime'
	);
	it( 'yields resolve select action for the getRelationType selector', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getRelationType',
				'event',
				'datetimes'
			)
		);
	} );
	it( 'returns empty string if relation type cannot be retrieved', () => {
		const { value, done } = fulfillment.next( '' );
		expect( value ).toBe( '' );
		expect( done ).toBe( true );
	} );
	it( 'returns expected value when relationType is ' +
		'EE_Belongs_To_Relation', () => {
		reset();
		fulfillment.next();
		const { value, done } = fulfillment.next( 'EE_Belongs_To_Relation' );
		expect( value ).toBe( 'DTT_ID' );
		expect( done ).toBe( true );
	} );
	it( 'returns expected value when relationType is not ' +
		'EE_Belongs_To_Relation', () => {
		reset();
		fulfillment.next();
		const { value, done } = fulfillment.next( 'foo' );
		expect( value ).toBe( 'Datetime.DTT_ID' );
		expect( done ).toBe( true );
	} );
} );
