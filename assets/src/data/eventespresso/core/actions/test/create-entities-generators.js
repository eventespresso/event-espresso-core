/**
 * External dependencies
 */
import { isGenerator, isModelEntity } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { createEntity } from '../create-entities-generators';
import { eventFactory } from '../../../test/fixtures/base';
import { ACTION_TYPES } from '../action-types';

const { entities: types } = ACTION_TYPES;

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
		it( 'yields expected action for valid factory retrieved', () => {
			reset();
			fulfillment.next();
			const { value: action } = fulfillment.next( eventFactory );
			expect( action.type ).toEqual( types.RECEIVE_ENTITY );
			expect( isModelEntity( action.entity ) ).toBe( true );
			expect( action.entity.EVT_name ).toEqual( 'test event' );
		} );
		it( 'returns entityInstance', () => {
			const { value: event } = fulfillment.next();
			expect( isModelEntity( event ) ).toBe( true );
			expect( event.EVT_name ).toEqual( 'test event' );
		} );
	} );
} );
