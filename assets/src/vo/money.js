/**
 * External imports
 */
import { Decimal } from 'decimal.js-light';
import * as Accounting from 'accounting-js';
import isShallowEqual from '@wordpress/is-shallow-equal';
import { Exception } from '@eventespresso/eejs';
import { isEmpty } from 'lodash';

/**
 * Internal imports
 */
import { Currency } from './currency';

/**
 * Asserts if incoming value is an instance of Money
 * @param {Money} money
 * @throws {TypeError}
 */
const assertMoney = ( money ) => {
	if ( ! ( money instanceof Money ) ) {
		throw new TypeError( 'Instance of Money required' );
	}
};

/**
 * Asserts if incoming value is an instance of Currency
 * @param {Currency} currency
 * @throws {TypeError}
 */
const assertCurrency = ( currency ) => {
	if ( ! ( currency instanceof Currency ) ) {
		throw new TypeError( 'Instance of Currency required' );
	}
};

/**
 * Asserts if incoming value is an instance of Decimal
 * @param {Decimal} amount
 * @throws {TypeError}
 */
const assertDecimal = ( amount ) => {
	if ( ! ( amount instanceof Decimal ) ) {
		throw new TypeError( 'Instance of Decimal required' );
	}
};

/**
 * Asserts if two currencies are shallow equal.
 * @param {Currency} currencyA
 * @param {Currency} currencyB
 * @throws {Exception}
 */
const assertEqualCurrency = ( currencyA, currencyB ) => {
	assertCurrency( currencyA );
	assertCurrency( currencyB );
	if ( ! isShallowEqual( currencyA.toJSON(), currencyB.toJSON() ) ) {
		throw new Exception( 'Provided currencies are not equivalent.' );
	}
};

/**
 * A Value object representing money values.
 */
export default class Money {
	/**
	 * Internally the amount is stored as a Decimal instance.
	 * @type {Decimal}
	 */
	amount = {};

	/**
	 * Internally the amount is stored as a Currency instance.
	 * @type {Currency}
	 */
	currency = {};

	/**
	 * Formatter object for money values.
	 * @type {{}}
	 */
	formatter = {};

	/**
	 * Rounds away from zero
	 * @type {number}
	 */
	static ROUND_UP = Decimal.ROUND_UP;

	/**
	 * Rounds towards zero
	 * @type {number}
	 */
	static ROUND_DOWN = Decimal.ROUND_DOWN;

	/**
	 * Rounds towards infinity
	 * @type {number}
	 */
	static ROUND_CEIL = Decimal.ROUND_CEIL;

	/**
	 * Rounds towards -Infinity
	 * @type {number}
	 */
	static ROUND_FLOOR = Decimal.ROUND_FLOOR;

	/**
	 * Rounds towards nearest neighbour. If equidistant, rounds away from zero.
	 * @type {number}
	 */
	static ROUND_HALF_UP = Decimal.ROUND_HALF_UP;

	/**
	 * Rounds towards nearest neighbour. If equidistant rounds towards zero.
	 * @type {number}
	 */
	static ROUND_HALF_DOWN = Decimal.ROUND_HALF_DOWN;

	/**
	 * Rounds towards nearest neighbour. If equidistant, rounds towards even
	 * neighbour.
	 * @type {number}
	 */
	static ROUND_HALF_EVEN = Decimal.ROUND_HALF_EVEN;

	/**
	 * Rounds towards nearest neighbour. If equidistant, rounds towards
	 * Infinity.
	 * @type {number}
	 */
	static ROUND_HALF_CEIL = Decimal.ROUND_HALF_CEIL;

	/**
	 * Rounds towards nearest neighbour. If equidistant, rounds towards
	 * -Infinity.
	 * @type {number}
	 */
	static ROUND_HALF_FLOOR = Decimal.ROUND_HALF_FLOOR;

	/**
	 * Class constructor
	 * @param {Decimal} amount
	 * @param {Currency} currency
	 */
	constructor( amount, currency ) {
		this.setCurrency( currency )
			.setAmount( amount )
			.setFormatter();
		Object.freeze( this );
	}

	/**
	 * Set the currency property
	 *
	 * @param {Currency} currency
	 * @return {Money} Either this Money or new Money depending on state of
	 * property.
	 */
	setCurrency( currency ) {
		Money.assertCurrency( currency );
		// if there's already a currency set, then return a new object.
		if ( this.currency instanceof Currency ) {
			return new Money( this.amount, currency );
		}
		// configure Decimal according to the currency
		this.currency = currency;
		return this;
	}

	/**
	 * Set the amount property
	 *
	 * @param {Decimal} amount
	 * @return {Money} Either this Money or new Money depending on state of the
	 * property.
	 */
	setAmount( amount ) {
		Money.assertDecimal( amount );
		// if there's already an amount set, then return a new object.
		if ( this.amount instanceof Decimal ) {
			return new Money( amount, this.currency );
		}
		this.amount = amount;
		return this;
	}

	/**
	 * Set the formatter for money values
	 *
	 * @return {Money} An instance of this object.
	 */
	setFormatter() {
		// only initialize if its not already initialized
		if ( isEmpty( this.formatter ) ) {
			Accounting.settings = {
				...Accounting.settings,
				...this.currency.toAccountingSettings(),
			};
			this.formatter = Accounting;
		}
		return this;
	}

	/**
	 * Returns the value of this Money as its subunits.
	 * @return {number} If the subunits is 100 and the value is .45,
	 * this returns 450
	 */
	toSubunits() {
		return this.amount.toNumber() * this.currency.subunits;
	}

	/**
	 * Returns whether the provided money object equals this money object.
	 * Compares both amount and currency.
	 *
	 * @param {Money} other
	 * @return {boolean} True means this is equal. False means it isn't.
	 */
	equals( other ) {
		Money.assertMoney( other );
		return this.amount.equals( other.amount ) &&
			this.hasEqualCurrency( other );
	}

	/**
	 * Returns whether provided Money object's Currency equals this Money
	 * object's Currency.
	 *
	 * This does a shallow comparison on the serialized values for the currency
	 * objects.  That way if the currencies are different instances, but share
	 * the same internal value, they are considered equal.
	 *
	 * @param {Money} other
	 * @return {boolean} True means the currencies are equal.
	 */
	hasEqualCurrency( other ) {
		Money.assertMoney( other );
		return isShallowEqual(
			this.currency.toJSON(),
			other.currency.toJSON()
		);
	}

	/**
	 * Add one Money object to this Money object
	 * @param {Money} other
	 * @return {Money} Returns a new instance of Money.
	 */
	add( other ) {
		Money.assertEquivalentWithCurrency( this, other );
		return new Money( this.amount.plus( other.amount ), this.currency );
	}

	/**
	 * Subtract one Money object from this Money object
	 * @param {Money} other
	 * @return {Money} Returns a new instance of Money
	 */
	subtract( other ) {
		Money.assertEquivalentWithCurrency( this, other );
		return new Money( this.amount.minus( other.amount ), this.currency );
	}

	/**
	 * Multiply this money object by the provided multiplier value.
	 *
	 * @param {number|string|Decimal} multiplier
	 * @return {Money} Returns a new instance of Money
	 */
	multiply( multiplier ) {
		const amount = this.amount.times( multiplier );
		return new Money( amount, this.currency );
	}

	/**
	 * Divide this money object by the provided divisor value.
	 *
	 * @param {number|string|Decimal} divisor
	 * @return {Money} Returns a new instance of Money
	 */
	divide( divisor ) {
		const amount = this.amount.dividedBy( divisor );
		return new Money( amount, this.currency );
	}

	/**
	 * Allocates fund bases on the ratios provided returning an array of Money
	 * objects as a product of the allocation.
	 *
	 * @param {Array} ratios
	 * @return {Money[]} An array of Money objects
	 */
	allocate( ratios ) {
		const self = this;
		const results = [];
		const convertedRatios = [];
		let remainder = new Decimal( self.toSubunits() );
		let total = new Decimal( 0 );
		// convert ratios to decimal and generate total.
		ratios.forEach( ( ratio ) => {
			convertedRatios.push(
				ratio instanceof Decimal ? ratio : new Decimal( ratio )
			);
			total = total.plus( ratio );
		} );
		convertedRatios.forEach( ( ratio ) => {
			const share = new Decimal(
				Math.floor(
					self.toSubunits() * ratio.toNumber() / total.toNumber()
				)
			);
			results.push(
				new Money(
					share.dividedBy( this.currency.subunits ),
					this.currency
				)
			);
			remainder = remainder.minus( share );
		} );
		for ( let i = 0; remainder.greaterThan( 0 ); i++ ) {
			results[ i ] = new Money(
				( new Decimal( results[ i ].toSubunits() ) )
					.plus( 1 )
					.dividedBy( this.currency.subunits ),
				this.currency
			);
			remainder = remainder.minus( 1 );
		}
		return results;
	}

	/**
	 * Compares two instances of Money.
	 *
	 * Note: "same" means has equal value and equal currency.  It does not mean
	 * identical instances.
	 *
	 * @param {Money} other
	 * @return {number} 0 if they are the same, 1 if this is greater than
	 * other and -1 if other is greater than this.
	 */
	compare( other ) {
		//quickly return 0 if identical
		if ( this === other ) {
			return 0;
		}
		Money.assertEquivalentWithCurrency( this, other );
		return this.amount.comparedTo( other.amount );
	}

	/**
	 * Compares whether this Money object is greater than the other Money object.
	 * @param {Money} other
	 * @return {boolean} If true then this is greater than other.
	 */
	greaterThan( other ) {
		Money.assertEquivalentWithCurrency( this, other );
		return this.amount.greaterThan( other.amount );
	}

	/**
	 * Compares whether this Money object is greater than or equal to the other
	 * Money object.
	 *
	 * @param {Money} other
	 * @return {boolean} If true then this is greater than or equal to the other.
	 */
	greaterThanOrEqualTo( other ) {
		Money.assertEquivalentWithCurrency( this, other );
		return this.amount.greaterThanOrEqualTo( other.amount );
	}

	/**
	 * Compares whether this Money object is less than the other Money object.
	 * @param {Money} other
	 * @return {boolean} If true then this is less than other
	 */
	lessThan( other ) {
		Money.assertEquivalentWithCurrency( this, other );
		return this.amount.lessThan( other.amount );
	}

	/**
	 * Compares whether this Money object is less than or equal to the other
	 * Money object.
	 *
	 * @param {Money} other
	 * @return {boolean} If true then this is less than or equal to other.
	 */
	lessThanOrEqualTo( other ) {
		Money.assertEquivalentWithCurrency( this, other );
		return this.amount.lessThanOrEqualTo( other.amount );
	}

	/**
	 * Indicates if this object has the value of 0
	 *
	 * @return {boolean} If true then the value is 0.
	 */
	isZero() {
		return this.amount.isZero();
	}

	/**
	 * Indicates if the value in this Money object is negative.
	 *
	 * @return {boolean} If true then the value is negative.
	 */
	isNegative() {
		return this.amount.isNegative();
	}

	/**
	 * Indicates if the value in this Money object is positive.
	 *
	 * @return {boolean} If true then the value is positive.
	 */
	isPositive() {
		return this.amount.isPositive();
	}

	/**
	 * Returns the value of this Money object as a number primitive.
	 * @return {number} Returns a number.
	 */
	toNumber() {
		return this.amount.toNumber();
	}

	/**
	 * A string representing this Money object
	 *
	 * @param {number} decimalPlaces The number of decimal places to round to.
	 * If not provided uses the internal decimal place value.
	 * @param {number} rounding What rounding type to use (0-8).  Use Money ROUND
	 * constants.  Defaults to Money.ROUND_HALF_UP
	 * @return {string} Returns a string representing the value of this Money
	 * in normal (fixed-point) notation rounded to decimal places using
	 * rounding mode.
	 */
	toFixed( decimalPlaces, rounding = Money.ROUND_HALF_UP ) {
		decimalPlaces = decimalPlaces || this.currency.decimalPlaces;
		return this.amount.toFixed( decimalPlaces, rounding );
	}

	/**
	 * Returns a new Money whose value is the value of this Money rounded
	 * to a whole number using rounding mode rounding set on the original
	 * Decimal amount.
	 *
	 * @return {Money} A new Money object
	 */
	toIntegerMoney() {
		return new Money(
			this.amount.toInteger(),
			this.currency
		);
	}

	/**
	 * Returns the value of this Money object as a formatted string according
	 * to the currency configuration.
	 * @return {string} Returns a formatted string according to Currency.
	 */
	toString() {
		return this.formatter.format(
			this.amount.toNumber(),
			Accounting.settings
		);
	}

	/**
	 * @return { Object } Returns an object that represents the serialized
	 * value of this object.
	 */
	toJSON() {
		return {
			amount: this.amount.toJSON(),
			currency: this.currency.toJSON(),
		};
	}

	/**
	 * Receives amount as a number|string and returns a Money instance.
	 *
	 * @param {string|number} amount
	 * @param {Currency} currency
	 * @return {Money}  An instance of Money.
	 */
	static fromPrimitive = ( amount, currency ) => {
		amount = new Decimal( amount );
		return new Money( amount, currency );
	};

	/**
	 * Asserts if the provided value is an instance of Money.
	 * @param {Money} money
	 * @throws {TypeError}
	 */
	static assertMoney = ( money ) => {
		assertMoney( money );
	};

	/**
	 * Asserts if the provided value is an instance of Currency.
	 * @param {Currency} currency
	 * @throws {TypeError}
	 */
	static assertCurrency = ( currency ) => {
		assertCurrency( currency );
	};

	/**
	 * Asserts if the provided values are both Money objects and have Equal
	 * Currency objects.
	 *
	 * @param {Money} thisMoney
	 * @param {Money} otherMoney
	 * @throws {TypeError}
	 */
	static assertEquivalentWithCurrency = ( thisMoney, otherMoney ) => {
		assertMoney( thisMoney );
		assertMoney( otherMoney );
		assertEqualCurrency( thisMoney.currency, otherMoney.currency );
	};

	/**
	 * Asserts if the provided value is an instance of Decimal.
	 * @param {Decimal} amount
	 * @throws {TypeError}
	 */
	static assertDecimal = ( amount ) => {
		assertDecimal( amount );
	};

	/**
	 * Asserts if two currencies are shallow equal.
	 * @param {Currency} currencyA
	 * @param {Currency} currencyB
	 * @throws {Exception}
	 */
	static assertEqualCurrency = ( currencyA, currencyB ) => {
		assertEqualCurrency( currencyA, currencyB );
	}
}
