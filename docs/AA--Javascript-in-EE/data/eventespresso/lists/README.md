# `eventespresso/lists`
`eventespresso/lists` [data module](https://github.com/WordPress/gutenberg/blob/master/packages/data) is intended to simplify access to and management of collections of items (which could be entities or general objects).  These collections are cached by the query string used to retrieve them during a rest request.

An advantage of using `eventespresso/lists` for retrieving collections of items is that they are cached in the state by the query used to retrieve them.

  **Note:** The authority for any entities (`BaseEntity` instances) retrieved for this data/module is the [`eventespresso/core`](../core/README.md) store.  This means that whenever you retrieve entities using `eventespresso/lists` selectors, if they already exist in `eventespresso/core` those will be returned instead and any that don't exist will be added to the `eventespresso/core` store.

## Example
Below is an example of a component which grabs a list of event entities and displays them.

```jsx
const { withSelect } = wp.data;
const EventsListBase = ( { events } ) => {
  const getEvents() {
    const listItems = events.map( ( event, index ) => <li key={ index }>{ event.name }</li>  );
  }
  return (
    <ul>{ getEvents() }</ul>
  )
}
const EventList = withSelect( ( select ) => {
  return {
    events: select( 'eventespresso/lists' ).getEvents();
  }
} )
```

## Table of Contents

This is a list of all the dispatch actions and selectors exposed on the `eventespresso/lists` store object.  

### Actions

| Action                                                                                         | Description                                                                                                                                            |
| -----------------------------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`receiveResponse`](./actions.md#receiveresponse-identifier-querystring-items---)              | Dispatches action to update the store with the provided items retrieved from a request using the given query string.                                   |
| [`receiveEntityResponse`](./actions.md#receiveentityresponse-modelname-querystring-entities---)| Dispatches action used in updating the store with the provided entity items retrieved from a request using the given query string for the given model. |

### Selectors

| Selector                                                                            | Description                                                                      |
| ------------------------------------------------------------------------------------| ---------------------------------------------------------------------------------|
| [`getItems`](./selectors.md#getItems-identifier-querystring-)                       | Returns an array of items in the state for the given identifier and query string.|
| [`getEntities`](./selectors.md#getentities-modelname-querystring-)                  | Returns an array of model entities for the given model name and query string     |
| [`getEntitiesByIds`](./selectors.md#getentitiesbyids-modelname-ids---)              | Returns an array of model entities for the given model name and ids.             |
| [`isRequestingItems`](./selectors.md#isrequestingitems-identifier-querystring-)     | Returns whether the `getItems` selector is being resolved.                       |
| [`isRequestingEntities`](./selectors.md#isrequestingentities-modelname-querystring-)| Returns whether the `getEntities` selector is being resolved.                    |
