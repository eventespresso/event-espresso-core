/**
 * External imports
 */
import { isGenerator } from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';
import { AuthedDateTimeResponse } from '@test/fixtures';

/**
 * Internal imports
 */
import { fetch, dispatch, select } from '../../../base-controls';
import { getRelatedEntities } from '../relations';
import { dateTimeFactory, EventEntities } from '../../../test/fixtures/base';
import {
	receiveEntityRecords,
	receiveRelatedEntities,
} from '../../actions';
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
			'http://ee.test/wp-json/ee/v4.8.36/events/10/datetimes'
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
				'http://ee.test/wp-json/ee/v4.8.36/events/10/datetimes'
			]
		) );
	} );
	it( 'yields a fetch action for getting relations', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual( fetch(
			{
				path: 'http://ee.test/wp-json/ee/v4.8.36/events/10/datetimes',
			}
		) );
	} );
	it( 'returns an empty array if there are no relations for the given ' +
		'entity and relationName', () => {
		const { value, done } = fulfillment.next( [] );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields a generator for getting the factory for the relation', () => {
		reset();
		fulfillment.next();
		fulfillment.next();
		fulfillment.next();
		const { value } = fulfillment.next( [ AuthedDateTimeResponse ] );
		expect( isGenerator( value ) ).toBe( true );
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
	it( 'yields generator for resolving related entities', () => {
		const { value } = fulfillment.next();
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'yields generator for resolving get entity by id for ids', () => {
		const { value } = fulfillment.next();
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns the related model entity instances', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toHaveLength( 1 );
		expect( value[ 0 ].id ).toEqual( AuthedDateTimeResponse.DTT_ID );
		expect( done ).toBe( true );
	} );
} );
