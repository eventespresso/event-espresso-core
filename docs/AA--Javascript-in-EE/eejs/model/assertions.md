Various properties on `eejs.model` that are functions doing assertions.  This means that they will throw an exception if the passed in value doesn't meet expectations.

## `assertEntityHasKey( key, entity, message = '' )`

Asserts whether the given key exists in the provided object.

This throws an `eejs.Exception` error with the message:
> The provided entity (`entity`) does not have the given property ( `key` ).

### Arguments

| Argument  | Type   | Description                                                    |
| --------- | ------ | ---------------------------------------------------------------|
| `key`     | string | The property being checked for on the provided `entity` object.|
| `entity`  | Object | The object being checked.                                      |
| `message` | string | Custom message to append to the generated message.             |

### Example

```js
const objA = { foo: 'bar' };
const objB = { bar: 'foo' };
//throws eejs.Exception
eejs.model.assertEntityHasKey( 'bar', objA );
//does not throw eejs.Exception
eejs.model.assertEntityHasKey( 'bar', objB );
```

## `assertImmutableObjectHasPath( path, immutable, message = '' )`

Asserts whether the given path in the provided immutable object exists. This is typically used when calling code wants an exception to be thrown if the given search path array does not exist in the immutable object.

This throws an `eejs.Exception` when the assertion fails.  The message will be:

> The provided immutable object( `immutable` ) does not have the given path ( `path` )

### Arguments

| Argument    |Type          | Description                                           |
| ----------- |--------------| ----------------------------------------------------- |
| `path`      |Array         | The search path to check in the immutable object for. |
| `immutable` |Immutable\<*\>| An immutable object (Map, Set, List etc)              |
| `message`   |string        | A custom message to append to the error thrown.       |

### Example

```js
const immutable = Immutable.Map().set( 'event', Immutable.Map().set( 10, { EVT_ID: 10, EVT_desc: 'Some Event' } ) );
// throws error
eejs.model.assertImmutableObjectHasPath( [ 'datetime', 10 ], immutable );
// does not throw error
eejs.model.assertImmutableObjectHasPath( [ 'event', 10 ], immutable );
```

## `assertIsArray( items, message = '' )`

Asserts whether the given value is an array.

Throws an `eejs.Exception` if the provided value is not an array.  The error will have the message:

> The provided value is not an array.

### Arguments

| Argument  | Type   | Description                                             |
| --------- | ------ | --------------------------------------------------------|
| `items`   | Array  | The value to verify is an array.                        |
| `message` | string | A custom message to append to the default error message.|

### Example

```js
// throws eejs.Exception
eejs.model.assertIsArray( 25 );
// does not throw error
eejs.model.assertIsArray( [ 1, 2, 3 ] );
```

## `assertIsNotEmpty( item, message = '' )`

Asserts whether the given value is empty or not.  Internally this uses the [`lodash.isEmpty`](https://lodash.com/docs/4.17.11#isEmpty) function for checking empty state so consider that when using this function.

Throws an `eejs.Exception` error when assertion fails.  The message is:

> The provided items must not be empty.

### Arguments

| Argument  | Type   | Description                                                            |
| --------- | ------ | ---------------------------------------------------------------------- |
| `item`    | mixed  | The value to check for emptiness.                                      |
| `message` | string | A custom message to append to the default message in the thrown error. |

### Example

```js
// the following will throw eejs.Exception
eejs.model.assertIsNotEmpty( {} );
eejs.model.assertIsNotEmpty( [] );
eejs.model.assertIsNotEmpty( '' );

// the following will not throw an error.
eejs.model.assertIsNotEmpty( { foo: 'bar' } );
```

## `assertIsMap( item, message = '' )`

Asserts whether the given value is a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object.

Throws an `eejs.Exception` error if the value is not a `Map`.  The message is:

> The provided item must be a Map object

### Arguments

| Argument  | Type   | Description                                                           |
| --------- | ------ | ----------------------------------------------------------------------|
| `item`    | mixed  | The value being checked to see if its a `Map`                         |
| `message` | string | A custom message to append to the default message in the thrown error.|

### Example

```js
// throws an eejs.Exception
eejs.model.assertIsMap( { foo: 'bar' } );
// does not throw an eejs.Exception
eejs.model.assertIsMap( new Map( [ [ 'foo', 'bar' ] ] ) );
```