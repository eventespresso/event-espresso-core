/**
 * External imports.
 */
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal imports.
 */
import { instanceOf } from '../instance-of';

function ExampleClass() {
	this.internal = 'foo';
}

describe( 'instanceOf()', () => {
	it( 'when object instance matches instance of it returns true', () => {
		const money = new Money( 0, SiteCurrency );
		expect( instanceOf( money, 'Money' ) ).toBe( true );
	} );
	it( 'when object instance matches instance of arbitrary function new it ' +
		'returns true', () => {
		expect( instanceOf( new ExampleClass(), 'ExampleClass' ) )
			.toBe( true );
	} );
	it( 'when class is not instantiated, returns false', () => {
		expect( instanceOf( Money, 'Money' ) ).toBe( false );
	} );
	it( 'when wrong instance, returns false', () => {
		expect( instanceOf( new ExampleClass(), 'Money' ) ).toBe( false );
	} );
	it( 'returns false when objectInstance is not an object', () => {
		[
			null,
			'',
			[ 'foo', 'bar' ],
		].forEach( ( testValue ) => {
			expect( instanceOf( testValue, 'foo' ) ).toBe( false );
		} );
	} );
} );
