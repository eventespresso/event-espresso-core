/**
 * External dependencies
 */
import { EventSchema } from '@test/fixtures';
import { isGenerator } from '@eventespresso/validators';
import { getEndpoint } from '@eventespresso/model';

/**
 * Internal imports
 */
import {
	getSchemaForModel,
	getFactoryForModel,
	getRelationEndpointForEntityId,
	getSchemaByModel,
} from '../resolvers';
import {
	receiveSchemaForModel,
	receiveFactoryForModel,
	receiveRelationEndpointForModelEntity,
} from '../actions';
import { eventFactory } from '../../test/fixtures/base';
import { fetchFromApi, select } from '../controls';

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
			const { value: getSchemaByModelGenerator } = fulfillment.next();
			expect( isGenerator( getSchemaByModelGenerator ) ).toBe( true );
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
			const { value, done  } = fulfillment.next();
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
	it( 'yields fetch action for retrieving the entity', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual( fetchFromApi(
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
describe( 'getSchemaByModel()', () => {
	let fulfillment;
	const reset = () => fulfillment = getSchemaByModel( 'event' );
	it( 'yields select action for whether schema has been resolved for ' +
		'the given model', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			select(
				'hasResolvedSchemaForModel',
				'event'
			)
		);
	} );
	it( 'yields select action for getting the schema for the ' +
		'model when resolution for that selector is complete', () => {
		const { value } = fulfillment.next( true );
		expect( value ).toEqual(
			select(
				'getSchemaForModel',
				'event'
			)
		);
	} );
	it( 'returns the schema when resolution for the selector is ' +
		'complete', () => {
		const { value, done } = fulfillment.next( EventSchema );
		expect( value ).toBe( EventSchema );
		expect( done ).toBe( true );
	} );
	it( 'yields the getSchemaForModel generator when resolution has not been' +
		'completed', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next( false );
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'yields receiveSchemaForModel action object for the retrieved ' +
		'schema', () => {
		const { value } = fulfillment.next( EventSchema );
		expect( value ).toEqual( receiveSchemaForModel(
			'event',
			EventSchema
		) );
	} );
	it( 'returns retrieved schema', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toBe( EventSchema );
		expect( done ).toBe( true );
	} );
} );
