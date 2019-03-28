The following are various relation type selectors that are exposed on the object returned by `wp.data.select( 'eventespresso/core' )`

Relation type selectors are used for retrieving various relations on a given set of data.

## `getRelationIdsForEntityRelation( entity, relationName )`

Retrieves the relation ids from the state for the given entity and relation name.

This returns an array of ids if the relation exists or an empty array if it does not.

### Arguments

| Argument       | Type       | Description                                                              |
| -------------- | ---------- | ------------------------------------------------------------------------ |
| `entity`       | BaseEntity | The entity the relation is being retrieved for                           |
| `relationName` | string     | The model name for the relation the relation ids are being retrieved for |

### Example:

If we wanted to get all the ids of the datetime entities existing in the state, that are related to the given event entity, we would do something like this.

```js
datetimeEntityIds = wp.data.select( 'eventespresso/core' ).getRelationIdsForEntityRelation( EventEntity, 'datetime' );
```

## `getRelatedEntities( entity, relationName )`

Retrieves the entities related to the given entity for the given relation name.

**Note:**  This selector has an accompanying resolver that will attempt to retrieve the relation entities from the server if the selector has not resolved yet. So an empty array _could_ be returned if the selector is being resolved.

This returns an array of `BaseEntity` instances for the relations found/retrieved, or an empty array if there are none, or if in the midst of resolving.

### Arguments

| Argument       | Type       | Description                                       |
| -------------- | ---------- | ------------------------------------------------- |
| `entity`       | BaseEntity | The entity the relations are being retrieved for. |
| `relationName` | string     | The name of the model the relations belong to.    |

### Example:

If we wanted to get all the datetime's related to a specific event entity, we could do something like this.

```js
datetimeEntities = wp.data.select( `eventespresso/core` ).getRelatedEntities( EventEntity, 'datetime' );
```

## `getRelationAdditionsQueuedForModel( modelName )`

Retrieves all the queued relation additions in the state for the given model.

This selector has automatically generated model specific equivalents that can be used: `getQueuedEventAddtionRelations`, `getQueuedDatetimeAdditionRelations` etc.  When using a model specific equivalent you don't need to pass along any arguments.

This returns an object keyed by entity ids for the given model.  The values on each entity id is an object keyed by relation names and with values being an array of ids for relation.  Example:

```js
{
  10: {
    datetimes: [ 22, 23 ],
    message_template_groups: [ 2, 4 ],
  },
  20: {
    datetimes: [ 24, 25 ],
  },
}
```

### Arguments

| Argument    | Type   | Description                                                          |
| ----------- | ------ | ---------------------------------------------------------------------|
| `modelName` | string | The name of the model retrieving all the queued relation actions for.|

### Example:

```js
const relationAdditionsQueuedForEvent = wp.data.select( 'eventespresso/core' )
    .getRelationAdditionsQueuedForModel( 'event' );
```

## `getRelationDeletionsQueuedForModel( modelName )`

Retrieves all the queued relation deletions in the state for the given model.

This selector has automatically generated model specific equivalents that can be used: `getQueuedEventDeletionRelations`, `getQueuedDatetimeDeletionRelations` etc.  When using a model specific equivalent you don't need to pass along any arguments.

This returns an object keyed by entity ids for the given model.  The values on each entity id is an object keyed by relation names and with values being an array of ids for relation.  Example:

```js
{
  10: {
    datetimes: [ 22, 23 ],
    message_template_groups: [ 2, 4 ],
  },
  20: {
    datetimes: [ 24, 25 ],
  },
}
```

### Arguments

| Argument    | Type   | Description                                                          |
| ----------- | ------ | ---------------------------------------------------------------------|
| `modelName` | string | The name of the model retrieving all the queued relation actions for.|

### Example:

```js
const relationDeletionsQueuedForEvent = wp.data.select( 'eventespresso/core' )
    .getRelationDeletionsQueuedForModel( 'event' );
```

## `countRelationModelsIndexedForEntity( modelName, entityId )`

Returns a count of all the relation models (not count of entities) that exist in the state being related to the given model and entity id.

This selector has automatically generated model specific equivalents that can be used: `countRelationModelsIndexedForEventId`, `countRelationModelsIndexedForDatetimeId` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

**Note:** this only queries the state, not any relations that might exist in the db.

This returns a number indicating the count of relations.

### Arguments

| Argument    | Type    | Description                         |
| ----------- | ------- | ----------------------------------- |
| `modelName` | string  | The model the entity id belongs to. |
| `entityId`  | string\|number | The id of the entity the count is being retrieved for.                                     |

### Example

```js
// if there were relations recorded in the state for 'datetime' and 'ticket', this would return 2
const countOfRelationsInState = wp.data.select( 'eventespresso/core' )
  .countRelationModelsIndexedForEntity( 'event', 10 );
```
## `getRelatedEntitiesForIds( modelName, entityIds, relationName )`

Efficient selector for getting all the related entities for the given model, it's entity ids, and the relation name.

Instead of using the `getRelateions` selector which gets the relations for a single entity, this allows you to get all the relations for a given set of entity ids (i.e. Get all datetimes related to the event ids: 10, 20 and 30).

This selector is wired up to a resolver that does an efficient request to retrieve all those entities and then dispatches the appropriate actions so that the relation state is correctly recorded for each relation entity returned.

This returns an array of `BaseEntity` instances for the given relation name related to the given model entities having the passed in ids.

### Arguments

| Argument    | Type    | Description                                     |
| ----------- | ------- | ----------------------------------------------- |
| `modelName` | string  | The name of the model the entity ids belong to. |
| `entityIds` | Array<string\|number></string> | The ids for which to get the related entities.                                                 |
| `relationName`            | string         | The name of the relation model for which to get the related entities from.                                                 |

### Example

If you wanted to get all the tickets related to the datetimes with the ids 10, 20, and 30 you would do something like this:

```js
const tickets = wp.data( 'eventespresso/core' ).getRelatedEntitiesForIds( 'datetime', [ 10, 20, 30 ], 'tickets' );
```

**Note:** This selector is attached to a resolver, so you will want to use `wp.data.subscribe` to ensure the `tickets` variable is populated with the result once the resolution is complete.