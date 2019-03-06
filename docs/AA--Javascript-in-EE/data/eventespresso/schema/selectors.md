The following selectors are available on the object returned by `wp.data.select( 'eventespresso/schema' )`

## `getSchemaForModel( modelName )`

Returns the schema object for the given model name.

**Note:**  This selector has an accompanying resolver that is used to request the schema from the server when the selector has not been resolved yet.

This selector has automatically generated model specific equivalents that can be used: `getEventSchema`, `getDatetimeSchema` etc.  When using a model specific equivalent you don't need to pass along any arguments.

This returns a schema for the given model name as exposed on the model options endpoint.

### Arguments:

| Argument    | Type   | Description                                      |
| ----------- | ------ | -------------------------------------------------|
| `modelName` | string | The name of the model to retrieve the schema for.|

### Example
```js
const eventSchema = wp.data.select( 'eventespresso/schema' ).getSchemaForModel( 'event' );
```

## `isRequestingSchemaForModel( modelName )`

Returns whether selector `getSchemaForModel` is being resolved or not for the given model name.

This selector has automatically generated model specific equivalents that can be used: `isRequestingSchemaForEvent`, `isRequestingSchemaForDatetime` etc.  When using a model specific equivalent you don't need to pass along any arguments.

This returns a boolean.  True means the schema is being resolved, false means it either hasn't started resolving or it's completed resolving.

### Arguments

| Argument    | Type   | Description                                                   |
| ----------- | ------ | ------------------------------------------------------------- |
| `modelName` | string | The name of the model that the schema is being requested for. |
 
### Example
```js
const isLoadingSchema = wp.data.select( 'eventespresso/schema' ).isRequestingSchemaForModel( 'event' );
```

## `hasResolvedSchemaForModel( modelName )`

Returns whether the schema has been resolved for the given model name via the `getSchemaForModel` selector.  "Resolved" means the schema has been requested and returned via an api request to the schema endpoint for that model.

This returns a boolean.  True means the schema has been resolved, false means it has not.

### Arguments

| Argument    | Type   | Description                                                   |
| ----------- | ------ | ------------------------------------------------------------- |
| `modelName` | string | The name of the model that the schema is being requested for. |

### Example
```js
const hasFinishedResolving = wp.data.select( 'eventespresso/schema' ).hasResolvedSchemaForModel( 'event' );
```

## `getFactoryForModel( modelName )`

Returns the model entity factory object for a given model name.

 **Note:** If there is not yet a factory in the state for the given model name, this selector will trigger resolution for the schema in order to create the model entity factory.  So once the factory is resolved, the schema for the given model name will also be in the state.
 
 This selector has automatically generated model specific equivalents that can be used: `getEventFactory`, `getDatetimeFactory` etc.  When using a model specific equivalent you don't need to pass along any arguments.
 
 This returns an object that is a `BaseEntity` factory.

### Arguments

| Argument    | Type   | Description                                              |
| ----------- | ------ | ---------------------------------------------------------|
| `modelName` | string | The name of the model the factory is being requested for.|

### Example

```js
const eventFactory = wp.data.select( 'eventespresso/schema' ).getFactoryForModel( 'event' );
```

## `isRequestingFactoryForModel( modelName )`

Returns whether the model entity factory is being resolved for the given model name via the `getFactoryForModel` selector.

This selector has automatically generated model specific equivalents that can be used: `isRequestingFactoryForEvent`, `isRequestingFactoryForDatetime` etc.  When using a model specific equivalent you don't need to pass along any arguments.

This returns a boolean.  True means the factory is being resolved, false means it either hasn't started resolving or has completed resolving.

### Arguments

| Argument    | Type   | Description                                               |
| ----------- | ------ | --------------------------------------------------------- |
| `modelName` | string | The name of the model the factory is being requested for. |

### Example
```js
const isLoadingFactory = wp.data.select( 'eventespresso/schema' ).isRequestingFactoryForModel( 'event' );
```

## `hasResolvedFactoryForModel( modelName )`

Returns whether the model entity factory for the given model name has been resolved via the `getFactoryForModel` selector.

This returns a boolean. True means the factory has been resolved, false means it has not.

### Arguments

| Argument    | Type   | Description                                               |
| ----------- | ------ | --------------------------------------------------------- |
| `modelName` | string | The name of the model the factory is being requested for. |

### Example
```js
const hasResolvedFactory = wp.data.select( 'eventespresso/schema' ).hasResolvedFactoryForModel( 'event' );
```

## `getRelationEndpointForEntityId( modelName, entityId, relationName )`

Return the relation endpoint for the given model, entity id and relation.

**Note:**  This selector has an accompanying resolver that is used to retrieve the model entity from the server and grab the relation endpoint from its schema in the response when the relation endpoint does not yet exist in the state and the selector has not been resolved yet.

This returns a string which is the endpoint for the relation (or an empty string if there is no endpoint that can be retrieved)

### Arguments

| Argument    | Type    | Description                                     |
| ----------- | ------- | ----------------------------------------------- |
| `modelName` | string  | The name of the model the entity id belongs to. |
| `entityId`  | number\|string | The id of the entity the relation belongs to.                                                 |
| `relationName`            | string         | The model name for the relation.                                                 |

### Example:

```js
const relationEndpoint = wp.data.select( 'eventespresso/schema' )
  .getRelationEndpointForEntityId( 'event', 10, 'datetimes' );
```

## `isRequestingRelationEndpointForEntityId( modelName, entityId, relationName )`

Selector for returning whether the relation endpoint is being resolved for the given data on via the `getRelationEndpointForEntityId` selector.

This returns a boolean.  True means that the `getRelationEndpointForEntityId` is being resolved.  False means it either hasn't started resolving or has finished resolving.

### Arguments

| Argument    | Type    | Description                                     |
| ----------- | ------- | ----------------------------------------------- |
| `modelName` | string  | The name of the model the entity id belongs to. |
| `entityId`  | number\|string | The id of the entity the relation belongs to.                                                 |
| `relationName`            | string         | The model name for the relation.                                                 |

### Example:

```js
const isLoading = wp.data.select( 'eventespresso/schema' )
  .isRequestingRelationEndpointForEntityId( 'event', 10, 'datetimes' );
```

## `hasJoinTableRelation( modelName, relationName )`

Selector returning whether the relation between the given model name and relation name has a join table.

This returns a boolean.  True means the relation has a join table.  False means the relation does not have a join table.  **Note:** False is also returned when the relation type cannot be determined.

### Arguments

| Argument       | Type   | Description                                |
| -------------- | ------ | -------------------------------------------|
| `modelName`    | string | The name of the model the relation is from.|
| `relationName` | string | The name of the model the relation is to.  |

### Example

**Note:** This selector is attached to a resolver, so you will want to use `wp.data.subscribe` api to ensure the `hasJoinTable` variable is populated with the result once the resolution is complete.

```js
const hasJoinTable = wp.data.select( 'eventespresso/core' ).hasJoinTableRelation( 'event', 'datetimes' );
```

## `getRelationType( modelName, relationName )`

Selector returning the relation type describing the relation between the given model name and relation name.

This returns a string indicating one of the possible relation types for the given relation.  Note, the relation type is for the context of the given model name _to_ the given relation name.  So for instance the relation type for event to datetime relations is `EE_Has_Many_Relation`, whereas the relation type for `datetime` to `events` relations is `EE_Belongs_To_Relation`.

### Arguments

| Argument       | Type   | Description                                |
| -------------- | ------ | -------------------------------------------|
| `modelName`    | string | The name of the model the relation is from.|
| `relationName` | string | The name of the model the relation is to.  |

### Example

**Note:** This selector is attached to a resolver, so you will want to use `wp.data.subscribe` api to ensure the `relationType` variable is populated with the result once the resolution is complete.

```js
const relationType = wp.data.select('eventespresso/core' ).getRelationType( 'event', 'datetimes' );
```

## `getRelationSchema( modelName, relationName )`

Selector returning the relation schema describing the relation between the given model name and relation name.

**Note** the returned schema (a plain object), is s subset of the schema returned for the `modelName`.  It's expected the the relation schema for `getRelationSchema( 'event', 'datetimes' )` could _differ_ from `getRelationSchema( 'datetime', 'events' )` because the relation types differ depending on the direction of the relation.

### Arguments

| Argument       | Type   | Description                                |
| -------------- | ------ | -------------------------------------------|
| `modelName`    | string | The name of the model the relation is from.|
| `relationName` | string | The name of the model the relation is to.  |

### Example

**Note:** This selector is attached to a resolver, so you will want to use `wp.data.subscribe` api to ensure the `relationSchema` variable is populated with the result once the resolution is complete.

```js
const relationSchema = wp.data.select('eventespresso/core' ).getRelationSchema( 'event', 'datetimes' );
```
