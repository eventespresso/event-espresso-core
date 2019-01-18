The following actions are for _queuing_ entities for deleting or trashing.  Dispatching one of these actions does not persist the delete/trash to the server.  Instead, the state just retains a record of the entity ids that are _queued_ for trashing or deleting. 

The difference between _delete_ and _trash_ is that when persisted, _delete_ will **permanently** delete the entity from the server, whereas _trash_ will **soft-delete** the entity (it still exists but is considered "archived").  **Note however,** if an entity is not able to be soft-deleted (according to its model) then a trash will end up _permanently_ deleting.  

When a _new entity_ (non-persisted entity) is dispatched for trashing or deleting:

- it's stored full entity is removed from the state.
- Any relations recorded in the state are removed for this entity.
- Any queued relation actions (adding or removing relation) for this entity are removed in the state.

When an _existing entity_ (an entity that has been persisted to the server) is dispatched for trashing or deleting:

- The entity is removed from the state
- Any relations for the entity in the state are removed.
- Any queued relation actions (adding or removing relations) for this entity are removed from the state.
- The entity is queued for trashing/deletion in the state.

These actions are _non-persisting_ actions.

## `deleteEntityById( modelName, entityId )`

Dispatches an action that queues the entity with matching id for delete.

This dispatch action has automatically generated model specific equivalents that can be used: `deleteEventById`, `deleteDatetimeById` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

This does not return anything.

**Arguments:**

| Argument    | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| `modelName` | string | The name of the model the entity belongs to. |
  | `entityId`  | number\|string |The id of the entity to be deleted |
  
  **Example:**
```js
wp.dispatch( 'eventespresso/core' ).deleteEventById( 10 );
```
## `trashEntityById( modelName, entityId )`

Dispatches an action that queues the entity with matching id for trashing.

This dispatch action has automatically generated model specific equivalents that can be used: `trashEventById`, `trashDatetimeById` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

This does not return anything.

**Arguments:**

| Argument    | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| `modelName` | string | The name of the model the entity belongs to. |
  | `entityId`  | number\|string |The id of the entity to be trashed |
  
  **Example:**
```js
wp.dispatch( 'eventespresso/core' ).trashEntityById( 'event', 10 );
```