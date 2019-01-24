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
} from '../resolvers';
import {
	receiveSchemaForModel,
	receiveFactoryForModel,
	receiveRelationEndpointForModelEntity,
} from '../actions';
import { eventFactory, EventEntities } from '../../test/fixtures/base';
import { fetchFromApi } from '../controls';
import { select } from '../../base-controls';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../core/constants';

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
	it( 'yields select action for getting entity by Id', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
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
