var Vue = require('vue');
var Vuex = require('vuex');
var VueResource = require('vue-resource');

Vue.use(VueResource);


//let's add some custom methods that we'll use for our storage.
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
        _.each(entity, function(value,prop,entity){
            store.state[collection].entities[entityLocation][prop] = value;
        });
    }
};/**/

Vue.use(Vuex);

(function( window, undefined ) {
    'use strict';

    /**
     * initialize eejs and eejs.api
     */
    window.eejs= window.eejs || {};
    eejs.api = eejs.api || {};
    eejs.api.init = eejs.api.init || {};
    eejs.api.mixins = eejs.api.mixins || {};
    eejs.api.components = eejs.api.components || {};
    eejs.api.modules = eejs.api.modules || {};


    //hold the vue and vuex and vue-resource objects for usage everywhere because Vue, Vuex, and Vue-resource will not be available
    eejs.vue = eejs.vue || Vue;
    eejs.vuex = eejs.vuex || Vuex;

    /**
    //special factory that reads the ee rest-api discovery endpoint and uses the schema to setup the object for the Store.
    //then we use that to instantiate the store in here.
    //so something like:
    //eejs.api.startUp = {
    //      initialState: {}
    //      init : function() { //sets up everything including the state and the vue components extends for the models }
    //      getState: function() { return this.initialState }
    // };
    //const eeCollections = new Vuex.Store({ state: eejs.api.startUp.getState(), mutations ...} );


    /** The following are Vuex modules.  Each module represents an EE model collections and the modules will be
     *  built by the eejs.api.startUp factory.
     *  The cool thing about using modules for the MainCollection store is that modules can be dynamically registered
     *
     * @type {{state: {entities: Array, primaryKey: string}}}
     *
     * I likely will have to think of something other than constant here because I don't think I can dyanmically
     * create constants :/  The problem is that I think in order to use modules in vue they must be constants so
     * that they can be exposed to each other.  This will have implications if we want to be able to record the state
     * of relations in the collection store.  I THINK the important thing from Vue's standpoint is that the modules must
     * be in the global space so that they are visible to each other.  They probably just recommend constants because
     * that "protects" the variable name.  I think its fine if we use global vars as long as its namespaced well (maybe
     * just namespace it as a part of the `eejs.vue.modules` object?
     *
     * Also, note that for vuex modules.  Actions, getters and mutations are hoisted to the global space so that means
     * that they have to be unique names amont the modules! @see https://vuex.vuejs.org/en/modules.html
     */
    eejs.api.modules.eventCollection = {
        state: {
            /**
             * Note, to allow for storing non persisted objects but still retain the ability to be reactive.
             * Any objects having the primary key set to 0 will have a temporary unique id assigned to a `_id` key on the
             * object.
             */
            entities:[],
            primaryKey: 'EVT_ID',
            //not going to use for now but have added it here for reference when actually building
            //This state is used to validate incoming entity items when mutating the state to ensure only
            //valid mutations occur.  This is auto-generated via the REST-API schema
            allowedProperties: {},
            collectionEndpoint: 'events/'
        },
        actions: {}
    };

    eejs.api.modules.ticketCollection = {
        state: {
            entities:[],
            primaryKey: '',
            allowedProperties: {},
            collectionEndpoint: 'tickets/'
        }
    };

    eejs.api.modules.datetimeCollection = {
        state: {
            entities:[],
            primaryKey: '',
            allowedProperties: {},
            collectionEndpoint: 'datetimes/'
        }
    };

    /**
     * EE Model State Store
     * This is the container that holds all the things we maintain state for.
     * It is the authority for model data (events, tickets, datetimes, etc).
     *
     * Eventually this will be automatically generated from rest endpoint schema but for now I'm just hardcoding things
     * for examples.
     */
    eejs.api.collections = new Vuex.Store({

        state: {
            /**
             * this will be for any root state things we think we may need for the entire Collections store.
             */
            restRoute: eejs.data.paths.rest_route
        },
        /**
         * this will get autogenerated by our startup factory process.
         * So, for example, to get the collection of Events currently stored in the events collection you would use:
         * `eeCollections.state.events.entities` For tickets it would be `eeCollections.tickets.state.entities` and so on.
         */
        modules: {
            events : eejs.api.modules.eventCollection,
            tickets : eejs.api.modules.ticketCollection,
            datetimes : eejs.api.modules.datetimeCollection
        },
        getters: {
            // getters are more like reducers in vuex. In vuex getters to not allow custom arguments so its not a usable
            // place to have something like getCollection or getItembyId because you can't reduce by a provided argument.
            // So, until we see a computed value regularly used by vue components implementing this store that can be
            // effectively used here, we likely won't use it.
        },
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
                    throw new Exception( 'The payload for `setById` is missing a required key.  Doublecheck and make sure' +
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
                    throw new Exception( 'The payload for `addEntity` is missing a required key. Doublecheck and' +
                        'make sure there is a `collection` and `entity` key set (with appropriate values)');
                }
                var refresh = typeof( payload.refresh ) !== 'undefined' ? payload.refresh : false;
                //does this collection exist?
                if ( _.has(state,payload.collection) ) {
                    //is entity an object? Eventually we can add validation to make sure only a valid entity is getting added.
                    if ( typeof(payload.entity) === 'object' && payload.entity !== null ) {
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
           removeEntity: function(state,payload){},
           removeEntitybyId: function(state,payload){}

        },
        actions: {
            /**
             * Used to retrieve items for a collection and then adds it to the store.
             * @param context (access the store through this, so context.state, or context.state.events).
             * @param payload Expect an object with:
             *      collection = [required] the name of the collection being retrieved
             *      queryString = [optional] a string in the format of extra conditions you want to refine the query to.
             *                    (see ee rest api docs for formating the query string)
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
             * Note: This particular of method we'd like want to return a Promise, that way we can adjust messaging
             * app side should there be no results or an error in the collection retrieval attempt.
             */
            fetchCollection: function( context, payload ) {
                return new Promise( function(resolve, reject) {
                    if ( typeof(payload.collection) === 'undefined' || payload.collection === '' ) {
                        reject( 'In order to get a collection, you need to specify the collection to retrieve' +
                            ' via payload.collection.');
                    }

                    //in order to successfully fetch, the collection must be registered as a module.
                    if ( typeof(context.state[payload.collection]) === 'undefined' ) {
                        reject( 'In order to get a collection, the collection must be registered as a module in' +
                            'the collections store.');
                    }

                    var routeQueryString = typeof(payload.queryString) !== 'undefined'
                        ? '?' + payload.queryString
                        : '',
                        refresh = typeof(payload.refresh) !== 'undefined' ? payload.refresh : false;

                    //k made it here, so let's fetch the collection
                    Vue.http.get(
                        context.state.restRoute+context.state[payload.collection].collectionEndpoint+routeQueryString
                    ).then(function(response) {
                        _.each( response.body, function( entity, index, body ){
                            context.commit('addEntity',
                                {
                                    collection: payload.collection,
                                    entity: entity,
                                    refresh: refresh
                                }
                            )
                        });
                        resolve(response.body);
                    })
                    .catch(function(response){
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
                    if ( typeof(payload.id) === 'undefined' || typeof(payload.collection) === 'undefined') {
                        reject('Unable to retrieve an entity from this collection because both id and collection' +
                            ' is required, and either of those (or both) is missing!');
                    }

                    var primaryKey = context.state[payload.collection].primaryKey,
                        refresh = typeof(payload.refresh) !== 'undefined' ? payload.refresh : false,
                        entity = {};


                    //do a search for an entity that matches the primaryKey or `_id` for the given id in the payload but
                    //only if ! refresh
                    if ( ! refresh ) {
                        entity = _.find(context.state[payload.collection].entities, function (entity) {
                            return entity[primaryKey] === payload.id || entity._id === payload.id;
                        });
                    }
                    //if entity doesn't have an EVT_ID then we know its not retrieved yet so let's attempt via the db.
                    if ( typeof( entity ) === 'undefined' || typeof(entity.EVT_ID) === 'undefined' || refresh ) {
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
            removeEntitybyId: function(context,payload){},
            removeCollection: function(context,payload){},
            saveEntitybyId: function(context,payload){},
            saveNewEntities: function(context,paylaod){}
        }
    });


    /**
     * Added to vue components that represent a collection of model ee model entities.
     * @type {{collection: string, created: eejs.api.mixins.collectionMixin.created}}
     */
    eejs.api.mixins.collection = {
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
                ;
            }
        }
    };

    eejs.api.mixins.model = {
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
            //simply returns whether the main property
            isEmpty: function() {
                return typeof( this[this.modelName()][this.collectionRecord().primaryKey] ) === 'undefined'
                    || typeof( this[this.modelName()]._id ) === 'undefined';
            },

            collectionRecord: function() {
                return this.$store.state[this.collectionName];
            },

            modelName: function() {
                return this.collectionName.slice(0,-1);
            }
        }
    };


    /**
     * An example mixin that might be what we'd do for relations.
     * @type {{data: eejs.api.mixin.Datetimes.data, mounted: eejs.api.mixin.Datetimes.mounted, methods: {getRelatedDatetimes: eejs.api.mixin.Datetimes.methods.getRelatedDatetimes}}}
     */
    eejs.api.mixins.EventDatetimes = {
        data: function(){
            return{
                EVT_ID: this.initialEvent.EVT_ID,
                datetimes:[],
                hasDatetimes: false
            }
        },
        store: eejs.api.collections,
        mounted: function() {
            if ( this.datetimes.length === 0 && this.EVT_ID > 0 ) {
                var self = this;
                this.getRelatedDatetimes();
            }
        },
        methods: {
            getRelatedDatetimes: function() {
                var self = this;
                this.$store.dispatch(
                    'fetchCollection',
                    {
                        collection:'datetimes',
                        queryString: 'where[Event.EVT_ID]='+self.EVT_ID
                    }
                ).then( function(response){
                    self.hasDatetimes = true;
                    self.datetimes = response
                }).catch( function(response){
                    console.log(response);
                });
            }
        }
    };

    /** Components **/
    eejs.api.components.EventCollection = {
       collection: 'events',
       data: function(){
           return {
               events: [],
               hasEvents: false
           }
       },
       mixins: [eejs.api.mixins.collection]
    };

    eejs.api.components.Datetime = {
        collection: 'datetimes',
        props: ['initialDatetime'],
        data: function() {
            return {
                datetime: this.initialDatetime,
                hasDatetime: false
            }
        },
        mounted: function() {
            //if the event property is empty, and we have an id, then lets attempt to get the event set.
            if ( this.isEmpty() && this.id > 0 ) {
                var self = this;
                this.$store.dispatch('addEntitybyId', {collection:this.collectionName,id:this.id})
                    .then( function(response){
                        self.datetime = response;
                        self.hasDatetime = true;
                    })
                    .catch( function(response){
                        console.log(response);
                    });
            }
        },
        mixins: [eejs.api.mixins.model]
    };


    eejs.api.components.Event = {
        collection: 'events',
        props: ['initialEvent'],
        data: function() {
            return {
                event: this.initialEvent,
                hasEvent:false
            }
        },
        mounted: function() {
            //if the event property is empty, and we have an id, then lets attempt to get the event set.
            if ( this.isEmpty() && this.id > 0 ) {
                var self = this;
                this.$store.dispatch('addEntitybyId', {collection:this.collectionName,id:this.id})
                    .then( function(response){
                        self.event = response;
                        self.hasEvent = true;
                    })
                    .catch( function(response){
                        console.log(response);
                    });
            }
        },
        components: {
          'datetime': eejs.api.components.Datetime
        },
        mixins: [eejs.api.mixins.model,eejs.api.mixins.EventDatetimes]
    };
})(window);