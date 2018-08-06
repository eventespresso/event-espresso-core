## Money Value Object
The money value object represents an amount of money.  

## Features:

- internally uses [`decimal-light`](https://github.com/MikeMcl/decimal.js), and [`accounting-js`](https://github.com/nashdot/accounting-js).  The `decimal` object (itself a value object) is how the internal money amount is stored and `accounting` is used as the formatter.
- simple api containing various methods for basic money calculations.
- handles currencies (via the [Currency](currency.md) value object requirement for construction).

## Installation/Loading:

The money vo is available via the `eejs` global on its `valueObjects` property.  So you can use it directly via `eejs.valueObjects.Money` provided the bundled `@eventespresso/vo` javascript has been loaded before your script.  For instructions on different ways to do this you can [go here](README.md#Usage).

## API

### Constructor
A money value object can be constructed with provided amount and currency arguments.

`amount` can be an instance of `Decimal`, or a `number` or `string` (numeric) primitive.
```js
// all three of these constructed instances will have a value of 1.25 for the money.
const myMoney = new Money( new Decimal( 1.25 ), new Currency( currencyConfig ) );
const myMoneyB = new Money( 1.25, new Currency( currencyConfig ) );
const myMoneyC = new Money( '1.25', new Currency( currencyConfig ) );
```

#### _Methods_
#### 
#### `Money.assertMoney`
```js
Money.assertMoney( maybeMoney );
```

This method throws a `TypeError` if the provided argument is not an instance of `Money`.

#### `Money.assertCurrency`
```js
Money.assertCurrency( maybeCurrency );
```
This method throws a `TypeError` if the provided argument is not an instance of `Currency`

### `Money.assertUsingSameCurrency`
```js
Money.assertUsingSameCurrency( oneMoney, otherMoney );
```
This method throws a `TypeError` if either of the provided arguments are not instances of `Money` and throws an `eejs.Exception` if the currencies that are a part of each Money object are not equal (see `Money.assertSameCurrency`)

#### `Money.assertDecimal`
```js
Money.assertDecimal( maybeDecimal );
```
This method throws a `TypeError` if the provided argument is not an instance of `Decimal`.

#### `Money.assertSameCurrency`
```js
Money.assertSameCurrency( currencyA, currencyB );
```
This method throws a `TypeError` if either of the provided arguments is not an instance of `Currency` and throws an `eejs.Exception` if the provided currencies are not equal.  The equivalence test is done via a shallow comparison of the properties on each currency.

### _Properties_
#### `Money.ROUND_UP`
This is used for indicating rounding that should round to away from zero.

#### `Money.ROUND_DOWN`
This is used for indicating rounding that should round towards zero.

#### `Money.ROUND_CEIL`
This is used for indicating rounding towards infinity.

#### `Money.ROUND_FLOOR`
This is used for indicating rounding towards negative infinity.

#### `Money.ROUND_HALF_UP`
This is used for indicating rounding towards nearest neighbour.  If equidistant, rounds away from zero.

#### `Money.ROUND_HALF_DOWN`
This is used for indicating rounding towards nearest neighbour. If equidistant, rounds towards zero.

#### `Money.ROUND_HALF_EVEN`
This is used for indicating rounding towards nearest neighbour.  If equidistant, rounds towards even neighbour.


### Instance
The following methods and properties exist when Money has been constructed.

### _Methods_
#### `setCurrency()`
```js
const moneyInstance = new Money(  new Decimal( 1.25 ), new Currency( currencyConfig ) );
const newMoneyInstance = moneyInstance.setCurrency( new Currency( someOtherCurrencyConfig ) );
```
This receives a `Currency` instance as the argument and returns a new Money instance with that currency and the same amount as the original.  This method is also used on initial construction of the Money instance for setting the `currency` property.

#### `setAmount()`
```js
const moneyInstance = new Money( new Decimal( 1.25 ), new Currency( currencyConfig ) );
const newMoneyInstance = moneyInstance.setAmount( new Decimal( 12.45 ) );
```
This receives a `Decimal` instance as the argument and returns a new Money instance with that amount and the same currency as the original.  This method is also used on initial construction of the Money instance for setting the `amount` property.

#### `setFormatter()`

This method returns the same Money instance.  It is mostly just used on construction of the Money instance to assign `Accounting` to the `formatter` property.

#### `toSubunits()`

This method returns the amount on the Money converted to its equivalent subunits as defined by the Currency.  It returns the value as a number primitive.

```js
const money = new Money( new Decimal( 1.40 ), new Currency( USDCurrencyConfig ) );

//prints 140
console.log( money.toSubunits() );
```
#### `equals()`
This method provides a convenient way to compare the current instance of a money object with another one passed in as an argument.  A money object is considered "equal" when the values on the amount are the same, and a shallow equality check on the properties of the currencies are the same.  Equality does not consider "sameness" in terms of object instance.

```js
const moneyA = new Money( new Decimal( 1.25 ), new Currency( USDCurrencyConfig ) );
const moneyB = new Money( new Decimal( 1.25 ), new Currency( USDCurrencyConfig ) );
const moneyC = new Money( new Decimal( 3.40 ), new Currency( USDCurrencyConfig ) );

// prints true
console.log( moneyA.equals( moneyB ) );

//prints false
console.log( moneyA.equals( moneyC ) );
```
#### `hasSameCurrency()`
This method provides a convenient way to compare the currencies on the current Money instance with the currency on another Money instance provided as an argument.  Currencies are considered equal via a shallow equality check on the properties of the two Currency instances in each Money instance.

```js
const moneyA = new Money( new Decimal( 1.25 ), new Currency( USDCurrencyConfig ) );
const moneyB = new Money( new Decimal( 2.35 ), new Currency( USDCurrencyConfig ) );
const moneyC = new Money( new Decimal( 400 ), new Currency( CDNCurrencyConfig ) );

// prints true
console.log( moneyA.hasSameCurrency( moneyB ) );

//prints false
console.log( moneyA.hasSameCurrency( moneyC ) );
```

#### `add()`
This method provides a convenient way to add the amount of one Money instance to the amount of another Money instance (provided as an argument).  A **new** `Money` instance is returned.

> Note: This only performs the addition if the currencies on both Money instances are equal.
```js
const moneyA = new Money( new Decimal( 1.25 ), USDCurrency );
const moneyB = new Money( new Decimal( 1.25, USDCurrency ) );

// prints '$2.50'
console.log( moneyA.add( moneyB ).toString() );
```
#### `subtract()`
Same as `add()` except this subtracts the value of the other Money instance from _this_ Money instance.  Returns a **new** instance of `Money`.

```js
const moneyA = new Money( new Decimal( 1.25 ), USDCurrency );
const moneyB = new Money( new Decimal( 1 ), USDCurrency );

// prints $0.25
console.log( moneyA.subtract( moneyB ).toString() );
```
#### `multiply()`
With this method, the current Money instance has the provided multiplier applied to the amount and a new `Money` instance is returned for the result.
The new `Money` instance will have the same internal currency value as the original.
The multiplier can be a `number` or `string` (numeric) primitive or a `Decimal` value object.
```js
const moneyA = new Money( new Decimal( 1.5 ), USDCurrency );

// prints $4.50
console.log( moneyA.multiply( 3 ).toString() );
```
#### `divide()`
This acts similarly to `multiply()` except it divides the Money instance by the provided _divisor_ argument.  This returns a new `Money` instance.
The divisor can be a `number` or `string` (numeric) primitive, or a `Decimal` value object.
```js
const moneyA = new Money( new Decimal( 4.20 ), USDCurrency );

// prints $2.10
console.log( moneyA.divide( 2 ).toString() );
```
#### `allocate()`
The `allocate` method allows one to split the value of the current instance across new `Money` instances using the provided `ratios` array.  Ratios array simply describes how the value should be split where each element in the array indicates a new `Money` instance.
The new `Money` instances will all have the same currency as the original Money instance.
```js
const myMoney = new Money( 6, USDCurrency );
const newMonies = myMoney.allocate( [ 1, 1, 1 ] );

// prints 3
console.log( newMonies.length );

// each of the following prints $2.00
console.log( newMonies[ 0 ].toString() );
console..log( newMonies[ 1 ].toString() );
console.log( newMonies[ 2 ].toString() );
```
#### `compare()`
The `compare` method compares this instance of `Money` with a provided instance of `Money` (via the argument) and returns `0` if they have equal values, `1` if this instance is greater than the other, and `-1` if this instance is less than the other.

The instances compared _must_ have equal internal `Currency` instances.
```js
const moneyA = new Money( 1.25, USDCurrency );
const moneyB = new Money( '1.25', USDCurrency );
const moneyC = new Money( 100, USDCurrency );
const moneyD = new Money( .56, new Currency( USDCurrency.toJSON() ) );

// returns  0
console.log( moneyA.compare( moneyB ) );

// returns 1
console.log( moneyA.compare( moneyD ) );

// returns -1
console.log( moneyA.compare( moneyC ) );
```
#### `greaterThan()`, `greaterThanOrEqualTo()`, `lessThan()`, `lessThanOrEqualTo()`
These methods are various convenience comparison methods that return booleans to indicate how this instance compares to the provided instance.  Both instances of `Money` must have equivalent internal `Currency` instances.
```js
const moneyA = new Money( 1.25, USDCurrency );
const moneyB = new Money( 1, USDCurrency );

// returns true
console.log( moneyA.greaterThan( moneyB ) );
```
#### `isZero()`, `isPositive()`, `isNegative()`
These methods are various convenience value check methods that return booleans to indicate whether the value meets the `is*` check.

```js
const zeroMoney = new Money( 0, USDCurrency );
const postiveMoney = new Money( 100, USDCurrency );
const negativeMoney = new Money( '- 2', USDCurrency );

// returns true
console.log( zeroMoney.isZero() );
console.log( zeroMoney.isPositive() );
console.log( zeroMoney.isNegative() );
```
#### `toNumber()`
This returns the value for the `Money` instance as a number primitive.
```js
const myMoney = new Money( '45.6', USDCurrency );

// returns 45.6
console.log( myMoney.toNumber() );
```
#### `toFixed()`
This returns a string representing the value for the `Money` instance in normal (fixed-point) notation rounded to the provided `decimalPlaces` using the provided `rounding` mode.  If `decimalPlaces` and `rounding` are not provided as arguments, then the `decimalPlaces` will be whatever is currently internal for the currency and the rounding mode is `Money.ROUND_HALF_UP`.
```js
const myMoney = new Money( 34.24568, USDCurrency );
const myMoneyB = new Money( 44.6, USDCurrency );

// returns '34.25'
console.log( myMoney.toFixed() );

// returns '34.3'
console.log( myMoney.toFixed( 1 ) );

//returns '44.60'
console.log( myMoneyB.toFixed() );
```
#### `toIntegerMoney()`
Returns a new instance of `Money` that has a value of the current instance rounded to a whole number using the rounding mode set on the original Decimal amount.  This means if you want a different rounding mode you need to instantiate the original `Money` instance with a configured `Decimal` object.  The default rounding mode is `Money.ROUND_HALF_UP`.
```js
const myMoney = new Money( 2.45, USDCurrency );

// returns 2
console.log( myMoney.toIntegerMoney().toNumber() );

// change rounding mode to `Money.ROUND_CEIL`
const customMoney = new Money( new Decimal( 2.45 ), USDCurrency );
Decimal.rounding = Money.ROUND_CEIL;

// returns 3
consolelog( myMoney.toIntegerMoney().toNumber() );
```
#### `toString()`
Returns the value of this `Money` instance as a formatted string according to the internal `Currency` instance configuration.  This uses the `Accouting.format` method.
```js
const myMoney = new Money( 1.2, USDCurrency );

// returns 'Amount is: $1.20'
console.log( 'Amount is: ' + myMoney  );
```
#### `toJSON()`
When called directly returns a simple object representing the `Money` instance. When `JSON.stringify` is used on this instance, it returns the serialized JSON string representation of the `Money` instance.
```js
const myMoney = new Money( 1.2526, USDCurrency );

// returns '{ "amount": "1.25", "currency": { ...json for currency instance } }'
console.log( JSON.stringify( myMoney ) );
```
### _Properties_
The following are immutable properties of the `Money` instance.
#### `amount`
This holds the `Decimal` instance created on construction of the `Money` instance. You can use all [decimal-js light methods](http://mikemcl.github.io/decimal.js-light) on this instance.  Internally, many of the `Money` instance methods use the `Decimal` api (such as `toNumber`, `toInteger` etc).
```js
const myMoney = new Money( 1.25, USDCurrency );

// these will return the same value: 1.25
console.log( myMoney.toNumber() );
console.log( myMoney.amount.toNumber() );
```
#### `currency`
This holds an instance of `Currency` provided on construction of the Money instance.  Since `Currency` is immutable, this is the identical instance as what was provided.
```js
const myMoney = newMoney( 1.25, USDCurrency );

// returns true because they are identical instances
console.log( this.currency === USDCurrency );
```
### `formatter`
This holds the `Accounting` object (which is an export of `accounting-js` ).  The public api for `accounting` is available on this object.

```js
const myMoney = new Money( 1.25, USDCurrency );

// create a new money instance using a string value formatted as money.
const newMoney = myMoney.setAmount( myMoney.formatter.unformat( '$100.25' ) );

// returns 1.25
console.log( myMoney.toNumber() );

// returns 100.25
console.log( newMoney.toNumber() );
```
