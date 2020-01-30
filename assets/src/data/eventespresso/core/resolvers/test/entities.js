/**
 * External imports
 */
import { AuthedEventResponse } from '@test/fixtures';

/**
 * Internal imports
 */
import { getEntityById } from '../entities';
import { eventFactory } from '../../../test/fixtures/base';
import { fetch, resolveSelect } from '../../../base-controls';
import { receiveEntityRecords } from '../../actions';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../../schema/constants';

describe( getEntityById.name + '()', () => {
	describe( 'yields with expected response', () => {
		let fulfillment;
		const reset = ( calculatedFields = [] ) => fulfillment = getEntityById(
			'event',
			10,
			calculatedFields
		);
		const Event = eventFactory.fromExisting( AuthedEventResponse );
		it( 'yields action for fetching the entity (without calculated ' +
			'fields)', () => {
			reset();
			const { value } = fulfillment.next();
			expect( value ).toEqual( fetch(
				{
					path: '/ee/v4.8.36/events/10',
				}
			) );
		} );
		it( 'yields expected path with multiple calculated fields', () => {
			reset( [ 'foo', 'bar' ] );
			const { value } = fulfillment.next();
			expect( value.request.path )
				.toBe( '/ee/v4.8.36/events/10?calculate=foo%2Cbar' );
		} );
		it( 'yields expected path with string passed in for calculated ' +
			'fields', () => {
			reset( 'foo' );
			const { value } = fulfillment.next();
			expect( value.request.path )
				.toBe( '/ee/v4.8.36/events/10?calculate=foo' );
		} );
		it( 'yields resolve select action for getting factory', () => {
			reset();
			fulfillment.next();
			const { value } = fulfillment.next();
			expect( value ).toEqual(
				resolveSelect(
					SCHEMA_REDUCER_KEY,
					'getFactoryForModel',
					'event'
				)
			);
		} );
		it( 'returns null if the factory retrieved is not correct for the ' +
			'model', () => {
			const { value, done } = fulfillment.next( {} );
			expect( value ).toBe( null );
			expect( done ).toBe( true );
		} );
		it( 'yields receiveEntityRecords action when factory is ' +
			'retrieved', () => {
			reset();
			fulfillment.next();
			fulfillment.next( AuthedEventResponse );
			const { value } = fulfillment.next( eventFactory );
			expect( value ).toEqual(
				receiveEntityRecords(
					'event',
					[ Event ]
				)
			);
		} );
		it( 'returns the model entity', () => {
			const { value, done } = fulfillment.next();
			expect( value.name ).toEqual( Event.name );
			expect( done ).toBe( true );
		} );
	} );
} );
