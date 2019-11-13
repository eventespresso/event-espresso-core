/**
 * External dependencies
 */
import { isGenerator } from '@eventespresso/validators';
/**
 * Internal dependencies
 */
import {
	getItems,
	getEntities,
	getEntitiesByIds,
	buildAndDispatchEntitiesFromResponse,
} from '../resolvers';
import { receiveResponse, receiveEntityResponse } from '../actions';
import {
	EventResponses,
	eventFactory,
	EventEntities,
} from '../../test/fixtures/base';
import {
	select,
	dispatch,
	fetch,
	resolveSelect,
	resolveGetEntityByIdForIds,
} from '../../base-controls';
import { REDUCER_KEY as CORE_REDUCER_KEY } from '../../core/constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../schema/constants';

describe( 'getItems()', () => {
	describe( 'yields with expected response', () => {
		const queryString = '?test_value=1';
		const testResponse = [ { testValue: 1 } ];
		const fulfillment = getItems( 'generic', queryString );
		// trigger initial fetch
		it( 'yields expected result for api fetch action object', () => {
			const { value } = fulfillment.next();
			expect( value ).toEqual(
				fetch( { path: '?test_value=1' } )
			);
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

describe( 'buildAndDispatchEntitiesFromResponse()', () => {
	const response = [ EventResponses.a ];
	let fulfillment;
	const reset = () => fulfillment = buildAndDispatchEntitiesFromResponse(
		'event',
		response
	);
	it( 'yields expected control action for getting the factory', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveSelect(
				SCHEMA_REDUCER_KEY,
				'getFactoryForModel',
				'event'
			)
		);
	} );
	it( 'returns an empty array when factory could not be retrieved', () => {
		const { value, done } = fulfillment.next( {} );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields expected select action object for core ' +
		'getEntitiesById', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next(
			eventFactory
		);
		expect( value ).toEqual(
			select(
				CORE_REDUCER_KEY,
				'getEntitiesByIds',
				'event',
				[ 10 ]
			)
		);
	} );
	it( 'yields entities from core state as fullEntities instead of from' +
		'when entities matching that id are in the core state', () => {
		const replacedEntities = [ eventFactory.fromExisting( EventResponses.a ) ];
		fulfillment.next( replacedEntities );
		fulfillment.next();
		const { value, done } = fulfillment.next();
		expect( value[ 0 ] ).toBe( replacedEntities[ 0 ] );
		expect( done ).toBe( true );
	} );
	it( 'yields expected dispatch action object for core receiving ' +
		'entity records', () => {
		reset();
		fulfillment.next();
		fulfillment.next( eventFactory );
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			dispatch(
				CORE_REDUCER_KEY,
				'receiveEntityRecords',
				'event',
				[ EventEntities.a ]
			)
		);
	} );
	it( 'yields control action for resolveGetEntityByIdForIds', () => {
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			resolveGetEntityByIdForIds(
				'event',
				[ EventEntities.a.id ]
			)
		);
	} );
	it( 'returns expected entities on completion', () => {
		const { value, done } = fulfillment.next();
		expect( value ).toEqual( [ EventEntities.a ] );
		expect( done ).toBe( true );
	} );
} );

describe( 'getEntities()', () => {
	const queryString = 'test_value=1';
	let fulfillment;
	describe( 'yields with expected response for main generator', () => {
		const reset = () => fulfillment = getEntities(
			'event',
			queryString
		);
		it( 'yields expected result for api fetch action object', () => {
			reset();
			const { value: apiFetchAction } = fulfillment.next();
			expect( apiFetchAction.request ).toEqual(
				{ path: '/ee/v4.8.36/events?test_value=1' }
			);
		} );
		it( 'returns empty array if response is empty', () => {
			const { value, done } = fulfillment.next( [] );
			expect( value ).toEqual( [] );
			expect( done ).toBe( true );
		} );
		it( 'yields generator for buildAndDispatchEntitiesFromResponse', () => {
			reset();
			fulfillment.next();
			const { value } = fulfillment.next( [ EventResponses.a ] );
			expect( isGenerator( value ) ).toBe( true );
		} );
		it( 'yields expected result for received value action object', () => {
			const { value: received } = fulfillment.next(
				[ EventEntities.a ]
			);
			expect( received ).toEqual(
				receiveEntityResponse(
					'event',
					'test_value=1',
					[ EventEntities.a ]
				)
			);
		} );
	} );
} );

describe( 'getEntitiesByIds()', () => {
	let fulfillment;
	const reset = () => fulfillment = getEntitiesByIds(
		'event',
		[ 10, 20 ]
	);
	it( 'yields expected result for api fetch action object', () => {
		reset();
		const { value } = fulfillment.next();
		expect( value ).toEqual(
			fetch( {
				path: '/ee/v4.8.36/events?[EVT_ID][IN]=10,20',
			} )
		);
	} );
	it( 'returns an empty array when there is nothing in the response', () => {
		const { value, done } = fulfillment.next( [] );
		expect( value ).toEqual( [] );
		expect( done ).toBe( true );
	} );
	it( 'yields generator for buildAndDispatchEntitiesFromResponse', () => {
		reset();
		fulfillment.next();
		const { value } = fulfillment.next(
			[ EventResponses.a, EventResponses.b ]
		);
		expect( isGenerator( value ) ).toBe( true );
	} );
	it( 'yields expected object for received value action creator', () => {
		const { value } = fulfillment.next( [ EventEntities.a ] );
		expect( value ).toEqual(
			receiveEntityResponse(
				'event',
				'[EVT_ID][IN]=10,20',
				[ EventEntities.a ]
			)
		);
	} );
} );
