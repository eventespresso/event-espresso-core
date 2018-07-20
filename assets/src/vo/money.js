/**
 * External imports
 */
import Decimal from 'decimal.js-light';
import * as Accounting from 'accounting-js';
import isShallowEqual from 'is-shallow-equal';
import { Exception } from '@eventespresso/eejs';

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
	if ( ! isShallowEqual( currencyA, currencyB ) ) {
		throw new Exception( 'Provided currencies are not equivalent.' );
	}
};

/**
 * A Value object representing money values.
 */
export default class Money {
	/**
	 * Original incoming amount for the Money Value object
	 * @type {number}
	 */
	originalAmount = 0;

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
	 * @param { Decimal } amount
	 * @param { Currency } currency
	 */
	constructor( amount, currency ) {
		this.setCurrency( currency );
		this.setAmount( amount );
		this.setFormatter();
		Object.freeze( this );
	}

	/**
	 * Set the currency property
	 * Note: This is "pseudo" private because the property cannot be set after
	 * construction.
	 * @param {Currency} currency
	 */
	setCurrency( currency ) {
		Money.assertCurrency( currency );
		//configure Decimal according to the currency
		this.currency = currency;
	}

	/**
	 * Set the amount property
	 * Note: This is "pseudo" private because the property cannot be set after
	 * construction.
	 * @param { Decimal } amount
	 */
	setAmount( amount ) {
		this.originalAmount = amount;
		Money.assertDecimal( amount );
		this.amount = amount;
	}

	/**
	 * Set the formatter for money values
	 * Note: this is "pseudo" private because the property cannot be set after
	 * construction.
	 */
	setFormatter() {
		Accounting.settings = {
			...Accounting.settings,
			...this.currency.toAccountingSettings(),
		};
		this.formatter = Accounting;
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
	 * This does a shallow comparison.
	 *
	 * @param {Money} other
	 * @return {boolean} True means the currencies are equal.
	 */
	hasEqualCurrency( other ) {
		Money.assertMoney( other );
		return isShallowEqual( this.currency, other.currency );
	}

	/**
	 * Add one Money object to this Money object
	 * @param {Money} other
	 * @return {Money} Returns a new instance of Money.
	 */
	add( other ) {
		Money.assertEquivalentCurrency( this, other );
		return new this( this.amount.plus( other.amount ), this.currency );
	}

	/**
	 * Subtract one Money object from this Money object
	 * @param {Money} other
	 * @return {Money} Returns a new instance of Money
	 */
	subtract( other ) {
		Money.assertEquivalentCurrency( this, other );
		return new this( this.amount.minus( other.amount ) );
	}

	/**
	 * Multiply this money object by the provided multiplier value.
	 *
	 * @param {number|string|Decimal} multiplier
	 * @return {Money} Returns a new instance of Money
	 */
	multiply( multiplier ) {
		Money.assertDecimal( multiplier );
		const amount = this.amount.times( multiplier );
		return new this( amount, this.currency );
	}

	/**
	 * Divide this money object by the provided divisor value.
	 *
	 * @param {number|string|Decimal} divisor
	 * @return {Money} Returns a new instance of Money
	 */
	divide( divisor ) {
		Money.assertDecimal( divisor );
		const amount = this.amount.dividedBy( divisor );
		return new this( amount, this.currency );
	}

	/**
	 * Allocates fund bases on the ratios provided returning an array of Money
	 * objects as a product of the allocation.
	 *
	 * Example:
	 * Divide into three parts
	 * let ten
	 *
	 * @param {Array} ratios
	 * @return {Money[]} An array of Money objects
	 */
	allocate( ratios ) {
		const self = this;
		const results = [];
		const convertedRatios = [];
		let remainder = self.amount;
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
				self.amount.times( ratio.dividedBy( total ) )
			);
			results.push( new self( share, self.currency ) );
			remainder = remainder.subtract( share );
		} );
		for ( let i = 0; remainder.greaterThan( 0 ); i++ ) {
			results[ i ] = new this(
				results[ i ].amount.plus( 1 ),
				results[ i ].currency
			);
			remainder.minus( 1 );
		}
		return results;
	}

	/**
	 * Compares two instances of Money.
	 *
	 * @param {Money} other
	 * @return {number} 0 if they are the same, 1 if this is greater than
	 * other and -1 if other is greater than this.
	 */
	compare( other ) {
		Money.assertEquivalentCurrency( this, other );
		return this.amount.comparedTo( other.amount );
	}

	/**
	 * Compares whether this Money object is greater than the other Money object.
	 * @param {Money} other
	 * @return {boolean} If true then this is greater than other.
	 */
	greaterThan( other ) {
		Money.assertEquivalentCurrency( this, other );
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
		Money.assertEquivalentCurrency( this, other );
		return this.amount.greaterThanOrEqualTo( other.amount );
	}

	/**
	 * Compares whether this Money object is less than the other Money object.
	 * @param {Money} other
	 * @return {boolean} If true then this is less than other
	 */
	lessThan( other ) {
		Money.assertEquivalentCurrency( this, other );
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
		Money.assertEquivalentCurrency( this, other );
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
	 * Receives amount as a number|string and returns a Money instance.
	 *
	 * @param {string|number} amount
	 * @param {Currency} currency
	 * @return {Money}  An instance of Money.
	 */
	static fromPrimitive = ( amount, currency ) => {
		amount = new Decimal( amount );
		return new this( amount, currency );
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
	static assertEquivalentCurrency = ( thisMoney, otherMoney ) => {
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
