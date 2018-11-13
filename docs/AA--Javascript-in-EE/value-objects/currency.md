## Currency Value Object
The currency value object represents a currency (and its configuration).  For example `USD` currency or `CAD` currency.

## Features
Along with the `Currency` object, there is also exposed an instance of `Currency` on the property `SiteCurrency`.  This currency instance holds the currency value for what is currently the default currency defined server side on the WordPress site. 

## Installation/Loading:
The currency vo is available via the `eejs` global on its `valueObjects` property. So you can access it directly via `eejs.valueObjects.Currency` provided the bundled `@eventespresso/vo` javascript has been loaded before your script.  For instructions on different ways to do this you can [go here](README.md#Usage).

## API

### Constructor
A `Currency` value object can be constructed with a valid `configuration` object.  This object must at a minimum have the following shape:
```
Object {
  code: { string }, // eg 'USD'
  sign: { string }, // eg '$'
  singularLabel: { string }, //eg 'dollar' OPTIONAL,
  pluralLabel: { string }, //eg 'dollars' OPTIONAL,
  signB4: { bool }, // whether the sign goes before the amount (true) or after (false) OPTIONAL defaults to true.
  decimalPlaces: { number }, //eg 2 OPTIONAL defaults to 2
  decimalMark: { string }, //eg . OPTIONAL defaults to '.'
  thousandsSeparator: { string }, //eg ',' OPTIONAL defaults to ','
  subUnits: { number }, //eg 100 OPTIONAL defaults to Math.pow( 10, decimalPlaces )
}
```
```js
// constructing with minmal options.
const myCurrency = new Currency(
  {
    code: 'USD',
    sign: '$',
    singularLabel: 'dollar',
    pluralLabel: 'dollars',
  }
);
console.log( myCurrency.toJSON() );
// returns
// {
//  code: 'USD',
//  sign: '$',
//  singularLabel: 'dollar',
//  pluralLabel: 'dollars',
//  signB4: true
//  decimalPlaces: 2,
//  decimalMark: '.',
//  thousandsSeparator: ',',
//  subUnits: 100
// }
```
### _Methods_
#### `Currency.validateCurrencyConfig`
This is used to validate the passed in object used as the currency configuration.

### Instance
The following methods and properties exist after instantiating a `Currency`.
### _Methods_
#### `toAccountingSettings()`
This returns the currency properites as an object formatted for the `accounting-js` settings configuration.

```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// assuming `accounting` is from account-js, this outputs $1.25
console.log( accounting,format( 1.25, myCurrency.toAccountingSettings() ) );
```
### _Properties_

All of these properties are immutable, attempting to mutate them will result in an `Error`.

#### `code`
This is the ISO 4217 code for the currency.
```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// returns 'USD'
console.log( myCurrency.code );
```
#### `singularLabel`
This is the singular label for the currency.
```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// returns 'dollar'
console.log( myCurrency.singularLabel );
```
#### `pluralLabel`
This is the pluralLabel for the currency.
```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// returns 'dollars'
console.log( myCurrency.pluralLabel );
```
#### `sign`
This is the symbol/sign for the currency.
```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// returns '$'
console.log( myCurrency.sign );
```
#### `signB4`
This indicates whether the sign is before or after the value for the currency.
```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// returns true
console.log( myCurrency.signB4 );
```
#### `decimalPlaces`
This is the number of decimal places for the currency.
```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// returns 2
console.log( myCurrency.decimalPlaces );
```
#### `decimalMark`
This is the mark used to indicate the decimal position for the currency.
```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// returns '.'
console.log( myCurrency.decimalMark );
```
#### `thousandsSeparator`
This is the string used to separate thousands position for the currency.
```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// returns ','
console.log( myCurrency.thousandsSeparator );
```
#### `subUnits`
This is the value used for representing subUnits for the currency.  For a currency with 2 decimal places this would (by default) correspond to 100 which means 100 subunits equals 1 unit of the currency.
```js
const myCurrency = new Currency( USDCurrencyConfiguration );
// returns 100
console.log( myCurrency.subUnits );
```
