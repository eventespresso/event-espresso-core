The following selectors for entities that are available on the object returned by `wp.data.select( 'eventespresso/core' )`.

## `getEntityRecordsForModel( modelName )`
Returns all entity records currently in the state for the given model name.  An "entity record" is the complete object indexed by primary key value.

This selector has automatically generated model specific equivalents that can be used: `getEventRecords`, `getDatetimeRecords` etc.  When using a model specific equivalent you don't need to pass along any arguments.

This returns a collection of `BaseEntity` instances indexed by their primary key value or an empty object if there are no entity records for the given model.

### Arguments

| Argument    | Type   | Description                                     |
| ----------- | ------ | ----------------------------------------------- |
| `modelName` | string | The name of the model to get the entity records |

### Example
```js
// {
//  10: { EVT_ID: 10, EVT_desc: "A description for my event" ... },
//  20: { EVT_ID: 20, EVT_desc: "Another description" ... },
//  ...
// }
const events = wp.data.select( 'eventespresso/core' ).getEntityRecordsForModel( 'event' );
```

## `getEntitiesForModel( modelName )`
Returns all the entities for the given model name currently in the state.  This differs from `getEntityRecordsForModel` in that the entities are _not_ indexed by primary key value.

This selector has automatically generated model specific equivalents that can be used: `getEvents`, `getDatetimes` etc.  When using a model specific equivalent you don't need to pass along any arguments.

This returns an array of `BaseEntity` instances or an empty array if there are no entities in the state for the model.

### Arguments:

| Argument    | Type   | Description                                         |
| ----------- | ------ | --------------------------------------------------- |
| `modelName` | string | The name of the model to retrieve the entities for. |

### Example
```js
// [
//     { EVT_ID: 10, EVT_desc: "A description", ... },
//     { EVT_ID: 20, EVT_desc: "Another description", ... },
//     ...
// ]
const events = wp.data.select( 'eventespresso/core' ).getEntitiesForModel( 'event' );
```
## `getEntityById( modelName, entityId )`
Returns the model entity for the given model name and entity id.  The id is expected to be the value for the primary key on the entity. This will attempt to retrieve the entity from the server via a resolver if it doesn't exist in the state and has not been resolved yet.

This selector has automatically generated model specific equivalents that can be used: `getEventById`, `getDatetimeById` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

**Note:** Due to this being a resolved value, it is important to consider that `null` _could_ be returned while in resolution.  It is recommended to use `wp.data.subscribe` to ensure whatever is using the value updates appropriately when the state changes.

  If the entity is not in the state or cannot be resolved, `null` is returned. 

### Arguments

| Argument    | Type    | Description                                     |
| ----------- | ------- | ----------------------------------------------- |
| `modelName` | string  | The name of the model the entity id belongs to. |
| `entityId`  | string\|number | The id of the entity to retrieve.                                                 |
  
### Example
```js
// { EVT_ID: 10, EVT_desc: 'Some description', ... }
const event = wp.data.select( 'eventespresso/core' ).getEntityById( 'event', 10 );
```

## `getEntitiesByIds( modelName, entityIds )`
Retrieves an array of model entities for the provided array of ids and the given model name.  This does not resolve from the server if the ids are not in the state.  It is recommended to use `getEntitiesByIds` from the `eventespresso/lists` if you need entities to be resolved from the server.

This selector has automatically generated model specific equivalents that can be used: `getEventsByIds`, `getDatetimesByIds` etc.  When using a model specific equivalent you only need to pass along the `entityIds` argument.

If the given model name does not exist in the state, `null` is returned.  Otherwise, an array of any entities in the state matching the given ids are returned.

### Arguments

| Argument    | Type   | Description                                                          |
| ----------- | ------ | ---------------------------------------------------------------------|
| `modelName` | string | The name of the model retrieving entities for                        |
| `entityIds` | Array  | An array of ids indicating which entities to retreive from the state.|

### Example

```js
/// [
//     { EVT_ID: 10, EVT_desc: "A description", ... },
//     { EVT_ID: 20, EVT_desc: "Another description", ... },
//     ...
// ]
const events = wp.data.select( 'eventespresso/core' )
      .getEntityByIds( 'event', [ 10, 20, 30 ] );
```

## `getEntityIdsQueuedForTrash( modelName )`

This retrieves the ids of the entities in the state that are currently queued for trashing.

This selector has automatically generated model specific equivalents that can be used: `getEventIdsQueuedForTrash`, `getDatetimeIdsQueuedForTrash` etc.  When using a model specific selector you do not need to pass along any arguments.

This returns an array of entity ids queued for trash or an empty array if there are none.

### Arguments

| Argument    | Type   | Description                                      |
| ----------- | ------ | -------------------------------------------------|
| `modelName` | string | The name of the model ids are being retrieved for|

### Example

```js
const eventIds = wp.data.select( 'eventespresso/core' ).getEntityIdsQueuedForTrash( 'event' );
```

## `getEntityIdsQueuedForDelete( modelName )`

This retrieves the ids of the entities in the state that are currently queued for deleting.

This selector has automatically generated model specific equivalents that can be used: `getEventIdsQueuedForDelete`, `getDatetimeIdsQueuedForDelete` etc.  When using a model specific selector you do not need to pass along any arguments.

This returns an array of entity ids queued for deleting or an empty array if there are none.

### Arguments

| Argument    | Type   | Description                                      |
| ----------- | ------ | -------------------------------------------------|
| `modelName` | string | The name of the model ids are being retrieved for|

### Example

```js
const eventIds = wp.data.select( 'eventespresso/core' ).getEntityIdsQueuedForDelete( 'event' );
```

## `getModelsQueuedForTrash()`

This retrieves a list of models in the state that currently have ids queued for trashing.

This returns an array of model names or an empty array if there are none.  Only models that have entity ids queued will get returned.

### Arguments

There are no arguments for this selector.

### Example:

```js
// returns something like [ 'event', 'datetime', 'ticket' ]
const modelsQueuedForTrash = wp.data.select( 'eventespresso/core' ).getModelsQueuedForTrash()
```

## `getModelsQueuedForDelete()`

This retrieves a list of models in the state that currently have ids queued for deleting.

This returns an array of model names or an empty array if there are none.  Only models that have entity ids queued will get returned.

### Arguments

There are no arguments for this selector.

### Example:

```js
// returns something like [ 'event', 'datetime', 'ticket' ]
const modelsQueuedForTrash = wp.data.select( 'eventespresso/core' ).getModelsQueuedForDelete()
```