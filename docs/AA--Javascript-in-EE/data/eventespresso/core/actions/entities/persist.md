These are various actions that end up persisting the current entities in the state to the server.

## `persistEntityRecord( modelName, entity )`

This persists the given entity to the server if it is new or has changes.  When this action is dispatched, the following things occur:

- provided entity is checked to see if it needs persisting, if not, then `null` is returned.
- performs the appropriate request to the server for persisting the entity.
- on successful response, generates an instance of `BaseEntity` from the response and adds it to the state, then returns that instance.
- If there are any relations recorded in the state for that entity then they are updated if there are any id changes.  Notably, this happens when persisting a new entity which has a `cuid` and on return is provided the `id` for the entity as it exists on the server.

This dispatch action has automatically generated model specific equivalents that can be used: `persistEventRecord`, `persistDatetimeRecord` etc.  When using a model specific equivalent you only need to pass along the `entity` argument.

This action will return a promise that resolves to either `null` (whenever the entity fails to persist) or an instance of `BaseEntity` which will represent the persisted entity

**Arguments:**

| Argument    | Type       | Description                                 |
| ----------- | ---------- | ------------------------------------------- |
| `modelName` | string     | The name of the model the entity belongs to |
| `entity`    | BaseEntity | An instance of `BaseEntity`                 |

**Example:**
```js
const NewEvent = await wp.data.dispatch( 'eventespresso/core' ).createEvent( { EVT_name: 'test event' } );
const UpdatedEvent = await wp.data.dispatch( 'eventespresso/core' ).persistEventRecord( NewEvent );
```
## `persistForEntityId( modelName, entityId )`

This will persist an entity in the state matching the given entity id if it is new or has changes.  When this action is dispatched, the following things occur:

- if there is no entity in the state matching the given id, or, if it is not new or changed, then `null` is returned.
- performs the appropriate request to the server for persisting the entity.
- on successful response, generates an instance of `BaseEntity` from the response and replaces the existing entity in the state, then returns that instance.
- If there are any relations recorded in the state for that entity, then they are updated if there are any id changes.  Notably, this happens when persisting a new entity which has a `cuid` and on return is provided the `id` for the entity as it exists on the server.

This dispatch action has automatically generated model specific equivalents that can be used: `persistForEventId`, `persistForDatetimeId` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

This will return a promise that resolves to either an instance of `BaseEntity` if the entity was successfully persisted or `null`.

**Arguments:**

| Argument    | Type    | Description                                     |
| ----------- | ------- | ----------------------------------------------- |
| `modelName` | string  | The name of the model the entity id belongs to. |
| `entityId`  | number\|string  | The id of the entity to persist.                                                 |

**Example:**
```js
const updatedEntity = await wp.data.dispatch( 'eventespresso/core' ).persistForEntityId( 'event', 10 );
```
## `persistForEntityIds( modelName, entityIds = [] )`
This will persist any entities currently in the state that match the given entity ids when they are new or changed. When this action is dispatched the following things occur:

- If there are no entities in the state matching the given id, or, if none of them are new or changed, then an empty array is returned.  Otherwise an array of `BaseEntity` instances are returned for entities that successfully persisted.
- performs the appropriate requests to the server for persisting each entity.
- on successful response, generates an instance of `BaseEntity` from the response and replaces the existing entity in the state, then returns that entity along with other successfully persisted entities in an array.
- If there are any relations recorded in the state for any of the entities, then they are updated if there are any id changes. Notably, this happens when persisting a new entity which has a `cuid` and on return is provided the `id` for the entity as it exist on the server.

This dispatch action has automatically generated model specific equivalents that can be used: `persistForEventIds`, `persistForDatetimeIds` etc. When using a model specific equivalent you only need to pass along the `entityIds` argument.

This will return a promise that resolves to either an an array of `BaseEntity` instances that were persisted or an empty array.

**Arguments:**

| Argument    | Type   | Description                                    |
| ----------- | ------ | ---------------------------------------------- |
| `modelName` | string | The name of the model the entity ids belong to |
| `entityIds` | Array  | An array of entity ids to persist.             |

**Example:**

```js
const PersistedEvents = await wp.data.dispatch( 'eventespresso/core' )
  .persistForEntityIds ( 'event', [ 10, 20 30 ] );
```

## `persistDeletesForModel( modelName )`

This will persist any entity deletes that are currently queued in the state.

This dispatch action has automatically generated model specific equivalents that can be used: `persistDeletesForEvents`, `persistDeletesForDatetimes` etc. When using a model specific equivalent you don't need to pass along any arguments.

This will return a promise that resolves to an empty array or an array of ids for the entities that were deleted.

**Arguments:**

| Argument    | Type   | Description                                             |
| ----------- | ------ | ------------------------------------------------------- |
| `modelName` | string | The name of the model for the queued deletes to persist |

**Example:**

```js
const DeletedEventIds = await wp.data.dispatch( 'eventespresso/core' ).persistDeletesForModel( 'event' );
```

## `persistTrashesForModel( modelName )`

This will persist any entity trashes that are currently queued in the state.

This dispatch action has automatically generated model specific equivalents that can be used: `persistTrashesForEvents`, `persistTrashesForDatetimes` etc. When using a model specific equivalent you don't need to pass along any arguments.

This will return a promise that resolves to an empty array or an array of ids for the entities that were trashed.

**Arguments:**

| Argument    | Type   | Description                                             |
| ----------- | ------ | ------------------------------------------------------- |
| `modelName` | string | The name of the model for the queued deletes to persist |

**Example:**

```js
const TrashedEventIds = await wp.data.dispatch( 'eventespresso/core' ).persistTrashesForModel( 'event' );
```

## `persistAllDeletes()`
This triggers persisting all deletes and trashes queued in the state (across all models).

This will return a promise that resolves to an object indexed by `delete` and `trash` where each value is an array of entity ids persisted in each model.  Example response:

```js
response = {
  delete: {
    event: [ 10, 20 ]
  },
  trash: {
    ticket: [ 30 ],
    datetime: [ 10 ],
  }
}
```

**Arguments:**

There are no arguments for this dispatch action.

**Example:**

```js
const deletesAndTrash = wp.data.dispatch( 'eventespresso/core' ).persistAllDeletes();
```