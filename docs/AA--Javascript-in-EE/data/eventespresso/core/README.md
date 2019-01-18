# `eventespresso/core`
`eventespresso/core` is a [data module](https://github.com/WordPress/gutenberg/blob/master/packages/data) intended to simplify access to and management of core Event Espresso entities.  Although other data modules (such as [`eventespresso/lists`](./lists.md)) also interact with Event Espresso entities, the `eventespresso/core` module is considered the **authority** for entity state.  

This module is used for persisting any changes to entities.

## Example
Below is an example of a component which simply renders details about an event.

```jsx
const { withSelect } = wp.data

const MyEventBase = ( { event } ) => {
  return (
    <div>
      <h2>event.name</h2>
      <p>event.desc</p>
    </div>
  )
};

const MyEvent = withSelect( ( select, ownProps )  => {
  event: select( 'eventespresso/core' ).getEventById( ownProps.eventId  );
} )( MyEventBase );
```
## Actions
The following set of dispatching action creators are available on the object returned by `wp.data.dispatch( 'eventespresso/core' )`

### `receiveEntityRecords( modelName, entities = {} )`

Action creator for receiving entity records.  Note that entity records received using this action creator will _not_ replace any existing entities in the state with the same id.  They will just be silently discarded.

#### Arguments
| Argument    | Type   | Description                                                                                                     |
| ----------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| `modelName` | string | The name of the model the entities belong to (eg. `event`)                                                      |
| `entities`  | object | An object for the entities being added where each entity instance is indexed by the entity's primary key value. |

#### Example:
```jsx
dispatch( 'eventespresso/core' ).receiveEntityRecords( 'event', eventEntities );
```
### `receiveAndReplaceEntityRecords( modelName, entities = {} )`
Action creator for receiving entity records.  Note that this differs from `receiveEntityRecords` in that all entities dispatched using this action will **overwrite** any entities in the state sharing the same id.  Typically then, this action is used when clearing "refreshing entities in the state" after persisting dirty entities or for any "reload" behaviour.

#### Arguments
| Argument   | Type   | Description                                                                                                    |
| -----------| ------ | ---------------------------------------------------------------------------------------------------------------|
| `modelName`| string | The name of the model the entities belong to (eg. `event` )                                                    |
| `entities` | object | An object for the entities being added where each entity instance is indexed by the entity's primary key value.||

#### Example:
```jsx
dispatch( 'eventespresso/core').receiveAndReplaceEntityRecords( 'event', eventEntities );
```
## Selectors
The following selectors are available on the object returned by `wp.data.select( 'eventespresso/core' )`.

### `getEntityRecordsForModel( modelName )`
Returns all entity records currently in the state for the given model name.  An "entity record" is the complete object indexed by primary key value:

#### Example
```jsx
// {
//  10: { EVT_ID: 10, EVT_desc: "A description for my event" ... },
//  20: { EVT_ID: 20, EVT_desc: "Another description" ... },
//  ...
// }
const events = wp.data.select( 'eventespresso/core' ).getEntityRecordsForModel( 'event' );
```

### `getEntitiesForModel( modelName )`
Returns all the entities for the given model name currently in the state.  This differs from `getEntityRecordsForModel` in that the entities are _not_ indeed by primary key value and are returned objects in an array.

#### Example
```jsx
// [
//     { EVT_ID: 10, EVT_desc: "A description", ... },
//     { EVT_ID: 20, EVT_desc: "Another description", ... },
//     ...
// ]
const events = wp.data.select( 'eventespresso/core' ).getEntitiesForModel( 'event' );
```
### `getEntityById( modelName, entityId )`
Returns the model entity for the given model name and entity id.  The id is expected to be the value for the primary key on the entity.  If the entity is not in the state, `null` is returned.

#### Example
```js
// { EVT_ID: 10, EVT_desc: 'Some description', ... }
const event = wp.data.select( 'eventespresso/core' ).getEntityById( 'event', 10 );
```

### `getEntitiesByIds( modelName, entityIds )`
Retrieves an array of model entities for the provided array of ids and the given model name.  If the given model name does not exist in the state, `null` is returned.  Otherwise, an array of any entities in the state matching the given ids are returned.
#### Example
```js
/// [
//     { EVT_ID: 10, EVT_desc: "A description", ... },
//     { EVT_ID: 20, EVT_desc: "Another description", ... },
//     ...
// ]
const events = wp.data.select( 'eventespresso/core' )
      .getEntityByIds( 'event', [ 10, 20, 30 ] );
```

### `get{modelName}ById` and `get{modelName}ByIds`
All the Event Espresso models also have specific selectors for getting their entities with a given id (or ids).  The behaviour is the same as `getEntityById` or `getEntityByIds` selectors except that you don't need to pass the model name.  The selector name uses the _plural_ and _camelCase_ form of the model name (i.e. `Events`, `MessageTemplates`, etc. )

#### Example
```js
/// [
//     { EVT_ID: 10, EVT_desc: "A description", ... },
//     { EVT_ID: 20, EVT_desc: "Another description", ... },
//     ...
// ]
const events = wp.data.select( 'eventespresso/core' )
      .getEventsById( [ 10, 20, 30 ] );
```