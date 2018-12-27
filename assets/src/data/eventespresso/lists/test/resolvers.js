/**
 * External dependencies
 */
import { isGenerator } from '@eventespresso/validators';
/**
 * Internal dependencies
 */
import { getItems, getEntities } from '../resolvers';
import { receiveResponse, receiveEntityResponse } from '../actions';
import {
	EventResponses,
	eventFactory,
	EventEntities,
} from '../../test/fixtures/base';

describe( 'getItems()', () => {
	describe( 'yields with expected response', () => {
		const queryString = '?test_value=1';
		const testResponse = [ { testValue: 1 } ];
		const fulfillment = getItems( 'generic', queryString );
		// trigger initial fetch
		it( 'yields expected result for api fetch action object', () => {
			const { value: apiFetchAction } = fulfillment.next();
			expect( apiFetchAction.request ).toEqual( { path: '?test_value=1' } );
		} );
		it( 'yields expected result for received value action object', () => {
			// Provide response and trigger action
			const { value: received } = fulfillment.next( testResponse );
			expect( received ).toEqual(
				receiveResponse( 'generic', '?test_value=1', testResponse )
			);
		} );
	} );
} );

describe( 'getEntities()', () => {
	const queryString = 'test_value=1';
	describe( 'yields with expected response for main generator', () => {
		const fulfillment = getEntities( 'event', queryString );
		it( 'yields expected result for api fetch action object', () => {
			const { value: apiFetchAction } = fulfillment.next();
			expect( apiFetchAction.request ).toEqual(
				{ path: '/ee/v4.8.36/events?test_value=1' }
			);
		} );
		it( 'yields expected getFactoryByModel generator', () => {
			const { value: getFactoryByModelGenerator } = fulfillment.next(
				[ EventResponses.a ]
			);
			expect( isGenerator( getFactoryByModelGenerator ) ).toBe( true );
		} );
		it( 'yields expected select action object for core ' +
			'getEntitiesById', () => {
			const { value: selectGetEntitiesByIdAction } = fulfillment.next(
				eventFactory
			);
			expect( selectGetEntitiesByIdAction.args ).toEqual(
				[ [ 10 ] ]
			);
		} );
		it( 'yields expected dispatch action object for core receiving ' +
			'entity records', () => {
			const { value: dispatchReceiveEntityRecords } = fulfillment
				.next( {} );
			expect( dispatchReceiveEntityRecords.args ).toEqual(
				[ 'event', new Map( [ [ 10, EventEntities.a ] ] ) ]
			);
		} );
		it( 'yields expected result for received value action object', () => {
			const { value: received } = fulfillment.next();
			expect( received ).toEqual(
				receiveEntityResponse(
					'event',
					'test_value=1',
					new Map( [ [ 10, EventEntities.a ] ] )
				)
			);
		} );
	} );
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
} );
