/**
 * Internal imports
 */
import {
	getFactoryByModel,
	getSchemaByModel,
	resolveGetEntityByIdForIds,
} from '../base-resolvers';
import { select, dispatch } from '../base-controls';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../core/constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../schema/constants';

/**
 * External imports
 */
import { EventFactory, EventSchema } from '@test/fixtures';
import { isGenerator } from '@eventespresso/validators';

const poorManSerializer = ( item ) => {
	return JSON.parse( JSON.stringify( item ) );
};

describe( 'getFactoryByModel()', () => {
	let fulfillment;
	const reset = () => fulfillment = getFactoryByModel( 'event' );
	it( 'yields select action for whether the factory has been resolved or ' +
		'not', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual( select(
			SCHEMA_REDUCER_KEY,
			'hasResolvedFactoryForModel',
			'event'
		) );
	} );
	it( 'yields select action for the factory from the schema when it has ' +
		'been resolved', () => {
		const { value } = fulfillment.next( true );
		expect( value ).toEqual( select(
			SCHEMA_REDUCER_KEY,
			'getFactoryForModel',
			'event'
		) );
	} );
	it( 'returns factory retrieved from the schema state when ' +
		'resolved', () => {
		const { value, done } = fulfillment.next( EventFactory );
		expect( value ).toBe( EventFactory );
		expect( done ).toBe( true );
	} );
	it( 'yields generator for getSchemaByModel when factory resolution has ' +
		'not completed', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next( false );
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'returns null if the schema could not be retrieved for the ' +
		'model', () => {
		const { value, done } = fulfillment.next( null );
		expect( value ).toBe( null );
		expect( done ).toBe( true );
	} );
	it( 'yields the dispatch action with the created factory when the schema ' +
		'is found for the model', () => {
		reset();
		fulfillment.next();
		fulfillment.next( false );
		const { value } = fulfillment.next( EventSchema );
		expect( poorManSerializer( value ) ).toEqual( poorManSerializer(
			dispatch(
				SCHEMA_REDUCER_KEY,
				'receiveFactoryForModel',
				'event',
				EventFactory
			)
		) );
	} );
	it( 'yields the dispatch action for resolving the factory for model ' +
		'selector', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual( dispatch(
			'core/data',
			'finishResolution',
			SCHEMA_REDUCER_KEY,
			'getFactoryForModel',
			[ 'event' ]
		) );
	} );
	it( 'returns the generated factory', () => {
		const { value, done } = fulfillment.next();
		expect( poorManSerializer( value ) )
			.toEqual( poorManSerializer( EventFactory ) );
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
				SCHEMA_REDUCER_KEY,
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
				SCHEMA_REDUCER_KEY,
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
	it( 'yields dispatch action for receiveSchemaForModel action object for ' +
		'the retrieved schema', () => {
		const { value } = fulfillment.next( EventSchema );
		expect( value ).toEqual( dispatch(
			SCHEMA_REDUCER_KEY,
			'receiveSchemaForModel',
			'event',
			EventSchema
		) );
	} );
	it( 'yields dispatch action for finishing the resolution on the get ' +
		'schema selector', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual( dispatch(
			'core/data',
			'finishResolution',
			SCHEMA_REDUCER_KEY,
			'getSchemaForModel',
			[ 'event' ]
		) );
	} );
	it( 'returns retrieved schema', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toBe( EventSchema );
		expect( done ).toBe( true );
	} );
} );

describe( 'resolveGetEntityByIdForIds()', () => {
	let fulfillment;
	const reset = () => fulfillment = resolveGetEntityByIdForIds(
		'event',
		[ 10, 20 ]
	);
	it( 'yields a dispatch action for each entityId', () => {
		const dispatchAction = ( expectedId ) => dispatch(
			'core/data',
			'finishResolution',
			CORE_REDUCER_KEY,
			'getEntityById',
			[ 'event', expectedId ]
		);
		reset();
		const { value: firstValue } = fulfillment.next();
		expect( firstValue ).toEqual( dispatchAction( 20 ) );
		const { value: secondValue } = fulfillment.next();
		expect( secondValue ).toEqual( dispatchAction( 10 ) );
		const { value, done } = fulfillment.next();
		expect( value ).toBeUndefined();
		expect( done ).toBe( true );
	} );
} );
