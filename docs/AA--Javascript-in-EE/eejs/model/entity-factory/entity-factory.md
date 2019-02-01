# `eejs.model.createEntityFactory(  modelName, schema, fieldPrefixes = [] )`

The entity factory is an interface to creating `BaseEntity` instances for Event Espresso models.  This allows for creating common interfaces to Event Espresso model entities.

This returns an object exposing factory methods for use in building `BaseEntity` instances for the given model.


## Arguments

| Argument       | Type   | Description                                                                                                                                                                                                                                                                       |
| ---------------| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `modelName`    | string | This should correspond to a model that we want an entity factory for.                                                                                                                                                                                                             |
| `schema`       | Object | This should be a schema object for the model that is provided by the `OPTIONS` endpoint for the model.                                                                                                                                                                            |
| `fieldPrefixes`| Array  | An optional argument, this would be an array of field prefixes that the factory can use to strip from entity field names to provide leaner properties for referencing fields.  For example, if you were requesting a factory for the event model, you could provide `[ 'EVT_ID' ]` and that will expose `name` along with `EVT_name` for field properties when the `BaseEntity` is constructed by the factory returned. |

## Example

```js
EventFactory = eejs.model.createEntityFactory( 'event', EventSchema, [ 'EVT_ID' ] ) );
```
## Response

`createEntityFactory` returns an object containing methods for constructing an instance of `BaseEntity` for the given model. The following is exposed on the returned object:

| Property                                                           | Description                                                                                                                                                                               |
| -------------------------------------------------------------------| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `modelName`                                                        | The name of the model the factory is for.  Client code and use this to derive what model this factory is for.                                                                             |
| `classDef`                                                         | A reference to the `BaseEntity` class definition created for this model by the factory. This is useful for when client code has access to the factory and wants to do `instanceof` checks |
| [`createNew`](./entity-factory.md#createnew-fieldsAndValues-)      | Returns an instance of `BaseEntity` for the given fields and values.  This is a _non-persisted_ instance.                                                                                 |
| [`fromExisting`](./entity-factory.md#fromexisting-fieldsAndValues-)| Returns an instance of `BaseEntity` for the given fields and values coming from a REST response.  This means it represents a _persisted_ instance of the entity.                          |

### `createNew( fieldsAndValues )`

This method on the factory returns an instance of `BaseEntity` for the given fields and values.  This is a _non-persisted_ instance. This means:

* All field values on the entity are populated and any not provided will be populated with default values defined by the schema for the model.
* Generates temporary unique ids for the primary key fields on the entity (using [`cuid`](https://www.npmjs.com/package/cuid))
* Sets the `SAVE_STATE` private property in the instance to `SAVE_STATE.NEW` for the entity so client code is able to discover which entities have never been persisted.  This save state will never change on the entity.
* This factory method expects fields and values to be "prepared".  What that means is that for any fields that the schema described as having a `raw` property (eg. `{ EVT_desc: { raw: 'something' } } )`), the value should be of the correct type for that raw property and...
* This also means for any fields the schema describes as a `date-time` (format) or money (format) field, the value is expected to be the corresponding value object.

**Example:**

```js
const EventFactory = eejs.model.createEntityFactory( 'event', EventSchema, [ 'EVT' ] ) );
const NewEventEntity = eventFactory.createNew( { EVT_desc: 'Test Event'  } );
```

### `fromExisting( fieldsAndValues )`

Returns an instance of `BaseEntity` for the given fields and values coming from a REST response. This means it represents a persisted instance of the entity.  This means:

* Any incoming field values that are missing for entity fields are _not_ populated by default values from the schema.  This is especially important for contexts like _permission required_ views where only partial entities are returned in REST responses.
* `SAVE_STATE` private property on the entity instance is set to `SAVE_STATE.CLEAN`.  If the entity has values changed then its `SAVE_STATE` will be changed to `SAVE_STATE.DIRTY`.
* The incoming values are expected to be in the exact shape as described by the schema for the entity model.  So typically, this method will only be used to create an entity instance from a entity retrieved via a REST request.

**Example:**

```js
const EventFactory = eejs.model.createEntityFactory( 'event', EventSchema, [ 'EVT' ] );
const EventEntity = eventFactory.fromExisting( EventResponseFromRequest );
```