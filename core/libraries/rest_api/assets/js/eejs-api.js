var Vue = require('vue');
var Vuex = require('vuex');
var VueResource = require('vue-resource');
var inflection = require('inflection');
var URI = require('urijs');

Vue.use(VueResource);


//custom vuex store methods.

/**
 * Checks if the entity is in the collection.
 * @param {string} collection
 * @param {object} entity
 * @returns {boolean}
 */
Vuex.Store.prototype.hasEntityInCollection = function(collection, entity) {
    //if there isn't even any collection matching what's requested then get out
    if ( _.isUndefined(this.state[collection]) ) {
        return false;
    }

    var primaryKey = this.state[collection].primaryKey,
        entityId   = entity[primaryKey],
        searchObj = {};

    //if entity primary key is empty at this point then we use the temporary key for entity id and
    //we'll make sure we're checking the collection for that temp_id match as well
    if ( _.isUndefined(entityId) || entityId === 0 ) {
        entityId = entity._id;
        primaryKey = '_id';
    }

    searchObj[primaryKey] = entityId;

    //now let's see if this entity is already in the collection
    return ! _.isUndefined( _.findWhere(this.state[collection].entities,searchObj ) );
};


/**
 * Replaces the entity in a collection.
 *
 * This method should only be called within a mutation.
 *
 * @param {string} collection
 * @param {object} entity
 * @returns {boolean}
 */
Vuex.Store.prototype.replaceEntityInCollection = function(collection, entity) {
    //if there isn't a collection matching in the store then get out
    if ( typeof(this.state[collection]) === 'undefined' ) {
        return false;
    }

    var primaryKey = this.state[collection].primaryKey,
        entityId = entity[primaryKey],
        searchObj = {},
        entityLocation = -1;

    //if entity primary key is empty at this point then we use the temporary key for entity id and
    //we'll make sure we're checking the collection for that temp_id match as well
    if ( _.isUndefined(entityId) || entityId === 0 ) {
        entityId = entity._id;
        primaryKey = '_id';
    }
    searchObj[primaryKey] = entityId;
    entityLocation = _.findIndex(this.state[collection].entities, searchObj );

    //if there's no match, then there's no replacement so lets just push
    if ( entityLocation === -1 ) {
        this.state[collection].entities.push(entity);
    } else {
        var store = this;
        //replace the values with the incoming entity
        _.each(entity, function(value,prop){
            store.state[collection].entities[entityLocation][prop] = value;
        });
    }
};



/**
 * Retrieves the fully qualified endpoint uri for the collection.
 * @param {string} collection
 * @returns {string}
 */
Vuex.Store.prototype.getCollectionEndpoint = function(collection){
    //if there isn't a collection matching in the store or a restRoute then get out
    if (_.isUndefined(this.state[collection]) || _.isUndefined(this.state.restRoute)) {
        return '';
    }
    return this.state.restRoute + this.state[collection].collectionEndpoint;
};


/**
 * Used to connect related items by ID in the store for all affected relations.
 *
 * This method should never be called directly to modify the store but should be only used in mutations.
 *
 * @param {string} collection = [required] the main collection the relation is being added to (eg events)
 * @param {integer} collectionEntityId = The primary key of the collection the relation is being added to.
 * @param {string} relation   = [required] the collection related to the main collection (eg datetimes)
 * @param {integer} relationEntityId = [required] The primary key of the relation being added.  This is
 *                         expected to be an array|integer.
 * @param {boolean} doStoreCheck = [optional] expected to be boolean.  Used to indicate whether to
 *                       do a storeCheck for the collection and throw an exception if its not
 *                       present.  Otherwise if the collection doesn't exist, it just will
 *                       return false. Defaults to true.
 * @returns {boolean}
 */
Vuex.Store.prototype.commitRelationsForEntity = function(
    collection,
    collectionEntityId,
    relation,
    relationEntityId,
    doStoreCheck
) {
    //make sure all required properties are set
    if (_.isUndefined(collection)
        || _.isUndefined(collectionEntityId)
        || _.isUndefined(relation)
        || _.isUndefined(relationEntityId)
    ) {
        throw new eejs.exception(
            'The properties for `commitRelationsForEntity` are not all defined.  Double-check ' +
            'and make sure there is a `collection`, `collectionEntityId`, `relation`, and ' +
            '`relationEntityId` defined.'
        )
    }

    var state = this.state;

    doStoreCheck = _.isUndefined(doStoreCheck) ? true : doStoreCheck;

    //make sure relationEntityId is an array
    relationEntityId = _.isArray(relationEntityId)
        ? relationEntityId
        : [relationEntityId];

    //we can only add the relation to a collection that exists in the store!
    if ( _.has(state, collection) ) {
        state[collection]['relations'][relation] = _.has(state[collection]['relations'], relation)
            ? state[collection]['relations'][relation]
            : {};
        state[collection]['relations'][relation][collectionEntityId] = _.has(
                state[collection]['relations'][relation],
                collectionEntityId
            )
            ? state[collection]['relations'][relation][collectionEntityId]
            : [];
        //push our relation on to the store
        _.each(relationEntityId, function(id){
            state[collection]['relations'][relation][collectionEntityId].push(id);
        });
        //make sure we got uniq ids in the relation here.
        _.uniq(state[collection]['relations'][relation][collectionEntityId]);
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
 * @param {string} collection
 * @param {object} entity
 * @param {boolean} refresh
 */
Vuex.Store.prototype.commitEntityToCollection = function(collection, entity, refresh){
    //make sure required props are here
    if(_.isUndefined(collection) || _.isUndefined(entity)) {
        throw new eejs.exception('Either the collection or entity is missing.');
    }

    var state = this.state,
        self = this,
        entityToSave = {},
        relationIds = [],
        relationsToReplicate = {};

    refresh = _.isUndefined(refresh) ? false : refresh;

    //does this collection exist?
    if ( _.has(state,collection) ) {
        //is entity an object? Eventually we can add validation
        // to make sure only a valid entity is getting added.
        if ( _.isObject(entity) && ! _.isNull(entity) ) {
            //first detect if there are relations listed with the entity, if there are we
            //actually remove those from the entity and add them to the relation collection
            //and then also add a relation record for this collection and the other collection
            _.each(entity, function(fieldValue, fieldKey, entity){
                if(eejs.utils.isRelationOf(fieldKey,collection)){
                    //okay this field is for a relation, so let's go ahead and take care of
                    //committing it's entities, and then doing the relation commits.
                    //if the fieldValue is not an array let's make it an array.  This is needed
                    //because some relations are singular.
                    fieldValue = !_.isArray(fieldValue) ? [fieldValue] : fieldValue;
                    relationsToReplicate[eejs.utils.inflection.pluralize(fieldKey)] = fieldValue;
                } else {
                    entityToSave[fieldKey] = fieldValue;
                }
            });
        }

        //does this entity already exist?  If it does we do not allow overwrites by default
        //unless refresh is true.
        // the state is the source remember
        if (! self.hasEntityInCollection(collection,entityToSave) ) {
            state[collection].entities.push(entityToSave);
        } else if (refresh) {
            self.replaceEntityInCollection(collection,entityToSave)
        }

        //next let's loop through relationsToReplicate now that we have the filtered entity and add relations (which
        //includes commiting each relation entity.
        if (!_.isEmpty(relationsToReplicate)) {
            _.each(relationsToReplicate, function (relationObjects, relation) {
                relationIds = eejs.utils.getIdsFromEntities(relationObjects, state[relation].primaryKey);
                _.each(relationObjects, function (relationObject) {
                    self.commitEntityToCollection(relation, relationObject);
                    //then commit this entity as a relation on the entities relation!
                    self.commitRelationsForEntity(
                        relation,
                        relationObject[state[relation].primaryKey],
                        collection,
                        entity[state[collection].primaryKey]
                    );
                });
                self.commitRelationsForEntity(
                    collection,
                    entity[state[collection].primaryKey],
                    relation,
                    relationIds
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
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.lastIndexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

(function( window, undefined ) {
    'use strict';

    /**
     * initialize eejs and eejs.api
     */
    window.eejs = window.eejs || {};
    eejs.api = eejs.api || {};
    eejs.data = eejs.data || {};
    eejs.api.mixins = eejs.api.mixins || {};
    eejs.api.components = eejs.api.components || {};
    eejs.utils = eejs.utils || {};


    //expose Vue and Vuex on eejs.
    eejs.vue = Vue;
    eejs.vuex = Vuex;

    //add inflection to the utils
    eejs.utils.inflection = inflection;
    //add URI.js to the utils
    eejs.utils.URI = URI;


    /**
     * For adding relations to a collection to the fetch query for a collection.
     * @param {string} collection
     * @param {string} endpointUri
     * @returns {string}
     */
    eejs.utils.addRelationsToEndpointURI = function(collection, endpointUri) {
        var collectionsSchema = eejs.api.main.getCollectionsSchema();
        //does this collection have a schema or relations on the collection schema for this collection?
        if (!_.has(collectionsSchema, collection) || !_.has(collectionsSchema[collection], 'relations')) {
            return endpointUri;
        }

        _.each(collectionsSchema[collection].relations, function(relationObject, relation){
            //only add the relation to the endpoint query IF that relation collection is registered.
            if (_.has(collectionsSchema,relation)) {
                //get the singularized capitalized value for the relation
                relation = eejs.utils.inflection.transform(relation, ['singularize', 'capitalize']);
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
    eejs.utils.addQueryStringToEndpointURI = function(queryStringObject, endpointUri) {
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
    eejs.utils.isRelationOf = function(relation, collection) {
        var collectionsSchema = eejs.api.main.getCollectionsSchema();
        //make sure relation is pluralized
        relation = eejs.utils.inflection.pluralize(relation);

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
    eejs.utils.verifyRequiredKeysPresentInObject = function(payload, requiredKeys) {
       var missing = [];
       if (!_.isArray(requiredKeys) && !_.isObject(payload)) {
           throw new eejs.exception( 'The eejs.utils.verifyRequiredKeysPresentInObject method must have a payload ' +
               'object as the first argument, and a requiredKeys array as the second argument.');
       }

       _.each( requiredKeys, function(key) {
          if (!_.has(payload, key)) {
              missing.push(key);
          }
       });

       return missing.length === 0 ? true : missing;
    };




    /**
     * This simply returns an array of ids for the given collection entities using the primaryKey
     * @param {array} entities
     * @param {integer} primaryKey
     * @returns {array}
     */
    eejs.utils.getIdsFromEntities = function(entities,primaryKey) {
        //if there is not a primaryKey set, then we have no way of knowing what values to assemble!
        if (_.isUndefined(primaryKey)) {
            throw new eejs.exception('Unable to return ids because the primaryKey argument is not defined.');
        }

        var ids = [];

        //if entities is not an array let's make sure its an array!
        entities = !_.isArray(entities) ? [entities] : entities;
        _.each(entities, function(entity){
           if(_.has(entity,primaryKey)) {
              ids.push(entity[primaryKey]);
           }
        });
        return ids;
    };



    /**
     * This is a wrapper for the eejs.api.main object that is used
     * for initializing our Vuex store and all the collections and mixins
     * that will be used for any views interacting with the EE api.
     * that should be initialized for the view.
     * @param initialOptions
     */
    eejs.api.init = function(initialOptions) {
        // private object internal to eejs.api.init that will be exposed as an instance on eejs.api.main
        var Main = function (options) {
            //initialOptions must contain a collections property
            if (! _.isObject(options) && _.isUndefined(options.collections)) {
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
            var initialOptions = options,
                /**
                 * Array of successfully registered collections ('events', 'datetimes' etc)
                 * @type {Array}
                 */
                collections = [],
                /**
                 * Cache of the response from pinging the discovery route.
                 * @type {object}
                 */
                discoveryCache = null,
                /**
                 * Base url for accessing the REST api.
                 * @type {string}
                 */
                restRoute = '',
                /**
                 * Cache of the object used to initialize the Vuex.store instance.
                 * @type {object}
                 */
                storeState = {},
                /**
                 * A cache of the collections json schema's retrieved from the collection REST endpoint.
                 * @type {object}
                 */
                collectionsSchema = {},
                /**
                 * A cache of the built modules used to initialize the Vuex.store instance.
                 * @type {object}
                 */
                storeModules = {},
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
                 * @type {object}
                 */
                mixins = {},
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
                components = {};

            /**
             * This initializes eejs.api and builds all the various components, mixins etc. that are then
             * exposed for client code to use in constructing a Vue instance.
             * @return Promise
             */
            var initialize = function() {
                return new Promise( function(resolve,reject) {
                    //set the restRoute property
                    if (_.isUndefined(eejs.data.paths)
                        && _.isUndefined(eejs.data.paths.rest_route)
                    ){
                        throw new eejs.exception(
                            'In order to initialize eejs.api, there must be a rest route exposed' +
                            ' via `eejs.data.paths.rest_route` property.  Unable to find that.'
                        );
                    }
                    restRoute = eejs.data.paths.rest_route;
                    initDiscoverAPI().then( function() {
                            validateCollections(initialOptions.collections);
                            registerCollections(initialOptions.collections);
                            return setSchemaForEachCollection(initialOptions.collections);
                        }).then( function(){
                            buildStore();
                            buildMixins();
                            buildComponents();
                            resolve();
                        }).catch( function(error){
                            reject(error);
                        });
                    });
                },
                /**
                 * Used to validate any collections sent in.
                 * Ensures that:
                 * 1. The incoming collections are in an array.
                 * 2. There is a valid REST route for the collection.
                 *
                 * @param {array} collectionsToValidate
                 */
                validateCollections = function(collectionsToValidate) {
                    if (! _.isArray(collectionsToValidate) ) {
                        throw new eejs.exception('Incoming collections must be an array of collections.');
                    }
                    _.each(collectionsToValidate, function(collection){
                        if (! collectionHasRoute(collection) ) {
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
                registerCollections = function(newCollections){
                    if (! _.isArray(newCollections)){
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
                setSchemaForEachCollection = function(collectionsForSchema){
                    return Promise.all( _.map(collectionsForSchema, function(collection){
                        return setSchemaForCollection(collection)
                    }));
                },
                /**
                 * This sets the schema for a given collection to the collectionsSchema property.
                 * @param {string} collection
                 * @returns {boolean|Promise}
                 */
                setSchemaForCollection = function(collection){
                    //only do the http request if needed.
                    if ( _.has(collectionsSchema,collection) ) {
                        return true;
                    }
                    //nope no schema yet so lets do the http options request to get it.
                    var optionsRequest = {
                        Options: {method: 'OPTIONS'}
                    };
                    var resource = Vue.resource(restRoute+collection, {}, optionsRequest);
                    return resource.Options().then(function(response){
                        collectionsSchema[collection] = response.body.schema;
                    });
                },
                /**
                 * If the discoveryCache has not been set, then this does the initial query to the base RestRoute for
                 * the autodiscovery response.
                 * @returns {*|Promise$1}
                 */
                initDiscoverAPI = function() {
                    return new Promise( function(resolve, reject) {
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
                getEndpoints = function() {
                    //discoveryCache should have the body of the endpoints
                    return ! _.isNull(discoveryCache) && ! _.isUndefined(discoveryCache.routes)
                        ? discoveryCache.routes
                        : {};
                },
                /**
                 * This method kicks off building the Vuex.store instance and assigns it to eejs.api.collections
                 */
                buildStore = function() {
                    //build modules for the collections
                    buildStoreModules();
                    storeState = {
                        state: {
                            "restRoute": restRoute
                        },
                        modules: storeModules,
                        getters: {},
                        mutations: {
                            /**
                             * Used to set a value on a model.
                             * @param {object} state  Vuex store state
                             * @param {object} payload Expected to be an object with model, changes and filter keys.
                             *                model =   the name of the model the value is being set on
                             *                          (the pluralized slug).
                             *                changes = an object of key value pairs for the properties
                             *                          and values being changed on the model
                             *                id =      the value of the primary key for the model entity being updated.
                             *
                             */
                            updateEntityById: function( state, payload ) {
                                //make sure we have required payload items here.
                                if (! _.has(payload,'model' ) || ! _.has(payload,'changes') || !_.has(payload,'id') ) {
                                    throw new eejs.exception(
                                        'The payload for `setById` is missing a required key.  Double-check and make' +
                                        ' sure there is a `model`, `changes` and `id` key set.'
                                    );
                                }
                                if (_.has(state,payload.model+'s')) {
                                    //get existing model entity if present and then add it
                                    //not sure if I need this so just leaving for now.
                                }
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
                             */
                            addEntity: function( state, payload ) {
                                //make sure required payload items are here.
                                if (!_.has(payload,'collection') || !_.has(payload,'entity') ) {
                                    throw new eejs.exception(
                                        'The payload for `addEntity` is missing a required key. Double-check and ' +
                                        'make sure there is a `collection` and `entity` key set (with appropriate values)'
                                    );
                                }
                                var refresh = _.isUndefined(payload.refresh) ? false : payload.refresh;
                                eejs.api.collections.commitEntityToCollection(payload.collection,payload.entity,refresh);
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
                             *                         expected to be an array|integer.
                             *      doStoreCheck = [optional] expected to be boolean.  Used to indicate whether to
                             *                       do a storeCheck for the collection and throw an exception if its not
                             *                       present.  Otherwise if the collection doesn't exist, it just will
                             *                       return false. Defaults to true.
                             */
                            addRelationsForEntity: function(state, payload) {
                                //make sure required payload items are here.
                                if (! _.has(payload,'collection')
                                    || ! _.has(payload,'collectionEntityId')
                                    || ! _.has(payload,'relation')
                                    || ! _.has(payload,'relationEntityId')
                                ) {
                                    throw new eejs.exception(
                                        'The payload for `addRelation` is missing a required property.  Double-check ' +
                                        'and make sure there is a `collection`, `collectionEntityId`, `relation`, and ' +
                                        '`relationEntityId` properties.'
                                    )
                                }

                                payload.doStoreCheck = _.isUndefined(payload.doStoreCheck) ? true : payload.doStoreCheck;

                                eejs.collections.commitRelationsForEntity(
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
                            removeRelationsForEntity: function(state,payload){/*@todo*/},
                            removeEntity: function(state,payload){/*@todo*/},
                            removeEntityById: function(state,payload){/*@todo*/}

                        },
                        actions: {

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
                             *      collections and can just handle their own.
                             *
                             * Note: the caveat to adding this to modules is that it'd need to be
                             *      a unique function name on each module because the way vuex works
                             *      is within modules it exports the actions/mutations/getters
                             *      to the global space so that when a specific function is called,
                             *      it acts on all modules with that function defined.
                             *      So we won't want necessarily be wanting to get
                             *      all collections for each module when we call it!
                             *
                             * @return Promise
                             */
                            fetchCollection: function( context, payload ) {
                                return new Promise( function(resolve, reject) {
                                    if ( _.isUndefined(payload.collection) || payload.collection === '' ) {
                                        reject(
                                            'In order to get a collection, you need to specify the collection to' +
                                            ' retrieve via payload.collection.'
                                        );
                                    }

                                    //in order to successfully fetch, the collection must be registered as a module.
                                    if ( _.isUndefined(context.state[payload.collection]) ) {
                                        reject(
                                            'In order to get a collection, the collection must be registered as a' +
                                            ' module in the collections store.'
                                        );
                                    }

                                    var endpointUri = eejs.api.collections.getCollectionEndpoint(payload.collection),
                                        refresh = _.isUndefined(payload.refresh) ? false : payload.refresh;


                                    //add the incoming query object to the endpoint.
                                    if (!_.isUndefined(payload.queryString)) {
                                        endpointUri = eejs.utils.addQueryStringToEndpointURI(
                                            payload.queryString,
                                            endpointUri);
                                    }

                                    //maybe add relations if they exist for the collection.
                                    endpointUri = eejs.utils.addRelationsToEndpointURI(payload.collection,endpointUri);

                                    //k made it here, so let's fetch the collection
                                    Vue.http.get(
                                        endpointUri
                                    ).then(function(response) {
                                        _.each( response.body, function(entity){
                                            context.commit('addEntity',
                                                {
                                                    collection: payload.collection,
                                                    entity: entity,
                                                    refresh: refresh
                                                }
                                            )
                                        });
                                        resolve(response.body);
                                    }).catch(function(response){
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
                            fetchRelatedForEntity: function(context,payload) {
                                return new Promise( function(resolve, reject) {
                                    //verify needed things in the payload are present
                                    var verified = eejs.utils.verifyRequiredKeysPresentInObject(
                                        payload,
                                        ['collection','entityId','relation']
                                    );
                                    if (verified !== true && _.isObject(verified)) {
                                        throw new eejs.exception('The following required keys are missing from the ' +
                                            'the payload object: ' + verified.join());
                                    }

                                    var refresh = _.isUndefined(payload.refresh) ? false : payload.refresh,
                                        relationEntities = [],
                                        relation = eejs.utils.inflection.pluralize(payload.relation),
                                        relationPrimaryKey = eejs.api.main.getPrimaryKeyForCollection(relation);

                                    //now that we have a our payload verified, let's see if there are already related objects
                                    //in the store state for the given collection (only done if no refresh).
                                    if (! refresh) {
                                        if (_.has(context.state[payload.collection], 'relations')
                                            && _.has(context.state[payload.collection].relations, relation)
                                            && _.has(context.state[payload.collection].relations[relation],payload.entityId)
                                        ) {
                                            //k we know the relations are in the store, so let's build up our list of relations
                                            //to return from the store state.
                                            relationEntities = _.map(
                                                context.state[payload.collection].relations[relation][payload.entityId],
                                                function(relationId){
                                                    var primaryKeySearchObject = {};
                                                    primaryKeySearchObject[relationPrimaryKey] = relationId;
                                                    return _.findWhere(context.state[relation].entities, primaryKeySearchObject);
                                                }
                                            );
                                            relationEntities = _.filter(
                                                    relationEntities,
                                                    function(entity){
                                                        return ! _.isUndefined(entity);
                                                    }
                                                );
                                        }
                                    }

                                    //if relationEntities length is 0 or refresh is set, then lets do a fetch on the api.
                                    if ( relationEntities.length === 0 || refresh ) {
                                        var relationQueryObject = {},
                                            collectionSingularCapitalized = eejs.utils.inflection.transform(
                                                payload.collection,
                                                ['singularize', 'capitalize']
                                            ),
                                            collectionPrimaryKey = eejs.api.main.getPrimaryKeyForCollection(payload.collection);
                                            relationQueryObject['where[' + collectionSingularCapitalized + '.' + collectionPrimaryKey+ ']'] = payload.entityId;

                                        //return the Promise for fetchCollection
                                        context.dispatch(
                                            'fetchCollection',
                                            {
                                                "collection" : relation,
                                                "queryString" : relationQueryObject
                                            }
                                        ).then( function(response){
                                            resolve(response);
                                        }).catch( function(response){
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
                             * @param {object} payload
                             */
                            fetchEntityById: function(context,payload) {
                                /**
                                 * @todo add in here the script for fetching an entity by id and adding it to the
                                 * collection state.
                                 * addEntityById can then call this when its refreshing
                                 */
                            },

                            /**
                             * This ensures an entity with the given id is in the collection or added to it.
                             * Optionally will refresh the entity in the collection.
                             * @param {object} context
                             * @param {object} payload  Expect an object with:
                             *      collection  = [required] the collection the entity is being retrieved for.
                             *      id          = [required] the primaryKey id for the entity to retrieve.
                             *      refresh     = [optional] default to false.  If included, and true,
                             *                  then this will retrieve from the db regardless of whether
                             *                  its in the store state or not and will replace whats in
                             *                  the collection with what gets retrieved.
                             * @return entity object.
                             */
                            addEntityById: function( context, payload ) {
                                return new Promise( function(resolve, reject) {
                                    if (_.isUndefined(payload.id) || _.isUndefined(payload.collection)) {
                                        reject(
                                            'Unable to retrieve an entity from this collection because both id and' +
                                            ' collection is required, and either of those (or both) is missing!'
                                        );
                                    }

                                    var primaryKey = context.state[payload.collection].primaryKey,
                                        refresh = ! _.isUndefined(payload.refresh) ? payload.refresh : false,
                                        entity = {};


                                    // do a search for an entity that matches the primaryKey or `_id`
                                    // for the given id in the payload but only if ! refresh
                                    if ( ! refresh ) {
                                        entity = _.find(context.state[payload.collection].entities, function (entity) {
                                            return entity[primaryKey] === payload.id || entity._id === payload.id;
                                        });
                                    }
                                    // if entity doesn't have an id then we know
                                    // its not retrieved yet, so let's attempt via the db.
                                    if ( _.isUndefined(entity) || _.isUndefined(entity[primaryKey]) || refresh ) {
                                        Vue.http.get(
                                            context.state.restRoute
                                            + context.state[payload.collection].collectionEndpoint
                                            + payload.id
                                        ).then(function(response){
                                            context.commit('addEntity',
                                                {
                                                    collection: payload.collection,
                                                    entity: response.body,
                                                    refresh: true
                                                }
                                            );
                                            resolve(response.body);
                                        })
                                            .catch(function(response){
                                                //error handling
                                                reject();
                                            });
                                    } else {
                                        resolve(entity);
                                    }
                                });
                            },


                            /**
                             * This adds specified relation ids to the store for the given collection and collection entity
                             * id.
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
                             *                         expected to be an array|integer.
                             */
                            addRelationByIds: function(context,payload){
                                //this will throw an exception if the collection doesn't exist in the store.
                                context.commit('addRelationsForEntity', payload);
                                //let's reverse the payload and send it so that relations in reverse get added.
                                var relationPayload = {};
                                relationPayload.collection = payload.relation;
                                relationPayload.relation = payload.collection;
                                relationPayload.relationEntityId = payload.collectionEntityId;
                                //we don't want any exception thrown.
                                relationPayload.doStoreCheck = false;
                                //ensure relationEntityId is an array
                                payload.relationEntityId = _.isArray(payload.relationEntityId)
                                    ? payload.relationEntityId
                                    : [payload.relationEntityId];

                                //k now loop through the relationEntityId and commit
                                _.each(payload.relationId, function(id){
                                   relationPayload.collectionEntityId = id;
                                   context.commit('addRelationsForEntity', relationPayload);
                                });
                            },

                            //below methods are just stubs for now, we don't have endpoints to handle them.
                            removeRelationsByIds: function(context,payload){/*@todo*/},
                            removeEntityById: function(context,payload){/*@todo*/},
                            removeCollection: function(context,payload){/*@todo*/},
                            saveEntityById: function(context,payload){/*@todo*/},
                            saveNewEntities: function(context,payload){/*@todo*/}
                        }
                    };
                    //initialize Vuex object and add to the eejs.api.collections object.
                    eejs.api.collections = new Vuex.Store(storeState);
                },
                /**
                 * Builds and caches all the modules that will be used for initialising the Vuex.store object.
                 */
                buildStoreModules = function() {
                   _.each(collections, function(collection){
                       buildStoreModuleForCollection(collection);
                   });
                },
                /**
                 * Builds and caches a module for a given collection.
                 * @param {string} collection
                 * @returns {boolean}
                 */
                buildStoreModuleForCollection = function(collection) {
                    if ( ! _.has(collectionsSchema,collection) ) {
                        //return because we don't have a schema for this collection.
                        return false;
                    }
                    var collectionSchema = collectionsSchema[collection];
                    storeModules[collection] = {
                        state: {
                            entities:[],
                            /**
                             * This stores the relations and their ids for the collection.  So for example if the
                             * collection was events.  Then the 'datetime' relation object in here would be something like:
                             * ```
                             * relations: {'datetimes': [12,34,41]}
                             * ```
                             */
                            relations:{},
                            primaryKey: getPrimaryKeyFromSchema(collectionSchema),
                            /**
                             * This will set the actual properties object from the schema to this index. So keys will be
                             * the property name (i.e. 'EVT_ID', 'EVT_name' etc and the values will be the schema details
                             * for that property.  This can allow for rudimentary validation in the future as well.
                             */
                            allowedProperties: getPropertiesFromSchema(collectionSchema),
                            collectionEndpoint: collection + '/'
                        }
                    };
                    return true;
                },
                /**
                 * Given a json schema object, returns the field designated as the primary key in the schema.
                 * @param {object} collectionSchema
                 * @returns {string}
                 */
                getPrimaryKeyFromSchema = function(collectionSchema){
                    var primaryKey = '',
                        properties = getPropertiesFromSchema(collectionSchema);

                    _.each(properties, function(els, property){
                       if (! _.isUndefined(els.primary_key) && els.primary_key ) {
                           primaryKey = property;
                       }
                    });

                    if (primaryKey === '') {
                        throw new eejs.exception('Unable to discover primary key for the '+collectionSchema.title+'.');
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
                getPropertiesFromSchema = function(collectionSchema) {
                    if (_.isUndefined(collectionSchema.properties)) {
                      throw new eejs.exception('Unable to return properties for the '+collectionSchema.title+'.');
                    }
                    //build our relations here because we want to exclude them from the properties.
                    var mainProperties = {};
                    collectionSchema.relations = collectionSchema.relations || {};
                    _.each(collectionSchema.properties, function(els, property){
                        if (!_.isUndefined(els.relation) && els.relation) {
                            //make sure we pluralize the relation so its consistent with collections.
                            property = eejs.utils.inflection.pluralize(property);
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
                buildMixins = function(){
                    buildMainMixins();
                    buildRelationMixins();
                    //add mixins to the exposed eejs.api.mixins object
                    eejs.api.mixins = mixins;
                },
                /**
                 * Builds the main mixins (mixins.collection, mixins.model)
                 */
                buildMainMixins = function() {
                    /**
                     * Added to vue components that represent a collection of model ee model entities.
                     * @type {object}
                     */
                    mixins.collection = {
                        collection: '',
                        store: eejs.api.collections,
                        props: ['nameCollection'],
                        created: function(){
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
                            if ( this.$options.collection !== '' ) {
                                //fetch collection set in store
                                this.fetch(true);
                            }
                        },
                        computed: {
                            collectionName : function() {
                                return this.$options.collection !== '' ? this.$options.collection : this.nameCollection;
                            }
                        },
                        methods: {
                            /**
                             * Fetches the collection
                             * @param {boolean} refresh  Forces a refresh of the existing entities in the store for the
                             *                           collection
                             */
                            fetch: function(refresh) {
                                var self = this,
                                    collectionCapitalized = eejs.utils.inflection.capitalize(this.collectionName);

                                //this is actually a promise, so will have to be handled appropriately.
                                this.$store.dispatch('fetchCollection', {collection:this.collectionName,refresh:refresh})
                                    .then( function(){
                                        //@todo, we could trigger some sort of property that the ui can use to indicate
                                        // a success in getting the collection.  A custom js event might be good?
                                        self['has'+collectionCapitalized] = true;
                                        self.events = self.$store.state[self.collectionName].entities;
                                    })
                                    .catch( function(response){
                                        console.log(response);
                                        //@todo, we could trigger some sort of property that the ui can use to indicate
                                        // a failure in getting the collection. A custom js event might be good?
                                        console.log('no ' + self.collectionName + ' retrieved');
                                    });
                            }
                        }
                    };

                    mixins.model = {
                        modelId: 0,
                        collection: '',
                        store: eejs.api.collections,
                        props: ['id','collection'],
                        created : function(){
                            /**
                             * If the primary key property is set then override modelId (but only if that isn't set).
                             * This allows client code to completely customize a model for a specific entity in a Vue
                             * instance instead of using a pre-built one.  So something like this:
                             *
                             * var myCustomEventModel = new eejs.api.vue({
                             *      app: '#my-custom-event-model',
                             *      collection: 'events',
                             *      modelId: 25,
                             *      mixins: [eejs.api.mixins.model]
                             * });
                             **/
                            if ( this.$options.modelId > 0 ) {
                                this.id = this.$options.modelId;
                                this.add();
                            }
                        },
                        computed: {
                            collectionName: function() {
                                return this.$options.collection !== '' ? this.$options.collection : this.collection;
                            }
                        },
                        methods: {
                            /**
                             * Adds an entity to the store.
                             * @param {boolean} refresh  When true, this will replace the existing entity in the store
                             *                           state with an id matching this entity.  Otherwise, if it
                             *                           already exists, what is there will NOT be replaced.
                             */
                            add: function(refresh){
                                var self = this;
                                this.$store.dispatch(
                                    'addEntityById',
                                    {collection:this.collectionName,id:this.id,refresh:refresh}
                                ).then( function(response){
                                    //@todo, we could trigger some sort of property that the ui can use to indicate a
                                    // success in adding the item.  A custom js event might be good?
                                    self.event = response;
                                })
                                .catch( function(response){
                                    //@todo, we could trigger some sort of property that the ui can use to indicate a
                                    // failure in adding the item.  A custom js event might be good?
                                    console.log(response);
                                });
                            },
                            save: function(){
                                /**
                                 * todo
                                 */
                            },
                            remove: function(){
                                /**
                                 * todo
                                 */
                            },

                            /**
                             * Returns whether the property representing the entity has been set yet or not.
                             * @returns {boolean}
                             */
                            isEmpty: function() {
                                return _.isEmpty(this[this.modelName()]);
                            },

                            /**
                             * Returns the collectionRecord for this entity from the state.
                             * @returns {object}
                             */
                            collectionRecord: function() {
                                return this.$store.state[this.collectionName];
                            },

                            /**
                             * Returns the singular collection name for this entity.
                             * @returns {string}
                             */
                            modelName: function() {
                                return eejs.utils.inflection.singularize(this.collectionName);
                            }
                        }
                    };
                },
                /**
                 * Loops through each collection and builds all relation mixins for that collection.
                 */
                buildRelationMixins = function() {
                    _.each(collections, function(collection){
                       buildRelationMixinForCollection(collection);
                    });
                },
                /**
                 * Builds a relation mixin for a specific collection.
                 * @param {string} collection
                 */
                buildRelationMixinForCollection = function(collection) {
                    //we can only build relations mixins if we have the schema for this collection
                    if ( ! _.has(collectionsSchema,collection) ) {
                        throw new eejs.exception(
                            'Unable to build any relation mixins for the ' + collection + 'because there is' +
                            'no schema registered for it.  Are you sure the collection was registered properly?'
                        );
                    }

                    var relationName = '',
                        relationModelName = '';

                    if (_.has(collectionsSchema[collection], 'relations')) {
                        _.each(collectionsSchema[collection]['relations'], function(relationProperties, relation){
                            relationModelName = _.has(relationProperties, 'relation_model')
                                ? relationProperties.relation_model
                                : relation;
                            relationName = eejs.utils.inflection.humanize(relation,true).replace(' ', '_');
                            relation = eejs.utils.inflection.pluralize(relation);
                            //note we only build relation mixins for which there is a registered collection for that relation.
                            if ( _.indexOf(collections,relation) > -1 ) {
                                buildRelationMixinForCollectionAndRelation(collection,relation,relationName);
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
                buildRelationMixinForCollectionAndRelation = function(collection, relation, relationName){
                    //if there is no collectionSchema for the collection or the relation then we can't build the mixin.
                    if (!_.has(collectionsSchema,collection)) {
                        throw new eejs.exception(
                            'Unable to build any relation mixins for the ' + collection + ' because there is' +
                            ' no schema registered for it. Are you sure the collection was registered properly?'
                        );
                    }
                    if (!_.has(collectionsSchema,relation)) {
                        throw new eejs.exception(
                            'Unable to build any relation mixins for the ' + collection + 'because there is' +
                            'no schema registered for its ' + relationName + ' relation. Are you sure the' +
                            'collection for ' + relation + ' was registered properly?'
                        );
                    }

                    var collectionPrimaryKey = getPrimaryKeyFromSchema(collectionsSchema[collection]),
                        collectionSingular = eejs.utils.inflection.singularize(collection),
                        collectionSingularCapitalized = eejs.utils.inflection.capitalize(collectionSingular),
                        capitalizedRelation = eejs.utils.inflection.capitalize(relation),
                        mixinMethods = {};

                    mixins.relations = mixins.relations || {};
                    mixins.relations[collectionSingular] = mixins.relations[collectionSingular] || {};

                    mixinMethods['getRelated'+capitalizedRelation] = function(){
                        var self = this,
                            queryStringObject = {};
                        this.$store.dispatch(
                            'fetchRelatedForEntity',
                            {
                                "collection": collection,
                                "entityId": self[collectionPrimaryKey],
                                "relation": relation
                            }
                        ).then( function(response){
                            //@todo, we could also trigger some sort of property that the ui can use to indicate a
                            //success in getting the related item. A custom js event might be good?
                            self['has'+capitalizedRelation] = true;
                            self[relation] = response
                        }).catch( function(response){
                            //@todo, we could trigger some sort of property that the ui can use to indicate a failure in
                            //getting the related item.  A custom js event might be good?
                            console.log(response);
                        });
                    };

                    mixins.relations[collectionSingular][relation] = {
                        data: function(){
                            var dataObject = {};
                            dataObject[collectionPrimaryKey] = this['initial'+collectionSingularCapitalized][collectionPrimaryKey];
                            dataObject[relation] = [];
                            dataObject['has'+capitalizedRelation] = false;
                            return dataObject;
                        },
                        store: eejs.api.collections,
                        mounted: function() {
                            if (this[relation].length === 0 && this[collectionPrimaryKey] > 0) {
                                this['getRelated'+capitalizedRelation]();
                            }
                        },
                        methods: mixinMethods
                    }
                },
                /**
                 * Builds all components used by client code for creating a vue instance with.
                 * Assigns to the components property and exposes to client code via eejs.api.components
                 */
                buildComponents = function() {
                    _.each(collections, function(collection){
                       buildComponentForCollection(collection);
                    });

                    // now after all the initial components have been built, we need to link any
                    // relation model components to their parent
                    // (ie. component.event will need component.datetime set on it).
                    _.each(components, function(componentObject, component){
                       registerRelationComponentsForComponent(component);
                    });

                    //expose components on our global eejs.api object.
                    eejs.api.components = components;
                },
                /**
                 * Builds components for a specific collection (if not already built).
                 * @param {string} collection
                 */
                buildComponentForCollection = function(collection){
                    //get out if there is already a component for this collection
                    if (_.has(components,collection)){
                        return;
                    }
                    var capitalizedCollection = eejs.utils.inflection.capitalize(collection),
                        singularizedCollection = eejs.utils.inflection.singularize(collection),
                        capitalizedSingularizedCollection = eejs.utils.inflection.singularize(capitalizedCollection),
                        mixinsForModelComponent = [];

                    //first the model component
                    if (_.has(mixins.relations, singularizedCollection)) {
                        _.each(mixins.relations[singularizedCollection], function(relationMixinObject){
                            mixinsForModelComponent.push(relationMixinObject);
                        });
                        mixinsForModelComponent.push(mixins.model);
                    }

                    components[singularizedCollection] = {
                        "collection": collection,
                        "props": ['initial' + capitalizedSingularizedCollection],
                        "data": function() {
                            var dataObject = {};
                            dataObject[singularizedCollection] = this['initial' + capitalizedSingularizedCollection];
                            dataObject['has' + capitalizedSingularizedCollection] = false;
                            return dataObject;
                        },
                        "mounted" : function() {
                            //if the {model} property is empty, and we have an id, then lets attempt to get the
                            // {model} property set.
                            if ( this.isEmpty() && this.id > 0 ) {
                                var self = this;
                                this.$store.dispatch('addEntityById', {collection:this.collectionName,id:this.id})
                                    .then( function(response){
                                        //@todo, we could trigger some sort of property that the ui can use to indicate
                                        // a success in getting the item.  A custom js event might be good?
                                        self[singularizedCollection] = response;
                                        self['has' + capitalizedSingularizedCollection] = true;
                                    })
                                    .catch( function(response){
                                        //@todo, we could trigger some sort of property that the ui can use to indicate
                                        // a failure in getting the item.  A custom js event might be good?
                                        console.log(response);
                                    });
                            }
                        },
                        "mixins" : mixinsForModelComponent
                    };

                    //next the collection component
                    components[collection] = {
                        "collection": collection,
                        "data": function() {
                            var dataObject = {};
                            dataObject[collection] = [];
                            dataObject['has' + capitalizedCollection] = false;
                            return dataObject;
                        },
                        "mixins": [mixins.collection]
                    };

                    components[collection]['components'] = components[collection]['components'] || {};

                    //make sure the collection component gets the model component registered with it.
                    components[collection]['components'][singularizedCollection] = components[singularizedCollection];
                },
                /**
                 * Registers relation components on the given component.
                 * @param {string} component
                 */
                registerRelationComponentsForComponent = function(component){
                    //if the relation components on this component have already been registered or
                    //there are no relations for this component, then bail.
                    if(_.has(components[component], 'components') || !_.has(mixins.relations,component)) {
                        return;
                    }
                    //we can get the relations that need registered via the mixins
                    var singularizedRelation = '',
                        componentsToAdd = {};
                    //okay there are relations so let's loop through and then add those to a components array for this
                    //component.
                    _.each(mixins.relations[component], function(relationObject, relation){
                        singularizedRelation = eejs.utils.inflection.singularize(relation);
                       if (_.has(components, singularizedRelation)){
                           componentsToAdd[singularizedRelation] = components[singularizedRelation];
                       }
                    });
                    components[component]['components'] = componentsToAdd;
                },
                /**
                 * Returns whether the given collection has a valid route (via the api discovery route) or not.
                 * @param {string} collection
                 * @return {boolean}
                 */
                collectionHasRoute = function(collection) {
                    var endpoints = getEndpoints();
                    return _.find(endpoints, function(endpointObject, endpoint){
                        return endpoint.endsWith(collection);
                    });
                };

            /**
             * Return the protected collections property.
             * @returns {array}
             */
            this.getRegisteredCollections = function() {
                return collections;
            };

            /**
             * Return the protected collectionsSchema property
             * @returns {object}
             */
            this.getCollectionsSchema = function() {
                return collectionsSchema;
            };


            /**
             * Used to get the primary key for a given collection.
             * Note, if the collection is not registered, this will throw an exception.
             * @param {string} collection
             * @throws eejs.exception
             * @returns {string}
             */
            this.getPrimaryKeyForCollection = function(collection) {
                if (! _.has(collectionsSchema, collection)) {
                    throw new eejs.exception( 'There is no registered collection for ' + collection + ' so unable to ' +
                        'retrieve the primary key for it.');
                }
                return getPrimaryKeyFromSchema(collectionsSchema[collection]);
            };


            /**
             * This simply initializes the Main object.
             * @returns {Promise}
             */
            this.init = function() {
                return initialize();
            };

            /**
             * This allows client code to push additional collections to the main instance.
             * @param {array} collections
             */
            this.addCollections = function(collections) {
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
        return new Promise(function(resolve, reject) {
            if ( ! (eejs.api.main instanceof Main) ) {
                eejs.api.main = new Main(initialOptions);
                eejs.api.main.init().then(function(){resolve()}).catch(function(e){
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