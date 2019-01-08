## Selectors

A `*` next to the selector means that this has a corresponding resolver.

* [ ] getEntityRecordsForModel( modelName ) - returns entities indexed by primary key
* [ ] getEntitiesForModel( modelName ) - returns array of entities
* [ ] getEntityById( modelName, entityId ) * - returns entity
* [ ] getEntitiesByIds( modelName, entityIds ) - returns array of entities
* [ ] getEntityIdsQueuedForTrash( modelName ) - returns array of ids
* [ ] getEntityIdsQueuedForDelete( modelName ) - returns array of ids
* [ ] getModelsQueuedForTrash( modelName ) - returns array of model names
* [ ] getModelsQueuedForDelete( modelName ) - returns array of model names
* [ ] getRelationIdsForEntityRelation( entity, relationName ) - returns array of ids
* [ ] getRelatedEntities( entity, relationName ) * - returns array of entities
* [ ] getRelationAdditionsQueuedForModel( modelName ) - returns object keyed by entity ids indexing an object keyed by relation name sand values being array of ids for relation
* [ ] getRelationDeletionsQueuedForModel( modelName ) - same as previous
* [ ] countRelationModelsIndexedForEntity( modelName, entityId  ) - count of relation models that exist in the state related to the given model and entity id

## Dispatch Actions

* [ ] createEntity( modelName, baseEntity ) - new entity instance (BaseEntity child)
* [ ] createRelation( modelName, entityId, relationName, relationEntity ) - ensure the state reflects the expected values.
* [ ] createRelations( modelName, entityId, relationName, relationEntities ) - same as above but for multiple relation entities for the given model, entity id, and relation
* [ ] deleteEntityById( modelName, entityId ) - ensure the state reflects the expected values
* [ ] trashEntityById( modelName, entityId ) - same as previous
* [ ] removeDirtyRelationForAddition( modelName, entityId, relationName, relationEntityId ) - ensure state is updated as expected
* [ ] removeRelationForEntity( modelName, entityId, relationName, relationEntityId ) - ensure state is updated as expected
* [ ] receiveEntityRecords( modelName, entities ) - adds the entity records to the state. Note this should not replace any record already in the state.
* [ ] receiveAndReplaceEntityRecords( modelName, entities ) - same as the previous except this will replace any already existing record for entities in the state.
* [ ] receiveEntity( entity ) - Adds the entity to the state (but does not replace the entity already in the state if it exists)
* [ ] receiveTrashEntityId( modelName, entityId ) - This queues up the given entity for trashing in the state.
* [ ] receiveDeleteEntityId( modelName, entityId ) - Same as the previous except queues for deleting.
* [ ] receiveRelatedEntities( modelName, entityId, relationName, relatedEntityIds ) - Adds the relation to the state.
* [ ] removeEntityById( modelName, entityId ) - removes the entity from the state tree
* [ ] removeDeleteEntityId( modelName, entityId ) - removes the entity from being queued for delete
* [ ] removeTrashEntityId( modelName, entityId ) - removes the entity from the trash queue in the state.
* [ ] removeAllRelatedEntitiesForModelEntity( modelName, entityid ) - removes all indexed relations for a specific entity from the state so there is no longer record of that in the state.  If the relation entities themselves have no other elations in the state tree, then they are also removed from the state
* [ ] removeRelatedEntities( modelName, entityId, relationName, relationEntityIds ) - is more specific than the previous dispatch action.

Note: the following actions don't really need tested directly because they are indirectly covered by other tests regarding removing relations.

* [ ] receiveDirtyRelationIndex( modelName, relationEntityId, modelname, entityId, addRelation (bool) ) - this queues up the relation for either addition or deletion in the relation index state.
* [ ] receiveDirtyRelationAddition( relationName, relationEntityId, modelName, entityId ) - this queues up the relation for addition.
* [ ] receiveDirtyRelationDeletion( relationName, relationEntityId, modelName, entityId ) - this queues up the relation for deletion.
* [ ] receiveUpdatedEntityIdForRelations( modelName, oldEntityId, newEntityId ) - triggers the replacement of any instance of the old entity id in the state for the given model with the new entity id (across the entire state tree).
* [ ] removeDirtyRelationIndex( relationName, relationEntityId, modelName, entityId, addRelation ) - removes the described relation from the relation index state.
* [ ] removeDirtyRelationForType( relationName, relationEntityId, modelName, entityId, addRelation ) - removes the dirty relation from the state for the given relation action type (delete or add)
* [ ] removeDirtyRelationAddition( relationName, relationEntityId, modelName, entityId ) - specific method wrapping removeDirtyRelationForType
* [ ] removeDirtyRelationDeletion( relationName, relationEntityId, modelName, entityId ) - specific method wrapping removeDirtyRelationForType


## Dispatch Actions that persist to the server

* [ ] persistEntityRecord( modelName, entity ) - inserts or updates dirty entity records to the server database and replaces existing records in state with the successfully persisted result (via response from the server).  So you should end up with NEW entities in the state.  Especially relevant for new entities that get any defaults returned from the server. If the entity is not persisted (for whatever reason) `null` will be returned.
* [ ] persistForEntityId( modelName, entityId ) - same as above except only the specific entity will be persisted (if its dirty). Returns the persisted entity if successful or null if not.
* [ ] persistForEntityIds( modelName, entityIds ) - same as above except only the specific entities will be persisted (note, only the dirty entities in the given group will be persisted). returns the persistedEntities (Object) if successful or an empty Object if not.
* [ ] persistDeletesForModel( modelName ) - persists any queued up deletes for the given model.  Note the `force=true` argument is set so if this does permanent deletes. Returns an array of all the deletes persisted. Returns an array of ids successfully persisted.
* [ ] persistTrashesForModel( modelname ) - persists any queued up trashes for the given model.  Note that this just means `force=true` is not included.  But if the model does not have a soft-delete facility, then permanent deletes will happen. Returns an array of all the trashes persisted. Returns an array of ids successfully persisted.
* [ ] persistAllDeletes() - this persists all the queued deletes AND trashes for all models. Returns an object indexed by delete/trash, then for each object indexed by modelNames and the values are arrays of entity ids for each model that were persisted.
* [ ] persistAddRelationsForModel( modelName ) - persists any queued relation additions (i.e. adding a datetime relation to an event) to the db.  Returns an object indexed by the originating entity id for the requested model and with values that are an object indexed by relation names with values of relation ids successfully persisted.
* [ ] persistDeleteRelationsFormModel( modelName ) - same as above except handling relation removals.

> Note: there are a number of other persistRelation type dispatch action but they are all indirectly tested via persistAddRelationsForModel and persistDeleteRelationsForModel