# Actions
The following set of dispatch actions are available on the object returned by `wp.data.dispatch( 'eventespresso/core' )`.

## Non Persisting Actions
These are actions that record information in the `eventespresso/core` store state.  They do not persist anything to the server.

### Create ([entities](./entities/create.md) & [relations](./relations/create.md))
The following actions are used for any creating entities or adding created entities outside of the store to the store state.

| Action                                                                                           |       Description                                                                                                                                    |
| -------------------------------------------------------------------------------------------------| -----------------------------------------------------------------------------------------------------------------------------------------------------|
| [`createEntity`](./entities/create.md#createentity-modelname-entity-)                            |       Dispatch action for creating a `BaseEntity` instance for the given model from the incoming data and adding it to state.                        |
| [`receiveEntityAndResolve`](./entities/create.md#receiveentityandresolve-entity-)                |       Dispatch action for receiving a `BaseEntity` instance, adding it to the state, and also resolving the `getEntityById` selector for that entity.|
| [`receiveEntitiesAndResolve`](./entities/create.md#receiveentitiesandresolve-modelname-entities-)|       Same as `receiveEntityAndResolves` except handles multiple entities.                                                                           |

### Delete ([entities](./entities/delete.md) & [relations](./relations/delete.md))

| Action                                                                         | Description                                                               |
| -------------------------------------------------------------------------------| ------------------------------------------------------------------------- |
| [`deleteEntityById`](./entities/delete.md#deleteentitybyid-modelname-entityid-)| Dispatches an action that queues the entity with matching id for delete   |
| [`trashEntityById`](./entities/delete.md#trashentitybyid-modelname-entityid-)  | Dispatches an action that queues the entity with matching id for trashing |

## Persisting Actions
These are various actions that end up persisting the current state to the server.

### Create/Update

| Action                                                                                   |Description                                                                                                                     |
| -----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------- |
| [`persistEntityRecord`](./entities/persist.md#persistentityrecord-modelname-entity-)     |Dispatch action that persists the given entity to the server if it is new or has changes.                                       |
| [`persistForEntityId`](./entities/persist.md#persistforentityid-modelname-entityid-)     |Dispatch action that persists an entity in the state matching the given id if it is new or has changes.                         |
| [`persistForEntityIds`](./entities/persist.md#persistforentityids-modelname-entityids---)|Dispatch action that persists any entities currently in the state that match the given entity ids when they are new or changed. |

### Delete

| Action                                                                             | Description                                                                        |
| -----------------------------------------------------------------------------------| -----------------------------------------------------------------------------------|
| [`persistDeletesForModel`](./entities/persist.md#persistdeletesformodel-modelname-)| Will persist any entity deletes currently queued in the state.                     |
| [`persistTrashesForModel`](./entities/persist.md#persisttrashesformodel-modelname-)| Will persist any entity trashes currently queued in the state.                     |
| [`persistAllDeletes`](./entities/persist.md#persistalldeletes--)                   | Triggers persisting all deletes and trashes queued in the state (across all models)|

## Low Level Actions
These are actions that are used internally by other actions listed in this page and should be used with care because used incorrectly could lead to some unexpected results for persist actions.  Generally speaking, client code should avoid dispatching these actions directly.

| Action                                                                                                          | Description                                                                                                |
| ----------------------------------------------------------------------------------------------------------------| ---------------------------------------------------------------------------------------------------------- |
| [`receiveEntityRecords`](./entities/low-level.md#receiveentityrecords-modelname-entities---)                    | Dispatches an action for receiving entities into state. Existing entities in state will not be replaced.   |
| [`receiveAndReplaceEntityRecords`](./entities/low-level.md#receiveandreplaceentityrecords-modelname-entities---)| Dispatches an action for receiving entities into state. Existing entities in state **will** be replaced.   |
| [`receiveEntity`](./entities/low-level.md#receiveentity-entity-)                                                | Dispatches an action receiving an instance of `BaseEntity` into the state.                                 |
| [`receiveTrashEntityId`](./entities/low-level.md#receivetrashentityid-modelname-entityid-)                      | Dispatch action for queuing an entity id for a given model to be trashed.                                  |
| [`receiveDeleteEntityId`](./entities/low-level.md#receivedeleteentityid-modelname-entityid-)                    | Dispatch action for queuing an entity id for a given model to be deleted.                                  |
| [`removeEntityById`](./entities/low-level.md#removeentitybyid-modelname-entityid-)                              | Dispatch action for removing an entity with the given entity id for the given model from the state.        |
| [`removeDeleteEntityId`](./entities/low-level.md#removedeleteentityid-modelname-entityid-)                      | Dispatch action for removing the queue for deleting the given entity from the state (i.e. cancel a delete) |
| [`removeTrashEntityId`](./entities/low-level.md#removetrashentityid-modelname-entityid-)                        | Dispatch action for removing the queue for trashing the given entity from the state (i.e. cancel a trash)  |