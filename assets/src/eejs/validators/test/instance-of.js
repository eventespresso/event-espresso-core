/**
 * External imports.
 */
import { Money, SiteCurrency } from '@eventespresso/value-objects';

/**
 * Internal imports.
 */
import { instanceOf } from '../instance-of';

describe( 'instanceOf()', () => {
	it( 'when object instance matches instance of it returns true', () => {
		const money = new Money( 0, SiteCurrency );
		expect( instanceOf( money, 'Money' ) ).toBe( true );
	} );
	it( 'when object instance matches instance of arbitrary function new it ' +
		'returns true', () => {
		function Example() {
			this.internal = 'foo';
		}
		expect( instanceOf( new Example, 'Example' ) )
			.toBe( true );
	} );
	it( 'when class is not instantiated, returns false', () => {
		expect( instanceOf( Money, 'Money' ) ).toBe( false );
	} );
	it( 'when wrong instance, returns false', () => {
		const Example = () => {
			return 'foo';
		};
		expect( instanceOf( new Example, 'Money' ) ).toBe( false );
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
