/**
 * @namespace Vue
 */
var Vue         = require('vue');
/**
 * @namespace Vuex
 * @property {object}  Store
 */
var Vuex        = require('vuex');
/**
 * @namespace VueResource
 */
var VueResource = require('vue-resource');
/**
 * @namespace inflection
 */
var inflection  = require('inflection');
/**
 * @namespace URI
 */
var URI         = require('urijs');
/**
 * @namespace _
 */


Vue.use(VueResource);

//custom vuex store methods.

/**
 * Replaces the entity in a collection.
 *
 * This method should only be called within a mutation.
 *
 * @param {string} collection
 * @param {object} entity
 * @returns {boolean}
 */
Vuex.Store.prototype.replaceEntityInCollection = function (collection, entity) {
    //if there isn't a collection matching in the store then get out
    if (typeof(this.state[collection]) === 'undefined') {
        return false;
    }

    var primaryKey     = this.state[collection].primaryKey,
        searchObj      = {},
        entityLocation = -1;

    searchObj[primaryKey] = entity[primaryKey];
    entityLocation        = _.findIndex(this.state[collection].entities, searchObj);

    //if there's no match, then there's no replacement so lets just push
    if (entityLocation === -1) {
        this.state[collection].entities.push(entity);
    } else {
        var store = this;
        //replace the values with the incoming entity
        _.each(entity, function (value, prop) {
            store.state[collection].entities[entityLocation][prop] = value;
        });
    }
};

/**
 * This is used to commit a change record to the `changeMap` property in the store state for a collection.
 * This should only be called by a Vuex.mutation.
 *
 * @param {string} collection   The name of the collection the change is for.
 * @param {object} entity       The object the change is for.
 * @param {string} changeType   The type of change being recorded.  Accepts the following:
 *                              'delete' - means the entity is deleted.
 *                              'create' - means the entity is created.
 *                              'update' -  means the entity had a property(s) changed on it.
 */
Vuex.Store.prototype.commitChangeRecord = function (collection, entity, changeType) {
    //validate required properties are present.
    if (_.isUndefined(collection)
        || _.isUndefined(entity)
        || _.isUndefined(changeType)
    ) {
        throw new eejs.exception(
            'The properties for `commitChangeRecord` are not all defined. Double-check and make sure there is a ' +
            '`collection`, `entity`, and `changeType` values passed in.'
        );
    }

    //check that the collection actually exists (meaning it was registered) in the store.  If it doesn't then the
    //changeMap cannot be written to.
    if (!_.has(this.state, collection)) {
        throw new eejs.exception(
            'Unable to record a changeRecord for the ' + collection + ' collection because there is no record for it ' +
            'in the store state.  Are  you sure it was registered?'
        );
    }

    //check if there is a primaryKey in the entity for this collection (validate we're recording state for the right
    //entity
    if (!_.has(entity, eejs.api.main.getPrimaryKeyForCollection(collection))) {
        throw new eejs.exception(
            'The provided entity object does not have a property matching the primaryKey for the given collection (' +
            collection + '). Are you sure the correct entity was passed in?'
        );
    }

    var entityId = entity[eejs.api.main.getPrimaryKeyForCollection(collection)];

    //k looks like we're able to get this changeType added.
    switch (changeType) {
        case 'delete' :
            //make sure if this is in either the create or update map its removed from there (and also remove any
            // change records for relations).
            this.removeChangeRecord(collection, entityId, 'create');
            this.removeChangeRecord(collection, entityId, 'update');
            this.removeAllRelatedChangeRecords(collection, entityId);
            if (_.indexOf(this.state[collection].changeMap.delete, entityId) === -1) {
                //if this is a NEW object then it doesn't need added here because it hasn't been persisted yet so no
                //deletes necessary!
                if (!this.getters.isNewEntity(entityId)) {
                    this.state[collection].changeMap.delete.push(entityId);
                }
            }
            break;
        case 'create' :
            //some simple validation. If this is already in the 'update'
            // or 'delete' maps then how is it getting "created"?
            if (_.indexOf(this.state[collection].changeMap.delete, entityId) > -1
                || _.indexOf(this.state[collection].changeMap.update, entityId) > -1
            ) {
                throw new eejs.exception(
                    'Adding the entity with the id of ' + entityId + ' to this ' + collection + ' changeMap for create ' +
                    'was aborted because its already part of either the delete or update changeMaps.  How can it be ' +
                    'created if its already in those maps?'
                );
            }
            if (_.indexOf(this.state[collection].changeMap.create, entityId) === -1) {
                this.state[collection].changeMap.create.push(entityId);
            }
            break;
        case 'update' :
            //If this is already in the 'create' map then silently skip because the current state for this object will
            //get persisted on the create action.
            if (_.indexOf(this.state[collection].changeMap.create, entityId) === -1) {
                //if this is in the delete changeMap, then how is an update supposed to persist?
                if (_.indexOf(this.state[collection].changeMap.delete, entityId) > -1) {
                    throw new eejs.exception(
                        'Adding the entity with the id of ' + entityId + ' to this ' + collection + ' changeMap for ' +
                        'update was aborted because its already part of the delete changeMap.  If you want to update ' +
                        'an entity already marked for deletion then you should make sure its removed from the delete ' +
                        'map first.'
                    );
                }

                //if the primary key for the entity is for a new object, then we don't update but instead add to the
                //created index.
                if (this.getters.isNewEntity(entityId)) {
                    changeType = 'create';
                }

                //made it here? K all good to add to the map
                if (_.indexOf(this.state[collection].changeMap[changeType], entityId) === -1) {
                    this.state[collection].changeMap[changeType].push(entityId);
                }
            }
            break;
        default :
            throw new eejs.exception(
                'An invalid value for changeType (' + changeType + ') was passed in.  Must be either: ' +
                '"create", "delete", or "update"'
            );
    }
};

/**
 * This is used to remove a changeRecord from the changeMap in the given collection.
 * This should only be called as a part of a mutation.
 *
 * @param {string} collection
 * @param {number|string} entityId The id of the entity being removed from the changeMap
 * @param {string} changeType  The type of change the record is being removed from. Accepts the following:
 *                              'delete', 'create', 'update'
 */
Vuex.Store.prototype.removeChangeRecord = function (collection, entityId, changeType) {
    //validate required properties are present.
    if (_.isUndefined(collection)
        || _.isUndefined(entityId)
        || _.isUndefined(changeType)
    ) {
        throw new eejs.exception(
            'The properties for `removeChangeRecord` are not all defined. Double-check and make sure there is a ' +
            '`collection`, `entityId`, and `changeType` values passed in.'
        );
    }

    //check that the collection actually exists (meaning it was registered) in the store.  If it doesn't then the
    //changeMap cannot be written to.
    if (!_.has(this.state, collection)) {
        throw new eejs.exception(
            'Unable to remove from the changeRecord for the ' + collection + ' collection because there is no record ' +
            'for it in the store state.  Are  you sure it was registered?'
        );
    }

    switch (changeType) {
        case 'delete' :
        case 'create' :
        case 'update' :
            this.state[collection].changeMap[changeType] = _.without(
                this.state[collection].changeMap[changeType],
                entityId
            );
            break;
        default :
            throw new eejs.exception(
                'An invalid value for changeType (' + changeType + ') was passed in.  Must be either: ' +
                '"create", "delete", or "update"'
            );
    }
};

/**
 * This is used to commit a change record to the `changeMap.relations` property in the store state for a collection.
 * This should only be called by a Vuex mutation.
 *
 * @param {string} collection  The name of the collection the change is for (eg 'events').
 * @param {string} relation    The name of the relation the change is for (eg 'datetimes').
 * @param {number} entityId      The entityId for the entity from the collection the change is for.
 * @param {number} relatedEntityId  The entityId for the entity from the relation the change is for.
 * @param {string} changeType   The type of change being recorded.  Accepts the following:
 *                              'removed' = means the relation was removed between the entity and relatedEntity.
 *                              'added' = means the relation was added between the entity and related Entity.
 * @param {boolean}  recursive     Defaults to true.  This is used to indicate whether the change should be recursively
 *                              applied to the relations changeMap state as well.
 */
Vuex.Store.prototype.commitRelatedChangeRecord = function (collection,
                                                           relation,
                                                           entityId,
                                                           relatedEntityId,
                                                           changeType,
                                                           recursive) {
    //validate required properties are present.
    if (_.isUndefined(collection)
        || _.isUndefined(relation)
        || _.isUndefined(entityId)
        || _.isUndefined(relatedEntityId)
        || _.isUndefined(changeType)
    ) {
        throw new eejs.exception(
            'The properties for `commitRelatedChangeRecord` are not all defined. Double-check and make sure there is a ' +
            '`collection`, `relation`, `entityId`, `relatedEntityId` and `changeType` values passed in.'
        );
    }

    //check that the collection actually exists (meaning it was registered) in the store.  If it doesn't then the
    //changeMap cannot be written to.
    if (!_.has(this.state, collection)) {
        throw new eejs.exception(
            'Unable to record a changeRecord for the ' + collection + ' collection because there is no record for it ' +
            'in the store state.  Are  you sure it was registered?'
        );
    }

    //check the related collection exists.
    if (!_.has(this.state, relation)) {
        throw new eejs.exception(
            'Unable to record a changeRecord for the ' + relation + ' relation because there is no record for it ' +
            'in the store state. Are you sure it was registered?'
        );
    }

    recursive = _.isUndefined(recursive) ? true : recursive;

    //make sure that the relation object is defined.
    this.state[collection].changeMap.relations[relation] = this.state[collection].changeMap.relations[relation] ||
        {added: {}, removed: {}};

    //k now we can do whatever the changeType being recorded is.
    switch (changeType) {
        case 'added' :
            //make sure we have a definition for this entityId
            this.state[collection].changeMap.relations[relation].added[entityId] =
                this.state[collection].changeMap.relations[relation].added[entityId]
                || [];

            //remove any existing removed relation
            this.removeRelatedChangeRecord(collection, relation, entityId, relatedEntityId, 'removed', false);
            this.state[collection].changeMap.relations[relation].added[entityId].push(relatedEntityId);
            break;
        case 'removed' :
            this.state[collection].changeMap.relations[relation].removed[entityId] =
                this.state[collection].changeMap.relations[relation].removed[entityId]
                || [];
            //remove any existing added relation
            this.removeRelatedChangeRecord(collection, relation, entityId, relatedEntityId, 'added', false);
            this.state[collection].changeMap.relations[relation].removed[entityId].push(relatedEntityId);
            break;
        default :
            throw new eejs.exception(
                'An invalid value for changeType (' + changeType + ') was passed in.  Must be either: ' +
                '"added", or "removed"'
            );
    }

    //if recursive is true then apply the changes in reverse so there is a record on the relation as well.
    if (recursive) {
        this.commitRelatedChangeRecord(relation, collection, relatedEntityId, entityId, changeType, false);
    }
};

/**
 * Used to remove a change record from the `changeMap.relations` property for the given collection and relation entities.
 * This only removes for the specified changeType.  If you want to remove instances of this relation everywhere, then
 * use the removeAllRelatedChangeRecords method
 *
 * This should only be called by a Vuex mutation.
 *
 * @param {string} collection  The name of the collection the changeMap is being modified for.
 * @param {string} relation    The name of the relation being modified.
 * @param {number} entityId    The id of the entity belonging to the collection that is being removed.
 * @param {number} relatedEntityId  The id of the related entity being removed.
 * @param {string} changeType   The type of changeMap being removed from.  Required to be one of the following:
 *                              'removed', 'added'.
 * @param {boolean}  recursive     Defaults to true.  This is used to indicate whether the change should be recursively
 *                              applied to the relations changeMap state as well.
 */
Vuex.Store.prototype.removeRelatedChangeRecord = function (collection,
                                                           relation,
                                                           entityId,
                                                           relatedEntityId,
                                                           changeType,
                                                           recursive) {
    //validate required properties are present.
    if (_.isUndefined(collection)
        || _.isUndefined(relation)
        || _.isUndefined(entityId)
        || _.isUndefined(relatedEntityId)
        || _.isUndefined(changeType)
    ) {
        throw new eejs.exception(
            'The properties for `removeRelatedChangeRecord` are not all defined. Double-check and make sure there is a ' +
            '`collection`, `relation`, `entityId`, `relatedEntityId`, and `changeType` values passed in.'
        );
    }

    //check that the collection actually exists (meaning it was registered) in the store.  If it doesn't then the
    //changeMap cannot be written to.
    if (!_.has(this.state, collection)) {
        throw new eejs.exception(
            'Unable to remove from the changeRecord for the ' + collection + ' collection because there is no record ' +
            'for it in the store state.  Are  you sure it was registered?'
        );
    }

    //do same check for relation
    if (!_.has(this.state, relation)) {
        throw new eejs.exception(
            'Unable to remove from the changeRecord for the ' + relation + ' relation because there is no record ' +
            'for it in the store state.  Are  you sure it was registered?'
        );
    }

    switch (changeType) {
        case 'added' :
        case 'removed' :
            this.state[collection].changeMap.relations[relation][changeMap][entityId] = _.without(
                this.state[collection].changeMap.relations[relation][changeMap][entityId], relationId);
            break;
        default:
            throw new eejs.exception(
                'An invalid value for changeType (' + changeType + ') was passed in.  Must be either: ' +
                '"added", or "removed"'
            );
    }

    //if recursive is true then lets do the reverse for the relation.
    if (recursive) {
        this.removeRelatedChangeRecord(relation, collection, relatedEntityId, entityId, changeType, false);
    }
};

/**
 * This will remove all related changeRecords for the given collection and entityId in the changeMap.relations property
 * for the collection.  Note, if recursive is true, this will in turn look through all the changeMaps stored with
 * relations to this collection and ensure relations containing this entityId is removed from their maps as well.
 * Should only be called by a Vuex mutation.
 *
 * @param {string} collection  The collection the changemap.relations is being modified for.
 * @param {number} entityId    The entityId the relations are being removed for.
 * @param {boolean} recursive   Defaults to true. This is used to indicate whether the change should be recursively
 *                              applied to all other collections this collection is a relation for.
 */
Vuex.Store.prototype.removeAllRelatedChangeRecords = function (collection,
                                                               entityId,
                                                               recursive) {
    //validate required properties are present.
    if (_.isUndefined(collection)
        || _.isUndefined(entityId)
    ) {
        throw new eejs.exception(
            'The properties for `removeAllRelatedChangeRecords` are not all defined. Double-check and make sure there ' +
            'is are `collection` and `entityId`  values passed in.'
        );
    }

    //check that the collection actually exists (meaning it was registered) in the store.  If it doesn't then the
    //changeMap cannot be written to.
    if (!_.has(this.state, collection)) {
        throw new eejs.exception(
            'Unable to remove from the changeRecord for the ' + collection + ' collection because there is no record ' +
            'for it in the store state.  Are  you sure it was registered?'
        );
    }

    //we'll loop through each relation record on the relations property in the changeMap for `added` and `removed`.
    var state       = this.state,
        relationIds = [];
    _.each(state[collection].changeMap.relations, function (relationChangeMapObject, relation, relationsChangeMap) {
        //if the entity ID exists in the relationChangeMapObject.added or relationChangeMapObject.removed, then clear it
        //and go into the relation (if recursive = true) and remove in the relations as well.
        _.each(['added', 'removed'], function (changeType) {
            if (_.has(relationChangeMapObject[changeType], entityId)) {
                relationIds                              = relationChangeMapObject[changeType][entityId];
                relationsChangeMap[relation][changeType] = _.omit(relationChangeMapObject[changeType], entityId);
                if (recursive) {
                    _.each(relationIds, function (relationId) {
                        if (_.has(state[relation].changeMap.relations[collection][changeType], relationId)) {
                            state[relation].changeMap.relations[collection][changeType][relationId] = _.without(
                                state[relation].changeMap.relations[collection][changeType][relationId],
                                entityId
                            );
                        }
                    });
                }
            }
        });
    });
};

/**
 * Used to connect related items by ID in the store for all affected relations.
 *
 * This method should never be called directly to modify the store but should be only used in mutations.
 *
 * @param {string} collection = [required] the main collection the relation is being added to (eg events)
 * @param {number} collectionEntityId = The primary key of the collection the relation is being added to.
 * @param {string} relation   = [required] the collection related to the main collection (eg datetimes)
 * @param {number} relationEntityId = [required] The primary key of the relation being added.  This is
 *                         expected to be an array|number.
 * @param {boolean} doStoreCheck = [optional] expected to be boolean.  Used to indicate whether to
 *                       do a storeCheck for the collection and throw an exception if its not
 *                       present.  Otherwise if the collection doesn't exist, it just will
 *                       return false. Defaults to true.
 * @param {boolean} fromDb = [optional]. Used to indicate whether the incoming relations are coming from the db or not.
 *                           defaults to false.
 * @returns {boolean}
 */
Vuex.Store.prototype.commitRelationsForEntity = function (collection,
                                                          collectionEntityId,
                                                          relation,
                                                          relationEntityId,
                                                          doStoreCheck,
                                                          fromDb) {
    //make sure all required properties are set
    if (
        _.isUndefined(collection)
        || _.isUndefined(collectionEntityId)
        || _.isUndefined(relation)
        || _.isUndefined(relationEntityId)
    ) {
        throw new eejs.exception(
            'The properties for `commitRelationsForEntity` are not all defined.  Double-check ' +
            'and make sure there is a `collection`, `collectionEntityId`, `relation`, and ' +
            '`relationEntityId` defined.'
        );
    }

    var state = this.state;
    var self  = this;

    doStoreCheck = doStoreCheck || true;
    fromDb       = fromDb || false;

    //make sure relationEntityId is an array
    relationEntityId = _.isArray(relationEntityId)
        ? relationEntityId
        : [relationEntityId];

    //we can only add the relation to a collection that exists in the store!
    if (_.has(state, collection)) {
        state[collection]['relations'][relation]                     = _.has(state[collection]['relations'], relation)
            ? state[collection]['relations'][relation]
            : {};
        state[collection]['relations'][relation][collectionEntityId] = _.has(
            state[collection]['relations'][relation],
            collectionEntityId
        )
            ? state[collection]['relations'][relation][collectionEntityId]
            : [];
        //push our relation on to the store
        _.each(relationEntityId, function (id) {
            if (!_.contains(state[collection]['relations'][relation][collectionEntityId]), id) {
                state[collection]['relations'][relation][collectionEntityId].push(id);
                //make sure this is added to the changeMap if not from db OR if either the relation entity or the
                //collection entity is a new object.
                if (!fromDb
                    || self.getters.isNewEntity(collectionEntityId)
                    || self.getters.isNewEntity(relationEntityId)
                ) {
                    self.commitRelatedChangeRecord(collection, relation, collectionEntityId, id, 'added');
                }
            }
        });
        return true;
    } else {
        if (doStoreCheck) {
            throw new eejs.exception(
                'Unable to add a relation to the "' + collection + '" collection ' +
                'because it isn\'t even in the store state yet!'
            );
        } else {
            return false;
        }
    }
};

/**
 * Commits an entity to its collection.
 *
 * Note, this method should only be called from within a mutation.
 *
 * @param {string} collection  The string representing the collection name
 * @param {object} entity      The entity being added to the collection.
 * @param {boolean} refresh    (optional). Indicates whether this entity should replace any existing entity in the state
 *                             or not. Defaults to false
 * @param {boolean} fromDb     (optional). Indicates (if true) that the entity has been retrieved from the db holding
 *                              it. Defaults to false.
 */
Vuex.Store.prototype.commitEntityToCollection = function (collection, entity, refresh, fromDb) {
    //make sure required props are here
    if (_.isUndefined(collection) || _.isUndefined(entity)) {
        throw new eejs.exception('Either the collection or entity is missing.');
    }

    var state                    = this.state,
        self                     = this,
        entityToSave             = {},
        relationIds              = [],
        relationsToReplicate     = {},
        linksToCommit            = {},
        calculatedFieldsToCommit = {};

    refresh = refresh || false;
    fromDb  = fromDb || false;

    //does this collection exist?
    if (_.has(state, collection)) {
        //is entity an object? Eventually we can add validation
        // to make sure only a valid entity is getting added.
        if (_.isObject(entity) && !_.isNull(entity)) {
            //first detect if there are relations listed with the entity, if there are we
            //actually remove those from the entity and add them to the relation collection
            //and then also add a relation record for this collection and the other collection
            _.each(entity, function (fieldValue, fieldKey, entity) {
                if (eejs.utils.isRelationOf(fieldKey, collection)) {
                    //okay this field is for a relation, so let's go ahead and take care of
                    //committing it's entities, and then doing the relation commits.
                    //if the fieldValue is not an array let's make it an array.  This is needed
                    //because some relations are singular.
                    fieldValue                                                      = !_.isArray(fieldValue) ? [fieldValue] : fieldValue;
                    relationsToReplicate[eejs.utils.inflection.pluralize(fieldKey)] = fieldValue;
                    //next extract _links and _calculated fields out of the entity into their specific properties in the
                    //collection state.
                } else if (fieldKey === eejs.api.main.getPrimaryKeyForCollection(collection)) {
                    if (_.has(entity, '_links')) {
                        linksToCommit[fieldValue] = entity._links;
                    }
                    if (_.has(entity, '_calculated_fields')) {
                        calculatedFieldsToCommit[fieldValue] = entity._calculated_fields;
                    }
                    //make sure primary key is kept with the entity
                    entityToSave[fieldKey] = fieldValue;
                } else if (fieldKey === '_links' || fieldKey === '_calculated_fields') {
                    //skip because we should have already handled this and we do not want it committed with the entity
                    //record
                    return true;
                } else {
                    entityToSave[fieldKey] = fieldValue;
                }
            });
        }

        //does this entity already exist?  If it does we do not allow overwrites by default
        //unless refresh is true.
        // the state is the source remember
        if (!self.getters.hasEntityInCollection(collection, entityToSave)) {
            state[collection].entities.push(entityToSave);
            //if this is a new object or NOT from the db then let's make sure its added to the 'create' map.
            if (self.getters.isNewEntity(entity[eejs.api.main.getPrimaryKeyForCollection(collection)]) || !fromDb) {
                self.commitChangeRecord(collection, entity, 'create');
            }
        } else if (refresh) {
            self.replaceEntityInCollection(collection, entityToSave);
            if (fromDb) {
                //if this is fromDb, then we need to remove any updates/deletes for this entity in the changeMap.
                self.removeChangeRecord(
                    collection,
                    entity[eejs.api.main.getPrimaryKeyForCollection(collection)],
                    'update'
                );
                self.removeChangeRecord(
                    collection,
                    entity[eejs.api.main.getPrimaryKeyForCollection(collection)],
                    'delete'
                );
            } else {
                //add change record for update if this is not from the db.
                self.commitChangeRecord(collection, entity, 'update');
            }
        }

        //handle _links and _calculated_field commits.
        if (!_.isEmpty(linksToCommit)) {
            _.each(linksToCommit, function (links, entityId) {
                state[collection]._links[entityId] = links;
            });
        }

        if (!_.isEmpty(calculatedFieldsToCommit)) {
            _.each(calculatedFieldsToCommit, function (fields, entityId) {
                state[collection]._calculated_fields[entityId] = fields;
            });
        }

        //next let's loop through relationsToReplicate now that we have the filtered entity and add relations (which
        //includes committing each relation entity.
        if (!_.isEmpty(relationsToReplicate)) {
            var primaryKeyValueForRelationObject = 0,
                primaryKeyValueForEntity         = 0;
            _.each(relationsToReplicate, function (relationObjects, relation) {
                relationIds = eejs.utils.getIdsFromEntities(relationObjects, state[relation].primaryKey);
                _.each(relationObjects, function (relationObject) {
                    self.commitEntityToCollection(relation, relationObject, false, fromDb);

                    //get primaryKey value for relationObject.
                    primaryKeyValueForRelationObject = eejs.utils.getIdFromEntity(
                        relationObject,
                        state[relation].primaryKey
                    );
                    primaryKeyValueForEntity         = eejs.utils.getIdFromEntity(entity, state[collection].primaryKey);

                    //then commit this entity as a relation on the entities relation!
                    self.commitRelationsForEntity(
                        relation,
                        primaryKeyValueForRelationObject,
                        collection,
                        primaryKeyValueForEntity,
                        true,
                        fromDb
                    );
                });
                self.commitRelationsForEntity(
                    collection,
                    primaryKeyValueForEntity,
                    relation,
                    relationIds,
                    true,
                    fromDb
                );
            });
        }
    }
};

Vue.use(Vuex);

/**
 * Polyfill `String.prototype.endsWith` for environments that don't have ECMA6
 */
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (searchString, position) {
        var subjectString = this.toString();
        if (
            typeof position !== 'number'
            || !isFinite(position)
            || Math.floor(position) !== position
            || position > subjectString.length
        ) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

/**
 * Polyfill `String.prototype.includes` for environments that don't have the ECMAScript 2015 specification of this.
 */
if (!String.prototype.includes) {
    String.prototype.includes = function (search, start) {
        'use strict';
        if (typeof start !== 'number') {
            start = 0;
        }

        if (start + search.length > this.length) {
            return false;
        } else {
            return this.indexOf(search, start) !== -1;
        }
    };
}

(function (window, undefined) {
    'use strict';

    /**
     * initialize eejs and eejs.api
     */
    window.eejs = window.eejs || {};
    eejs.api            = eejs.api || {};
    eejs.data           = eejs.data || {};
    eejs.api.mixins     = eejs.api.mixins || {};
    eejs.api.components = eejs.api.components || {};
    eejs.utils          = eejs.utils || {};

    //expose Vue and Vuex on eejs.
    eejs.vue  = Vue;
    eejs.vuex = Vuex;

    //add inflection to the utils
    eejs.utils.inflection = inflection;
    //add URI.js to the utils
    eejs.utils.URI        = URI;

    /**
     * For adding relations to a collection to the fetch query for a collection.
     * @param {string} collection
     * @param {string} endpointUri
     * @returns {string}
     */
    eejs.utils.addRelationsToEndpointURI = function (collection, endpointUri) {
        var collectionsSchema = eejs.api.main.getCollectionsSchema();
        //does this collection have a schema or relations on the collection schema for this collection?
        if (!_.has(collectionsSchema, collection) || !_.has(collectionsSchema[collection], 'relations')) {
            return endpointUri;
        }

        _.each(collectionsSchema[collection].relations, function (relationObject, relation) {
            //only add the relation to the endpoint query IF that relation collection is registered.
            if (_.has(collectionsSchema, relation)) {
                //get the singularized capitalized value for the relation
                relation    = eejs.utils.inflection.transform(relation, ['singularize', 'capitalize']);
                endpointUri = decodeURI(eejs.utils.URI(endpointUri).addSearch({"include": relation + '.*'}).toString());
            }
        });
        return endpointUri;
    };

    /**
     * This takes an incoming object representing additional queryString parameters to add to the endpoint uri for the
     * request.
     *
     * @todo add validation for the params added and only allow adding acceptable params.  That will just help aid
     * development of client code but is not necessary for the first draft (REST Response on incorrect params would be
     * used in the meantime.
     *
     * @param {object} queryStringObject
     * @param {string} endpointUri
     * @returns {string}
     */
    eejs.utils.addQueryStringToEndpointURI = function (queryStringObject, endpointUri) {
        //make sure that the queryStringObject is in fact an object
        if (!_.isObject(queryStringObject)) {
            return endpointUri;
        }
        return decodeURI(eejs.utils.URI(endpointUri).addSearch(queryStringObject).toString());
    };

    /**
     * This returns whether the given relation string is a registered relation to the collection.
     * Note this only considers *registered* relations on the current eejs.api instance.  So even though
     * 'datetimes' might be a relation on 'events', if the eejs.api was not initialized with `['events','datetimes']`,
     * then this method will return false.
     *
     * @param {string} collection
     * @param {string} relation
     * @returns {boolean}
     */
    eejs.utils.isRelationOf = function (relation, collection) {
        var collectionsSchema = eejs.api.main.getCollectionsSchema();
        //make sure relation is pluralized
        relation              = eejs.utils.inflection.pluralize(relation);

        return _.has(collectionsSchema, collection)
            && _.has(collectionsSchema[collection], 'relations')
            && _.has(collectionsSchema[collection].relations, relation);
    };

    /**
     * This is a utility that simply receives an incoming object and then an array listing the keys
     * that are required to be present in the object.  All of those keys must be present and if they
     * aren't then an array with the missing keys is returned.  If all required keys are present then a
     * simple boolean `true` is returned.
     * @param {object} payload
     * @param {array} requiredKeys
     * @returns {array|boolean}
     */
    eejs.utils.verifyRequiredKeysPresentInObject = function (payload, requiredKeys) {
        var missing = [];
        if (!_.isArray(requiredKeys) && !_.isObject(payload)) {
            throw new eejs.exception('The eejs.utils.verifyRequiredKeysPresentInObject method must have a payload ' +
                'object as the first argument, and a requiredKeys array as the second argument.');
        }

        _.each(requiredKeys, function (key) {
            if (!_.has(payload, key)) {
                missing.push(key);
            }
        });

        return missing.length === 0 ? true : missing;
    };

    /**
     * This simply returns an array of ids for the given collection entities using the primaryKey.
     * Remember some of these ids may be for new objects not persisted yet to the db (they'll have a `_new_id_` prefix.
     * @param {array} entities
     * @param {string} primaryKey
     * @returns {array}
     */
    eejs.utils.getIdsFromEntities = function (entities, primaryKey) {
        //if there is not a primaryKey set, then we have no way of knowing what values to assemble!
        if (_.isUndefined(primaryKey) || !_.isString(primaryKey)) {
            throw new eejs.exception('Unable to return any id because the primaryKey argument is not defined or is ' +
                'not an accepted type (string).');
        }

        var ids = [],
            id  = 0;

        //if entities is not an array let's make sure its an array!
        entities = !_.isArray(entities) ? [entities] : entities;
        _.each(entities, function (entity) {
            id = eejs.utils.getIdFromEntity(entity, primaryKey);
            if (id) {
                ids.push(id);
            }
        });
        return ids;
    };

    /**
     * This returns the id representing the given entity.
     * Remember some of these ids may be for new objects not persisted yet to the db (they'll have a `_new_id_` prefix.
     *
     *
     * @param {object} entity
     * @param {string} primaryKey
     * @returns {number|string}  Some primary keys might be string values.  If no id is retrieved then the default of 0
     *                            is returned so you may want to account for that.
     */
    eejs.utils.getIdFromEntity = function (entity, primaryKey) {
        if (_.isUndefined(primaryKey) || !_.isString(primaryKey)) {
            throw new eejs.exception('Unable to return any id because the primaryKey argument is not defined or is ' +
                'not an accepted type (string).');
        }

        if (_.has(entity, primaryKey) && entity[primaryKey] !== 0) {
            return entity[primaryKey];
        }

        return 0;
    };

    /**
     * Returns a unique id in the format used to represent uniq_ids in this library.
     * @returns {string}
     */
    eejs.utils.getUniqueId = function () {
        return _.uniqueId('_new_id_');
    };

    /**
     * This is a wrapper for the eejs.api.main object that is used
     * for initializing our Vuex store and all the collections and mixins
     * that will be used for any views interacting with the EE api.
     * that should be initialized for the view.
     * @param initialOptions
     */
    eejs.api.init = function (initialOptions) {
        // private object internal to eejs.api.init that will be exposed as an instance on eejs.api.main
        var Main = function (options) {
            //initialOptions must contain a collections property
            if (!_.isObject(options) && _.isUndefined(options.collections)) {
                throw new eejs.exception(
                    'eejs.api.init must be initialized with an object that contains at least a collections property'
                );
            }

            //verify that there is a rest route property set
            if (
                _.isUndefined(eejs.data.paths)
                && _.isUndefined(eejs.data.paths.rest_route)
            ) {
                throw new eejs.exception(
                    'eejs.data.paths.rest_route is not defined, unable to initialize the api library'
                );
            }

            /**
             * holds the incoming options
             */
            var initialOptions       = options,
                /**
                 * Indicate what authentication method to use for requests.  Defaults to cookie.
                 * @type {string}
                 */
                authenticationMethod = 'cookie',
                /**
                 * Array of successfully registered collections ('events', 'datetimes' etc)
                 * @type {array}
                 */
                collections          = [],
                /**
                 * This holds all the defaults for fields on a registered collection entity as obtained from the schema.
                 * @type {object}
                 */
                defaults             = {},
                /**
                 * Cache of the response from pinging the discovery route.
                 * @type {object}
                 */
                discoveryCache       = null,
                /**
                 * Base url for accessing the REST api.
                 * @type {string}
                 */
                restRoute            = '',
                /**
                 * Cache of the object used to initialize the Vuex.store instance.
                 * @type {object}
                 */
                storeState           = {},
                /**
                 * A cache of the collections json schema's retrieved from the collection REST endpoint.
                 * @type {object}
                 */
                collectionsSchema    = {},
                /**
                 * A cache of the built modules used to initialize the Vuex.store instance.
                 * @type {object}
                 */
                storeModules         = {},
                /**
                 * A cache of all the built mixins used for building the components.
                 * This is also exposed on the `eejs.api.mixins` property.
                 * There should be the following mixins exposed after building:
                 * eejs.api.mixins.collection
                 * eejs.api.mixins.model
                 *
                 * And then mixins for each built relations mixin.  So if `events` and `datetimes` was registered:
                 * eejs.api.mixins.relations.event.datetimes
                 * eejs.api.mixins.relations.datetime.events
                 *
                 * And then mixins for each collection that is a build of computed properties specific to model which
                 * links the fields reactively with the store state for that model. So if `events` and `datetimes` was
                 * registered:
                 * eejs.api.mixins.computedProperties.events
                 * eejs.api.mixins.computedProperties.datetimes
                 *
                 *
                 * @type {object}
                 */
                mixins               = {},
                /**
                 * A cache of all the built components used by client code for creating a Vue instance.
                 * These are also exposed on the `eejs.api.components` property.
                 *
                 * There should be two components built for each registered collection.
                 * So for instance for the `events`
                 * collection:
                 *
                 * eejs.api.components.events
                 * eejs.api.components.event
                 *
                 * @type {object}
                 */
                components           = {};

            /**
             * This initializes eejs.api and builds all the various components, mixins etc. that are then
             * exposed for client code to use in constructing a Vue instance.
             * @return Promise
             */
            var initialize                                 = function () {
                return new Promise(function (resolve, reject) {
                    //set the restRoute property
                    if (_.isUndefined(eejs.data.paths)
                        && _.isUndefined(eejs.data.paths.rest_route)
                    ) {
                        throw new eejs.exception(
                            'In order to initialize eejs.api, there must be a rest route exposed' +
                            ' via `eejs.data.paths.rest_route` property.  Unable to find that.'
                        );
                    }
                    restRoute            = eejs.data.paths.rest_route;
                    authenticationMethod = _.has(initialOptions, 'authenticationMethod')
                        ? initialOptions.authenticationMethod
                        : authenticationMethod;
                    setAuthenticationMethodOnHttpResource();
                    initDiscoverAPI().then(function () {
                        validateCollections(initialOptions.collections);
                        registerCollections(initialOptions.collections);
                        return setSchemaForEachCollection(initialOptions.collections);
                    }).then(function () {
                        buildStore();
                        buildMixins();
                        buildComponents();
                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
                });
            },
                /**
                 * Used to ensure whatever is being used for http requests has the correct authentication method set.
                 */
                setAuthenticationMethodOnHttpResource      = function () {
                    if (authenticationMethod === 'cookie') {
                        Vue.http.headers.custom['X-WP-Nonce'] = eejs.data.eejs_api_nonce;
                    }
                },
                /**
                 * Used to validate any collections sent in.
                 * Ensures that:
                 * 1. The incoming collections are in an array.
                 * 2. There is a valid REST route for the collection.
                 *
                 * @param {array} collectionsToValidate
                 */
                validateCollections                        = function (collectionsToValidate) {
                    if (!_.isArray(collectionsToValidate)) {
                        throw new eejs.exception('Incoming collections must be an array of collections.');
                    }
                    _.each(collectionsToValidate, function (collection) {
                        if (!collectionHasRoute(collection)) {
                            throw new eejs.exception(
                                'The incoming collection (' + collection + ') does not have a' +
                                ' corresponding route in the api. Double-check your spelling.'
                            );
                        }
                    });
                },
                /**
                 * Registers collections to the collections property.
                 * @param {array} newCollections
                 */
                registerCollections                        = function (newCollections) {
                    if (!_.isArray(newCollections)) {
                        throw new eejs.exception('New collections must be registered as an array of collections.');
                    }
                    if (collections.length === 0) {
                        collections = newCollections;
                    } else {
                        _.uniq(collections.concat(newCollections));
                    }
                },
                /**
                 * This takes care of retrieving schemas for all the collections via REST API (if not already retrieved)
                 *
                 * @param {array} collectionsForSchema
                 * @return Promise
                 */
                setSchemaForEachCollection                 = function (collectionsForSchema) {
                    return Promise.all(_.map(collectionsForSchema, function (collection) {
                        return setSchemaForCollection(collection)
                    }));
                },
                /**
                 * This sets the schema for a given collection to the collectionsSchema property.
                 * @param {string} collection
                 * @returns {boolean|Promise}
                 */
                setSchemaForCollection                     = function (collection) {
                    //only do the http request if needed.
                    if (_.has(collectionsSchema, collection)) {
                        return true;
                    }
                    //nope no schema yet so lets do the http options request to get it.
                    var optionsRequest = {
                        Options: {method: 'OPTIONS'}
                    };
                    var resource       = Vue.resource(restRoute + collection, {}, optionsRequest);
                    return resource.Options().then(function (response) {
                        collectionsSchema[collection] = response.body.schema;
                        setDefaultsForCollectionEntity(collection, response.body.schema);
                    });
                },
                /**
                 * This reads the incoming schema and uses that to set the collection property in the defaults object
                 * using defaults value for each field in the schema for the collection entity.
                 *
                 * @param {string} collection The collection this schema is for.
                 * @param {object} schema     The json schema for entities in this collection.
                 */
                setDefaultsForCollectionEntity             = function (collection, schema) {
                    //set collection on the default property if its not already set.
                    defaults[collection] = defaults[collection] || {};

                    //loop through schema properties and get the default prop from each field.
                    if (_.has(schema, 'properties')) {
                        _.each(schema.properties, function (fieldSchema, field) {
                            if (_.has(fieldSchema, 'default')) {

                                defaults[collection][field] = fieldSchema.default;
                            }
                        });
                    }
                },
                /**
                 * If the discoveryCache has not been set, then this does the initial query to the base RestRoute for
                 * the autodiscovery response.
                 * @return {Promise}
                 */
                initDiscoverAPI                            = function () {
                    return new Promise(function (resolve, reject) {
                        if (discoveryCache === null) {
                            Vue.http.get(
                                restRoute
                            ).then(function (response) {
                                discoveryCache = response.body;
                                resolve();
                            }).catch(function (response) {
                                reject(response);
                            });
                        } else {
                            resolve();
                        }
                    });
                },
                /**
                 * Returns all the routes/endpoints for the REST API from the discoveryCache.
                 * Note: this should only be called when it is certain the discoveryCache has been set. It does not
                 * automatically set the discoveryCache if its not set.
                 * @return {object}
                 */
                getEndpoints                               = function () {
                    //discoveryCache should have the body of the endpoints
                    return !_.isNull(discoveryCache) && !_.isUndefined(discoveryCache.routes)
                        ? discoveryCache.routes
                        : {};
                },
                /**
                 * This method kicks off building the Vuex.store instance and assigns it to eejs.api.store
                 */
                buildStore                                 = function () {
                    //build modules for the collections
                    buildStoreModules();
                    storeState     = {
                        state:     {
                            "restRoute": restRoute
                        },
                        modules:   storeModules,
                        getters:   {
                            /**
                             * This is used to determine whether an entity object exists in the specified collection or not.
                             *
                             * Note: this extracts the primary key from the given entity object and does NOT compare values
                             * of other fields/properties in the provided entity.
                             *
                             * Note: This getter returns a function because that's how one provides a method to send in
                             * arguments in the Vuex instance for getters.  @link https://vuex.vuejs.org/en/getters.html
                             *
                             * @param {object} state
                             * @param {object} getters
                             * @returns {Function}
                             */
                            hasEntityInCollection:       function (state, getters) {
                                /**
                                 * @param {string} collection   The collection the entity belongs to
                                 * @param {object} entity       The entity being used to check if it exists or not in the
                                 *                              collection
                                 * @return boolean
                                 */
                                return function (collection, entity) {
                                    if (!_.has(state, collection)) {
                                        return false;
                                    }
                                    var primaryKey = state[collection].primaryKey,
                                        entityId   = _.has(entity, primaryKey) ? entity[primaryKey] : 0;

                                    //now let's see if this entity is already in the collection
                                    return !_.isUndefined(getters.getEntityForId(collection, entityId));
                                }
                            },
                            /**
                             * Returns whether the given entityId represents a new object or not.
                             * The test is for the presence of the string `_new_id_` in the entity ID.
                             * @param {object} state
                             * @param {object} getters
                             * @returns {Function}
                             */
                            isNewEntity:                 function (state, getters) {
                                /**
                                 * @param {number|string} entityId   The id for an entity that is being checked.
                                 * @return boolean
                                 */
                                return function (entityId) {
                                    return _.isString(entityId) && entityId.includes('_new_id_');
                                }
                            },
                            /**
                             * This is used to return the entity found in the collection in the store state if it exists
                             * for the given entityId.
                             *
                             * @param {object} state
                             * @param {object} getters
                             * @returns {Function}
                             */
                            getEntityForId:              function (state, getters) {
                                /**
                                 * @param {string} collection  The collection the entity belongs to.
                                 * @param {number|string}  entityId  The value for the entity's primaryKey
                                 * @return {object|undefined}  the entity if it exists, an empty object, or undefined.
                                 */
                                return function (collection, entityId) {
                                    if (!_.has(state, collection)) {
                                        return {};
                                    }
                                    var primaryKey        = state[collection].primaryKey,
                                        searchObj         = {};
                                    searchObj[primaryKey] = entityId;
                                    return _.findWhere(state[collection].entities, searchObj);
                                }
                            },
                            /**
                             * This is used to retrieve the value for a specific field in a specific entity in the
                             * specified collection.
                             *
                             * @param {object} state
                             * @param {object} getters
                             * @returns {Function}
                             */
                            getFieldValueFromEntityById: function (state, getters) {
                                /**
                                 * @param {string} collection  The collection the entity belongs to.
                                 * @param {number|string} Value for the primary key of the entity we're retrieving the
                                 *                         field value for.
                                 * @param {string} The field we're getting returning the value for.
                                 * @return {mixed}
                                 */
                                return function (collection, entityId, field) {
                                    if (!_.has(state, collection)) {
                                        return null;
                                    }
                                    var entity = getters.getEntityForId(collection, entityId);
                                    if (_.has(entity, field)) {
                                        return entity[field];
                                    }
                                    return null;
                                };
                            },
                            /**
                             * This is used to retrieve the base endpoint for a given collection route.
                             *
                             * @param {object} state
                             * @param {object} getters
                             * @returns {Function}
                             */
                            getCollectionEndpoint:       function (state, getters) {
                                /**
                                 * @param {string} collection
                                 * @return {string}
                                 */
                                return function (collection) {
                                    //if there isn't a collection matching in the store or a restRoute then get out
                                    if (_.isUndefined(state[collection]) || _.isUndefined(state.restRoute)) {
                                        return '';
                                    }
                                    return state.restRoute + state[collection].collectionEndpoint;
                                }
                            }
                        },
                        mutations: {
                            /**
                             * Used to update the entity stored in the state for the given collection and entity.
                             * @param {object} state  Vuex store state
                             * @param {object} payload Expected to be an object with model, changes and filter keys.
                             *                collection =   the name of the collection the entity belongs to
                             *                          (the pluralized slug).
                             *                entity     =   the entity being updated in the state.
                             *
                             */
                            updateEntityById: function (state, payload) {
                                //make sure we have required payload items here.
                                var verified = eejs.utils.verifyRequiredKeysPresentInObject(
                                    payload,
                                    ['collection', 'entity']
                                );

                                if (verified !== true && _.isObject(verified)) {
                                    throw new eejs.exception('The following required keys are missing from the ' +
                                        'payload object: ' + verified.join());
                                }

                                //replace or add the entity into store state
                                eejs.api.store.commitEntityToCollection(payload.collection, payload.entity, true);
                            },

                            /**
                             * Used to add a complete entity to the specific collection in the state.
                             * @param {object} state   Vuex Store State
                             * @param {object} payload Expect an object with:
                             *          collection  = [required] the name of the collection the entity is being added to.
                             *          entity      = [required] an object representing the properties
                             *                      and values for the entity.
                             *          refresh     = [optional] defaults to false, if true,
                             *                      then we'll allow replacing the existing entity values.
                             *          fromDb      = [optional] defaults to false, used to indicate (if false) when the
                             *                        entity being added is from the db.  This has implications for
                             *                        when the changeMap is updated.
                             */
                            addEntity: function (state, payload) {
                                var verified = eejs.utils.verifyRequiredKeysPresentInObject(
                                    payload,
                                    ['collection', 'entity']
                                );
                                if (verified !== true && _.isObject(verified)) {
                                    throw new eejs.exception(
                                        'The payload for `addEntity` is missing a required key. Double-check and ' +
                                        'make sure there is a `collection` and `entity` key set (with appropriate values)'
                                    );
                                }
                                payload.refresh = !_.isUndefined(payload.refresh) ? payload.refresh : false;
                                payload.fromDb  = !_.isUndefined(payload.fromDb) ? payload.fromDb : false;
                                eejs.api.store.commitEntityToCollection(
                                    payload.collection,
                                    payload.entity,
                                    payload.refresh,
                                    payload.fromDb
                                );
                            },

                            /**
                             * Used to connect related items by ID in the store for all affected relations.
                             *
                             * Note: in general this mutation should not be committed to directly in vue components
                             * because it only adds the relation one way.  For example if you have an events collection
                             * and a datetimes collection.  When you add a related datetime to an event, you ideally want
                             * the relation to be represented not only in the events.relations.datetimes array, but ALSO
                             * updated in the datetimes.relations.events array.  So the preferable way to add relations
                             * is via the `addRelation` action as it will take care of that automatic replication of
                             * relations.
                             *
                             * @param {object} state  Vuex Store State
                             * @param {object} payload Expect an object with:
                             *      collection = [required] the main collection the relation is being added to (eg events)
                             *      collectionEntityId = The primary key of the collection the relation is being added to.
                             *      relation   = [required] the collection related to the main collection (eg datetimes)
                             *      relationEntityId = [required] The primary key of the relation being added.  This is
                             *                         expected to be an array|number.
                             *      doStoreCheck = [optional] expected to be boolean.  Used to indicate whether to
                             *                       do a storeCheck for the collection and throw an exception if its not
                             *                       present.  Otherwise if the collection doesn't exist, it just will
                             *                       return false. Defaults to true.
                             */
                            addRelationsForEntity: function (state, payload) {
                                var verified = eejs.utils.verifyRequiredKeysPresentInObject(
                                    payload,
                                    ['collection', 'collectionEntityId', 'relation', 'relationEntityId']
                                );
                                //make sure required payload items are here.
                                if (verified !== true && _.isObject(verified)) {
                                    throw new eejs.exception(
                                        'The payload for `addRelation` is missing a required property.  Double-check ' +
                                        'and make sure there is a `collection`, `collectionEntityId`, `relation`, and ' +
                                        '`relationEntityId` properties.'
                                    )
                                }

                                payload.doStoreCheck = _.isUndefined(payload.doStoreCheck) ? true : payload.doStoreCheck;

                                eejs.api.store.commitRelationsForEntity(
                                    payload.collection,
                                    payload.collectionEntityId,
                                    payload.relation,
                                    payload.relationEntityId,
                                    payload.doStoreCheck
                                );
                            },

                            /**
                             * Haven't fleshed the below methods out yet,
                             * they'll basically be used for removing things from the collection
                             * @param {object} state  Vuex store state
                             * @param {object} payload
                             */
                            removeRelationsForEntity: function (state, payload) {/*@todo*/
                            },
                            removeEntity:             function (state, payload) {/*@todo*/
                            },
                            removeEntityById:         function (state, payload) {/*@todo*/
                            }

                        },
                        actions:   {

                            /**
                             * Used to retrieve items for a collection and then adds it to the store.
                             * @param {object} context (access the store through this, so context.state, or context.state.events).
                             * @param {object} payload Expect an object with:
                             *      collection  = [required] the name of the collection being retrieved
                             *      queryString = [optional] an object containing the extra params you want added to the
                             *                    request.
                             *                    (see ee rest api docs for what extra query params can be used)
                             *      refresh     = [optional] defaults to false.
                             *                  When true then if the results match an existing entity in
                             *                  the collection they will be replaced.
                             *                  Otherwise the default behaviour is to only add
                             *                  entities that don't already exist (via checking the primary key).
                             *
                             * Note: one thing that we might want to do to improve this,
                             *      is move the actions and mutations to each individual module.
                             *      That way they don't have to be aware of any of the other
                             *      collections and can just handle their own.  The caveat to adding this to modules
                             *      is that it'd need to be a unique function name on each module because the way vuex
                             *      works is within modules it exports the actions/mutations/getters
                             *      to the global space so that when a specific function is called,
                             *      it acts on all modules with that function defined.
                             *      So we won't want necessarily be wanting to get
                             *      all collections for each module when we call it!
                             *
                             *      @see https://vuex.vuejs.org/en/modules.html for more info on namespacing etc to allow
                             *      doing this.
                             *
                             * @return Promise
                             */
                            fetchCollection: function (context, payload) {
                                return new Promise(function (resolve, reject) {
                                    var verified = eejs.utils.verifyRequiredKeysPresentInObject(
                                        payload,
                                        ['collection']
                                    );
                                    //make sure required payload items are here.
                                    if (verified !== true && _.isObject(verified)) {
                                        reject(
                                            'In order to get a collection, you need to specify the collection to' +
                                            ' retrieve via payload.collection.'
                                        );
                                    }

                                    //in order to successfully fetch, the collection must be registered as a module.
                                    if (_.isUndefined(context.state[payload.collection])) {
                                        reject(
                                            'In order to get a collection, the collection must be registered as a' +
                                            ' module in the collections store.'
                                        );
                                    }

                                    var endpointUri = context.getters.getCollectionEndpoint(payload.collection);

                                    payload.refresh = !_.isUndefined(payload.refresh) ? payload.refresh : false;

                                    //if not refreshing, then we're just returning the entities already in the store
                                    //state for this collection
                                    if (!payload.refresh) {
                                        resolve(context.state[payload.collection].entities);
                                    }

                                    //add the incoming query object to the endpoint.
                                    if (!_.isUndefined(payload.queryString)) {
                                        endpointUri = eejs.utils.addQueryStringToEndpointURI(
                                            payload.queryString,
                                            endpointUri);
                                    }

                                    //maybe add relations if they exist for the collection.
                                    endpointUri = eejs.utils.addRelationsToEndpointURI(payload.collection, endpointUri);

                                    //k made it here, so let's fetch the collection
                                    Vue.http.get(
                                        endpointUri
                                    ).then(function (response) {
                                        _.each(response.body, function (entity) {
                                            context.commit('addEntity',
                                                {
                                                    collection: payload.collection,
                                                    entity:     entity,
                                                    refresh:    payload.refresh,
                                                    fromDb:     true
                                                }
                                            )
                                        });
                                        resolve(response.body);
                                    }).catch(function (response) {
                                        //error handling
                                        reject(response);
                                    });
                                });
                            },

                            /**
                             * This fetches the related entities for the given entity.
                             * This first checks if there are related entities for the given entity in the store states.
                             * If there are, and payload.refresh isn't set or is false, then those will be returned.
                             * Otherwise, if payload.refresh is true, or there are no related entities set, this will
                             * query via the REST API endpoint for the relation collection.
                             * @param {object} context
                             * @param {object} payload Expect an object with:
                             *      collection  = [required] the name of the collection the given entity is for.
                             *      entityId = [required] the id of the entity getting relations for.
                             *      relation = [required] the relation retrieving related items for.
                             *      refresh     = [optional] defaults to false.
                             *                    When true, a REST API request is always done and any existing relations
                             *                    are replaced in the store state with the response of this request.
                             */
                            fetchRelatedForEntity: function (context, payload) {
                                return new Promise(function (resolve, reject) {
                                    //verify needed things in the payload are present
                                    var verified = eejs.utils.verifyRequiredKeysPresentInObject(
                                        payload,
                                        ['collection', 'entityId', 'relation']
                                    );
                                    if (verified !== true && _.isObject(verified)) {
                                        throw new eejs.exception('The following required keys are missing from the ' +
                                            'the payload object: ' + verified.join());
                                    }

                                    var refresh            = !_.isUndefined(payload.refresh) ? payload.refresh : false,
                                        relationEntities   = [],
                                        relation           = eejs.utils.inflection.pluralize(payload.relation),
                                        relationPrimaryKey = eejs.api.main.getPrimaryKeyForCollection(relation);

                                    //now that we have a our payload verified, let's see if there are already related objects
                                    //in the store state for the given collection (only done if no refresh).
                                    if (!refresh) {
                                        if (
                                            _.has(context.state[payload.collection], 'relations')
                                            && _.has(context.state[payload.collection].relations, relation)
                                            && _.has(
                                                context.state[payload.collection].relations[relation],
                                                payload.entityId
                                            )
                                        ) {
                                            //k we know the relations are in the store, so let's build up our list of relations
                                            //to return from the store state.
                                            relationEntities = _.map(
                                                context.state[payload.collection].relations[relation][payload.entityId],
                                                function (relationId) {
                                                    var primaryKeySearchObject                 = {};
                                                    primaryKeySearchObject[relationPrimaryKey] = relationId;
                                                    return _.findWhere(
                                                        context.state[relation].entities,
                                                        primaryKeySearchObject
                                                    );
                                                }
                                            );
                                            relationEntities = _.filter(
                                                relationEntities,
                                                function (entity) {
                                                    return !_.isUndefined(entity);
                                                }
                                            );
                                        }
                                    }

                                    //if relationEntities length is 0 or refresh is set, then lets do a fetch on the api.
                                    //Note: this will not fetch anything from the api if the entityId indicates a new object.
                                    if (
                                        (relationEntities.length === 0 || refresh)
                                        && !context.getters.isNewEntity(payload.entityId)
                                    ) {
                                        var relationQueryObject                                                                          = {},
                                            collectionSingularCapitalized                                                                = eejs.utils.inflection.transform(
                                                payload.collection,
                                                ['singularize', 'capitalize']
                                            ),
                                            collectionPrimaryKey                                                                         = eejs.api.main.getPrimaryKeyForCollection(
                                                payload.collection
                                            );
                                        relationQueryObject['where[' + collectionSingularCapitalized + '.' + collectionPrimaryKey + ']'] = payload.entityId;

                                        //return the Promise for fetchCollection
                                        context.dispatch(
                                            'fetchCollection',
                                            {
                                                "collection":  relation,
                                                "queryString": relationQueryObject
                                            }
                                        ).then(function (response) {
                                            resolve(response);
                                        }).catch(function (response) {
                                            reject(response)
                                        });
                                    } else {
                                        resolve(relationEntities);
                                    }
                                });
                            },

                            /**
                             * Fetches a specific entity by the value for its primary key.
                             * @param {object} context
                             * @param {object} payload  Expects the following as keys in the object:
                             *              collection  = [required] the collection the entity is being retrieved for.
                             *              entityId    = [required] the primaryKey id for the entity to retrieve.
                             */
                            fetchEntityById: function (context, payload) {
                                return new Promise(function (resolve, reject) {
                                    //verify needed things in the payload are present
                                    var verified = eejs.utils.verifyRequiredKeysPresentInObject(
                                        payload,
                                        ['collection', 'entityId']
                                    );

                                    if (verified !== true && _.isObject(verified)) {
                                        throw new eejs.exception('The following required keys are missing from the ' +
                                            'payload object: ' + verified.join());
                                    }

                                    var entityPrimaryKey = eejs.api.main.getPrimaryKeyForCollection(payload.collection),
                                        entity           = {},
                                        searchObj        = {},
                                        endpointUri      = context.getters.getCollectionEndpoint(payload.collection);

                                    payload.refresh = !_.isUndefined(payload.refresh) ? payload.refresh : false;

                                    //if not refreshing, see if the entity is in the store.
                                    if (!payload.refresh || context.getters.isNewEntity(payload.entityId)) {
                                        searchObj[entityPrimaryKey] = payload.entityId;
                                        entity                      = _.findWhere(context.state[payload.collection].entities, searchObj);
                                    }

                                    //if entity is undefined or we're refreshing and the entity isn't  a new object
                                    //then fetch using the api.
                                    if (
                                        (payload.refresh || _.isUndefined(entity))
                                        && !context.getters.isNewEntity(payload.entityId)
                                    ) {

                                        //add id to query string
                                        endpointUri = endpointUri + payload.entityId;

                                        //include any registered relations
                                        endpointUri = eejs.utils.addRelationsToEndpointURI(
                                            payload.collection,
                                            endpointUri
                                        );

                                        Vue.http.get(
                                            endpointUri
                                        ).then(function (response) {
                                            entity = response.body;
                                            //commit this to the store state
                                            context.commit(
                                                'addEntity',
                                                {
                                                    collection: payload.collection,
                                                    entity:     entity,
                                                    refresh:    payload.refresh,
                                                    fromDb:     true
                                                }
                                            );
                                            resolve(entity);
                                        }).catch(function (response) {
                                            reject(response);
                                        });
                                    } else {
                                        //if we made it here then that means we have
                                        // an entity in the that we can just resolve with
                                        resolve(entity);
                                    }
                                });
                            },

                            /**
                             * This adds specified relation ids to the store for the given collection
                             * and collection entity id.
                             *
                             * It is preferable to use this action instead of the `addRelationsForEntity` mutation directly
                             * to ensure that ALL cross relations are kept in sync in the store state.  For example, if
                             * you are adding a related datetime ID to an event, this will ensure that in the datetimes
                             * collection (if it exists) the evt_id is also registered as a relation on the datetime.
                             *
                             * @param {object} context
                             * @param {object} payload Expect an object with:
                             *      collection = [required] the main collection the relation is being added to (eg events)
                             *      collectionEntityId = The primary key of the collection the relation is being added to.
                             *      relation   = [required] the collection related to the main collection (eg datetimes)
                             *      relationEntityId = [required] The primary key of the relation being added.  This is
                             *                         expected to be an array|number.
                             */
                            addRelationByIds: function (context, payload) {
                                //this will throw an exception if the collection doesn't exist in the store.
                                context.commit('addRelationsForEntity', payload);
                                //let's reverse the payload and send it so that relations in reverse get added.
                                var relationPayload              = {};
                                relationPayload.collection       = payload.relation;
                                relationPayload.relation         = payload.collection;
                                relationPayload.relationEntityId = payload.collectionEntityId;
                                //we don't want any exception thrown.
                                relationPayload.doStoreCheck     = false;
                                //ensure relationEntityId is an array
                                payload.relationEntityId         = _.isArray(payload.relationEntityId)
                                    ? payload.relationEntityId
                                    : [payload.relationEntityId];

                                //k now loop through the relationEntityId and commit
                                _.each(payload.relationEntityId, function (id) {
                                    relationPayload.collectionEntityId = id;
                                    context.commit('addRelationsForEntity', relationPayload);
                                });
                            },

                            //below methods are just stubs for now, we don't have endpoints to handle them.
                            removeRelationsByIds: function (context, payload) {/*@todo*/
                            },
                            removeEntityById:     function (context, payload) {/*@todo*/
                            },
                            removeCollection:     function (context, payload) {/*@todo*/
                            },
                            saveEntityById:       function (context, payload) {/*@todo*/
                            },
                            saveNewEntities:      function (context, payload) {/*@todo*/
                            }
                        }
                    };
                    //initialize Vuex object and add to the eejs.api.store object.
                    eejs.api.store = new Vuex.Store(storeState);
                },
                /**
                 * Builds and caches all the modules that will be used for initialising the Vuex.store object.
                 */
                buildStoreModules                          = function () {
                    _.each(collections, function (collection) {
                        buildStoreModuleForCollection(collection);
                    });
                },
                /**
                 * Builds and caches a module for a given collection.
                 * @param {string} collection
                 * @returns {boolean}
                 */
                buildStoreModuleForCollection              = function (collection) {
                    if (!_.has(collectionsSchema, collection)) {
                        //return because we don't have a schema for this collection.
                        return false;
                    }
                    var collectionSchema     = collectionsSchema[collection];
                    storeModules[collection] = {
                        state: {
                            entities:           [],
                            /**
                             * This stores the relations and their ids for the collection.  So for example if the
                             * collection was events.  Then the 'datetime' relation object in here would be something like:
                             * ```
                             * relations: {'datetimes': { 236: [12,34,41], 456: [12] }
                             * ```
                             *
                             * The key is the EVT_ID for the event, the value is the array of DTT_ID's related to that event.
                             */
                            relations:          {},
                            primaryKey:         getPrimaryKeyFromSchema(collectionSchema),
                            /**
                             * This will set the actual properties object from the schema to this index. So keys will be
                             * the property name (i.e. 'EVT_ID', 'EVT_name' etc and the values will be the schema details
                             * for that property.  This can allow for rudimentary validation in the future as well.
                             */
                            allowedProperties:  getPropertiesFromSchema(collectionSchema),
                            collectionEndpoint: collection + '/',
                            /**
                             * These two properties are retrieved from the entity response.  Contains an object where keys
                             * are the values of the primary key for entities in this collection, and the value is the
                             * corresponding object for that entity.  So for _links it would be something like:
                             * _links : { 236: { .._linksobj_for_event_236}, 14: { ..linksobj_for_event_14} } ,
                             */
                            _links:             {},
                            _calculated_fields: {},
                            changeMap:          {
                                create:    [],
                                update:    [],
                                delete:    [],
                                relations: {}
                            }
                        }
                    };
                    return true;
                },
                /**
                 * Given a json schema object, returns the field designated as the primary key in the schema.
                 * @param {object} collectionSchema
                 * @returns {string}
                 */
                getPrimaryKeyFromSchema                    = function (collectionSchema) {
                    var primaryKey = '',
                        properties = getPropertiesFromSchema(collectionSchema);

                    _.each(properties, function (els, property) {
                        if (!_.isUndefined(els.primary_key) && els.primary_key) {
                            primaryKey = property;
                        }
                    });

                    if (primaryKey === '') {
                        throw new eejs.exception('Unable to discover primary key for the ' + collectionSchema.title + '.');
                    }
                    return primaryKey;
                },
                /**
                 * Given a json schema object, returns the properties (represents model field names like 'EVT_ID',
                 * 'EVT_name' etc.
                 *
                 * Note: although collectionSchema.properties has relations on that schema.  We do not include those
                 * relations in the response.  Instead, using this method, we assign those properties to the relations
                 * property on the collectionSchema object.
                 *
                 * @param {object} collectionSchema
                 * @returns {object}
                 */
                getPropertiesFromSchema                    = function (collectionSchema) {
                    if (_.isUndefined(collectionSchema.properties)) {
                        throw new eejs.exception('Unable to return properties for the ' + collectionSchema.title + '.');
                    }
                    //build our relations here because we want to exclude them from the properties.
                    var mainProperties         = {};
                    collectionSchema.relations = collectionSchema.relations || {};
                    _.each(collectionSchema.properties, function (els, property) {
                        if (!_.isUndefined(els.relation) && els.relation) {
                            //make sure we pluralize the relation so its consistent with collections.
                            property                             = eejs.utils.inflection.pluralize(property);
                            collectionSchema.relations[property] = els;
                        } else {
                            mainProperties[property] = els;
                        }
                    });
                    return mainProperties;
                },
                /**
                 * Takes care of building all the mixins and caching them on the mixins property.
                 * Also exposes built mixins on eejs.api.mixins.
                 */
                buildMixins                                = function () {
                    buildMainMixins();
                    buildRelationMixins();
                    buildComputedPropertiesMixinsForModels();
                    //add mixins to the exposed eejs.api.mixins object
                    eejs.api.mixins = mixins;
                },
                /**
                 * Builds the main mixins (mixins.collection, mixins.model)
                 */
                buildMainMixins                            = function () {
                    /**
                     * Added to vue components that represent a collection of model ee model entities.
                     * @type {object}
                     */
                    mixins.collection = {
                        collection: '',
                        store:      eejs.api.store,
                        props:      ['nameCollection'],
                        created:    function () {
                            /**
                             * if collection is provided (via the vue instance options object), then that gets used to
                             * initialize the collection from the store.  This allows client code to ignore the created
                             * components and create something completely custom
                             * For instance, something like (very basic example, obviously this example wouldn't be better
                             * than the pre-built component):
                             *
                             * var myEventsCollection = new eejs.api.vue({
                             *      app: '#my-view',
                             *      collection: 'events',
                             *      mixins: [eejs.api.mixins.collection]
                             * });
                             *
                             * Otherwise it is expected to be assumed from props in a parent component.
                             */
                            if (this.$options.collection !== '') {
                                //fetch collection set in store
                                this.fetch(true);
                            }
                        },
                        computed:   {
                            collectionName: function () {
                                return this.$options.collection !== '' ? this.$options.collection : this.nameCollection;
                            }
                        },
                        methods:    {
                            /**
                             * Fetches the collection
                             * @param {boolean} refresh  Forces a refresh of the existing entities in the store for the
                             *                           collection
                             */
                            fetch: function (refresh) {
                                var self                  = this,
                                    collectionCapitalized = eejs.utils.inflection.capitalize(this.collectionName);

                                //this is actually a promise, so will have to be handled appropriately.
                                this.$store.dispatch('fetchCollection', {
                                    collection: this.collectionName,
                                    refresh:    refresh
                                })
                                    .then(function () {
                                        //@todo, we could trigger some sort of property that the ui can use to indicate
                                        // a success in getting the collection.  A custom js event might be good?
                                        self['has' + collectionCapitalized] = true;
                                        self[self.collectionName]           = self.$store.state[self.collectionName].entities;
                                    })
                                    .catch(function (response) {
                                        console.log(response);
                                        //@todo, we could trigger some sort of property that the ui can use to indicate
                                        // a failure in getting the collection. A custom js event might be good?
                                        console.log('no ' + self.collectionName + ' retrieved');
                                    });
                            }
                        }
                    };

                    mixins.model = {
                        collection:             '',
                        id:                     0,
                        autoUpdate:             true,
                        initialUpdateCompleted: false,
                        skipInitialization:     false,
                        store:                  eejs.api.store,
                        props:                  ['collection'],
                        data:                   function () {
                            return {id: 0};
                        },
                        created:                function () {
                            if (this.$options.skipInitialization) {
                                return;
                            }
                            //make sure incoming $options.id is an integer
                            this.$options.id = this.$store.getters.isNewEntity(this.$options.id)
                                ? this.$options.id
                                : parseInt(this.$options.id);
                            /**
                             * There are three ways for determining what gets set as the model on the object:
                             * 1. Pass in the id via the `id` prop with the options when instantiating,
                             *    (eg eejs.api.components.event.id = 10);
                             * 2. A parent can pass in an ID for the model via the `initialId` prop. This triggers a
                             *    fetch via the REST API.
                             * 3. A parent can pass in a full object containing the things to replace defaults with via
                             *    the `initial{modelName}` (i.e. initialEvent) prop.  This latter does NOT trigger a fetch
                             *    via the REST API.*
                             *
                             * Note, these are hierarchical.  The last option overrides and of the previous and so on.
                             *
                             * If after all the other conditions the id prop is still equal to zero, then this will just
                             * become a default object with the id set to a temporary client side unique id.
                             */
                            if ((_.isString(this.$options.id) && this.$options.id !== '') || this.$options.id > 0) {
                                this.id = this.$options.id;
                                this.fetchById();
                            } else if (this.initialId) {
                                this.id = this.initialId;
                                this.fetchById();
                            } else if (!_.isEmpty(this['initial' + eejs.utils.inflection.capitalize(this.modelName())])) {
                                //if initial{modelname} is not empty, we'll populate from that object.
                                this.replaceDefaults(
                                    this['initial' + eejs.utils.inflection.capitalize(this.modelName())],
                                    false
                                );
                                //ensure that a unique id has been set.
                                this.ensureHasUniqueId();
                                //now we actually DO have an entity so we should set the `has_` property accordingly.
                                this['has' + eejs.utils.inflection.capitalize(this.modelName())] = true;
                                this.update();
                            } else if (this.id === 0) {
                                this.ensureHasUniqueId();
                                this['has' + eejs.utils.inflection.capitalize(this.modelName())] = true;
                                this.update();
                            }
                        },
                        mounted:                function () {
                        },
                        updated:                function () {
                            //set initalUpdated to true.
                            this.$options.initialUpdateCompleted = true;
                        },
                        computed:               {
                            collectionName: function () {
                                return this.$options.collection !== '' ? this.$options.collection : this.collection;
                            }
                        },
                        methods:                {
                            /**
                             * This fetches the entity for this model using the given id on the model.
                             * By default, if it doesn't already exist in the store, then the REST API will be used to
                             * retrieve and then commit it to the store.
                             * @param {boolean} refresh  True means that even if there is this entity in the store, it
                             *                           will be replaced/reverted to what is retrieved by the REST API.
                             *                           False means that if the entity is in the store state, that will
                             *                           be retrieved.
                             */
                            fetchById: function (refresh) {
                                var self = this;
                                this.$store.dispatch(
                                    'fetchEntityById',
                                    {collection: this.collectionName, entityId: this.id, refresh: refresh}
                                ).then(function (response) {
                                    /**
                                     * If the id represents a "new" object, and this object doesn't exist in the store
                                     * then let's make sure we update the store state with the defaults so the next fetch
                                     * will return it.
                                     */
                                    if (_.isUndefined(response) && self.$store.getters.isNewEntity(self.id)) {
                                        self.$set(
                                            self[self.modelName()],
                                            getPrimaryKeyFromSchema(collectionsSchema[self.collectionName]),
                                            self.id
                                        );
                                        self.update();
                                    } else {
                                        self[self.modelName()] = response;
                                    }
                                    self['has' + eejs.utils.inflection.capitalize(self.modelName())] = true;
                                }).catch(function (response) {
                                    console.log(response);
                                });
                            },

                            /**
                             * This method is used to override the default values for the field on the initial setup of
                             * the Data property.
                             * @param {object} replacements Should be what's replacing the model values in the data object.
                             * @param {boolean}   update       Whether or not to trigger an update in the store state after
                             *                              replacing.
                             */
                            replaceDefaults: function (replacements, update) {
                                var self     = this;
                                replacements = replacements || {};
                                update       = update || false;

                                //loop through each property for the model, if there's a value for this in replacements
                                //use that.
                                _.each(
                                    self[self.modelName()],
                                    function (fieldValue, fieldName) {
                                        if (_.has(replacements, fieldName)) {
                                            self.$set(
                                                self[self.modelName()],
                                                fieldName,
                                                replacements[fieldName]
                                            );
                                        }
                                    }
                                );
                                //update the store state if requested
                                if (update) {
                                    this.update();
                                }
                            },

                            /**
                             * Update the props in this instance to the store.state for this entity.
                             * If the entity doesn't exists then it will be added to the store state.  If it exists then
                             * it will be replaced with the current values of the entity from the local data.
                             */
                            update: function () {
                                this.$store.commit(
                                    'updateEntityById',
                                    {collection: this.collectionName, entity: this[this.modelName()]}
                                );
                            },
                            save:   function () {
                                /**
                                 * todo
                                 */
                            },
                            remove: function () {
                                /**
                                 * todo
                                 */
                            },

                            /**
                             * Returns whether the property representing the entity has been set yet or not.
                             * @returns {boolean}
                             */
                            isEmpty: function () {
                                return _.isEmpty(this[this.modelName()])
                                    || (
                                        _.size(this[this.modelName()]) === 1
                                        && _.has(this[this.modelName()], getPrimaryKeyFromSchema(
                                            collectionsSchema[this.collectionName])
                                        )
                                    )
                                    ;
                            },

                            /**
                             * Returns the collectionRecord for this entity from the state.
                             * @returns {object}
                             */
                            collectionRecord: function () {
                                return this.$store.state[this.collectionName];
                            },

                            /**
                             * Returns the singular collection name for this entity.
                             * @returns {string}
                             */
                            modelName: function () {
                                return eejs.utils.inflection.singularize(this.collectionName);
                            },

                            /**
                             * This basically ensures that a unique id is set for both the internal component `id`
                             * property and the entity ID.
                             */
                            ensureHasUniqueId: function () {
                                if (this.id > 0 || (_.isString(this.id) && this.id !== '')) {
                                    return;
                                }
                                var currentModelId = this[this.modelName()][
                                    getPrimaryKeyFromSchema(collectionsSchema[this.collectionName])
                                    ];
                                if ((currentModelId !== 0
                                        || (_.isString(currentModelId) && currentModelId !== '')
                                    )
                                    && !this.$store.getters.hasEntityInCollection(
                                        this.collectionName,
                                        this[this.modelName]
                                    )
                                ) {
                                    this.id = currentModelId;
                                    return;
                                }

                                //if we're still here, then that means we need to generate a unique ID.
                                this.id = eejs.utils.getUniqueId();
                                this.$set(
                                    this[this.modelName()],
                                    getPrimaryKeyFromSchema(collectionsSchema[this.collectionName]),
                                    this.id
                                );
                            }
                        }
                    };
                },
                /**
                 * Loops through each collection and builds all relation mixins for that collection.
                 */
                buildRelationMixins                        = function () {
                    _.each(collections, function (collection) {
                        buildRelationMixinForCollection(collection);
                    });
                },
                /**
                 * Builds a relation mixin for a specific collection.
                 * @param {string} collection
                 */
                buildRelationMixinForCollection            = function (collection) {
                    //we can only build relations mixins if we have the schema for this collection
                    if (!_.has(collectionsSchema, collection)) {
                        throw new eejs.exception(
                            'Unable to build any relation mixins for the ' + collection + 'because there is' +
                            'no schema registered for it.  Are you sure the collection was registered properly?'
                        );
                    }

                    var relationName      = '',
                        relationModelName = '';

                    if (_.has(collectionsSchema[collection], 'relations')) {
                        _.each(collectionsSchema[collection]['relations'], function (relationProperties, relation) {
                            relationModelName = _.has(relationProperties, 'relation_model')
                                ? relationProperties.relation_model
                                : relation;
                            relationName      = eejs.utils.inflection.humanize(relation, true).replace(' ', '_');
                            relation          = eejs.utils.inflection.pluralize(relation);
                            //note we only build relation mixins for which there is a registered collection for that relation.
                            if (_.indexOf(collections, relation) > -1) {
                                buildRelationMixinForCollectionAndRelation(collection, relation, relationName);
                            }
                        });
                    }
                },
                /**
                 * Builds a relation mixin for a specific collection and relation.
                 * @param {string} collection
                 * @param {string} relation
                 * @param {string} relationName
                 */
                buildRelationMixinForCollectionAndRelation = function (collection, relation, relationName) {
                    //if there is no collectionSchema for the collection or the relation then we can't build the mixin.
                    if (!_.has(collectionsSchema, collection)) {
                        throw new eejs.exception(
                            'Unable to build any relation mixins for the ' + collection + ' because there is' +
                            ' no schema registered for it. Are you sure the collection was registered properly?'
                        );
                    }
                    if (!_.has(collectionsSchema, relation)) {
                        throw new eejs.exception(
                            'Unable to build any relation mixins for the ' + collection + 'because there is' +
                            'no schema registered for its ' + relationName + ' relation. Are you sure the' +
                            'collection for ' + relation + ' was registered properly?'
                        );
                    }

                    var collectionSingular  = eejs.utils.inflection.singularize(collection),
                        capitalizedRelation = eejs.utils.inflection.capitalize(relation),
                        mixinMethods        = {};

                    mixins.relations                     = mixins.relations || {};
                    mixins.relations[collectionSingular] = mixins.relations[collectionSingular] || {};

                    mixinMethods['getRelated' + capitalizedRelation] = function () {
                        var self              = this,
                            queryStringObject = {};
                        this.$store.dispatch(
                            'fetchRelatedForEntity',
                            {
                                "collection": collection,
                                "entityId":   self.id,
                                "relation":   relation
                            }
                        ).then(function (response) {
                            //@todo, we could also trigger some sort of property that the ui can use to indicate a
                            //success in getting the related item. A custom js event might be good?
                            self['has' + capitalizedRelation] = true;
                            self[relation]                    = response
                        }).catch(function (response) {
                            //@todo, we could trigger some sort of property that the ui can use to indicate a failure in
                            //getting the related item.  A custom js event might be good?
                            console.log(response);
                        });
                    };

                    mixins.relations[collectionSingular][relation] = {
                        data:    function () {
                            var dataObject                          = {};
                            dataObject[relation]                    = [];
                            dataObject['has' + capitalizedRelation] = false;
                            return dataObject;
                        },
                        store:   eejs.api.store,
                        mounted: function () {
                            if (this[relation].length === 0 && this.id > 0) {
                                this['getRelated' + capitalizedRelation]();
                            }
                        },
                        methods: mixinMethods
                    }
                },
                /**
                 * Builds all components used by client code for creating a vue instance with.
                 * Assigns to the components property and exposes to client code via eejs.api.components
                 */
                buildComponents                            = function () {
                    _.each(collections, function (collection) {
                        buildComponentForCollection(collection);
                    });

                    // now after all the initial components have been built, we need to link any
                    // relation model components to their parent
                    // (ie. component.event will need component.datetime set on it).
                    _.each(components, function (componentObject, component) {
                        registerRelationComponentsForComponent(component);
                    });

                    //expose components on our global eejs.api object.
                    eejs.api.components = components;
                },
                /**
                 * Builds components for a specific collection (if not already built).
                 * @param {string} collection
                 */
                buildComponentForCollection                = function (collection) {
                    //get out if there is already a component for this collection
                    if (_.has(components, collection)) {
                        return;
                    }
                    var capitalizedCollection             = eejs.utils.inflection.capitalize(collection),
                        singularizedCollection            = eejs.utils.inflection.singularize(collection),
                        capitalizedSingularizedCollection = eejs.utils.inflection.singularize(capitalizedCollection),
                        mixinsForModelComponent           = [];

                    mixinsForModelComponent.push(mixins.model);

                    //first the model component
                    if (_.has(mixins.relations, singularizedCollection)) {
                        _.each(mixins.relations[singularizedCollection], function (relationMixinObject) {
                            mixinsForModelComponent.push(relationMixinObject);
                        });
                    }

                    //if we have computed mixins
                    if (_.has(mixins.computedProperties, collection)) {
                        mixinsForModelComponent.push(mixins.computedProperties[collection]);
                    }

                    components[singularizedCollection] = {
                        'collection': collection,
                        'props':      ['initial' + capitalizedSingularizedCollection, 'initialId'],
                        'data':       function () {
                            var dataObject                                        = {};
                            dataObject['has' + capitalizedSingularizedCollection] = false;
                            //set default for the model fields
                            dataObject[singularizedCollection]                    = populateDefaultFields(collection);
                            return dataObject;
                        },
                        'watch':      buildWatchersForEachModelField(collection),
                        'mixins':     mixinsForModelComponent
                    };

                    //next the collection component
                    components[collection] = {
                        "collection": collection,
                        "data":       function () {
                            var dataObject                            = {};
                            dataObject[collection]                    = [];
                            dataObject['has' + capitalizedCollection] = false;
                            return dataObject;
                        },
                        "mixins":     [mixins.collection]
                    };

                    components[collection]['components'] = components[collection]['components'] || {};

                    //make sure the collection component gets the model component registered with it.
                    components[collection]['components'][singularizedCollection] = components[singularizedCollection];
                },
                /**
                 * This is used to populate default fields for the entity data object on the model component.
                 * @param {string} collection The collection the fields are being populated from.
                 * @returns {object}
                 */
                populateDefaultFields                      = function (collection) {
                    var defaultFields = {};
                    _.each(
                        eejs.api.main.getDefaultsForCollection(collection),
                        function (fieldDefault, fieldName) {
                            defaultFields[fieldName] = fieldDefault;
                        }
                    );
                    return defaultFields;
                },
                /**
                 * Registers relation components on the given component.
                 * @param {string} component
                 */
                registerRelationComponentsForComponent     = function (component) {
                    //if the relation components on this component have already been registered or
                    //there are no relations for this component, then bail.
                    if (_.has(components[component], 'components') || !_.has(mixins.relations, component)) {
                        return;
                    }
                    //we can get the relations that need registered via the mixins
                    var singularizedRelation = '',
                        componentsToAdd      = {};
                    //okay there are relations so let's loop through and then add those to a components array for this
                    //component.
                    _.each(mixins.relations[component], function (relationObject, relation) {
                        singularizedRelation = eejs.utils.inflection.singularize(relation);
                        if (_.has(components, singularizedRelation)) {
                            componentsToAdd[singularizedRelation] = components[singularizedRelation];
                        }
                    });
                    components[component]['components'] = componentsToAdd;
                },
                /**
                 * This is used to build the watchObject for each model field for use in a registered model component.
                 * @param {string} collection  The model collection being built for (used to retrieve fields to use
                 *                             from schema.
                 * @return {object}
                 */
                buildWatchersForEachModelField             = function (collection) {
                    if (!_.has(collectionsSchema, collection)) {
                        throw new eejs.exception('There is no registered collection for ' + collection + '. Unable to' +
                            ' retrieve the schema for it to build watchers for the model fields.');
                    }
                    var modelName = eejs.utils.inflection.singularize(collection),
                        watchers  = {};
                    _.each(getPropertiesFromSchema(collectionsSchema[collection]), function (els, fieldName) {
                        watchers[modelName + '.' + fieldName] = function (value) {
                            //@todo could eventually do some validation in here I suppose
                            //@todo we could use the lodash .debounce to add some delay to this so it's not triggered on
                            //every update.
                            //note that the `initialUpdateCompleted` flag is used to ensure that when the first entity
                            //updates are done in the local state, we don't update in the store.  This is because the `create`
                            //hook is already taking care of updating the store state.  This has a huge impact on performance.
                            if (this.$options.autoUpdate && this.$options.initialUpdateCompleted) {
                                this.update();
                            }
                        }
                    });
                    return watchers;
                },
                /**
                 * Builds a computed properties mixin for each registered collection.  This is typically added to model
                 * components so that there is a linked computed property for each model field with the store state for
                 * that model.
                 */
                buildComputedPropertiesMixinsForModels     = function () {
                    _.each(collections, function (collection) {
                        buildComputedPropertiesMixinsForModel(collection);
                    });
                },
                /**
                 * Builds a computed properties mixin for the given collection.  This is typically added to model
                 * components so that there is a linked computed property for each model field with the store state for
                 * that model.
                 *
                 * @param {string} collection
                 */
                buildComputedPropertiesMixinsForModel      = function (collection) {
                    if (!_.has(collectionsSchema, collection)) {
                        throw new eejs.exception('There is no registered collection for ' + collection + '. Unable to' +
                            ' retrieve the schema for it to build computed properties on the model mixin.');
                    }

                    mixins.computedProperties                      = mixins.computedProperties || {};
                    mixins.computedProperties[collection]          = mixins.computedProperties[collection] || {};
                    mixins.computedProperties[collection].computed = mixins.computedProperties[collection].computed || {};

                    var setException = function (value) {
                        //computed properties can not be set.
                        throw eejs.exception('Setting this property (' + property + ') is not allowed.  It is ' +
                            'a computed property. The computed properties in the eejs.models are used for ' +
                            'representing the state of this model object in the store.  If the `autoUpdate` ' +
                            'flag was set to true on instantiation, then the store state will automatically be ' +
                            'updated whenever the local state has changed.  Otherwise it will have to be ' +
                            'triggered by calling the update method.');
                    };

                    _.each(getPropertiesFromSchema(collectionsSchema[collection]), function (els, property) {
                        //if the property is an object, that means there's different versions returned for this object
                        if (_.has(els, 'properties')) {
                            _.each(els.properties, function (el, propertyName) {
                                mixins.computedProperties[collection].computed[property + eejs.utils.inflection.capitalize(propertyName)] = {
                                    get: function () {
                                        var mainProp = this.$store.getters.getFieldValueFromEntityById(
                                            this.collectionName,
                                            this.id, property
                                        );
                                        /**
                                         * Keep in mind that even though this propertyName might exist in the schema, it
                                         * might not actually exist in the store.state because it requires permissions
                                         * that the consumer has not authed successfully for.
                                         */
                                        return _.has(mainProp, propertyName) ? mainProp[propertyName] : null;
                                    },
                                    set: setException
                                }
                            });
                        } else {

                            //property representation for each item in the value (i.e. `rendered` or `raw` or `pretty`)
                            mixins.computedProperties[collection].computed[property] = {
                                get: function () {
                                    return this.$store.getters.getFieldValueFromEntityById(
                                        this.collectionName,
                                        this.id,
                                        property
                                    );
                                },
                                set: setException
                            }
                        }
                    });
                },
                /**
                 * Returns whether the given collection has a valid route (via the api discovery route) or not.
                 * @param {string} collection
                 * @return {boolean}
                 */
                collectionHasRoute                         = function (collection) {
                    var endpoints = getEndpoints();
                    return _.find(endpoints, function (endpointObject, endpoint) {
                        return endpoint.endsWith(collection);
                    });
                };

            /**
             * Return the protected collections property.
             * @returns {array}
             */
            this.getRegisteredCollections = function () {
                return collections;
            };

            /**
             * This returns what has been set as the authentication method for this use.
             * @returns {string}
             */
            this.getAuthMethod = function () {
                return authenticationMethod;
            };

            /**
             * Return the protected collectionsSchema property
             * @returns {object}
             */
            this.getCollectionsSchema = function () {
                return collectionsSchema;
            };

            /**
             * Used to get the primary key for a given collection.
             * Note, if the collection is not registered, this will throw an exception.
             * @param {string} collection
             * @throws eejs.exception
             * @returns {string}
             */
            this.getPrimaryKeyForCollection = function (collection) {
                if (!_.has(collectionsSchema, collection)) {
                    throw new eejs.exception('There is no registered collection for ' + collection + ' so unable to ' +
                        'retrieve the primary key for it.');
                }
                return getPrimaryKeyFromSchema(collectionsSchema[collection]);
            };

            /**
             * Used to return the defaults property
             * @return {object}
             */
            this.getDefaults = function () {
                return defaults;
            };

            /**
             * Used to return the defaults for a specific collection (if present).
             * @param {string} collection
             * @return {object}
             */
            this.getDefaultsForCollection = function (collection) {
                if (_.isUndefined(collection)) {
                    throw new eejs.exception('You need to send in a string representing the registered collection you ' +
                        'want defaults for.');
                }

                if (!_.has(defaults, collection)) {
                    throw new eejs.exception('There is no defaults record for the ' + collection + ' collection. Was ' +
                        'that collection registered?');
                }

                return defaults[collection];
            };

            /**
             * This simply initializes the Main object.
             * @returns {Promise}
             */
            this.init = function () {
                return initialize();
            };

            /**
             * This allows client code to push additional collections to the main instance.
             * @param {array} collections
             */
            this.addCollections = function (collections) {
                //@todo this needs to return a Promise because it might use an httpRequest to setup the collections.

                //@todo for a new collection registered this would also have to build the vuex module for that
                // collection and then push to the existing Vuex store.

                //@todo will also need to build any new mixins for the new collection and add it
                // (along with possibly pushing to any existing relation mixins things that are related to this
                // collection.)

                //@todo will also need to add any new components built to other components that have a relation to each
                //new collection registered.
            };
        };

        //start ur engines.
        return new Promise(function (resolve, reject) {
            if (!(eejs.api.main instanceof Main)) {
                eejs.api.main = new Main(initialOptions);
                eejs.api.main.init().then(function () {
                    resolve()
                }).catch(function (e) {
                    reject(e);
                });
            } else {
                /**
                 * @todo Eventually in this else block, we'll call Main.addCollections to register new collections after
                 * Main has already been initialized.  For now we're not allowing it.
                 * @type {string}
                 */
                var msg = 'eejs.api.init has already been called in this request so it has been initialized.' +
                    ' If you wish to add more collections then use the eejs.api.main.addCollections method.';
                reject(msg);
            }
        });
    };
})(window);