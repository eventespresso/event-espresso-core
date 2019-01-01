/**
 * External dependencies
 */
import { EventSchema } from '@test/fixtures';
import { isGenerator } from '@eventespresso/validators';

/**
 * Internal imports
 */
import {
	getSchemaForModel,
	getFactoryForModel,
} from '../resolvers';
import { receiveSchemaForModel, receiveFactoryForModel } from '../actions';
import { eventFactory, EventResponses } from '../../test/fixtures/base';
import { getEntities } from '../../lists/resolvers';

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
	} );
} );

describe( 'getFactoryForModel()', () => {
	describe( 'yields with expected response', () => {
		const fulfillment = getFactoryForModel( 'event' );
		it( 'yields expected generator for schema selector', () => {
			const { value: getSchemaByModelGenerator } = fulfillment.next();
			expect( isGenerator( getSchemaByModelGenerator ) ).toBe( true );
		} );
		it( 'yields expected action object for received factory ' +
			'action', () => {
			const { value: factoryAction } = fulfillment.next( EventSchema );
			// we're using poorManSerializer to compare because
			// the modelEntityFactory constructor uses Symbols for
			// properties and thus no two built factories will EVER be
			// the same. So for the purpose of this test, we just need to know
			// that the action object is as expected on a shallow comparison.
			expect( poorManSerializer( factoryAction ) )
				.toEqual( poorManSerializer(
					receiveFactoryForModel( 'event', eventFactory )
				) );
		} );
	} );
} );

/**
 * @todo refactor above to be somthing like this:
 */

describe( 'yields with expected response for ' +
	'getFactoryByModelGenerator', () => {
	const fulfillment = getEntities( 'event', queryString );
	fulfillment.next();
	const { value: getFactoryByModelGenerator } = fulfillment.next(
		[ EventResponses.a ]
	);
	it( 'yields expected hasResolvedFactoryForModel action', () => {
		const {
			value: hasResolvedFactoryForModelAction,
		} = getFactoryByModelGenerator.next();
		expect( hasResolvedFactoryForModelAction ).toEqual(
			{
				args: [ 'event' ],
				reducerKey: 'eventespresso/schema',
				selectorName: 'hasResolvedFactoryForModel',
				type: 'SELECT',
			}
		);
	} );
	it( 'yields expected getSchemaByModel generator', () => {
		const {
			value: getSchemaByModelGenerator,
		} = getFactoryByModelGenerator.next( false );
		expect( isGenerator( getSchemaByModelGenerator ) ).toBe( true );
	} );
	it( 'yields expected generator for getting factory', () => {
		const {
			value: getFactoryForModelFunction,
		} = getFactoryByModelGenerator.next( 'test' );
		expect( isGenerator( getFactoryForModelFunction ) )
			.toBe( true );
	} );
	it( 'yields expected dispatch action for receiving factory', () => {
		const {
			value: dispatchReceiveFactoryAction,
		} = getFactoryByModelGenerator.next( 'eventFactory' );
		expect( dispatchReceiveFactoryAction ).toEqual( {
			type: 'DISPATCH',
			reducerKey: 'eventespresso/schema',
			dispatchName: 'receiveFactoryForModel',
			args: [ 'event', 'eventFactory' ],
		} );
	} );
	it( 'yields expected dispatch action for finishing factory ' +
		'resolution', () => {
		const {
			value: finishResolutionAction,
		} = getFactoryByModelGenerator.next();
		expect( finishResolutionAction ).toEqual( {
			type: 'DISPATCH',
			reducerKey: 'core/data',
			dispatchName: 'finishResolution',
			args: [
				'eventespresso/schema',
				'getFactoryForModel',
				[ 'event' ],
			],
		} );
	} );
} );
describe( 'yields with expected response for getSchemaByModel ' +
	'generator', () => {
	const fulfillment = getEntities( 'event', queryString );
	fulfillment.next();
	const { value: FactoryGenerator } = fulfillment.next( [ EventResponses.a ] );
	FactoryGenerator.next();
	const {
		value: getSchemaByModelGenerator,
	} = FactoryGenerator.next( false );
	it( 'yields expected hasResolvedSchema action', () => {
		const {
			value: hasResolvedSchemaAction,
		} = getSchemaByModelGenerator.next();
		expect( hasResolvedSchemaAction ).toEqual( {
			args: [ 'event' ],
			reducerKey: 'eventespresso/schema',
			selectorName: 'hasResolvedSchemaForModel',
			type: 'SELECT',
		} );
	} );
	it( 'yields expected generator for getting schema', () => {
		const {
			value: getSchemaForModelFunction,
		} = getSchemaByModelGenerator.next( false );
		expect( isGenerator( getSchemaForModelFunction ) )
			.toBe( true );
	} );
	it( 'yields dispatch action for receiveSchemaForModel', () => {
		const {
			value: dispatchReceiveSchemaAction,
		} = getSchemaByModelGenerator.next( 'test' );
		expect( dispatchReceiveSchemaAction ).toEqual( {
			type: 'DISPATCH',
			reducerKey: 'eventespresso/schema',
			dispatchName: 'receiveSchemaForModel',
			args: [ 'event', 'test' ],
		} );
	} );
	it( 'yields dispatch action for finishing Resolution', () => {
		const {
			value: finishResolutionAction,
		} = getSchemaByModelGenerator.next();
		expect( finishResolutionAction ).toEqual( {
			type: 'DISPATCH',
			reducerKey: 'core/data',
			dispatchName: 'finishResolution',
			args: [
				'eventespresso/schema',
				'getSchemaForModel',
				[ 'event' ],
			],
		} );
	} );
} );
