The following actions are used for any creating entities or adding created entities outside of the store to the store state.

These actions are *non-persisting* actions.

## `createEntity( modelName, entity )`
Dispatch action for creating a `BaseEntity` instance for the given model from the incoming data and adding it to state.

This dispatch action has automatically generated model specific equivalents that can be used: `createEvent`, `createDatetime` etc.  When using a model specific equivalent you only need to pass along the `entity` argument.

This returns a promise that resolves to the constructed `BaseEntity` instance once complete.

**Arguments**

| Argument | Type | Description |
| -------- | ---- | ----------- |
| `modelName`         | string      | The name of the model the incoming data is for.             |
| `entity` | Object | A plain object of field names and values for the entity to create |

**Example:**
An example of creating an event entity.  Whatever fields you do not provide (that are not required by the model schema), can be 
```
const event = await wp.data.dispatch( 'eventespresso/core' )
  .createEntity( 'event', { EVT_name: 'My test event' } );
```

## `receiveEntityAndResolve( entity )`
Dispatch action for receiving a `BaseEntity` instance, adding it to the state, and also resolving the `getEntityById` selector for that entity.  The resolution ensures that future `getEntityById` requests for that entity don't result in unnecessary get requests to the server.  This is important especially for new created entities because they won't exist on the server until persisted.

This does not return a value.

**Arguments:**

| Argument | Type   | Description                        |
| -------- | ------ | -----------------------------------|
| `entity` | string | Expects an instance of `BaseEntity`|

**Example:**
```js
wp.data.dispatch( 'eventespresso/core' ).receiveEntityAndResolve( Event );
```
## `receiveEntitiesAndResolve( modelName, entities )`
Dispatch action for receiving an array of `BaseEntity` instances, adding them to the state, and also resolving the `getEntityById` selector for each entity.  The resolution ensures that future `getEntityById` requests for those entities don't result in unnecessary get requests to the server.  This is important especially for new created entities, because they won't exist on the server until persisted.

This dispatch action has automatically generated model specific equivalents that can be used: `receiveEventsAndResolve`, `receiveDatetimesAndResolve` etc.  When using a model specific equivalent you only need to pass along the `entities` argument.

This does not return a value.

**Arguments:**

| Argument    | Type   | Description                                               |
| ----------- | ------ | --------------------------------------------------------- |
| `modelName` | string | The name of the model the entities in the array belong to |
| `entities`  | Array  | An array of `BaseEntity` instances                        |
**Example:**
```js
wp.dispatch( 'eventespresso/core' ).receiveEventsAndResolve( [ EventA, EventB ] );
```