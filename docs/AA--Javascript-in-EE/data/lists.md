# `eventespresso/lists`
`eventespresso/lists` [data module](https://github.com/WordPress/gutenberg/blob/master/packages/data) intended to simplify access to and management of collections of items (which could be entities or general objects).  These collections are cached by the query string used to retrieve them during a rest request.

## Example
Below is an example of a component which grabs a list of event entities and displays them.

```js
const { withSelect } = wp.data;
const { mapReducer } = eejs.helpers;
const EventsListBase = ( { events } ) => {
  const getEvents() {
    const reducerCallback = ( componentList, event ) => {
      componentList.push( <li>{ event.name }</li> );
      return componentList;
    };
    const listItems = mapReducer( events, reducerCallback, [] );
  }
  return (
    <ul>{ getEvents() }</ul>
  )
}
const EventList = withSelect( ( select ) => {
  events: seelct( 'eventespresso/lists' ).getEvents();
} )
```
## Actions
The following set of dispatching action creators are available on the object returned by `wp.data.dispatch( 'eventespresso/lists' )`.
### `receiveResponse( identifier, queryString, items = [] )`
Action creator for receiving an arbitrary array of objects for the given identifier and query string.

#### Example
```js
wp.data.dispatch( 'eventespresso/lists' ).receiveResponse( 'shoes', 'shoes/?size=xl', shoesFromResponse );
```

### `receiveEntityResponse`
Action creator for receiving a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of model entity instances for the given model and query string.  This action creator is thus more specific than the `receiveResponse` creator.  Note, the query string does not need to have the model portion of the endpoint in it.  That will automatically be handled by the store resolvers.

#### Example
```js
wp.data.dispatch( 'eventespresso/lists' ).receiveEntityResponse( 'event', '?where[TermRelationship.Term_Taxonomy.Term.slug]=minus-the-bear', eventsFromResponse );
```

## Selectors
The following selectors are available on the object returns by `wp.data.select('eventespresso/lists')`.
### `getItems( identifier, queryString )`
Selector for retrieving an arbitrary array of items that have been added to the store for a given identifier and query string.
#### Example:
```js
const shoes = wp.data.select( 'eventespresso/lists' ).getItems( 'shoes', 'shoes/?size=xl' );
```
### `getEntities( modelName, queryString`
Selector for retrieving a [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) of model entity instances for a given model name and query string.
#### Example:
```js
const events = wp.data.select( 'eventespresso/lists' ).getEntities( 'event', '?where[TermRelationship.Term_Taxonomy.Term.slug]=minus-the-bear' );
```
### `isRequestingItems( identifier, queryString )`
Returns whether the items (true/false) for the given identifier and query string are being requested.  This is applicable when the initial selection has been made and it's result is being resolved via an api request.
#### Example:
```js
const itemsAreLoading = wp.data.select( 'eventespresso/lists' ).isRequestingItems( 'shoes', 'shoes/?size=xl' );
```
### `isRequestingEntities( modelName, queryString )`
Returns whether the model entities for the given model and query string are being requested.  This is applicable when this is the initial selection has been made and it's result is being resolved via an api request.
#### Example:
```js
const eventsAreLoading = wp.data.select( 'eventespresso/lists' ).isRequestingEntities( '?where[TermRelationship.Term_Taxonomy.Term.slug]=minus-the-bear' );
```