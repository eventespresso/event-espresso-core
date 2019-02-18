# `eventespresso/schema`
`eventespresso/schema` [data module](https://github.com/WordPress/gutenberg/blob/master/packages/data) intended to simplify access to and management of model schema and model entity factories.
 
  This is a utility store that exposes schema and constructed model entity factories using those schemas on demand when model entities are constructed by other registered stores.  This store also has utility when a react component creates new model entities client side.

### Example:
Below is an example of a component which is constructing a new event entity for use in the component:

```jsx
const { withSelect } = wp.data;
const { isModelEntityFactoryOfModel } = eejs.validators;
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
  return {
    eventFactory: select( 'eventespresso/schema' ).getFactoryForModel( 'event' );
  }
} );
```

## Table of Contents

The following are all the actions and selectors available for this data store:

### Actions

| Action                                                                                                                                 | Description                                                                      |
| ---------------------------------------------------------------------------------------------------------------------------------------| -------------------------------------------------------------------------------- |
| [`receiveSchemaForModel`](./actions.md#receiveschemaformodel-modelname-schema---)                                                      | Dispatch action for receiving the schema for a given model into the state        |
| [`receiveFactoryForModel`](./actions.md#receivefactoryformodel-modelname-factory---)                                                   | Dispatch action for receiving the factory for a given model into the state       |
| [`receiveRelationEndpointForModelEntity`](./actions.md#receiverelationendpointformodelentity-modelname-entityid-relationname-endpoint-)| Receives the endpoint path for a given model entity and relation into the state. |

### Selectors

|Selector                                                                                                                             | Description                                                                         |
|------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
|[`getSchemaForModel`](./selectors.md#getschemaformodel-modelname-)                                                                   | Returns the schema object for the given model name from the state                   |
|[`isRequestingSchemaForModel`](./selectors.md#isrequestingschemaformodel-modelname-)                                                 | Returns whether the schema is being requested or not for the given model name       |
|[`hasResolvedSchemaForModel`](./selectors.md#hasresolvedschemaformodel-modelname-)                                                   | Returns whether the schema has been resolved or not for the given model name.       |
|[`getFactoryForModel`](./selectors.md#getfactoryformodel-modelname-)                                                                 | Returns the `BaseEntity` factory for the given model name                           |
|[`isRequestingFactoryForModel`](./selectors.md#isrequestingfactoryformodel-modelname-)                                               | Returns whether the factory is being requested or not for the given model name      |
|[`hasResolvedFactoryForModel`](./selectors.md#hasresolvedfactoryformodel-modelname-)                                                 | Returns whether the factory has been resolved or not for the given model name.      |
|[`getRelationEndpointForEntityId`](./selectors.md#getrelationendpointforentityid-modelname-entityid-relationname-)                   | Returns the relation endpoint for the given model entity and relation.              |
|[`isRequestingRelationEndpointForEntityId`](./selectors.md#isrequestingrelationendpointforentityid-modelname-entityid-relationname-) | Returns whether the relation endpoint is being requested or not for the given data. |