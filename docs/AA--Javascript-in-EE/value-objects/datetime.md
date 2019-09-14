## DateTime Value Object

The `DateTime` value object represents an instance in time.  For example, `December 25, 2018 1:00:00.200`.

Internally, the `DateTime` value object uses [Moment Timezone](http://momentjs.com/timezone/) but using the
value object allows client code to interact confidently with a DateTime value so that any future changes to the underlying library used (for example [Luxon](https://moment.github.io/luxon/)) will not result in the need to refactor client code.

Behaviourally, many of the methods and properties of the `DateTime` value object are similar to [Luxon](https://moment.github.io/luxon/) (even though moment.timezone is being used under the hood).  However, there are a few exceptions:

- `DateTime` is more strict when it comes to validating locale and timezone.  Custom `Error`'s will get thrown for invalid values.
- Parameter types are more strict, thus methods are more specific in what they receive.  The acceptable units of time for any methods receiving a simple object to represent the time are: **year**, **month**, **day**, **hour**, **minute**, **second**, **millisecond**.

## Features

- Immutable: manipulating the instance of time in a `DateTime` value object will always return a new instance instead of mutating the existing.
- Timezone aware:  `DateTime` instances by default are constructed in the timezone of the WordPress Site or UTC.  They can also be constructed using a designated timezone string (such as `America/New_York`).
- Offset aware:  `DateTime` instances can also be constructed with a provided offset value. Any methods receiving an offset will default to any offset currently set for the site this script runs on.
- Locale aware:  For `i81n`, the locale can be provided (eg. `en-ca`) and any displayed date and time strings (via methods like `toFormat`) will use that locale.  Be aware, however, that currently `DateTime` value objects only have the locales that are bundled with moment. For all methods receiving a `locale` argument, the locale defaults to the site's locale.  If the user is logged in to the WordPress site, the default locale will be the user's set locale (not the site's locale). If the site locale is not valid (because the server has a set locale that moment doesn't have an equivalent for), then the fallback will be `en` and no error will get thrown.

## Installation/Loading:

The `DateTime` value object is available via the `eejs` global on its `valueObjects` property. So you can access it directly via `eejs.valueObjects.DateTime` provided the bundled `@eventespresso/vo` javascript has been loaded before your script.  For instructions on different ways to do this you can [go here](README.md#Usage).

## API

### CONSTRUCTOR

If no arguments are provided to the constructor of the `DateTime` value object, then the instance will represent the moment in time at the time it was constructed, in the timezone for the WordPress site this script is loaded in, and the locale for the WordPress site this script is loaded in.  Otherwise, the constructor of the `DateTime` value object accepts three arguments:

- `iso8601DateString`: As the name of the parameter suggests, this should be an ISO8601 formatted date/time string. If offset is in the string, this will set the offset property.
- `timezone`: This should be a zone identifier.  Can be any IANA zone or the string 'UTC'.
- `locale`: this should be a BCP 47 language tag.  Not all locales are supported, if the provided language tag is not available, then the value object will attempt to set to the closest variant.  If that's not available then an `InvalidLocale` error is thrown (an error gets thrown only if client code explicitly provides a locale, relying on the default will not throw an error because if the server locale is not available, it falls back to `en`).

**Examples:**

```js
// returns an instance representing `now` in the current site's timezone and
// locale (not browser).
const dt = new DateTime();

// returns an instance of `December 25, 2018 10:15:00 200 milliseconds`
// with `0` offset but converted to the timezone the site is in.  So if
// the site's timezone is `America/New_York`, then the default returned
// time for `dt.toISO( false )` will be `2018-12-25T05:15:00.200-05:00`
const dt = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// The instance of time will be for the provided timezone (so
// `December 25, 2018 10:15:00.200-05:00`)
const dt = new DateTime(
    '2018-12-25T10:15:00.200',
    'America/New_York'
);
```

### _Methods_
#### `DateTime.validateLocale( locale )`

Returns `boolean` to indicate whether the provided locale is a valid locale

#### `DateTime.assertLocaleIsValid( locale )`

If the provided locale is not valid, this will throw an `InvalidLocale` error.

#### `DateTime.validateISO8601( isoString )`

Returns `boolean` to indicate whether the provided string is a valid ISO8601 String.

#### `DateTime.assertISO8601IsValid( isoString )`

If the provided string is not a valid ISO8601 string, this will throw an `InvalidISO8601String` error.

#### `DateTime.validateTimezone( timezone )`

Returns `boolean` to indicate whether the provided string is a valid timezone.

#### `DateTime.assertTimezoneIsValid( timezone )`

If the provided string is not a valid timezone string, this will throw an `InvalidTimezone` error.

#### `DateTime.validateIsOffset( offset )`

Returns `boolean` to indicate whether the provided value is a valid offset.

Currently an offset is considered valid if the value is a number.

#### `DateTime.assertIsOffset( offset )`

If the provided value is not a valid offset, this will throw a `TypeError` error.

#### `DateTime.validateIsDateTime( datetime )`

Returns `boolean` to indicate whether the provided value is an instance of `DateTime` or `ServerDateTime`.

#### `DateTime.assertIsDateTime( datetime )`

If the provided value is not an instance of `DateTime` or `ServerDateTime`, this will throw a `TypeError` error.

#### `DateTime.validateIsDate( date )`

Returns `boolean` to indicate whether the provided value is an instance of the javascript `Date` object.

#### `DateTime.assertIsDate( date )`

If the provided value is not an instance of `Date`, this will throw a `TypeError` error.

#### `DateTime.isValid( datetime )`

Returns `boolean` to indicate whether the provided value is a _valid_ instance of `DateTime` or `ServerDateTime`.

#### `DateTime.assertIsValid( datetime )`

If the provided value is not an instance of `DateTime` or `ServerDateTime` or is not a _valid_ `DateTime` or `ServerDateTime`, this will throw an `InvalidDateTime` error.

#### `DateTime.max( ...datetimes )`

Given an indeterminate number of `DateTime` instances passed in as arguments, this will return a new instance of `DateTime` representing the latest moment of time in those arguments.

**Example:**

```js
// maxDate will equal dtA (but is not the same instance as dtA)
const dtA = new DateTime( '2018-12-22T10:15:00.200+00:00' );
const dtB = new DateTime( '2017-12-25T10:15:00.200+00:00' );
const dtC = new DateTime( '2018-11-25T10:15:00.200+00:00' );

const maxDate = DateTime.max( dtA, dtB, dtC );
```

#### `DateTime.min( ...datetimes )`

Given an indeterminate number of `DateTime` instances passed in as arguments, this will return a new instance of `DateTime` representing the earliest moment of time in those arguments.

**Example:**
```js
// minDate will equal dtB (but is not the same instance as dtB)
const dtA = new DateTime( '2018-12-22T10:15:00.200+00:00' );
const dtB = new DateTime( '2017-12-25T10:15:00.200+00:00' );
const dtC = new DateTime( '2018-11-25T10:15:00.200+00:00' );

const minDate = DateTime.min( dtA, dtB, dtC );
```

#### `DateTime.fromMoment( momentInstance )`

This returns an instance of `DateTime` from the given `moment` instance. Timezone/offset and locale will be populated from it.

#### `DateTime.fromISO( isoString, timezone, locale )`

This returns an instance of `DateTime` from the given `ISOString`, timezone and locale.  It functions identically to the `DateTime.constructor`.

#### `DateTime.fromISOWithOffset( isoString, offset, locale )`

This returns an instance of `DateTime` from the given `ISOString`, offset, and locale.  It is similar in behaviour to `DateTime.fromISO` with the difference that an offset can be used instead of timezone string.

#### `DateTime.fromJSDate( date, timezone, locale )`

This receives a Javascript `Date` object along with timezone and locale strings to create (and return) an instance of `DateTime`.

#### `DateTime.fromJSDateWithOffset( date, offset, locale )`

This is identical in behaviour to `DateTime.fromJSDate` with the exception it receives an offset value instead of timezone string.

#### `fromMilliseconds( milliseconds )`

Returns an instance of `DateTime` (in UTC) from a provided value representing milliseconds from the epoch.  A locale can be provided as well.

#### `fromUnix( seconds )`

Returns an instance of `DateTime` (in UTC) from a provided value representing seconds from the epoch.  A locale can be provided as well.

#### `fromLocal( values )`

Constructs (and returns) an instance of `DateTime` from an object of values assuming those values are in "local" time (browser or server if run server side).

The object is expected to be a representation of this instance in time and will be expected to be using units accepted by `DateTime`.  You do not need to pass all units in the object.

If you pass an empty object (or null) for the `values` argument, the moment in time will be assumed to be "now".

**Example:**
```js
const values = {
    year: 2018,
    month: 12,
    day: 25,
    minute: 15
};
const dt = DateTime.fromLocal( values );

// assuming the timezone for the browser this is being executed on is
// America/New_York.
// '2018-12-25T05:15:00Z'
console.log( dt.toISO() );
```

#### `DateTime.utc( values )`

Constructs (and returns) an instance of `DateTime` from an object of values assuming they are in `UTC`.

The object is expected to be a representation of this instance in time and will be expected to be using units accepted by `DateTime`.  You do not need to pass all units in the object.

If you pass an empty object (or null) for the `values` argument, the moment in time will be assumed to be "now".

**Example:**
```js
const values = {
    year: 2018,
    month: 12,
    day: 25,
    minute: 15
};
const dt = DateTime.utc( values );

// '2018-12-25T00:15:00Z'
console.log( dt.toISO() );
```

#### `DateTime.fromObject( values )`

Constructs (and returns) an instance of `DateTime` from a configuration object.

The configuration object can have:

- any of the DateTime units (year, month, etc)
- `locale`: a string representing the locale.
- `timezone`: a string representing the timezone (if offset is present, this is ignored)
- `offset`: a number representing the number of minutes from UTC this instance in time represent. If the number is less than 16 or greater than -16, the number will be interpreted as hours.

If you pass in 'local' as the timezone, then the incoming unit values will be interpreted as being in the "local" timezone (browser or server this is being executed on).

### _Properties_

`DateTime` has static properties representing the valid `DateTime` units:

| Property | Value |
| ------- | ------- |
`DateTime.UNIT_YEAR` | 'year'
`DateTime.UNIT_MONTH` | 'month'
`DateTime.UNIT_DAY` | 'day'
`DateTime.UNIT_HOUR` | 'hour'
`DateTime.UNIT_MINUTE` | 'minute'
`DateTime.UNIT_SECOND` | 'second'
`DateTime.UNIT_MILLISECOND` | 'millisecond'

There is also a property used to represent the "local" timezone: `DateTime.TIMEZONE_LOCAL`

### INSTANCE

The following methods and properties exist after instantiating a `DateTime`.

### _Methods_

#### `set( setObject = {} )`

Used to set various parts of the datetime string and returns a new instance of DateTime

Note: this will construct a DateTime even with invalid unit values.  Make use of `isValid()` to determine whether the instance is a valid DateTime or not.

The `setObject` argument should be a simple object where the keys are valid date and time units (year, hour, minute etc) and the values are the values you wish to set.  Note, any non passed in units and values will be assumed from the original `DateTime`.

**Example:**

```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );
const newDate = original.set( { year: 2019, minute: 12 } );

// 2019-12-25T10:12:00.200Z
console.log( newDate.toISO() );
```

#### Setters for units.

The various `DateTime` units have fluent setters that allow you to set the unit on the given moment of time and will return a new instance of `DateTime` for that new unit in time (because the original `Datetime` instance is immutable).  The various setters for `DateTime` units are:

`setYear( value )`, `setMonth( value ) `, `setDay( value )`, `setHour( value )`, `setMinute( value )`, `setSecond( value )`, `setMillisecond( value )`

#### `setTimezone( timezone )`

Fluent setter for the timezone property.

**Example:**

```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00', 'UTC' );

// 2018-12-25T5:15:00.200-05:00
console.log( original.setTimezone( 'America/New_York' ).toISO( false ) );

// 2018-12-25T10:15:00.200+00:00
console.log( original.toISO( false ) )
```

#### `setOffset( offset )`

Fluent setter for the UTC offset.

By default the offset value is as a number representing minutes.  However, if the value is less than 16 and greater than -16, then it will be interpreted as representing hours.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00', 'UTC' );

// 2018-12-25T14:15:00.200+00:00
console.log( original.setOffset( '5' ).toISO( false ) );

// 2018-12-25T10:15:00.200+00:00
console.log( original.toISO( false ) );
```

#### `setLocale( locale )`

A fluent setter for setting the locale.  Returns a new instance of DateTime.


#### `isValid()`

Whether this DateTime instance is valid or not.

Typically an invalid state is achieved when the internal moment is invalid.  This can happen when the moment instance is created with invalid parameters.

#### `diff( otherDateTime )`

Returns the difference between two DateTime instances as an instance of `Duration`.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );
const comparedWith = new DateTime( '2018-12-26T10:15:00.200+00:00' );

// { days: 1 }
console.log( original.diff( comparedWith ).toObject() )
```


#### `diffNow()`

Returns the difference between this `DateTime` and "now" as a Duration. Works similarly to `diff`.

#### `endoOf( unit )`

Set the value of this DateTime to the end (eg. the last millisecond) of a unit of time.  The original `DateTime` is not mutated, a new instance is returned.

**Example:**

```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// '2018-12-31T23:59:59.999+00:00'
console.log( original.endOf( DateTime.UNIT_MONTH ).toISO() );

// '2018-12-25T23:59:59.999+00:00'
console.log( original.endOf( DateTime.UNIT_DAY ).toISO() );
```

#### `equals( otherDateTime )`

Compares this instance of `DateTime` with provided instance of `DateTime` and returns whether (via boolean) they are equal to each other.

The two DateTimes are considered equal if they represent the same moment in time (to the millisecond), have the same zone and location, and are both valid.

**Example:**

```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );
const comparedWith = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// true
console.log( original.equals( comparedWith ) );
```

#### `hasSame( otherDateTime, unit )`

Whether this `DateTime` is in the same unit of time as another `Datetime`

Note: this will match all units equal or larger.  For example, passing in `month` will check `month` and `year`.  So it's not only checking if the two dates share the same month, but that they are the same month in the same year.  If you passed in day, it would return whether the provided `DateTime` is in the same day, month, and year as this `DateTime`.

**Example:**

```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );
const comparedWith = new DateTime( '2017-12-25T10:15:00.200+00:00' );

// false
console.log( original.hasSame( comparedWith, DateTime.UNIT_MONTH ) );
```

#### `minus( duration )`

Subtract a period of time (represented by a `Duration`) from this `DateTime` and return a new instance of `DateTime` for the resulting moment in time.

**Example:**

```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );
const duration = new Duration( { years: 1 } );

// '2017-12-25T10:15:00.200+00:00'
console.log( original.minus( duration ).toISO() );
```

#### `plus( duration )`

Add a period of time (represented by a `Duration`) from this `DateTime` and return the resulting `DateTime`

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );
const duration = new Duration( { years: 1, days: 2 } );

// 2019-12-27T10:15:00.200+00:00
console.log( original.plus( duration ) );
```

#### `startOf( unit )`

Set the value of this `DateTime` to the beginning of a specified unit of time (to the millisecond) and return a new `DateTime` instance representing that new moment in time.

**Example:**

```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// '2018-12-25T00:00:00.00+00:00'
console.log( original.startOf( DateTime.UNIT_DAY ) );

// '2018-01-01T00:00:00.000+00:00'
console.log( original.startOf( DateTime.UNIT_YEAR ) );
```

#### `toFormat( format = DEFAULT_FORMAT )`

Returns a string representation of the moment in time formatted according to the specified format string.  Go [here](https://momentjs.com/docs/#/displaying/format/) for the list of acceptable formats.

An empty format value will return the string formatted in ISO8601 with any offset included.

Without an argument passed (i.e. format === undefined), the format string will be whatever string the format is server side for the WP site (General Options).

Note, this will also consider what the set locale is on the `DateTime` and output accordingly.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// 'Tuesday, December 25th 2018, 10:15:00 am'
console.log( original.toFormat( 'dddd, MMMM Do YYYY, h:mm:ss a' ) );

// 'Tuesday, 10am'
console.log( original.toFormat( 'dddd, ha' ) );

// assuming the server's format is 'YYYY-MM-DD HH:mm:ss'
// '2018-12-25 10:15:00'
console.log( original.toFormat() );

// '2018-12-25T10:15:00.200Z'
console.log( original.toFormat( '' ) );
```

#### `toISO( inUTC = true )`

Returns a string representation of this `DateTime` formatted according to the ISO8601 standard.

If the `inUTC` argument is true (default) then `toISO` will return the ISO string in UTC. Otherwise, it will include the offset information for the internal timezone/offset on the moment in time.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// '2018-12-25T10:15:00.200Z'
console.log( original.toISO() );
```

#### `toJSDate()`

Returns the value for this `DateTime` as a javscript `Date` object.

#### `toJSON()`

When serializing an object to JSON, if there is a `DateTime` instance, it will be represented as an ISO8601 string.

**Example:**
```js
const original = new Datetime( '2018-12-25T10:15:00.200+00:00' );

// returns '{"date": "2018-12-25T10:15:00.200Z"}'
console.log( JSON.stringify( { date: original } ) );
```

#### `toLocal()`

Converts a `DateTime` to whatever the "local" time is (local meaning the browser or server this script is running on).  A new instance of `DateTime` is returned.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00', 'UTC' );

// assuming "local" is in `America/New_York` timezone.
// '2018-12-25T05:15:00.200-05:00'
console.log( original.toLocal().toISO( false ) );
```

#### `toMillis()`

Returns the milliseconds since the Unix Epoch for the current `DateTime` instance.

#### `toObject()`

Returns a simple object containing year, month, day, hour, minute, second and millisecond units as the keys.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00', 'UTC' );

// {
//    year: 2018,
//    month: 12,
//    day: 25,
//    hour: 10,
//    minute: 15,
//    second: 00,
//    millisecond: 200
// }
console.log( original.toObject() );
```

#### `toUTC()`

Converts the `DateTime` timezone to UTC and returns a new instance of `DateTime`

**Example:**
```js
// assuming the "local" time this is created in is America/New_York
const original = new DateTime( '2018-12-25T10:15:00.200' )

// '2018-12-25T15:15:00.200+00:00'
console.log( original.toUTC().toISO( false ) );
```

#### `toString()`

Returns an English string representation of this `DateTime` when the instance is coerced to a string. This is similar behaviour and format as the native Javascript `Date.toString()`.  This method does _not_ consider locale.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00', 'UTC' );

// 'The Date is: Tue Dec 25 2018 10:15:00 GMT+0000'
console.log( `The Date is: ${original}` );
```

#### `valueOf()`

When the `DateTime` instance is coerced to `number`, this returns the number of milliseconds since the Unix Epoch for the current moment in time represented by this instance.

**Example:**

```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00', 'UTC' );

// 1545732900201
console.log( original + 1 );
```

### _Properties_

Since `DateTime` is immutable, trying to set values on any of the properties will throw an error.

#### DateTime units: `year`, `month`, `day`, `hour`, `minute`, `second`, `millisecond`

Exposes the unit values for a given `DateTime` instance.

**Example:**

```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// 2018
console.log( original.year );
```

#### `timezone`

Returns the set timezone on the `DateTime` instance.

**Example:**

```js
const original = new DateTime(
    '2018-12-25T10:15:00.200+00:00',
    'America/New_York'
);

// 'America/New_York'
console.log( original.timezone );
```

#### `daysInMonth`

Returns the number of days for the month set in this instance.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );
// 31
console.log( original.daysInMonth );
```

#### `isInDST`

Returns (via boolean) whether the given instance is a moment in time that is in Daylight Savings Time.

**Example:**
```js
const original = new Datetime( '2018-12-25T10:15:00.200+00:00' );

// false
console.log( original.isInDST )
```

#### `isInLeapYear`

Returns (via boolean) whether the given instance represents a moment in time that is a leap year.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// false
console.log( original.isInLeapYear );
```

#### `offset`

Returns the offset from UTC for the current instance in time (in minutes).

**Example:**
```js
const original = DateTime.fromISOWithOffset( '2018-12-25T10:15:00.200', 2 );

// 120
console.log( original.offset );
```

#### `dayOfYear`

Returns the day of the year for the moment of time represented by this instance.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// 359
console.log( original.dayOfYear );
```

#### `quarter`

Returns the quarter for the moment of time represented by this instance.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// 4
console.log( original.quarter );
```

#### `isoWeekNumber`

Returns the [ISO number of the week](https://en.wikipedia.org/wiki/ISO_week_date) for the moment of time represented by this instance.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// 52
console.log( original.isoWeekNumber );
```

#### `isoWeekYear`

Returns the [ISO number for the week year](https://en.wikipedia.org/wiki/ISO_week_date) for the moment of time represented by this instance.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// 2018
console.log( original.isoWeekYear );
```

#### `isoWeekDay`

Returns the [ISO number for the day of the week](https://en.wikipedia.org/wiki/ISO_week_date) for the moment of time represented by this instance.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// 2
console.log( original.isoWeekDay )
```

#### `isoWeeksInWeekYear`

Returns the number of weeks in this instances year.

**Example:**
```js
const original = new DateTime( '2018-12-25T10:15:00.200+00:00' );

// 52
console.log( original.isoWeeksInWeekYear );
```

#### `locale`

Returns what the set locale is for this DateTime

```js
const original = new DateTime( '', 'UTC', 'en-ca' );

// 'en-ca'
console.log( original.locale );
```
