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