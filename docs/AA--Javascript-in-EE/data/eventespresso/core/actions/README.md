# Actions
The following set of dispatch actions are available on the object returned by `wp.data.dispatch( 'eventespresso/core' )`.

## Non Persisting Actions
These are actions that record information in the `eventespresso/core` store state.  They do not persist anything to the server.

### Create ([entities](./entities/create.md) & [relations](./relations/create.md))
The following actions are used for any creating entities or adding created entities outside of the store to the store state.

| Action | Description |
| ------ | ----------- |
|        |             |

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