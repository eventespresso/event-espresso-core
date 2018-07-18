/**
 * External imports
 */
import Decimal from 'decimal.js-light';
import * as Accounting from 'accounting-js';
import isShallowEqual from 'is-shallow-equal';
import { Exception } from '@eventespresso/eejs';

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

// loosely following similar schema to https://github.com/davidkalosi/js-money/blob/master/lib/money.js

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
	 * Returns whether the provide money object equals this money object.
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

	hasEqualCurrency( other ) {
		Money.assertMoney( other );
		return isShallowEqual( this.currency, other.currency );
	}

	add( other ) {
		Money.assertMoney( other );
		Money.assertEqualCurrency( this.currency, other.currency );
		return new this( this.amount.plus( other.amount ), this.currency );
	}

	subtract( other ) {
		Money.assertMoney( other );
		Money.assertEqualCurrency( this.currency, other.currency );
		return new this( this.amount.minus( other.amount ) );
	}

	multiply( multiplier ) {
		Money.assertDecimal( multiplier );
		const amount = this.amount.times( multiplier );
		return new this( amount, this.currency );
	}

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
	 * @return {Array.Money} An array of Money objects
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