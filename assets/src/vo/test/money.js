import Money from '../money';
import DefaultCurrency, { Currency } from '../currency';
import Decimal from 'decimal.js-light';
import { CURRENCY_CONFIG } from '@eventespresso/eejs';
import { settings } from 'accounting-js';

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

describe( 'Money Value Object', () => {
	describe( 'Constructing Money Value Object', () => {
		const testDecimal = new Decimal( 1.25 );
		const testMoney = new Money( testDecimal, DefaultCurrency );
		const assertEquivalencyTests = ( methodBeingTested ) => {
			it( 'throws a TypeError if a non valid object is passed in', () => {
				expect( () => testMoney[ methodBeingTested ]( {} ) )
					.toThrow( TypeError );
			} );
			it( 'throws an Error if the currencies for the two objects being ' +
				'added are not equal.', () => {
				expect( () => {
					testMoney[ methodBeingTested ](
						new Money(
							testDecimal,
							new Currency( {
								...CURRENCY_CONFIG,
								code: 'CAD',
							} )
						)
					);
				} ).toThrow();
			} );
		};
		it( 'throws TypeError with invalid DefaultCurrency', () => {
			const testFailMoney = () => {
				return new Money( testDecimal, {} );
			};
			expect( testFailMoney ).toThrow( TypeError );
		} );
		it( 'valid constructed Money object to have expected properties',
			() => {
				expect( testMoney ).toHaveProperty( 'amount', testDecimal );
				expect( testMoney )
					.toHaveProperty( 'currency', DefaultCurrency );
				expect( testMoney ).toHaveProperty( 'formatter' );
				expect( testMoney.formatter ).toHaveProperty(
					'settings',
					{
						...settings,
						...DefaultCurrency.toAccountingSettings().currency,
					}
				);
				expect( testMoney.formatter ).toHaveProperty( 'format' );
			}
		);
		it( 'formatter has correct settings from currency', () => {
			const currency = new Currency(
				{
					code: 'dolla',
					sign: '🥇',
				}
			);
			const money = new Money( testDecimal, currency );
			expect( money.formatter.settings.symbol ).toBe( '🥇' );
		} );
		it( 'expects three Money objects constructed using various types' +
			' of amounts that result in the same value are equal as ' +
			'expected', () => {
			const testMoneyB = new Money( 1.25, DefaultCurrency );
			const testMoneyC = new Money( '1.25', DefaultCurrency );
			expect( testMoney.equals( testMoneyB ) ).toBe( true );
			expect( testMoney.equals( testMoneyC ) ).toBe( true );
		} );
		it( 'throws an Error when a property is reassigned after construction',
			() => {
				const reassignedProp = () => {
					testMoney.amount = null;
				};
				expect( reassignedProp ).toThrow();
				expect( testMoney.amount ).toEqual( testDecimal );
			}
		);
		describe( 'setCurrency()', () => {
			it( 'Returns a new Money object when called', () => {
				const newMoney = testMoney.setCurrency( DefaultCurrency );
				// should not be the same instance even though the internal objects
				// are the same.
				expect( newMoney ).not.toBe( testMoney );
				expect( testMoney.currency ).toEqual( DefaultCurrency );
				expect( newMoney.currency ).toEqual( DefaultCurrency );
			}, 'setCurrency()' );
		} );
		describe( 'setAmount()', () => {
			it( 'Returns a new Money object when called', () => {
				const newMoney = testMoney.setAmount( testDecimal );
				// should not be the same instance even though the internal objects
				// are the same.
				expect( newMoney ).not.toBe( testMoney );
				expect( testMoney.amount ).toEqual( testDecimal );
				expect( newMoney.amount ).toEqual( testDecimal );
			} );
		} );
		describe( 'setFormatter()', () => {
			it( 'returns the same instance when this is called.', () => {
				const newMoney = testMoney.setFormatter();
				expect( newMoney ).toBe( testMoney );
				expect( testMoney.formatter ).toHaveProperty( 'format' );
			} );
		} );
		describe( 'equals()', () => {
			it( 'throws a TypeError when the type of the argument received is ' +
				'not a Money object', () => {
				expect( () => testMoney.equals( {} ) ).toThrow( TypeError );
			} );
			it( 'is equal with other when same Decimal and Currency objects are ' +
				'used for other Money object', () => {
				expect( testMoney.equals(
					new Money( testDecimal, DefaultCurrency )
				) ).toBe( true );
			} );
			it( 'is equal with other when new Decimal object with equivalent ' +
				'value and same Currency object are used for other Money' +
				' object', () => {
				expect( testMoney.equals(
					new Money(
						new Decimal( 1.25 ),
						DefaultCurrency
					)
				) ).toBe( true );
			} );
			it( 'is not equal with other when new Decimal object with different' +
				' amount and same Currency object are used for other Money ' +
				'object', () => {
				expect( testMoney.equals(
					new Money(
						new Decimal( 2.00 ),
						DefaultCurrency
					)
				) ).toBe( false );
			} );
			it( 'is not equal with other when same Decimal object with ' +
				'different currency object are used for other Money ' +
				'object', () => {
				expect( testMoney.equals(
					new Money(
						testDecimal,
						new Currency( { ...CURRENCY_CONFIG, code: 'CAD' } )
					)
				) ).toBe( false );
			} );
		} );
		describe( 'hasSameCurrency()', () => {
			it( 'throws an error if invalid type provided for argument', () => {
				expect( () => testMoney.hasSameCurrency( {} ) )
					.toThrow( TypeError );
			} );
			it( 'is equal with other when exact same currency objects exist on ' +
				'the compared money objects', () => {
				expect( testMoney.hasSameCurrency(
					new Money(
						testDecimal,
						DefaultCurrency
					)
				) ).toBe( true );
			} );
			it( 'is equal with other when different currency objects exist' +
				' on the compared money objects BUT the internal value of ' +
				'the currencies is the same', () => {
				expect( testMoney.hasSameCurrency(
					new Money(
						testDecimal,
						new Currency(
							DefaultCurrency.toJSON()
						)
					)
				) ).toBe( true );
			} );
			it( 'is not equal with other when different currency objects exist ' +
				'on the compared money objects and the internal value for the ' +
				'currencies is not the same', () => {
				expect( testMoney.hasSameCurrency(
					new Money(
						testDecimal,
						new Currency( { ...CURRENCY_CONFIG, code: 'CAD' } )
					)
				) ).toBe( false );
			} );
		} );
		describe( 'add()', () => {
			assertEquivalencyTests( 'add' );
			it( 'returns a new Money Object for the expected result', () => {
				const added = testMoney.add(
					new Money( testDecimal, DefaultCurrency )
				);
				expect( added.amount.toNumber() ).toBe( 2.50 );
				expect( added ).not.toBe( testMoney );
			} );
		} );
		describe( 'subtract()', () => {
			assertEquivalencyTests( 'subtract' );
			it( 'returns a new Money Object for the expected result', () => {
				const subtracted = testMoney.subtract(
					new Money( testDecimal, DefaultCurrency )
				);
				expect( subtracted.amount.toNumber() ).toBe( 0 );
				expect( subtracted ).not.toBe( testMoney );
			} );
		} );
		describe( 'multiply()', () => {
			it( 'returns a new Money Object for the expected result', () => {
				const multiplied = testMoney.multiply( 2 );
				expect( multiplied.amount.toNumber() ).toBe( 2.50 );
				expect( testMoney.amount.toNumber() ).toBe( 1.25 );
			} );
		} );
		describe( 'divide()', () => {
			it( 'returns a new Money object for the expected result', () => {
				const divided = testMoney.divide( 2 );
				expect( divided.amount.toNumber() ).toBe( 0.625 );
				expect( testMoney.amount.toNumber() ).toBe( 1.25 );
			} );
		} );
		describe( 'allocate()', () => {
			it( 'returns expected array of Money objects with the values for the ' +
				'described allocation with complex requirements', () => {
				const testComplexAllocation = testMoney.allocate( [ 1, 1, 1 ] );
				expect( testComplexAllocation ).toHaveLength( 3 );
				expect( testComplexAllocation[ 0 ].toNumber() ).toBe( .42 );
				expect( testComplexAllocation[ 1 ].toNumber() ).toBe( .42 );
				expect( testComplexAllocation[ 2 ].toNumber() ).toBe( .41 );
			} );
			it( 'returns expected array of Money objects with the values for the ' +
				'described allocation with simple requirements', () => {
				const testMoneySimple = new Money(
					new Decimal( 5 ),
					DefaultCurrency
				);
				const testSimpleAllocation = testMoneySimple.allocate( [
					3,
					2,
				] );
				expect( testSimpleAllocation ).toHaveLength( 2 );
				expect( testSimpleAllocation[ 0 ].toNumber() ).toBe( 3 );
				expect( testSimpleAllocation[ 1 ].toNumber() ).toBe( 2 );
			} );
		} );
		describe( 'compare()', () => {
			assertEquivalencyTests( 'compare' );
			it( 'returns 0 if they are the same', () => {
				expect( testMoney.compare(
					new Money(
						new Decimal( 1.25 ),
						new Currency( { ...CURRENCY_CONFIG } )
					)
				) ).toBe( 0 );
			} );
			it( 'returns 1 when this is greater than other', () => {
				expect( testMoney.compare(
					new Money(
						new Decimal( 1 ),
						DefaultCurrency
					)
				) ).toBe( 1 );
			} );
			it( 'returns -1 when this is less than other', () => {
				expect( testMoney.compare(
					new Money(
						new Decimal( 2 ),
						DefaultCurrency
					)
				) ).toBe( -1 );
			} );
		} );
		describe( 'greaterThan()', () => {
			assertEquivalencyTests( 'greaterThan' );
			it( 'returns true if this object is greater than provided ' +
				'object', () => {
				expect( testMoney.greaterThan(
					new Money( new Decimal( 1 ), DefaultCurrency )
				) ).toBe( true );
			} );
		} );
		describe( 'greaterThanOrEqualTo()', () => {
			assertEquivalencyTests( 'greaterThanOrEqualTo' );
			it( 'returns true if this object is greater than provided ' +
				'object', () => {
				expect( testMoney.greaterThanOrEqualTo(
					new Money( new Decimal( 1 ), DefaultCurrency )
				) ).toBe( true );
			} );
			it( 'returns true if this object is equal to provided ' +
				'object', () => {
				expect( testMoney.greaterThanOrEqualTo(
					new Money( new Decimal( 1.25 ), DefaultCurrency )
				) ).toBe( true );
			} );
		} );
		describe( 'lessThan()', () => {
			assertEquivalencyTests( 'lessThan' );
			it( 'returns true if this object is less than provided ' +
				'object', () => {
				expect( testMoney.lessThan(
					new Money( new Decimal( 2 ), DefaultCurrency )
				) ).toBe( true );
			} );
		} );
		describe( 'lessThanOrEqualTo()', () => {
			assertEquivalencyTests( 'lessThanOrEqualTo' );
			it( 'returns true if this object is less than ' +
				'the provided object', () => {
				expect( testMoney.lessThanOrEqualTo(
					new Money( new Decimal( 2 ), DefaultCurrency )
				) ).toBe( true );
			} );
			it( 'returns true if this object is equal to the provided ' +
				'object', () => {
				expect( testMoney.lessThanOrEqualTo(
					new Money( new Decimal( 1.25 ), DefaultCurrency )
				) ).toBe( true );
			} );
		} );
		describe( 'isZero()', () => {
			it( 'returns true if this object has a value of zero', () => {
				expect( testMoney.setAmount( new Decimal( 0 ) ).isZero() )
					.toBe( true );
			} );
			it( 'returns false if this object does not have a value of ' +
				'zero', () => {
				expect( testMoney.isZero() ).toBe( false );
			} );
		} );
		describe( 'isNegative()', () => {
			it( 'returns true if this object has a negative value', () => {
				expect( testMoney.setAmount( new Decimal( -1 ) ).isNegative() )
					.toBe( true );
			} );
			it( 'returns false if this object ahs a positive value', () => {
				expect( testMoney.isNegative() ).toBe( false );
			} );
		} );
		describe( 'isPositive()', () => {
			it( 'returns true if this object has a positive value', () => {
				expect( testMoney.isPositive() ).toBe( true );
			} );
			it( 'returns false if this object has a negative value', () => {
				expect( testMoney.setAmount( new Decimal( -1 ) ).isPositive() )
					.toBe( false );
			} );
		} );
		describe( 'toNumber()', () => {
			it( 'returns the value of the Money object as a number ' +
				'primitive', () => {
				expect( testMoney.setAmount( new Decimal( '1.25' ) )
					.toNumber() )
					.toBe( 1.25 );
			} );
		} );
		describe( 'toFixed()', () => {
			const toFixedTestObject = testMoney
				.setAmount( new Decimal( '1.24563' ) );
			it( 'returns the value of the Money object as the expected value for ' +
				'default config for the object', () => {
				expect( toFixedTestObject.toFixed() )
					.toBe( '1.25' );
			} );
			it( 'returns the value of the Money object as the expected value ' +
				'for the provided decimalPlaces', () => {
				expect( toFixedTestObject.toFixed( 1 ) ).toBe( '1.2' );
			} );
			it( 'returns the value of the Money object as the expected value ' +
				'for the provided Rounding type', () => {
				expect( toFixedTestObject.toFixed( 2, Money.ROUND_FLOOR ) )
					.toBe( '1.24' );
			} );
		} );
		describe( 'toIntegerMoney()', () => {
			it( 'returns a new Money object with a value that is the integer' +
				' of the original', () => {
				expect( testMoney.toIntegerMoney().amount.toNumber() )
					.toBe( 1 );
			} );
			it( 'returns expected new Money object for changed rounding', () => {
				const differentRoundingMoney = new Money(
					2.45,
					DefaultCurrency
				);
				Decimal.rounding = Money.ROUND_CEIL;
				expect( differentRoundingMoney.toIntegerMoney().toNumber() )
					.toBe( 3 );
				// return to default
				Decimal.rounding = Money.ROUND_HALF_UP;
			} );
		} );
		describe( 'toString()', () => {
			it( 'returns the expected formatted string for the currency value on ' +
				' string output', () => {
				expect( testMoney + '' ).toBe( '$1.25' );
			} );
		} );
		describe( 'toJSON()', () => {
			it( 'returns the expected serialized JSON string representing the' +
				' Money object', () => {
				expect( JSON.stringify( testMoney ) ).toEqual(
					'{"amount":"1.25","currency":' + JSON.stringify( testMoney.currency.toJSON() ) + '}'
				);
			} );
		} );
	} );
	describe( 'Money.assertMoney()', () => {
		it( 'throws a TypeError if invalid Money object provided', () => {
			expect( () => Money.assertMoney( {} ) ).toThrow( TypeError );
		} );
	} );
	describe( 'Money.assertCurrency()', () => {
		it( 'throws a TypeError if invalid Currency object provided', () => {
			expect( () => Money.assertCurrency( {} ) ).toThrow( TypeError );
		} );
	} );
	describe( 'Money.assertUsingSameCurrency()', () => {
		it( 'throws a TypeError if invalid Money object provided for this',
			() => {
				expect(
					() => Money.assertUsingSameCurrency( {}, {} )
				).toThrow( TypeError );
			} );
		it( 'throws a TypeError if invalid Money object provided for other',
			() => {
				expect(
					() => Money.assertUsingSameCurrency(
						new Money( new Decimal( 1 ), DefaultCurrency ),
						{ }
					)
				).toThrow( TypeError );
			} );
		it( 'throws an Error if two currencies on provided Money objects ' +
			'are not equal', () => {
			expect(
				() => Money.assertUsingSameCurrency(
					new Money( new Decimal( 1 ), DefaultCurrency ),
					new Money(
						new Decimal( 1 ),
						new Currency( {
							...DefaultCurrency.toJSON(),
							code: 'CAD',
						} )
					)
				)
			).toThrow();
		} );
	} );
	describe( 'Money.assertSameCurrency()', () => {
		it( 'throws a TypeError if provided values are not currencies', () => {
			expect( () => Money.assertSameCurrency( {}, {} ) )
				.toThrow( TypeError );
		} );
		it( 'throws an Error if provided values are not equal currencies', () => {
			expect( () => Money.assertSameCurrency(
				DefaultCurrency,
				new Currency(
					{
						...DefaultCurrency.toJSON(),
						code: 'CAD',
					}
				)
			) ).toThrow();
		} );
	} );
} );
