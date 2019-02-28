These are various properties exposed on the `eejs.model` module that relate to retreiving and working with primary keys on the model.

## `eejs.model.valuesForCombinedPrimaryKeys( keys, entity )`

This is a memoized function that returns the values for the given keys from the provided entity.  This would be typically used for models that have "combined" primary keys (delivered as an array).

This returns a string in the shape of `{key}:{key}`.

This throws an `eejs.Exception` if `keys` is not an array or if entity does not have any of the keys as a property on it.

### Arguments

| Argument | Type   | Description                                                                  |
| -------- | ------ | ---------------------------------------------------------------------------- |
| `keys`   | Array  | An array of keys to grab the values for and combine                          |
| `entity` | Object | An object representing the entity in which the values will be returned from. |

### Example:

```js
const entity = { foo: 'bar', bar: 'foo' };
// "bar:foo"
console.log( eejs.model.valuesForCombinedPrimaryKeys( [ 'foo', 'bar' ], entity ) );
```

## `eejs.model.valueForPrimaryKey( key, entity )`

A memoized function that returns the value for the given key from the provided entity.  This function should be used by models that have only one primary key.

This returns a string|number depending on what type the primary key value is.

This throws an `eejs.Exception` if the incoming key does not exist as a property on the incoming entity.

### Arguments

| Argument| Type   | Description                                                                 |
| --------| ------ | ----------------------------------------------------------------------------|
| `key`   | string | The key to check for in the provided entity                                 |
| `entity`| Object | An object representing the entity in which the values will be returned from.| 

### Example

```js
// "bar"
console.log( eejs.model.valueForPrimaryKey( 'foo', { foo: 'bar' } ) );
```

## `eejs.model.getPrimaryKey( modelName )`

A memoized function that returns the primary key (or combined primary keys) from the available data passed from the server.

Returns string|number.

Throws an `eejs.Exception` if the given model name is unknown.

### Arguments

| Argument    | Type   | Description                                                 |
| ----------- | ------ | ----------------------------------------------------------- |
| `modelName` | string | The name of the model name to retrieve the primary key for. |

### Example

```js
// "EVT_ID"
console.log( eejs.model.getPrimaryKey( 'event' ) );
```

## `eejs.model.getPrimaryKeyQueryString( modelName, keyValues = [] )`

Returns a query string for getting the entities belonging to a model for the given primary key values for that model.

This throws an `eejs.Exception` if the given model is unknown.

### Arguments

| Argument    | Type   | Description                                                                                                                          |
| ----------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------|
| `modelName` | string | The name of the model the query string should be built for.  This is used to determine what value to put in the primary key argument.|
| `keyValues` | Array  | An array of primary key values to include in the query string.                                                                       |

### Example

```js
// "[EVT_ID][IN]=10,20"
console.log( eejs.model.getPrimaryKeyQueryString( 'event', [ 10, 20 ] ) );
```

## `eejs.model.getEntityPrimaryKeyValues( modelName, entity )`

A memoized function that returns the values for the primary keys from the provided entity.  If the model only has a single primary key then the returned value will be a string or number.  If the model has "combined" primary keys then the returned value will a string like `"{value}:{value}"` (eg `"10:20"`).

This will throw an `eejs.Exception` if either the model name is unknown, or if there is no property matching the primary key(s) on that model in the provided entity object.

### Arguments

| Argument    | Type   | Description                                        |
| ----------- | ------ | -------------------------------------------------- |
| `modelName` | string | The name of the model the given entity belongs to. |
| `entity`    | Object | The entity the values will be retrieved from.      |

### Example:

```js
// 10
console.log( eejs.model.getEntityPrimaryKeyValues( 'event', { EVT_ID: 10 } ) );
```

## `eejs.model.keyEntitiesByPrimaryKeyValue( modelName, entities = [] )`

This function receives an array of entities and returns a collection of those same entities indexed by the primary key value for each entity.

This returns a javascript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). 

This throws an `eejs.Exception` if the incoming `entities` is empty, is not an array or the model name is unknown.

### Arguments

| Argument    | Type   | Description                                                    |
| ----------- | ------ | ---------------------------------------------------------------|
| `modelName` | string | The name of the model the provided array of entities belong to.|
| `entities`  | Array  | An array of entities belonging to the given model.             |

### Example:

```js
const entities = [ { EVT_ID: 10 }, { EVT_ID: 20 }, { EVT_ID: 30 } ];
// Map{ [ [ 10, { EVT_ID: 10 } ], [ 20, { EVT_ID: 20 } ], [ 30, { EVT_ID: 30 } ] ] }
console.log( eejs.model.keyEntitiesByPrimaryKeyValue( 'event', entities ) );
```

## `eejs.model.createAndKeyEntitiesByPrimaryKeyValue( factory, entities )`

This function creates a Map of `BaseEntity` instances using the given `BaseEntity` factory and [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of entity values (usable in factory.fromExisting).

This returns an `eejs.Exception` if the incoming `entities` is not a javascript Map.

### Arguments

| Argument   | Type   | Description                                                                    |
| ---------- | ------ | -------------------------------------------------------------------------------|
| `factory`  | Object | A `BaseEntity` factory                                                         |
| `entities` | Map    | A map of entities for the given model to construct into `BaseEntity` instances.|

### Example:

```js
const entities = new Map( [ 10, EventAResponse ], [ 20, EventBResponse ] ] );
// Map{ [ [ 10, EventEntityA ], [ 20, EventEntityB ] ] }
console.log( eejs.model.createAndKeyEntities( eventFactory, entities ) );
```