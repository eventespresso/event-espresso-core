# Actions
The following set of dispatch actions are available on the object returned by `wp.data.dispatch( 'eventespresso/core' )`.

## Non Persisting Actions
These are actions that record information in the `eventespresso/core` store state.  They do not persist anything to the server.

### Create ([entities](./entities/create.md) & [relations](./relations/create.md))
The following actions are used for any creating entities or adding created entities outside of the store to the store state.

| Action                                                                                         |       Description                                                                                                                                    |
| -----------------------------------------------------------------------------------------------| -----------------------------------------------------------------------------------------------------------------------------------------------------|
| [`createEntity`](./entities/create.md#createentity-modelname-entity-)                          |       Dispatch action for creating a `BaseEntity` instance for the given model from the incoming data and adding it to state.                        |
| [`receiveEntityAndResolve`](./entities/create.md#receiveentityandresolve-entity-)              |       Dispatch action for receiving a `BaseEntity` instance, adding it to the state, and also resolving the `getEntityById` selector for that entity.|
| [`receiveEntitiesAndResolve`](./entities/create.md#receiveentitiesandresolve-modelname-entity-)|       Same as `receiveEntityAndResolves` except handles multiple entities.                                                                           |

### Delete ([entities](./entities/delete.md) & [relations](./relations/delete.md))

| Action | Description |
| ------ | ----------- |
|        |             |

## Persisting Actions
These are various actions that end up persisting the current state to the server.

### Create

| Action |Description |
| ------ |----------- |
|        |            |

### Update

| Action | Description |
| ------ | ----------- |
|        |             |

### Delete

| Action | Description |
| ------ | ----------- |
|        |             |

## Low Level Actions
These are actions that are used internally by other actions listed in this page and should be used with care because used incorrectly could lead to some unexpected results for persist actions.  Generally speaking, client code should avoid dispatching these actions directly.

| Action | Description |
| ------ | ----------- |
|        |             |