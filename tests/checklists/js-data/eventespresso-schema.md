## Selectors

A `*` next to the selector means that this has a corresponding resolver

* [ ] getSchemaForModel( modelName ) * - provides the schema returned from the options endpoint for the given model
* [ ] isRequestingSchemaForModel( modelName ) - whether the schema is being requested or not.
* [ ] hasResolvedSchemaForModel( modelName ) - returns whether the schema has been resolved or not for the given modelName.
* [ ] getFactoryForModel( modelName ) * - returns the entity factory for the given modelName.  **Note** this will also resolve the schema for the model if that doesn't already exist in the state.
* [ ] isRequestingFactoryForModel( modelName ) - whether the factory is being requested for the given model name.
* [ ] hasResolvedFactoryForModel( modelName ) - whether the factory has been resolved for the given model name.
* [ ] getRelationEndpointForEntityId( modelName, entityId, relationModelName ) * - this returns the relation endpoint for the the given model, id and relation.  Will first attempt to get the info from the existing entity in the `eventespresso/core` state if it exists there otherwise will retrieve the entity (just the raw response) from the server to get it.
* [ ] isRequestingRelationEndpointForEntityId( modelName, entityId, relationModelName ) - returns whether the relation endpoint is being requested or not.

## Dispatch actions

* [ ] receiveSchemaForModel( modelName, schema ) - adds the schema for the given model to the state
* [ ] receiveFactoryForModel( modelName, factory ) - adds the factory for the given model to the state
* [ ] receiveRelationEndpointForModelEntity - adds the relation endpoint for the given model to the state.