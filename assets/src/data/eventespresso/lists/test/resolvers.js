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
	describe( 'yields with expected response', () => {
		const queryString = 'test_value=1';
		const fulfillment = getEntities( 'event', queryString );
		it( 'yields expected result for api fetch action object', () => {
			const { value: apiFetchAction } = fulfillment.next();
			expect( apiFetchAction.request ).toEqual(
				{ path: '/ee/v4.8.36/events?test_value=1' }
			);
		} );
		it( 'yields expected factory action object', () => {
			const { value: selectFactoryAction } = fulfillment.next(
				[ EventResponses.a ]
			);
			expect( selectFactoryAction.args ).toEqual( [ 'event' ] );
		} );
		it( 'yields expected dispatch action object for core records', () => {
			const { value: dispatchCoreRecordsAction } = fulfillment.next(
				eventFactory
			);
			expect( dispatchCoreRecordsAction.args ).toEqual(
				[ eventFactory, { 10: EventResponses.a } ]
			);
		} );
		it( 'yields expected select action object for full entities', () => {
			const { value: selectFullEntitiesAction } = fulfillment.next();
			expect( selectFullEntitiesAction.args ).toEqual(
				[ 'event', [ '10' ] ]
			);
		} );
		it( 'yields expected result for received value action obejct', () => {
			const { value: received } = fulfillment.next( EventEntities );
			expect( received ).toEqual(
				receiveEntityResponse( 'event', 'test_value=1', EventEntities )
			);
		} );
	} );
} );
