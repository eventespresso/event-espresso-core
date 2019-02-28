The following actions are for queuing the removal of relations between given model entities.

These are *non-persisting* actions.

## `removeDirtyRelationForAddition( modelName, entityId, relationName, relationEntityId)`

Dispatches an action that removes the queued relation addition in the state (effectively cancelling adding that relation).

This dispatch action has automatically generated model specific equivalents that can be used: `removeDirtyEventRelationForAddition`, `removeDirtyDatetimeRelationForAddition` etc.  When using a model specific equivalent you only need to pass along the `entityId`, `relationName` and `relationEntityId` arguments.

This returns no value.

**Arguments:**

| Argument    | Type    | Description                                            |
| ----------- | ------- | ------------------------------------------------------ |
| `modelName` | string  | The name of the model the relation was being added for |
| `entityId`  | string\|number | The id of the entity the relation was being added for  |
| `relationName`             |  string       | The name of the model the relation was being added to.                                                        |
| `relationEntityId`            |  string\|number       | The id of the entity the relation was being added to.                                                        |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).removeDirtyRelationForAddition( 'event', 10, 'datetime', 20 );
```

## `removeRelationForEntity( modelName, entityId, relationName, relationEntityId )`

Dispatch action for queueing the removal of a relation between entities.  The entities do  not already need to exist in the state, this can simply queue deleting relations.

This dispatch action has automatically generated model specific equivalents that can be used: `removeRelationForEvent`, `removeRelationForDatetime` etc.  When using a model specific equivalent you only need to pass along the `entityId`, `relationName` and `relationEntityId` arguments.

This returns no value.

**Arguments:**

| Argument    | Type    | Description                                            |
| ----------- | ------- | ------------------------------------------------------ |
| `modelName` | string  | The name of the model the relation is being removed for |
| `entityId`  | string\|number | The id of the entity the relation is being removed for  |
| `relationName`             |  string       | The name of the model the relation is being removed from.                                                        |
| `relationEntityId`            |  string\|number       | The id of the entity the relation is being removed from.                                                        |

**Example:**

```js
wp.data.dispatch( 'eventespresso/core' ).removeRelationForEntity( 'event', 10, 'datetime', 20 );
```