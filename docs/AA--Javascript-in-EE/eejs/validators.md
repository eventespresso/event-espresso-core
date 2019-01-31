# `eejs.validators`

The following are various utility functions that assist with validating values exposed directly on the `eejs` global.

| Function                                                                                       | Description                                                                                                                                    |
| -----------------------------------------------------------------------------------------------| -----------------------------------------------------------------------------------------------------------------------------------------------|
| [`isModelEntityFactory`](./validators.md#ismodelentityfactory-factory-)                        | Utility for checking whether the given value represents a [`BaseEntity`](./model/entity-factory/entity-factory.md) factory object              |
| [`isModelEntityFactoryOfModel`](./validators.md#ismodelentityfactoryofmodel-factory-modelname-)| Utility for checking whether the given value represents a [`BaseEntity`](./model/entity-factory/entity-factory.md) factory for a specific model|
| [`isGenerator`](./validators.md#isgenerator-object-)                                           | Tests for whether the provided value is a generator or not.                                                                                    |
| [`isModelEntity`](./validators.md#ismodelentity-entity-)                                       | Returns whether the given value is an instance of [`BaseEntity`](./model/entity-factory/base-entity.md)                                        |
| [`isModelEntityOfModel`](./validators.md#ismodelentityofmodel-entity-modelname-)               | Returns whether the given value is an instance of [`BaseEntity`](./model/entity-factory/base-entity.md) for the given model                    |
| [`isSchemaResponse`](./validators.md#isschemaresponse-response-)                               | Returns whether the given value is a schema response object from a schema REST request.                                                        |
| [`isSchema`](./validators.md#isschema-schema-)                                                 | Returns whether the given value is a schema object.                                                                                            |
| [`isSchemaResponseOfModel`](./validators.md#isschemaresponseofmodel-response-modelname-)       | Returns whether the given value is a schema response object for the given model.                                                               |
| [`isSchemaOfModel`](./validators.md#isschemaofmodel-schema-modelname-)                         | Returns whether the given value is a schema object for the given model name.                                                                   |
| [`hasSchemaProperty`](./validators.md#hasschemaproperty-object-)                               | Returns whether the given value is an object with a schema property.                                                                           |


## `isModelEntityFactory( factory )`

Utility for checking whether the given value represents a [`BaseEntity`](./model/entity-factory/entity-factory.md) factory object.  It returns boolean where `true` means the given value is a factory object or `false` means it is not.

This checks the following things:

* `factory` is not undefined.
* `factory.classDef` is not undefined.
* `factory.modelName` is not undefined.
* the `prototype.name` of `factory.classDef` is 'BaseEntity'.

## `isModelEntityFactoryOfModel( factory, modelName )`

This is used for validating whether the given value represents a [`BaseEntity`](./model/entity-factory/entity-factory.md) factory for the given modelName.  

> **Note:** `modelName` is expected to be the lowercase, snake-case singular string for the model (eg. `'message_template'`).

Internally this checks:

- if this is a `BaseEntity` factory (via `isModelEntityFactory`)
- if `factory.modelName` equals `modelName`

## `isGenerator( object )`

This is used to validate whether the provided value is a generator or not.

> **Note:** Generators are different than GeneratorFunctions! (see example).

### Example:
```js
const generator = function* () { yield 1; yield 2; return 3 };
// returns false because this is the function not the 
// invoked generator instance
console.log( eejs.validators.isGenerator( generator ) );
// returns true because this is the invoked generator instance.
console.log( eejs.validators.isGenerator( generator() );
```
## `isModelEntity( value )`

This is used to validate whether the given value is an instance of [`BaseEntity`](./model/entity-factory/base-entity.md).

The following is used to validate:

- is `entity` of type `Object`?
- is the `prototype.name` for `entity` the value `BaseEntity`.

## `isModelEntityOfModel( value, modelName )`

This is used to validate whether the given value is an instance of [`BaseEntity`](./model/entity-factory/base-entity.md) for the given model name.

The following is used to validate:

- is this a `BaseEntity` instance (via `isModelEntity`)
- is the `entity.constructor.name` value equal to `modelName`?

## `isSchemaResponse( response )`
Returns whether the given value represents a schema response object from a schema REST API request.

The following is used to validate:

- is this an object and does it have a `schema` property?
- is `response.schema` a schema (via `isSchema` )?

## `isSchema( schema )`

Returns whether the given value is schema object.

This validates as a schema object when:

- `schema` is a plain object.
- `schema.$schema` exists
- `schema.properties` exists and is a plain object.

## `isSchemaResponseOfModel( response, modelName )`

Returns whether the given value is a schema response object for the given model name.

The following is used to validate:

- Is this a schema response (via `isSchemaResponse` )
- Is the schema object from the response for the given model (via `isSchemaofModel`)

## `isSchemaOfModel( schema , modelName )`

Returns whether the given value represents a schema object property value from the schema response for a specific model name.

This validates as a schema object for the given model when:

- This is a schema object (via `isSchema`)
- `schema.title` exists
- `schema.title` equals `modelName` (both are lowercased).