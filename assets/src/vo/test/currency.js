import { Currency, SiteCurrency } from '../currency';
import { CURRENCY_CONFIG } from '@eventespresso/eejs';

jest.mock( '@eventespresso/eejs', () => ( {
	...require.requireActual( '@eventespresso/eejs' ),
	CURRENCY_CONFIG: {
		code: 'USD',
		singularLabel: 'dollar',
		pluralLabel: 'dollars',
		sign: '$',
		signB4: true,
		decimalMark: '.',
		thousandsSeparator: ',',
		subunits: 100,
	},
} ) );

describe( 'Currency Value Object', () => {
	describe( 'When it is constructed', () => {
		const currency = () => new Currency( CURRENCY_CONFIG );
		it( 'throws an Exception with an empty config', () => {
			const expected = () => new Currency();
			expect( expected ).toThrow( Error );
		} );
		it( 'with a valid config has expected props', () => {
			expect( currency ).not.toThrow();
			Object.getOwnPropertyNames( CURRENCY_CONFIG ).forEach( ( property ) => {
				expect( currency()[ property ] )
					.toEqual( CURRENCY_CONFIG[ property ] );
			} );
		} );
		it( 'cannot have properties changed after construction', () => {
			const testCurrency = currency();
			const changeProperty = () => {
				testCurrency.code = 'CDN';
			};
			expect( changeProperty ).toThrow();
			expect( testCurrency.code ).toEqual( 'USD' );
		} );
		describe( 'returns expected default props', () => {
			const testCurrency = new Currency( {
				code: 'dolla',
				sign: '🥇',
			} );
			[
				[ 'code', 'dolla' ],
				[ 'singularLabel', '' ],
				[ 'pluralLabel', '' ],
				[ 'sign', '🥇' ],
				[ 'signB4', true ],
				[ 'decimalPlaces', 2 ],
				[ 'thousandsSeparator', ',' ],
				[ 'subunits', 100 ],
			].forEach( ( [
				propertyName,
				expectedValue,
			] ) => {
				it( 'has expected value for the ' + propertyName +
					' property', () => {
					expect( testCurrency[ propertyName ] )
						.toBe( expectedValue );
				} );
			} );
		} );
		describe( 'toAccountingSettings()', () => {
			it( 'returns expected shape for object', () => {
				expect( currency().toAccountingSettings() ).toEqual(
					{
						currency: {
							symbol: '$',
							format: {
								pos: '%s%v',
								neg: '- $s%v',
								zero: '%s%v',
							},
							decimal: '.',
							thousand: ',',
							precision: 2,
						},
						number: {
							decimal: '.',
							thousand: ',',
							precision: 2,
						},
					}
				);
			} );
		} );
		describe( 'toJSON()', () => {
			it( 'returns expected string when converted to JSON', () => {
				expect( JSON.stringify( SiteCurrency( CURRENCY_CONFIG ) ) )
					.toEqual(
						JSON.stringify(
							{ ...CURRENCY_CONFIG, decimalPlaces: 2 }
						)
					);
			} );
		} );
	} );

	describe( 'Currency.validateCurrencyConfig', () => {
		const testConfig = { ...CURRENCY_CONFIG };
		const getTestObject = () => {
			return new Currency( testConfig );
		};
		const propertiesToTest = {
			code: 2,
			sign: 2,
			singularLabel: 2,
			pluralLabel: 2,
			signB4: 'true',
			decimalPlaces: '2',
			thousandsSeparator: 2,
			subunits: '2',
		};
		Object.getOwnPropertyNames( propertiesToTest ).forEach(
			( property ) => {
				describe( property + ' property validation', () => {
					it( 'throws TypeError for missing property', () => {
						delete( testConfig[ property ] );
						expect( getTestObject ).toThrow( TypeError );
					} );
					it( 'throws Type Error for invalid property', () => {
						testConfig[ property ] =
							propertiesToTest[ property ];
						expect( getTestObject ).toThrow( TypeError );
					} );
				} );
			} );
	} );
} );

describe( 'SiteCurrency', () => {
	it( 'triggers console.error when invalid CURRENCY_CONFIG provided', () => {
		const testCurrency = () => {
			SiteCurrency();
		};
		testCurrency();
		expect( console ).toHaveErrored();
	} );
} );
