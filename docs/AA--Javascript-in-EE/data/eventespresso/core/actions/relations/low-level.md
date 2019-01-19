These are actions that are used internally by other actions and should be used with care because if they are used incorrectly, it could lead to some unexpected results for persist actions.  Generally speaking, client code should avoid dispatching these actions directly.

These are non-persisting actions.

## `receiveRelatedEntities( modelName, entityId, relationName, relatedEntityIds )`

This dispatches an action that records the relations for the given entities to the state.  This is typically used when relations have been retrieved and recorded in the state.  This is used for both _pending_ (non-persisted) relations and _existing_ relations.

This dispatch action has automatically generated model specific equivalents that can be used: `receiveRelatedEntitiesForEvent`, `receiveRelatedEntitiesForDatetime` etc.  When using a model specific equivalent you only need to pass along the `entityId`, `relationName` and `relationEntities` arguments.

This does not return a value.

**Arguments**

| Argument    | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| `modelName` | string  | The name of the model you are recording the relation for. |
| `entityId`  | string\|number | The id of the entity you are recording the relation for.                                                          |
| `relationName`            | string         | The name of the model you are recording the relation to.                                                          |
| `relatedEntityIds`            | Array         | An array of ids for the entities you are recording the relation to.                                                          |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).receiveRelatedEntities( 'event', 10, 'datetime', [ 10, 20, 30 ] );
```

## `receiveDirtyRelationAddition( relationName, relationEntityId, modelName, entityId )`

A dispatch action for queuing the relation creation between the given entities.

This dispatch action has automatically generated model specific equivalents that can be used: `receiveDirtyRelationAdditionForEvent`, `receiveDirtyRelationAdditionForDatetime` etc.  When using a model specific equivalent you only need to pass along the `relationName`, `relationId`, and `entityId` arguments.

This does not return a value.

**Arguments**

| Argument    | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| `relationName`            | string         | The name of the model you are queueing the relation addition to.                                                          |
| `relationEntityId`            | number\|string         | The id for the relation entity you are queuing the relation to.                                                          |
| `modelName` | string  | The name of the model you are queuing the relation for. |
| `entityId`  | string\|number | The id of the entity you are queuing the relation for.                                                          |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).receiveDirtyRelationAddition( 'datetime', 20, 'event', 10 );
```

## `receiveDirtyRelationDeletion( relationName, relationEntityId, modelName, entityId )`

A dispatch action for queuing the relation removal between the given entities.

This dispatch action has automatically generated model specific equivalents that can be used: `receiveDirtyRelationDeletionForEvent`, `receiveDirtyRelationDeletionForDatetime` etc.  When using a model specific equivalent you only need to pass along the `relationName`, `relationId`, and `entityId` arguments.

This does not return a value.

**Arguments**

| Argument    | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| `relationName`            | string         | The name of the model you are queuing the relation removal from.                                                          |
| `relationEntityId`            | number\|string         | The id for the relation entity you are queuing the relation removal from.                                                          |
| `modelName` | string  | The name of the model you are queuing the relation removal for. |
| `entityId`  | string\|number | The id of the entity you are queuing the relation removal for.                                                          |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).receiveDirtyRelationDeletion( 'datetime', 20, 'event', 10 );
```

## `receiveUpdatedEntityIdForRelations( modelName, oldEntityId, newEntityId )`

This dispatch action replaces all occurrences of the given old entity id for the given model in the relations tree of the state with the given new entity id.  Typically this is done after persisting a new created entity id where its identifier has changed from a temporary `cuid` to the id given by the server.

This dispatch action has automatically generated model specific equivalents that can be used: `receiveUpdatedEntityIdForEvent`, `receiveUpdatedEntityIdForDatetime` etc.  When using a model specific equivalent you only need to pass along the `oldEntityId`, and `newEntityId` arguments.

This does not return a value.

**Arguments:**

| Argument      | Type    | Description                             |
| ------------- | ------- | --------------------------------------- |
| `modelName`   | string  | The name of the model the ids belong to |
| `oldEntityId` | string\|number | The id being replaced.                                    |
| `newEntityId`              | string\|number         | The new id.                                         |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).receiveUpdatedEntityIdForRelations( 'event', 'cjr289a0y00003g8rgzhkrwv5', 24 );
```

## `removeAllRelatedEntitiesforModelEntity( modelName, entityId )`

This dispatch action removes all indexed relations for the given specific entity from the state.  This includes:

- removing any recorded existing relations stored in the state.  If the relation entities have no other indexed relations with _other_ models in the state, then they are removed from the state as well.
- removal of any queued relation additions/removals for the given model entity in the state.

This **does not** queue the persistence of removing all related entities for this model entity. It **only** affects what is currently in the local state.

This dispatch action has automatically generated model specific equivalents that can be used: `removeAllRelatedEntitiesFor`, `removeAllRelatedEntitiesFor` etc.  When using a model specific equivalent you only need to pass along the `oldEntityId`, and `newEntityId` arguments.

This does not return a value.

**Arguments:**

| Argument    | Type    | Description            |
| ----------- | ------- | ---------------------- |
| `modelName` | string  | The name of the model. |
| `entityId`  | number\|string | The id of the entity                        |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).removeAllRelatedEntitiesForModelEntity( 'event', 10 );
```

## `removeRelatedEntities( modelName, entityId, relationName, relatedEntityIds )`

Dispatch action that removes any recorded relations for the given entity and relation entities in the state.  This **does not** queue persisting the removal of relations on the server, it **only** affects records locally in the state.

This dispatch action has automatically generated model specific equivalents that can be used: `removeRelatedEntitiesForEvent`, `removeRelatedEntitiesForDatetime` etc.  When using a model specific equivalent you only need to pass along the `entityId`, `relationName` and `relationEntityIds` arguments.

This does not return a value.

**Arguments:**

| Argument    | Type    | Description                                            |
| ----------- | ------- | ------------------------------------------------------ |
| `modelName` | string  | The name of the model the relations are being removed for |
| `entityId`  | string\|number | The id of the entity the relations are being removed for  |
| `relationName`             |  string       | The name of the relation model the relation entity ids belong to.                                                        |
| `relationEntityIds`            | Array       | The ids for the relation entities for which the relation is being removed.                               |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).removeRelatedEntities( 'event', 10, 'datetime', [ 10, 20, 30 ] );
```

## `removeDirtyRelationAddition( relationName, relationEntityId, modelName, entityId )`

A dispatch action for removing the relation addition queued for persisting from the state record.

This dispatch action has automatically generated model specific equivalents that can be used: `removeDirtyRelationAdditionForEvent`, `removeDirtyRelationAdditionForDatetime` etc.  When using a model specific equivalent you only need to pass along the `relationName`, `relationEntityId` and `entityId` arguments.

This does not return a value.

**Arguments**

| Argument    | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| `relationName`            | string         | The name of the model you are removing the relation queue from.                                                          |
| `relationEntityId`            | number\|string         | The id for the relation entity you are removing the relation queue from.                                                          |
| `modelName` | string  | The name of the model you are removing the relation queue for. |
| `entityId`  | string\|number | The id of the entity you are removing the relation queue  for.                                                          |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).removeDirtyRelationAddition( 'datetime', 20, 'event', 10 );
```

## `removeDirtyRelationDeletion( relationName, relationEntityId, modelName, entityId )`

A dispatch action for removing the relation addition queued for persisting from the state record.

This dispatch action has automatically generated model specific equivalents that can be used: `removeDirtyRelationDeletionForEvent`, `removeDirtyRelationDeletionForDatetime` etc.  When using a model specific equivalent you only need to pass along the `relationName`, `relationEntityId` and `entityId` arguments.

This does not return a value.

**Arguments**

| Argument    | Type    | Description                                              |
| ----------- | ------- | -------------------------------------------------------- |
| `relationName`            | string         | The name of the model you are removing the relation queue from.                                                          |
| `relationEntityId`            | number\|string         | The id for the relation entity you are removing the relation queue from.                                                          |
| `modelName` | string  | The name of the model you are removing the relation queue for. |
| `entityId`  | string\|number | The id of the entity you are removing the relation queue  for.                                                          |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).removeDirtyRelationDeletion( 'datetime', 20, 'event', 10 );
```

