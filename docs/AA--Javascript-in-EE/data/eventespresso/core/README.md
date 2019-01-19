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
All the dispatch actions and selectors for this data store are split into their own documentation.

## Actions
| type                           | description                                                 |
| -------------------------------| ------------------------------------------------------------|
| [entities](./entity-actions)   | All dispatch actions for single or multiple entities.       |
| [relations](./relation-actions)| All dispatch actions for working with relations to entities.|

## Selectors
| type                                | description                                     |
| ------------------------------------| ----------------------------------------------- |
| [entities](./entity-selectors.md)   | Selectors for retrieving entities.              |
| [relations](./relation-selectors.md)| Selectors for retrieving relations to entities. |