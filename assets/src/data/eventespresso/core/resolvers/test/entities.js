/**
 * External imports
 */
import {
	isGenerator,
} from '@eventespresso/validators';
import { AuthedEventResponse } from '@test/fixtures';

/**
 * Internal imports
 */
import { getEntityById } from '../entities';
import { eventFactory } from '../../../test/fixtures/base';
import { fetch } from '../../../base-controls';
import { receiveEntityRecords } from '../../actions';

describe( getEntityById.name + '()', () => {
	describe( 'yields with expected response', () => {
		let fulfillment;
		const reset = () => fulfillment = getEntityById(
			'event',
			10
		);
		const Event = eventFactory.fromExisting( AuthedEventResponse );
		it( 'yields action for fetching the entity', () => {
			reset();
			const { value } = fulfillment.next();
			expect( value ).toEqual( fetch(
				{
					path: '/ee/v4.8.36/events?EVT_ID=10',
				}
			) );
		} );
		it( 'yields generator for getting factory', () => {
			const { value } = fulfillment.next();
			expect( isGenerator( value ) ).toBe( true );
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
