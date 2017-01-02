var Vue = require('vue');
var Vuex = require('vuex');
var VueResource = require('vue-resource');
var inflection = require('inflection');

Vue.use(VueResource);


//let's add some custom public methods that we'll use for our Vuex Store object.
Vuex.Store.prototype.hasEntityInCollection = function( collection, entity ) {
    //if there isn't even any collection matching what's requested then get out
    if ( typeof(this.state[collection]) === 'undefined' ) {
        return false;
    }

    var primaryKey = this.state[collection].primaryKey,
        entityId   = entity[primaryKey],
        searchObj = {};

    //if entity primary key is empty at this point then we use the temporary key for entity id and
    //we'll make sure we're checking the collection for that temp_id match as well
    if ( typeof(entityId) === 'undefined' || entityId === 0 ) {
        entityId = entity._id;
        primaryKey = '_id';
    }

    searchObj[primaryKey] = entityId;

    //now let's see if this entity is already in the collection
    return typeof( _.findWhere(this.state[collection].entities,searchObj ) !== 'undefined' );
};

Vuex.Store.prototype.replaceEntityInCollection = function( collection, entity ) {
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
    if ( typeof(entityId) === 'undefined' || entityId === 0 ) {
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

Vue.use(Vuex);

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
    eejs.api.main = {};
    eejs.utils = eejs.utils || {};


    //expose Vue and Vuex on eejs.
    eejs.vue = Vue;
    eejs.vuex = Vuex;

    //add inflection to the utils
    eejs.utils.inflection = inflection;


    /**
     * This is a wrapper for the eejs.api.main object that is used for initializing our Vuex store and all the collections
     * and mixins that will be used for any views interacting with the EE api.
     *                          that should be initialized for the view.
     * @param initialOptions
     */
    eejs.api.init = function( initialOptions ) {
        // private object internal to eejs.api.init that will be exposed as an instance on eejs.api.main
        var main = function (options) {
            //initialOptions must contain a collections property
            if (! _.isObject(options) && _.isUndefined(options)) {
                throw new eejs.exception('eejs.api.init must be initialized with an object that contains at least a collections property');
            }

            //verify that there is a rest route property set
            if (
                _.isUndefined(eejs.data.paths)
                && _.isUndefined(eejs.data.paths.rest_route)
            ) {
                throw new eejs.exception('eejs.data.paths.rest_route is not defined, unable to initialize the api library');
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
                 *
                 * @type {object}
                 */
                mixins = {},
                /**
                 * A cache of all the built components used by client code for creating a Vue instance.
                 * These are also exposed on the `eejs.api.components` property.
                 *
                 * There should be two components built for each registered collection.  So for instance for the `events`
                 * collection:
                 *
                 * eejs.api.components.events
                 * eejs.api.components.event
                 *
                 * @type {object}
                 */
                components = {};

            /**
             * This is invoked immediately on construct.
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
                        throw new eejs.exception('In order to initialize eejs.api, there must be a rest route exposed' +
                            ' via `eejs.data.paths.rest_route` property.  Unable to find that.');
                    }
                    restRoute = eejs.data.paths.rest_route;
                    initDiscoverAPI()
                    .then( function() {
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
            }(),
                /**
                 * Used to validate any collections sent in.
                 * Ensures that:
                 * 1. The incoming collections are in an array.
                 * 2. There is a valid REST route for the collection.
                 * @param collectionsToValidate
                 */
                validateCollections = function(collectionsToValidate) {
                    if (! _.isArray(collectionsToValidate) ) {
                        throw new eejs.exception('Incoming collections must be an array of collections.');
                    }
                    _.each(collectionsToValidate, function(collection){
                        if (! collectionHasRoute(collection) ) {
                            throw new eejs.exception('The incoming collection ('+collection+') does not have a' +
                                'corresponding route in the api. Doublecheck your spelling.');
                        }
                    });
                },
                /**
                 * Registers collections to the collections property.
                 * @param newCollections
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
                 * @param collectionsForSchema
                 * @return Promise
                 */
                setSchemaForEachCollection = function(collectionsForSchema){
                    return Promise.all( _.map(collectionsForSchema, function(collection){
                        return setSchemaForCollection(collection)
                    }));
                },
                /**
                 * This sets the schema for a given collection to the collectionsSchema property.
                 * @param collection
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
                    var resource = Vue.resource(restRoute+collection, optionsRequest);
                    return resource.Options().then(function(response){
                        collectionsSchema[collection] = response.body.schema;
                    }).catch(function(e){console.log(e);});
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
                                console.log(response);
                                reject(response);
                            });
                        }
                        resolve();
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
                             * @param state
                             * @param payload Expected to be an object with model, changes and filter keys.
                             *                model = the name of the model the value is being set on (the pluralized slug).
                             *                changes = an object of key value pairs for the properties and values being changed on the model
                             *                id = the value of the primary key for the model entity being updated.
                             *
                             */
                            updateEntityById: function( state, payload ) {
                                //make sure we have required payload items here.
                                if ( ! _.has(payload,'model' ) || ! _.has(payload,'changes') || !_.has(payload,'id') ) {
                                    throw new eejs.exception( 'The payload for `setById` is missing a required key.  Doublecheck and make sure' +
                                        'there is a `model`, `changes` and `id` key set.');
                                }
                                if ( _.has(state,payload.model+'s') ) {
                                    //get existing model entity if present and then add it
                                    //not sure if I need this so just leaving for now.
                                }
                            },

                            /**
                             * Used to add a complete entity to the specific collection in the state.
                             * @param state
                             * @param payload Expect an object with:
                             *          collection = [required] the name of the collection the entity is being added to.
                             *          entity = [required] an object representing the properties and values for the entity.
                             *          refresh = [optional] defaults to false, if true, then we'll allow replacing the existing entity values.
                             */
                            addEntity: function( state, payload ) {
                                //make sure required payload items are here.
                                if ( ! _.has(payload,'collection') || !_.has(payload,'entity') ) {
                                    throw new eejs.exception( 'The payload for `addEntity` is missing a required key. Doublecheck and' +
                                        'make sure there is a `collection` and `entity` key set (with appropriate values)');
                                }
                                var refresh = typeof( payload.refresh ) !== 'undefined' ? payload.refresh : false;
                                //does this collection exist?
                                if ( _.has(state,payload.collection) ) {
                                    //is entity an object? Eventually we can add validation to make sure only a valid entity is getting added.
                                    if ( _.isObject(payload.entity) && ! _.isNull(payload.entity) ) {
                                        //does this entity already exist?  If it does we do not allow overwrites, the state is the source remember
                                        if ( ! eejs.api.collections.hasEntityInCollection(payload.collection,payload.entity) ) {
                                            state[payload.collection].entities.push( payload.entity );
                                        } else if (refresh) {
                                            eejs.api.collections.replaceEntityInCollection(payload.collection,payload.entity)
                                        }
                                    }
                                }
                            },

                            /**
                             * Haven't fleshed the below methods out yet, they'll basically be used for removing things from the collection
                             * @param state
                             * @param payload
                             */
                            removeEntity: function(state,payload){/*@todo*/},
                            removeEntitybyId: function(state,payload){/*@todo*/}

                        },
                        actions: {
                            /**
                             * Used to retrieve items for a collection and then adds it to the store.
                             * @param context (access the store through this, so context.state, or context.state.events).
                             * @param payload Expect an object with:
                             *      collection = [required] the name of the collection being retrieved
                             *      queryString = [optional] a string in the format of extra conditions you want to refine the query to.
                             *                    (see ee rest api docs for formatting the query string)
                             *      refresh = [optional] defaults to false.  When true then if the results match an existing entity in
                             *                the collection they will be replaced.  Otherwise the default behaviour is to only add
                             *                entities that don't already exist (via checking the primary key).
                             *
                             * Note: one thing that we might want to do to improve this, is move the actions and mutations to each
                             *       individual module.  That way they don't have to be aware of any of the other collections and can just
                             *       handle their own.
                             *
                             * Note: the caveat to adding this to modules is that it'd need to be a unique function name on each module because
                             * the way vuex works is within modules it exports the actions/mutations/getters to the global space so taht
                             * when a specific function is called, it acts on all modules with that function defined.  So we won't want
                             * necessarily be wanting to get all collections for each module when we call it!
                             *
                             * @return Promise
                             */
                            fetchCollection: function( context, payload ) {
                                return new Promise( function(resolve, reject) {
                                    if ( _.isUndefined(payload.collection) || payload.collection === '' ) {
                                        reject( 'In order to get a collection, you need to specify the collection to retrieve' +
                                            ' via payload.collection.');
                                    }

                                    //in order to successfully fetch, the collection must be registered as a module.
                                    if ( _.isUndefined(context.state[payload.collection]) ) {
                                        reject( 'In order to get a collection, the collection must be registered as a module in' +
                                            'the collections store.');
                                    }

                                    var routeQueryString = ! _.isUndefined(payload.queryString)
                                            ? '?' + payload.queryString
                                            : '',
                                        refresh = typeof(payload.refresh) !== 'undefined' ? payload.refresh : false;

                                    //k made it here, so let's fetch the collection
                                    Vue.http.get(
                                        context.state.restRoute+context.state[payload.collection].collectionEndpoint
                                        + routeQueryString
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
                                        console.log(response);
                                        reject(response);
                                    });
                                });
                            },

                            /**
                             * This ensures an entity with the given id is in the collection or added to it.
                             * Optionally will refresh the entity in the collection.
                             * @param context
                             * @param payload  Expect an object with:
                             *      collection = [required] the collection the entity is being retrieved for.
                             *      id = [required] the primaryKey id for the entity to retrieve.
                             *      refresh = [optional] default to false.  If included, and true, then this will retrieve from the db
                             *           regardless of whether its in the store state or not and will replace whats in the collection with
                             *           what gets retrieved.
                             * @return entity object.
                             */
                            addEntitybyId: function( context, payload ) {
                                return new Promise( function(resolve, reject) {
                                    if (_.isUndefined(payload.id) || _.isUndefined(payload.collection)) {
                                        reject('Unable to retrieve an entity from this collection because both id and collection' +
                                            ' is required, and either of those (or both) is missing!');
                                    }

                                    var primaryKey = context.state[payload.collection].primaryKey,
                                        refresh = ! _.isUndefined(payload.refresh) ? payload.refresh : false,
                                        entity = {};


                                    //do a search for an entity that matches the primaryKey or `_id` for the given id in the payload but
                                    //only if ! refresh
                                    if ( ! refresh ) {
                                        entity = _.find(context.state[payload.collection].entities, function (entity) {
                                            return entity[primaryKey] === payload.id || entity._id === payload.id;
                                        });
                                    }
                                    //if entity doesn't have an EVT_ID then we know its not retrieved yet so let's attempt via the db.
                                    if ( _.isUndefined( entity ) || _.isUndefined(entity.EVT_ID) || refresh ) {
                                        Vue.http.get(
                                            context.state.restRoute+context.state[payload.collection].collectionEndpoint+payload.id
                                        ).then(function(response){
                                            console.log('success');
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
                                                console.log(response);
                                                reject();
                                            });
                                    } else {
                                        resolve(entity);
                                    }
                                });
                            },

                            //below methods are just stubs for now, we don't have endpoints to handle them.
                            removeEntitybyId: function(context,payload){/*@todo*/},
                            removeCollection: function(context,payload){/*@todo*/},
                            saveEntitybyId: function(context,payload){/*@todo*/},
                            saveNewEntities: function(context,paylaod){/*@todo*/}
                        }
                    };
                    //intialize Vuex object and add to the eejs.api.collections object.
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
                 * @param collection
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
                 * @param collectionSchema
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
                 * @param collectionSchema
                 */
                getPropertiesFromSchema = function(collectionSchema) {
                  if (! _.isUndefined(collectionSchema.properties)) {
                      throw new eejs.exception('Unable to return properties for the '+collectionSchema.title+'.');
                  }
                  return collectionSchema.properties;
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
                     * @type {{collection: string, created: eejs.api.mixins.collectionMixin.created}}
                     */
                    mixins.collection = {
                        collection: '',
                        store: eejs.api.collections,
                        props: ['collectionName'],
                        created: function(){
                            //if collection is provided, then that gets used to initialize the collection from the store.
                            //Otherwise it is expected to be assumed from props in a parent component.
                            if ( this.$options.collection !== '' ) {
                                //fetch collection set in store
                                this.fetch(true);
                            }
                        },
                        computed: {
                            collectionName : function() {
                                return this.$options.collection !== '' ? this.$options.collection : this.collectionName;
                            }
                        },
                        methods: {
                            fetch: function(refresh) {
                                var self = this;
                                //this is actually a promise, so will have to be handled appropriately.
                                this.$store.dispatch('fetchCollection', {collection:this.collectionName,refresh:refresh})
                                    .then( function(){
                                        self.hasEvents = true;
                                        self.events = self.$store.state[self.collectionName].entities;
                                    })
                                    .catch( function(){
                                        console.log('no events retrieved')
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
                            /*if the primary key property is set then override modelId (but only if that isn't set).*/
                            /*if the modelId is not empty then let's do a get.*/
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
                            add: function(refresh){
                                var self = this;
                                this.$store.dispatch('addEntitybyId', {collection:this.collectionName,id:this.id,refresh:refresh})
                                    .then( function(response){
                                        console.log('success add');
                                        self.event = response;
                                    })
                                    .catch( function(response){
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

                            collectionRecord: function() {
                                return this.$store.state[this.collectionName];
                            },

                            modelName: function() {
                                return this.collectionName.slice(0,-1);
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
                 * @param collection
                 */
                buildRelationMixinForCollection = function(collection) {
                    //we can only build relations mixins if we have the schema for this collection
                    if ( ! _.has(collectionsSchema,collection) ) {
                        throw new eejs.exception('Unable to build any relation mixins for the ' + collection +
                        'because there is no schema registered for it.  Are you sure the collection was registered' +
                            'properly?');
                    }

                    var relationName = '';

                    if (_.has(collectionsSchema[collection], 'relations')
                        && _.has(collectionsSchema[collection]['relations'], 'properties')
                    ) {
                        _.each(collectionsSchema[collection]['relations']['properties'], function(relationProperties, relation){
                            relationName = eejs.utils.inflection.humanize(relation,true);
                            relation = eejs.utils.inflection.pluralize(relationName);
                            //note we only build relation mixins for which there is a registered collection for that relation.
                            if ( _.indexOf(collections,relationName) > -1 ) {
                                buildRelationMixinForCollectionAndRelation(collection,relation,relationName);
                            }
                        });
                    }

                    /** @todo loop through the relations registered on the schema (if present) and build relation mixins
                     * for each relation.  Each relation mixin gets added to the mixins object
                     * It should be in the format mixins.relations.{collection}.{relation}
                     */
                },
                /**
                 * Builds a relation mixin for a specific collection and relation.
                 * @param collection
                 * @param relation
                 * @param relationName
                 */
                buildRelationMixinForCollectionAndRelation = function(collection, relation, relationName){
                    //if there is no collectionSchema for the collection or the relation then we can't build the mixin.
                    if (!_.has(collectionsSchema,collection)) {
                        throw new eejs.exception('Unable to build any relation mixins for the ' + collection +
                            ' because there is no schema registered for it.  Are you sure the collection was registered' +
                            ' properly?');
                    }
                    if (!_.has(collectionsSchema,relation)) {
                        throw new eejs.exception('Unable to build any relation mixins for the ' + collection +
                            'because there is no schema registered for its ' + relationName + ' relation. Are you sure' +
                            'the collection for ' + relation + ' was registered properly?');
                    }

                    var collectionPrimaryKey = getPrimaryKeyFromSchema(collectionsSchema[collection]),
                        collectionSingular = eejs.utils.inflection.singularize(collection),
                        collectionSingularCapitalized = eejs.utils.inflection.capitalize(collectionSingular),
                        capitalizedRelation = eejs.utils.inflection.capitalize(relation),
                        mixinMethods = {};

                    mixinMethods['getRelated'+capitalizedRelation] = function(){
                        var self = this;
                        this.$store.dispatch(
                            'fetchCollection',
                            {
                                collection: relation,
                                queryString: 'where[' + collectionSingularCapitalized + '.' + collectionPrimaryKey +
                                    ']='+self[collectionPrimaryKey]
                            }
                        ).then( function(response){
                            self['has'+capitalizedRelation] = true;
                            self[relation] = response
                        }).catch( function(response){
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

                    //now after all the initial components have been built, we need to link any
                    //relation model components to their parent (ie. component.event will need component.datetime set on it).
                    _.each(components, function(componentObject, component){
                       registerRelationComponentsForComponent(component);
                    });

                    //expose components on our global eejs.api object.
                    eejs.api.components = components;
                },
                /**
                 * Builds components for a specific collection (if not already built).
                 * @param collection
                 */
                buildComponentForCollection = function(collection){
                    //get out if there is already a component for this collection
                    if (_.has(components,collection)){
                        return;
                    }
                    var capitalizedCollection = eejs.utils.inflection.capitalize(collection),
                        singularizedCollection = eejs.utils.inflection.singularize(collection),
                        capitalizedSingularizedCollection = eejs.utils.inflection.singularize(capitalizedCollection);
                    //first the collection component
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

                    var mixinsForModelComponent = [];
                    if (_.has(mixins.relations, singularizedCollection)) {
                        _.each(mixins.relations[singularizedCollection], function(relationMixinObject){
                            mixinsForModelComponent.push(relationMixinObject);
                        });
                        mxinsForModelComponent.push(mixins.model);
                    }

                    //next the model component
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
                                this.$store.dispatch('addEntitybyId', {collection:this.collectionName,id:this.id})
                                    .then( function(response){
                                        self[singularizedCollection] = response;
                                        self['has' + capitalizedSingularizedCollection] = true;
                                    })
                                    .catch( function(response){
                                        console.log(response);
                                    });
                            }
                        },
                        "mixins" : mixinsForModelComponent
                    }
                },
                /**
                 * Registers relation components on the given component.
                 * @param component
                 */
                registerRelationComponentsForComponent = function(component){
                    //if the relation components on this component have already been registered or
                    //there are no relations for this component, then bail.
                    if(_.has(components[component], 'components') || !_.has(mixins.relations,component)) {
                        return;
                    }
                    //we can get the relations that need registered via the mixins
                    var singularizedRelation = '',
                        componentsToAdd = [];
                    //okay there are relations so let's loop through and then add those to a components array for this
                    //component.
                    _.each(mixins.relations[component], function(relationObject, relation){
                        singularizedRelation = eejs.utils.inflection.singularize(relation);
                       if (_.has(components, singularizedRelation)){
                           componentsToAdd.push(components[singularizedRelation]);
                       }
                    });
                    components[component]['components'] = componentsToAdd;
                },
                /**
                 * Returns whether the given collection has a valid route (via the api discovery route) or not.
                 * @param collection
                 * @return boolean
                 */
                collectionHasRoute = function(collection) {
                    var hasKey = _.findKey(getEndpoints, function(key){
                        return key.indexOf(collection) >= 0;
                    });
                    return ! _.isUndefined(hasKey);
                };

            /**
             * Return the protected collections property.
             * @returns {Array}
             */
            this.getRegisteredCollections = function() {
                return collections;
            };

            /**
             * This allows client code to push additional collections to the main instance.
             * @param collections
             */
            this.addCollections = function(collections) {
                //@todo this needs to return a Promise because it might use an httpRequest to setup the collections.

                //@todo for a new collection registered this would also have to build the vuex module for that collection and
                //then push to the existing Vuex store.

                //@todo will also need to build any new mixins for the new collection and add it (along with possibly pushing
                //to any existing relation mixins thigns that are related to this collection.

                //@todo will also need to add any new components built to other components that have a relation to each
                //new collection registered.
            };
        };

        //start ur engines.
        return new Promise(function(resolve, reject) {
            if ( ! eejs.api.main instanceof main ) {
                eejs.api.main = new main(initialOptions).then(resolve).catch(function(e){
                    console.log(e);
                    reject(e);
                });
            } else {
                var msg = 'eejs.api.init has already been called in this request so it has been initialized.' +
                    ' If you wish to add more collections then use the eejs.api.main.addCollections method.';
                console.log(msg);
                reject(msg);
            }
        });
    };
})(window);