# `eventespresso/schema`
`eventespresso/schema` [data module](https://github.com/WordPress/gutenberg/blob/master/packages/data) intended to simplify access to and management of model schema and model entity factories.  This is a utility store that exposes schema and constructed model entity factories using those schemas on demand when model entities are constructed by other registered stores.  This store also has utility when a react component creates new model entities client side.

## Example
Below is an example of a component which is constructing a new event entity for use in the component:

```jsx
const { withSelect } = wp.data;
const { isFactoryOfModel } = eejs.validators;
const Event = ( { event } ) => {
  return(
    <div>
      <h2>{ event.name }</h2>
      <p>{ event.desc }</p>
    </div>
  );
};
const DEFAULT_EMPTY_OBJECT = {};
const NewEventBase = ( { eventFactory, eventData } => {
  const getEvent = () => {
    return isModelEntityFactoryOfModel( eventFactory, 'event'  ) ?
      eventFactory.createNew( eventData ) :
      DEFAULT_EMPTY_OBJECT;
  }
  return <Event event={ getEvent()  } />;
  }
} );
export default withSelect( ( select ) => {
  eventFactory: select( 'eventespresso/schema' ).getFactoryForModel( 'event' );
} );
```

## Actions
The following set of dispatching action creators are available on the object returned by `wp.data.dispatch( 'eventespresso/schema' )`.
### `receiveSchemaForModel( modelName, schema = {} )`
Receives a schema for the given model and adds to state.
#### Example
```js
wp.data.dispatch( 'eventespresso/schema' ).receiveSchemaForModel( 'event', eventSchema );
```

### `receiveFactoryForModel( modelName, factory = {} )`
Receives a factory for the given model and adds it to state.
#### Example
```js
wp.data.dispatch( 'eventespresso/schema' ).receiveFactoryForModel( 'event', eventFactory );
```

## Selectors
The following selectors are available on the object returned by `wp.data.select( 'eventespresso/schema' )`
### `getSchemaForModel( modelName )`
Returns the schema object for the given model name.
#### Example
```js
const eventSchema = wp.data.select( 'eventespresso/schema' ).getSchemaForModel( 'event' );
```

### `isRequestingSchemaForModel( modelName )`
Returns whether the schema is being requested or not for the given model name.
#### Example
```js
const isLoading = wp.data.select( 'eventespresso/schema' ).isRequestingSchemaForModel( 'event' );
```

### `hasResolvedSchemaForModel( modelName )`
Returns whether the schema has been resolved for the given model name.  "Resolved" means the schema has been requested and returned via an api request to the schema endpoint for that model.
#### Example
```js
const hasFinishedRequesting = wp.data.select( 'eventespresso/schema' ).hasResolvedSchemaForModel( 'event' );
```

### `getFactoryForModel( modelName )`
Returns the model entity factory object for a given model name. **Note:** If there is not yet a factory in the state for the given model name, this selector will trigger resolution for the schema in order to create the model entity factory.  So once the factory is resolved, the schema for the given model name will also be in the state.
#### Example
```js
const eventFactory = wp.data.select( 'eventespresso/schema' ).getFactoryForModel( 'event' );
```

### `isRequestingFactoryForModel( modelName )`
Returns whether the model entity factory is being requested for the given model name.
#### Example
```js
const isLoading = wp.data.select( 'eventespresso/schema' ).isRequestingFactoryForModel( 'event' );
```

### `hasResolvedFactoryForModel( modelName )`
Returns whether the model entity factory for the given model name has been resolved.
#### Example
```js
const hasFinishedRequesting = wp.data.select( 'eventespresso/schema' ).hasResolvedFactoryForModel( 'event' );
```