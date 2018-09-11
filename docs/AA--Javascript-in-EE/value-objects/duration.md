## Duration Value Object

The `Duration` value object represents a period of time.  For example, "2 months" or "1 day, 1 hour" are examples of periods of time. Conceptually, a `Duration` is a map of units to their quantities accompanied by a variety of methods for creating, parsing, interrogating, transforming and formatting them.  It is immutable.

Internally, the `Duration` value object uses [Moment Duration](https://momentjs.com/docs/#/durations/). This is so that client code can interact confidently via the exposed api interface without worrying about any future changes to the underlying libary used (for example [Luxon Duration](https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html)).

Behaviourally, many of the methods and properties of the `Duration` value object are similar to [Luxon](https://moment.github.io/luxon/docs/class/src/duration.js~Duration.html) (even though a moment duration is used under the hood).  However, there are a few exceptions:

- `Duration` is more strict when it comes to validating locale and unit strings.  Custom errors will get thrown for invalid locales and units.  Allowable units are: **years**, **months**, **days**, **hours**, **minutes**, **seconds**, **milliseconds**.
- The `Luxon.Duration.equals` method compares two durations and they are considered equal if the units and unit values are the same.  This means a `Luxon.Duration` created with `{ day: 1 }` would not be considered equal to a `Luxon.Duration` created with `{ hours: 24 }`.  The EE `Duration` value object has an `equals` method which considers the _normalized_ values for each duration.  Thus the above example _would_ be considered equal.  The same behaviour as the `Luxon.Duration.equals` method is exposed via `Duration.sameAs()`.

## Features

- Immutable: manipulating the period of time represented by a `Duration` value object will always return a new instance instead of mutating the existing.
- Locale aware: For `i18n`, the locale can be provided (eg. `en-ca`) and formatted duration values will use that locale.  Be aware, however, that currently `Duration` value objects only have the locales that are bundled with moment.  Also, for all methods receiving a `locale` argument, the locale defaults to the site's locale if the user is not logged in.  If the user is logged in to the WordPress site, then the default locale will be the user's set locale (not the site's locale).  If the site locale is not valid (because the server has a set locale that moment doesn't have an equivalent for), then the fallback will be `en` and no error will get thrown.

## Installation/Loading:

The `Duration` value object is available via the `eejs` global on its `valueObjects` property. So you can access it directly via `eejs.valueObjects.Duration` provided the bundled `@eventespresso/vo` javascript has been loaded before your script.  For instructions on different ways to do this you can [go here](README.md#Usage).

## API

### CONSTRUCTOR

A `Duration` is constructed with the following two arguments:

- `values`: A simple object of units and their quantities for the period of time the Duration is to reference.  Only the units with values need to be passed.
- `locale`: This optional argument provides the locale for the Duration.  By default, the locale will be whatever is the current locale for the site (or `en`).  This should be a `BCP47` language tag.  Not all locales are supported.  If the provided language tag is not available, then the value object will attempt to set it to the closest variant.  If that's not available then an `InvalidLocale` error is thrown (an error gets thrown only if client code explicitly provides a locale, relying on the default will not throw an error because if the server locale is not available, it falls back to `en`).

**Example:**
```js
// represents `1 year, 2 months of duration`
const duration = new Duration( { years: 1, months: 2 } );
```

### _Methods_
#### `Duration.fromMilliseconds( milliseconds, locale = DEFAULT_LOCALE )`

Creates an instance of `Duration` from a number of milliseconds.

#### `Duration.fromObject( values, locale = DEFAULT_LOCALE )`

Creates an instance of `Duration` from a simple object.  Functionally, this has identical behaviour to `new Duration( values, locale )`

#### `Duration.fromISO( ISOString, locale = DEFAULT_LOCALE )`

Creates an instance of Duration from an [ISO 8601 duration string](https://en.wikipedia.org/wiki/ISO_8601#Durations).

**Example:**
```js
// creates a Duration representing a period of 23 hours.
const duration = Duration.fromISO( 'PT23H' );
```

#### `Duration.isValidDuration( duration )`

Indicates (via boolean) whether the provided value is a valid instance of Duration.

#### `Duration.assertIsValidDuration( duration )`

Asserts whether the provided value is a valid `Duration` and throws a `TypeError` if not.

#### `Duration.isDuration( duration )`

Indicates (via boolean) whether the provided value is an instance of Duration.  It may still be invalid.

#### `Duration.assertIsDuration( duration )`

Asserts whether the provided value is an instance of `Duration` and if not throws a `TypeError`

### _Properties_

The `Duration` value object has static properties representing the valid `Duration` units:

| Property | Value |
| --------- | ------- |
`Duration.UNIT_YEARS`| 'years'
`Duration.UNIT_MONTHS` | 'months'
`Duration.UNIT_DAYS` | 'days'
`Duration.UNIT_HOURS` | 'hours'
`Duration.UNIT_MINUTES` | 'minutes'
`Duration.UNIT_SECONDS` | 'seconds'
`Duration.UNIT_MILLISECONDS` | 'milliseconds'

There is also a property used to represent a duration of weeks (which is a derived value from the normalized number of days represented in the duration): `Duration.UNIT_WEEKS` ('weeks')

### INSTANCE

The following methods and properties exist after instantiating a `Duration`.

### _Methods_

####  `setLocale( locale )`

Returns a new instance of `Duration` that is identical to this except the locale is changed to what was provided.

#### `normalize()`

Reduces this instance of `Duration` to its canonical representation of the period in its current units. It returns a new instance of `Duration`

**Example:**
```js
// { years: 15, months: 8, days: 12 }
console.log(
    Duration
        .fromObject( { years: 2, days: 5000 } )
        .normalize()
        .toObject()
);

```

#### `sameAs( otherDuration )`

Returns whether the provided `Duration` instance is the same as this `Duration` instance.

True means that the compared durations have the same units and the same values for each unit (as well as the same locale). This means that a duration representing the period `{ minutes: 60 }` would be considered not the same as a duration constructed from the period `{ hours: 1 }`.

**Example:**

```js
const duration = Duration.fromObject( { minutes: 60 } );
const comparedWith = Duration.fromObject( { hours: 1 } );

// false
console.log( duration.sameAs( comparedWith ) );
```

#### `equals( otherDuration )`

Returns whether the provided `Duration` instance is equal to this `Duration` instance.

Equality is based on:
- locale is the same
- the normalized value of the duration is the same. Example, a duration from `{ hours: 24 }` would be considered equal to a duration from `{ days: 1 }`.

**Example:**

```js
const duration = Duration.fromObject( { minutes: 60 } );
const comparedwith = Duration.fromObject( { hours: 1 } );

//true
console.log( duration.equals( comparedWith ) );
```

#### `plus( value )`

Makes this duration longer by the specified amount (returned as a new instance of `Duration`).

Note: the returned Duration will have the locale of the original regardless what the locale was on any passed in `Duration` (if that's what the value is).

The new `Duration` returned will have normalized values.

The `value` argument can either be an instance of `Duration`, a number of milliseconds, or an object in the same shape as that received by `Duration.fromObject()`.

**Example:**

```js
const original = Duration.fromObject( { hours: 10 } );

// All of the below return:
// {
//    years: 0,
//    months: 0,
//    days: 1,
//    hours: 0,
//    minutes: 0,
//    seconds: 0,
//    milliseconds: 0
// }
console.log( original.plus(
    Duration.fromObject( { hours: 14 } ).toObject()
) );
console.log( original.plus( 50400000 ).toObject() );
console.log( original.plus( { hours:14 } ).toObject() );

```

#### `minus( value )`

Makes this duration shorter by the specified amount (returned as a new instance of `Duration`).

Note: the returned `Duration` will have the locale of the original regardless what the locale was on any passed in `Duration` instance (if that's what the value is).

The new `Duration` returned will have normalized values.

The `value` argument can either be an instance of `Duration`, a number of milliseconds, or an object in the same shape as that received by `Duration.fromObject()`

**Example:**
```js
const original = Duration.fromObject( { hours: 34 } );

// All of the below return:
// {
//    years: 0,
//    months: 0,
//    days: 1,
//    hours: 0,
//    minutes: 0,
//    seconds: 0,
//    milliseconds: 0
// }
console.log( original.minus(
    Duration.fromObject( { hours: 10 } ).toObject()
) );
console.log( original.minus( 36000000 ).toObject() );
console.log( original.minus( { hours: 10 } ).toObject() );
```

#### `negate()`

Returns the negative of this Duration as a new instance.

**Example:**
```js
const original = Duration.fromObject(
    { years: 13, months: 12, days: 23 }
);

// {
//    years: -13,
//    months: -12,
//    days: -23,
//    hours: 0,
//    minutes: 0,
//    seconds: 0,
//    milliseconds: 0,
// }
console.log( original.negate().toObject() );
```

#### `toObject()`

Returns a simple Javascript object with this `Duration`'s values.  All units are in the object even if their quantity is 0.


#### `toISO()`

Returns the ISO8601 compliant string representation of this `Duration`.

**Example:**
```js
const original = Duration.fromObject( { years: 13, hours:12 } );

// 'P13YT12H'
console.log( original.toISO() );
```

#### `toJSON()`

Returns an ISO8601 representation of this `Duration` appropriate for use in JSON.

**Example:**
```js
// '{"duration": "P13YT12H"}'
console.log(
    JSON.stringify( {
        duration: Duration.fromObject( { years: 13, hours:12 } )
    } )
);
```

#### `toString()`

When coerced to a string, the `Duration` instance is represented as an ISO8601 Duration string.

**Example:**
```js
const duration = Duration.fromObject( { years: 13, hours: 12 } );
// 'Duration: P13YT12H'
console.log( `Duration: ${ duration }` );
```

#### `valueOf()`

When coerced to a number, this returns the Duration as the number of milliseconds.

**Example:**
```js
const duration = Duration.fromObject( { seconds: 10 } );

// 1001
console.log( duration + 1 );
```

#### `toFormat( foramt )`

Returns a string representation of this `Duration` instance formatted according to the specified format string (and using strings for the set locale).

Currently this accepts the following tokens in the format string:

| Unit | Tokens |
| ----- | ----- |
years | `Y` or `y`
months | `M`
weeks | `W` or `w`
days | `D` or `d`
hours | `H` or `h`
minutes | `m`
seconds | `s`
milliseconds | `S`

You can use multiples of the same token together to add zero-length padding and escape token characters within the format string using square brackets.

**Example:**
```js
const duration = Duration.fromObject( { hours: 3, minutes: 12 } );

// 01
console.log( duration.toFormat( 'hh' ) );

// 1
console.log( duration.toFormat( 'h' ) );

// 12 hrs, 3 min
console.log( duration.toFormat( 'h [hrs], m [min]' ) );
```

#### `as*` for units (`asYears()`, `asMonths()`, `asWeeks()`, `asDays()`, `asHours()`, `asMinutes()`, `asSeconds()`, `asMilliseconds()`)

This returns the value of the period in the requested units.  Note, for units such as "years" and "months", this uses what is termed as the "long term" calculation method.  Long term is based on a 400 year cycle averaging out the days in a month and days in a year over that cycle (see https://github.com/moment/moment/blob/develop/src/lib/duration/bubble.js#L52)

**Example:**

```js
const duration = new Duration( { hours: 10 } );

// 10/24
console.log( duration.asDays() );

// 10
console.log( duration.asHours() );

// 36000000
console.log( duration.asMilliseconds() );

// 600
console.log( duration.asMinutes() );

// 10 / ( ( 146097 / 4800 ) * 24 )
console.log( duration.asMonths() );

// 36000
console.log( duration.asSeconds() );

// 10 / ( 12 * ( 146097 / 4800 ) * 24 )
console.log( duration.asYears() );

```

### _Properties_

Since `DateTime` is immutable, trying to set values on any of the following properties will throw an error.

#### `years`

Returns the set value for years on the `Duration` instance.  Note, this is not the normalized value but corresponds to what was passed in for the `Duration` on construction.

**Example:**
```js
const duration = Duration.fromObject( { years: 1, months: 45 } );

// 1
console.log( duration.years );
```

#### `months`

Returns the set value for `months` on the `Duration` instance.  Note, this is not the normalized value but corresponds to what was passed in for the `Duration` on construction.

**Example:**
```js
const duration = Duration.fromObject( { years: 1, months: 45 } );

// 45
console.log( duration.months );
```

#### `weeks`

This is a special unit property that is not set externally.  It is counted as a subset of the days (rounded to the lowest whole number), and are not taken off of the days count.  The property `weeks` differs from `asWeeks()` in that `weeks` only considers the value of `days` (if any), whereas `asWeeks()` is calculated from _all_ unit values.

**Example:**
```js
const duration = Duration.fromObject( { days: 20, months: 3 } );

// 2
console.log( duration.weeks );

// 15.857142857142858
console.log( duration.asWeeks() );
```

#### `days`

Returns the set value for `days` on the `Duration` instance.  Note, this is not the normalized value but corresponds to what was passed in for the `Duration` on construction.

**Example:**
```js
const duration = Duration.fromObject( { years: 1, days: 45 } );

// 45
console.log( duration.days );
```

#### `hours`

Returns the set value for `hours` on the `Duration` instance.  Note, this is not the normalized value but corresponds to what was passed in for the `Duration` on construction.

**Example:**
```js
const duration = Duration.fromObject( { years: 1, hours: 45 } );

// 45
console.log( duration.hours );
```

#### `minutes`

Returns the set value for `minutes` on the `Duration` instance.  Note, this is not the normalized value but corresponds to what was passed in for the `Duration` on construction.

**Example:**
```js
const duration = Duration.fromObject( { years: 1, minutes: 45 } );

// 45
console.log( duration.minutes );
```

#### `seconds`

Returns the set value for `seconds` on the `Duration` instance.  Note, this is not the normalized value but corresponds to what was passed in for the `Duration` on construction.

**Example:**
```js
const duration = Duration.fromObject( { years: 1, seconds: 45 } );

// 45
console.log( duration.seconds );
```

#### `milliseconds`

Returns the set value for `milliseconds` on the `Duration` instance.  Note, this is not the normalized value but corresponds to what was passed in for the `Duration` on construction.

**Example:**
```js
const duration = Duration.fromObject( { years: 1, milliseconds: 45 } );

// 45
console.log( duration.milliseconds );
```

#### `locale`

Exposes the value of locale.

**Example:**
```js
const duration = Duration.fromObject( { years: 12, days: 23 }, 'en-ca' );

// 'en-ca'
console.log( duration.locale );
```

#### `isValid`

Indicates whether the current Duration instance represents a valid duration.

**Example:**
```js
const duration = Duration.fromObject( { cheeseburgers: 10 } );

// false
console.log( duration.isValid );
```
