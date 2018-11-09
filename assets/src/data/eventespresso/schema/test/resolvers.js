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
import { eventFactory } from '../../test/fixtures/base';

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
