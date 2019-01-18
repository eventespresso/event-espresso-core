These are actions that are used internally by other actions listed in this page and should be used with care because used incorrectly could lead to some unexpected results for persist actions.  Generally speaking, client code should avoid dispatching these actions directly.

These are non-persisting actions.

## `receiveEntityRecords( modelName, entities = [] )`

Dispatches an action for receiving entities into the state.  Note that entities received using this action will _not_ replace any existing entities in the state with the same id.  They will just be silently discarded.

This does not return a value.

**Arguments:**

| Argument    | Type   | Description                                               |
| ----------- | ------ | ----------------------------------------------------------|
| `modelName` | string | The name of the model the entities belong to (eg. `event`)|
| `entities`  | Array  | An array of `BaseEntity` instances.                       |

**Example:**
```js
wp.data.dispatch( 'eventespresso/core' ).receiveEntityRecords( 'event', [ EventA, EventB] );
```
## `receiveAndReplaceEntityRecords( modelName, entities = [] )`
Dispatches an action for receiving entities into the state.  Note that this differs from `receiveEntityRecords` in that all entities dispatched using this action will **overwrite** any entities in the state sharing the same id.  Typically then, this action is used when  "refreshing" entities in the state after persisting dirty entities or for any "reload" behaviour.

This dispatch action has automatically generated model specific equivalents that can be used: `receiveAndReplaceEventRecords`, `receiveAndReplaceDatetimeRecords` etc.  When using a model specific equivalent you only need to pass along the `entities` argument.

This does not return a value.

**Arguments:**

| Argument   | Type   | Description                                                                                                    |
| -----------| ------ | ---------------------------------------------------------------------------------------------------------------|
| `modelName`| string | The name of the model the entities belong to (eg. `event` )                                                    |
| `entities` | Array |An array of `BaseEntity` instances.||

**Example:**
```js
wp.data.dispatch( 'eventespresso/core').receiveAndReplaceEntityRecords( 'event', [ EventA, EventB ] );
```

## `receiveEntity( entity )`
Dispatches an action receiving an instance of `BaseEntity` into the state.  Note, if the entity already exists in the state, it will not be overridden.

This does not return a value.

**Arguments:**

| Argument | Type | Description |
| -------- | ---- | ----------- |
| `entity`         | `BaseEntity`      | An instance of `BaseEntity`|

**Example:**
```js
wp.data.dispatch( 'eventespresso/core' ).receiveEntity( Event );
```

## `receiveTrashEntityId( modelName, entityId )`
Dispatch action for queueing an entity id for a given model for trashing in the state.

This dispatch action has automatically generated model specific equivalents that can be used: `receiveTrashEventId`, `receiveTrashDatetimeId` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

This does not return a value.

**Arguments:**

| Argument    | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `modelName` | string | The model the given entity id belongs to |
| `entityId`  | number\|string | The id for the entity being queued for trash.

**Example:**
```js
wp.data.dispatch( 'eventespresso/core' ).receiveTrashEntityId( 'event', 10 );
```

## `receiveDeleteEntityId( modelName, entityId )`
Dispatch action for queueing an entity id for a given model for deleting in the state.

This dispatch action has automatically generated model specific equivalents that can be used: `receiveDeleteEventId`, `receiveDeleteDatetimeId` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

This does not return a value.

**Arguments:**

| Argument    | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `modelName` | string | The model the given entity id belongs to |
| `entityId`  | number\|string | The id for the entity being queued for trash.

**Example:**
```js
wp.data.dispatch( 'eventespresso/core' ).receiveDeleteEntityId( 'event', 10 );
```

## `removeEntityById( modelName, entityId )`
Dispatch an action for removing an entity with the given entityId for the given model from the state.  **Note:** any relations, queued deletes/trashes, or queued relation adds/deletes will remain in the state when removing the entity using this action.

This dispatch action has automatically generated model specific equivalents that can be used: `removeEventById`, `removeDatetimeById` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

This does not return a value.

**Arguments:**

| Argument    | Type   |Description                             |
| ----------- | ------ |----------------------------------------|
| `modelName` | string |The model the given entity id belongs to|
| `entityId`  | number\|string | The id for the entity being removed.                                 |

**Example:**
```js
wp.data.dispatch( 'eventespresso/core' ).removeEntityById( 'event', 10 );
```

## `removeDeleteEntityId( modelName, entityId )`
Dispatch an action for removing the queue for deleting the given entity from the state (i.e. cancel a delete).

This dispatch action has automatically generated model specific equivalents that can be used: `removeDeleteEventId`, `removeDeleteDatetimeId` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

This does not return a value.

**Arguments:**

| Argument    | Type    | Description                               |
| ----------- | ------- | ----------------------------------------- |
| `modelName` | string  | The model the given entity id belongs to. |
| `entityId`  | number\|string | The id for the entity being removed.                                           |

**Example:**
```js
wp.data.dispatch( 'eventespresso/core' ).removeDeleteEntityId( 'event', 10 );
```

## `removeTrashEntityId( modelName, entityId )`
Dispatch an action for removing the queue for trashing the given entity from the state (i.e. cancel a trash).

This dispatch action has automatically generated model specific equivalents that can be used: `removeTrashEventId`, `removeTrashDatetimeId` etc.  When using a model specific equivalent you only need to pass along the `entityId` argument.

This does not return a value.

**Arguments:**

| Argument    | Type    | Description                               |
| ----------- | ------- | ----------------------------------------- |
| `modelName` | string  | The model the given entity id belongs to. |
| `entityId`  | number\|string | The id for the entity being removed.                                           |

**Example:**
```js
wp.data.dispatch( 'eventespresso/core' ).removeTrashEntityId( 'event', 10 );
```