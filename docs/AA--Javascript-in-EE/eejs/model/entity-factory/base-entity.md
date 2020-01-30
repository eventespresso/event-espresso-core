# `BaseEntity`

This is a class that forms the base of entity instances created by [`entity factories`](./entity-factory.md) for Event Espresso model entities.  It is what gets returned by invoking the [`createNew`](./entity-factory.md#createnew-fieldsandvalues-) or [`fromExisting`](./entity-factory.md#fromexisting-fieldsandvalues-) functions on an entity factory.  

## Getters

### Dynamic getters
Every `BaseEntity` instance will have a number of dynamically built getters based on the model schema and incoming values for the model entity.  

* Canonical field names for entity fields (`EVT_name`, `DTT_EVT_start` etc).
* CamelCase versions of the canonical fields ( `evtName`, `dttEvtStart` etc).
* Prefix-less versions of the fields ( `id`, `name`, `evtStart`, `start` )
* `Rendered` suffixed field names for all fields ( `nameRendered`, `evtStartRendered` ).  This returns the rendered view for the value (for fields that have a `rendered` or `pretty` property in the schema and response) or the default formatted value if the field has a [`value-object`](../../../value-objects/README.md) as its value.
* `{relation}Resource` properties for every relation available on that entity (eg. `datetimesResource`, `postMetasResource` etc.)  Note, that relation properties will _always_ be the plural form of that relation (regardless if its a one to one relation or not).  The value for these is an object with two properties: `resourceLink` which is a link to the relation for the entity and; `single` which is is a boolean indicating whether the relation is a _single_ relation (true) or not (false).
* Any fields returned on the `_calculated` property of a REST response will also be automatically exposed on the entity instance directly.   So for instance, `attendee` model instances _could_ have the `userAvatar` property on them exposing the avatar for that attendee if the `user_avatar` calculated field included in the REST request for the attendee entity.  Since there's no guarantee these fields will be present, it's wise to use the [`hasCalculatedField`](./base-entity.md#hascalculatedfield-fieldname-) function to determine if its present on that entity instance first. 

These dynamic fields vary between model entities as they are derived from the field names in the schema.

### Non-Dynamic Getters

These are getter properties that are present in _every_ `BaseEntity` instance regardless of model (with a few exceptions that are noted).

#### `id`

Every `BaseEntity` instance has this property set from the derived primary key value passed in on instantiation.  So for example, on event entity instances `event.id` would be the same value as `event.EVT_ID`.  On datetime entity instances `datetime.id` would be the same value as `datetime.DTT_ID`.  This provides a canonical, consistent way to access the value for the primary key on the entity instance.

#### `forUpdate`

This returns a plain object containing all the fields and values ready for using in an update request for that entity.  This means it will _not_ include the primary key field and its value and all values will be in a format the REST update request expects (according to the schema for that model).

#### `forInsert`

This returns a plain object containing all the fields and values ready for using in an insert request for that entity. This means all values will be in a format the REST insert request expects (according to the schema for that model).  This _will_ include primary keys and their values but be aware that the server may ignore them depending on the model.

### `forPersist`

This property will intelligently determine whether `forUpdate` or `forInsert` should be used to return data for persisting to the server based on the internal `SAVE_STATE` flag indicating what "type" of entity instance this is.

### `forClone`

This returns a plain object containing all the fields and values ready for using to clone the entity.  This means all values will be in the prepared formate for creating a new entity instance.  This will not include the primary keys and their values.

### `getRendered( fieldName )`

This is a getter function for retrieving the rendered value of a given field name.  This is useful for fields that have values as [`value objects`](../../../value-objects/README.md) (typically date or money fields) or for fields that have `raw` and `rendered` (or `pretty`) representations (example `EVT_desc`).  Using this function along with a field name is a safe way to always retrieve a value for a field suitable for display in ui.

If a field does not have a `raw` and `rendered` representation, then this just returns the value on the field as is.

> **Note:**  All field values in the instance will always have their "raw" value stored and accessed via the field property.  The _only_ way to get the "rendered" values for a field is to use either the `{field_name}Rendered` property, or this `getRendered( fieldName )` function.

**Example:**

```js
// 'Some Event'
console.log( EventInstance.getRendered( 'desc' ) );
```

### `primaryKey`

This property is used to retrieve what the primary key is for the entity instance.

> **Note:** in cases where a model entity has multiple primary keys, this property will only return the _first_ primary key. 

**Example:**

```js
// EVT_ID
console.log( EventInstance.primaryKey );
```

### `primaryKeys`

This property will return an array with all the primary keys for the model the entity instance belongs to.

**Example:**

```js
// [ 'EVT_ID' ]
console.log( EventInstance.primaryKeys );
```

### `hasMultiplePrimaryKeys`

This property indicates whether the model the entity instance belongs to has multiple primary keys or not. 

Returns a boolean.

**Example:**

```js
// false
console.log( EventInstance.hasMultiplePrimaryKeys );
```

### `fieldPrefixes`

This property returns an array of field prefixes for the model the entity belongs to (these would have been passed in by the entity factory).

**Example:**

```js
// [ 'EVT' ]
console.log( EventInstance.fieldPrefixes );
```

### `schema`

This property returns the value of `schema.properties` from the schema that was passed into the instance by the factory.

### `modelName`

This property returns the name of the model the entity instance belongs to.

**Example:**

```js
// event
console.log( EventInstance.modelName );
```

### `originalFieldsAndValues`

This property exposed all the original fields and values passed in on construction by the factory.

### `protectedFields`

This property exposes any fields that are password protected in this instance.  What this means is, any field names in the array value for this property do not have the _actual_ value for that field as it exists on the server, but rather the _default_ value defined by the schema because the correct password (or authorization) was not present for accessing that field value when the request was made for this entity.

### `hasCalculatedField( fieldName )`

This function checks if the given field name exists in the entity instance as a property.  It is useful because model entity instances will not always have calculated fields exposed.

Returns a boolean.  `true` means the field does exist, `false` means it does not.

### `link`

This references a link to the public view of the entity on the website hosting the data.

> **Note:** Note every entity has a public view, thus this property will only exist for those that do.

**Example:**

```js
// https://ee.test/events/my-great-event
console.log( EventInstance.link );
// undefined
console.log( RegistrationInstance.link );
```

### `resourceLink`

This references the link to the entity resource via a REST request.  This is present on every entity instance.

**Example:**

```js
// https://ee.test/wp-json/ee/v4.8.36/registrations/1
console.log( RegistrationInstance.resourceLink );
```

### `collectionResourceLink`

This references the collection endpoint for the model the entity belongs to.  This is present on every entity instance.

**Example:**

```js
// https://ee.test/wp-json/ee/v4.8.36/registrations
console.log( RegistrationInstance.collectionResourceLink );
```

### `getRelations`

This exposes an array of all relations on the given entity (the relation names).

**Example:**

```js
// [
//  'registrations',
//  'datetimes',
//  'questionGroups',
//  'venues',
//  'termRelationships',
//  'termTaxonomies',
//  'messageTemplateGroups',
//  'attendees',
//  'wpUsers',
//  'postMetas',
//  'extraMetas',
//  'changeLogs','
// ]
console.log( EventInstance.getRelations );
```

### `getRelationResource( relationName )`

This returns the relation resource for the given relation name.  Relation names should always be passed through in the plural form (even if you know there is only a one-to-one relation between the models).  If the relation does not exist for this entity instance then `undefined` is returned.

**Example:**

```js
// https://ee.test/wp-json/ee/v4.8.36/registrations/1/event
console.log( RegistrationInstance.getRelationResource( 'events' ) );
```

### `saveState`

This returns what the current `saveState` is for the model. It will return a symbol that will be one of the following:

| State                         | Description                                                                                                                                                                                                                                          |
| ----------------------------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `eejs.model.SAVE_STATE.NEW`   | This means the model is a new entity instance that has never been persisted to the server.  This save state _never_ changes on the model entity instance even if it is mutated because it's still not persisted.                                     |
| `eejs.model.SAVE_STATE.CLEAN` | This is the initial state an instance receives when it is constructed from the response from the server.  It means that the current entity instance matches what is on the server.                                                                   |
| `eejs.model.SAVE_STATE.DIRTY` | This means that although the current entity instance represents what exists on the server, it may be out of sync with the server and is in a non-persisted state.  It means that the entity instance has been mutated since it was first constructed.|

### `isNew`

This is returns a boolean to indicate whether the entity instance has a save state of `NEW` (true) or not (false).

### `isDirty`

This returns a boolean to indicate whether the entity instance has a save state of `DIRTY` (true) or not (false).  

### `isClean`

This returns a boolean to indicate whether the entity instance has a save state of `CLEAN` (true) or not (false).


## Setters
### Dynamic Setters

Every `BaseEntity` instance will have a number of dynamically built setters based on the model schema and incoming values for the model entity.  When you set a value on a property, there is automatic validation to ensure that the value matches the expected type for that field according to the schema for that model (and in particular the expected `raw` type for that value if there is a `raw` property on that field).  Also, it is expected that special field types such as `date-time` or `money` format fields will have the value in the form of a [`value object`](../../../value-objects/README.md).  The created properties are the same as what was outlined in the [Dynamic Getters](./base-entity.md#dynamicgetters) section so that won't be repeated here.  The only difference between that list for getters and the properties functioning as a setter is that primary keys only have a getter.  After the model instance is constructed, the primary key value cannot be changed.

**Example:**

```js
EventInstance.desc = 'A new description';
// "A new description"
console.log( EventInstance.desc );
```

When the `BaseEntity` instance is constructed, it also creates _fluent setters_ for each field.  However, the fluent setter is only created using the canonical field name.  The fluent setter returns an the BaseEntity instance to allow for chaining sets (hence the use of the term "fluent").  All fluent setters are prefixed with the string `set`.

```js
EventInstance.setEVT_slug( 'my-great-event' ).setEVT_name( 'Journey to Mars' );
// my-great-event : Journey to Mars
console.log( EventInstance.slug + ' : ' + EventInstance.name  );
```


