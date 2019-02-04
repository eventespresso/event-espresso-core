There are various custom [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) classes exposed on the `eejs` global for use in consuming code.

| Exception                                                         |       Purpose                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`Exception`](./exceptions.md#eejsexception)                      |       A general basic exception class.                                                                                                                                                                                                                  |
| [`InvalidArgument`](./exceptions.md#eejsinvalidargument)          |       Typically this error is thrown when a function or method is called with an invalid argument for a given parameter.                                                                                                                                |
| [`InvalidDatetime`](./exceptions.md#eejsinvaliddatetime)          |       Typically this error is thrown when a given string is not a valid datetime string (or `DateTime` value object).                                                                                                                                   |
| [`InvalidISO8601String`](./exceptions.md#eejsinvalidiso8601string)|       Typically this error is thrown when a given string is not the correct format for ISO 8601                                                                                                                                                         |
| [`InvalidLocale`](./exceptions.md#eejsinvalidlocale)              |       Typically this error is thrown when a given string is not a valid locale string.                                                                                                                                                                  |
| [`InvalidModelEntity`](./exceptions.md#eejsinvalidmodelentity)    |       Typically this error is thrown when a given value is not an instance of `BaseEntity` or is for the wrong model.                                                                                                                                   |
| [`InvalidSchema`](./exceptions.md#eejsinvalidschema)              |       Typically this error is thrown when an object is not a model schema object or is for the wrong model.                                                                                                                                             |
| [`InvalidTimezone`](./exceptions.md#eejsinvalidtimezone)          |       Typically this error is thrown when a given string is not a valid timezone string.                                                                                                                                                                |
| [`InvalidType`](./exceptions.md#eejsinvalidtype)                  |       This is essentially a wrapper around the native `TypeError` error handler.  The purpose is to allow for more custom specific type errors to be created using ES6 syntax.  So instead of classes extending `TypeError`, they can extend this class.|

## `eejs.Exception`

A general basic exception class.

### Arguments

| Argument  | Type   | Description                                        |
| --------- | ------ | ---------------------------------------------------|
| `message` | string | A custom message to accompany the error. (Optional)|

### Example

```js
throw new eejs.Exception( 'Error! Error!' );
```

## `eejs.InvalidArgument`

Typically this error is thrown when a function or method is called with an invalid argument for a given parameter.

### Arguments

| Argument        | Type  |Description                                                                                                                                                                               |
| --------------- | ------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `message`       | string|A custom message that will be appended to the string: `Invalid argument provided.` if provided. (optional)                                                                                |
| `argumentValue` | mixed |Will get exposed on the `argumentValue` property of the instance if provided.  Typically whatever value triggered the error is passed along so it is exposed to consuming code. (optional)|
| `...args`       | mixed |Any additional arguments can be passed along and they will be passed through to the `Error` class. (optional)                                                                             |

### Example

```js
function expectFoo( foo ) {
  if ( foo !== 'foo' ) {
    throw new eejs.InvalidArgument( 'Expected "foo"', foo );
  }
}
```

## `eejs.InvalidDatetime`

Typically this error is thrown when a given string is not a valid datetime string (or `DateTime` value object).

### Arguments

| Argument        | Type  |Description                                                                                                                                                                               |
| --------------- | ------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `datetime`       | mixed| Optionally provide the value that triggered the error to be thrown.                                                                       |
| `message` | mixed |A custom message that will be appended to the string: `The value provided is not a valid DateTime.` if provided. (optional) |
| `...args`       | mixed |Any additional arguments can be passed along and they will be passed through to the `Error` class. (optional)

### Example

```js
function expectDateTime( datetime ) {
  if ( ! ( datetime instanceof DateTime ) ) {
    throw eejs.InvalidDatetime( datetime );
  }
}
```

## `eejs.InvalidISO8601String`

Typically this error is thrown when a given string is not the correct format for ISO 8601.

### Arguments

| Argument        | Type  |Description                                                                                                                                                                               |
| --------------- | ------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dateTimeString`       | mixed| Optionally provide the value that triggered the error to be thrown.                                                                       |
| `message` | mixed |A custom message that will be appended to the string: `The string provided is not a valid ISO 8601 formatted string.` if provided. (optional) |
| `...args`       | mixed |Any additional arguments can be passed along and they will be passed through to the `Error` class. (optional)

### Example

```js
function expectISO8601( isoString ) {
  if ( ! isIsoString( isoString ) ) {
    throw eejs.InvalidISO8601String( isoString );
  }
}
```

## `eejs.InvalidLocale`

Typically this error is thrown when a given string is not a valid locale string.

### Arguments

| Argument        | Type  |Description                                                                                                                                                                               |
| --------------- | ------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `locale`       | mixed| Optionally provide the value that triggered the error to be thrown.                                                                       |
| `message` | mixed |A custom message that will be appended to the string: `The locale string provided is not valid.` if provided. (optional) |
| `...args`       | mixed |Any additional arguments can be passed along and they will be passed through to the `Error` class. (optional)

### Example

```js
function expectValidLocale( localeString ) {
  if ( ! isLocale( localeString ) ) {
    throw eejs.InvalidLocale( localeString );
  }
}
```

## `eejs.InvalidModelEntity`

Typically this error is thrown when a given value is not an instance of `BaseEntity` or is for the wrong model.

### Arguments

| Argument        | Type  |Description                                                                                                                                                                               |
| --------------- | ------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `message` | mixed |A custom message that will be appended to the string: `Invalid model entity instance provided.` if provided. (optional) |
| `entityValue`       | mixed| Optionally provide the value that triggered the error to be thrown.   It will be exposed on a `modelEntity` property of the error instance for consuming code to use.                                                                    |
| `...args`       | mixed |Any additional arguments can be passed along and they will be passed through to the `Error` class. (optional)

### Example

```js
function expectModelEntity( entity ) {
  if ( ! ( entity instanceof BaseEntity ) ) {
    throw eejs.InvalidModelEntity( '', entity );
  }
}
```

## `eejs.InvalidSchema`

Typically this error is thrown when an object is not a model schema object or is for the wrong model.

### Arguments

| Argument        | Type  |Description                                                                                                                                                                               |
| --------------- | ------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `message` | mixed |A custom message that will be appended to the string: `Invalid schema object provided. Must have a "properties" property...` if provided. (optional) |
| `schemaValue`       | mixed| Optionally provide the value that triggered the error to be thrown.   It will be exposed on a `schema` property of the error instance for consuming code to use.                                                                    |
| `...args`       | mixed |Any additional arguments can be passed along and they will be passed through to the `Error` class. (optional)

### Example

```js
function expectSchema( schema ) {
  if ( ! schema.properties) ) {
    throw eejs.InvalidSchema( '', schema );
  }
}
```

## `eejs.InvalidTimezone`

Typically this error is thrown when a given string is not a valid timezone string.

### Arguments

| Argument        | Type  |Description                                                                                                                                                                               |
| --------------- | ------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `timezone`       | mixed| Optionally provide the value that triggered the error to be thrown. This will be exposed on the `timezone` property of the error instance for consuming code to use.                                                                       |
| `message` | mixed |A custom message that will be appended to the string: `The timezone string provided is not valid.` if provided. (optional) |
| `...args`       | mixed |Any additional arguments can be passed along and they will be passed through to the `Error` class. (optional)

### Example

```js
function expectValidTimezone( timezone ) {
  if ( ! isTimezone( timezone ) ) {
    throw eejs.InvalidTimezone( timezone );
  }
}
```

## `eejs.InvalidType`

This is essentially a wrapper around the native `TypeError` error handler. The purpose is to allow for more custom specific type errors to be created using ES6 syntax. So instead of classes extending `TypeError`, they can extend this class.

### Arguments

| Argument        | Type  |Description                                                                                                                                                                               |
| --------------- | ------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `message` | mixed |A custom message that will be appended to the string: `Invalid type provided.` if provided. (optional) |
| `argumentValue`       | mixed| Optionally provide the value that triggered the error to be thrown.   It will be exposed on a `argumentValue` property of the error instance for consuming code to use.                                                                    |
| `...args`       | mixed |Any additional arguments can be passed along and they will be passed through to the `Error` class. (optional)

### Example

```js
throw new eejs.InvalidType('Expected a string.', 2);
```