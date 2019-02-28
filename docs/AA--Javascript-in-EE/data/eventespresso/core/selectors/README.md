The following are a list of selectors that are available on the `eventespresso/core` store.

## Entities

| Selector                                                                             | Description                                                                                                                                                                                             |
| -------------------------------------------------------------------------------------| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`getEntityRecordsForModel`](./entities.md#getentityrecordsformodel-modelname-)      | Returns all entity records currently in teh state for the given model name.  An "entity record" is the complete object indexed by primary key value.                                                    |
| [`getEntitiesForModel`](./entities.md#getentitiesformodel-modelname-)                | Returns all the entities for the given model name currently in the state.                                                                                                                               |
| [`getEntityById`](./entities.md#getentitybyid-modelname-entityid-)                   | Returns the model entity for the given model name and entity id. This will attempt to retrieve the entity from the server via a resolver if it doesn't exist in the state and has not been resolved yet.|
| [`getEntitiesByIds`](./entities.md#getentitiesbyids-modelname-entityids-)            | Retrieves an array of model entities for the provided array of ids and the given model name.                                                                                                            |
| [`getEntityIdsQueuedForTrash`](./entities.md#getentityidsqueuedfortrash-modelname-)  | This retrieves the ids of the entities in the state that are currently queued for trashing.                                                                                                             |
| [`getEntityIdsQueuedForDelete`](./entities.md#getentityidsqueuedfordelete-modelname-)| This retrieves the ids of the entities in the state that are currently queued for deleting.                                                                                                             |
| [`getModelsQueuedForTrash`](./entities.md#getmodelsqueuedfortrash)                   | This retrieves a list of models in the state that currently have ids queued for trashing.                                                                                                               |
| [`getModelsQueuedForDelete`](./entities.md#getmodelsqueuedfordelete)                 | This retrieves a list of models in the state that currently have ids queued for deleting.                                                                                                               |

## Relations

| Selector                                                                                                       | Description                                                                                                                                |
| ---------------------------------------------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`getRelationIdsForEntityRelation`](./relations.md#getrelationidsforentityrelation-entity-relationname-)       | Retrieves the relation ids from the state for the given entity and relation name                                                           |
| [`getRelatedEntities`](./relations.md#getrelatedentities-entity-relationname-)                                 | Retrieves the entities related to the given entity for the given relation name                                                             |
| [`getRelationAdditionsQueuedForModel`](./relations.md#getrelationadditionsqueuedformodel-modelname-)           | Retrieves all the queued relation additions in the state for the given model.                                                              |
| [`getRelationDeletionsQueuedForModel`](./relations.md#getrelationdeletionsqueuedformodel-modelname-)           | Retrieves all the queued relation deletions in the state for the given model.                                                              |
| [`countRelationModelsIndexedForEntity`](./relations.md#countrelationmodelsindexedforentity-modelname-entityid-)| Returns a count of all the relation models (not count of entities) that exist in the state being related to the given model and entity id. |

## Model  Specific

| Selector                                                                             | Description                                                                      |
| -------------------------------------------------------------------------------------| -------------------------------------------------------------------------------- |
| [`getLatestCheckin`](./model-specific.md#getlatestcheckin-registrationid-datetimeid-)| Returns the latest checkin record for the given registration id and datetime id. |