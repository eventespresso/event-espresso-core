## ServerDateTime Value Object

The `ServerDateTime` value object represents an instance in time.  It is identical in behaviour to the [`DateTime`](datetime.md) value object (it extends it) except that it automatically takes care of the timezone or offset currently set on the server.

This is needed because if a WordPress site has a UTC offset set instead of a timezone string, the timezone string will be empty.  So, using `DateTime` only, client code would always have to check whether timezone string is empty to derive how to instantiate the value object (with an offset, or with a timezone string).  `ServerDateTime` takes care of this automatically so client code just has to provide the value for the constructor method being used and (optionally) the locale (which defaults to the server locale if not provided).

For more details on all the methods and properties available, refer to the [`DateTime` documentation](datetime.md).  Otherwise, there's only three methods overridden by this value object.

### CONSTRUCTOR

The constructor simply receives the following two arguments:

- `iso8601DateString`: This should be an ISO 8601 formatted date/time string.  If offset is included the string, this will be converted to whatever the timezone/offset is on the server.
- `locale`:  this should be a BCP 47 language tag.  Not all locales are supported, if the provided language tag is not available, then the value object will attempt to set to the closest variant.  If that's not available then an `InvalidLocale` error is thrown (an error gets thrown only if client code explicitly provides a locale, relying on the default will not throw an error because if the server locale is not available, it falls back to `en`).

**Note:** If the server has a timezone string, then the timezone property will be set for the incoming date/time.  If the server has an offset (and no timezone), then the value object will be instantiated with that offset.

Once the value object is instantiated, you can use all the methods/properties available via `DateTime`

**Examples:**

```js
// returns an instance representing `now` in the current site's
// timezone/offset and locale (not browser).
const dt = new ServerDateTime()

// returns an instance representing `December 25, 2018
// 10:15:00 200 milliseconds` with `0` offset but converted
// to the timezone the site is in.  So if the site's timezone is
// `America/New_York`, then the default will be as seen below.
const dt = new ServerDateTime( '2018-12-25T10:15:00.200+00:00' );

// '2018-12-25T05:15:00.200-05:00'
console.log( dt.toISO( false ) );

// If the server has an offset of -5 (and no timezone), then this will
// work similarly to the above example.
const dt = new ServerDateTime( '2018-12-25T10:15:00.200+00:00' );

// '2018-12-25T05:15:00.200-05:00'
console.log( dt.toISO( false ) );
```

### _Methods_

The following are the only methods over-ridden by this class.

#### `DateTime.fromISO( isoString, locale )`

This returns an instance of `ServerDateTime` from the given `ISOString`, and locale.  It functions identically to the `ServerDateTime.constructor`.

#### `DateTime.fromJSDate( date, locale )`

This receives a Javascript `Date` object along with locale (optional) to create (and return) an instance of `ServerDateTime`.  It works the same as `DateTime.fromJSDate` except that it automatically uses either the server's timezone or offset (whichever is available, preferring timezone).
