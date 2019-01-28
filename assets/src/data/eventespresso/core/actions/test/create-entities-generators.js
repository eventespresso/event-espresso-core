/**
 * External dependencies
 */
import { isGenerator, isModelEntity } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { createEntity } from '../create-entities-generators';
import { eventFactory } from '../../../test/fixtures/base';

describe( 'createEntity()', () => {
	describe( 'yields with expected response', () => {
		const TestEvent = { EVT_name: 'test event' };
		let fulfillment;
		const reset = () =>
			fulfillment = createEntity( 'event', TestEvent );
		it( 'yields a generator for retrieving an Event factory', () => {
			reset();
			const { value } = fulfillment.next();
			expect( isGenerator( value ) ).toBe( true );
		} );
		it( 'yields null when invalid factory retrieved', () => {
			const { value } = fulfillment.next();
			expect( value ).toBe( null );
		} );
		it( 'yields expected generator for valid factory retrieved', () => {
			reset();
			fulfillment.next();
			const { value } = fulfillment.next( eventFactory );
			expect( isGenerator( value ) ).toBe( true );
		} );
		it( 'returns entityInstance', () => {
			const { value: event } = fulfillment.next();
			expect( isModelEntity( event ) ).toBe( true );
			expect( event.EVT_name ).toEqual( 'test event' );
		} );
	} );
} );
