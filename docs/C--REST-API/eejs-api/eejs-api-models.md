# Models represented in the eejs-api library.

When reference is made to models in this documentation, it refers to the entities for a collection resource.  So if the collection is `events` then the model for that collection would interact with a specific `event` entity.

The `eejs-api` library automatically takes care of building necessary code and logic to enable working with ee models much easier in your vue apps.

## Registering Collections

In order to keep the loading time to a minimum, instead of building code for every EE model using the response from the EE REST API schema, the library requires you to intiialize with an array of collections you would like to build for.  From this list of collections, the library will infer what model items to build.  Refer to the [collections documentation](eejs-api-collections.md#registering-collections-to-use ) for how this is done.

## Model Component Option Objects

For each collection registered, a model component option object is created.  Component option objects are what one uses to register as a component with the `components` property in a Vue instance options object or for creating a custom component with.  All automatically built component objects are exposed after the promise resolves at `eejs.api.components`.

In the eejs-api library, model component objects are _automatically_ registered as components on the corresponding collection component object. So keep this in mind that whenever you change the properties on a model component object directly that it will affect that same property on any implemented collection component object using that model. 


### Properties of a component object.

Property | Description
|----------|------------|
`collection` | The name of the collection the represented by this model belong to.
`props` | The default component object receives two props: One for passing in the initial id (i.e. `initialEventId`) and one for passing in an initial entity object (i.e. `initialEvent`).
`data` | In vue, the data property is what is used to declare reactivfe properties exposed/implemented in templates. For the model component object the initial data property is initialized with an object containing two properties: A property representing the entity object (i.e. `data.event`), and a boolean property indicating whether the component has that entity set or not (i.e. `data.hasEvent`).
`watch` | Each model option component sets a watcher for any changes to the model entity in the data property.  More on the watchers [is found in this document](eejs-api-watchers-and-computed-properties.md)
`mixins` | Automatically built mixins including the model mixin and model [relations mixins](eejs-api-relations.md) are registered with this property.
`computed` | When the model component for each collection is created.  There is also a generated set of computed properties created for each field on the entity.  More on this is found in the related document [here](eejs-api-watchers-and-computed-properties.md)
 
## Model Mixin objects

In Vue, [mixins](https://vuejs.org/v2/guide/mixins.html) allow one to define a vue object and send that in as a mixin when declaring a component or vue instance.  The eejs-api library builds _one_ mixin for models and that is registered with each built component object.  The purpose of doing things this way is to allow one to build a completely custom model component object using the mixin instead of the auto-built component object. However, keep in mind that even if you use this mixin that way, you still _must_ register the collection because other things your custom model component might interact with (via the mixin) would require that registered collection. As a basic example, after the model mixin is built, you could do something like this:

```js
var registrationWithSeatId = eejs.vue.extend({
    collection : 'registrations',
    data : function() {
        return {
            seatId :[],
            hasRegistration : false,
            registration: {}
        }
    },
    created : function() {
        this.fetchSeatId();
    },
    methods : {
        /**
         * This would likely integrate with a custom module that is registered with eejs.api.store for 
         * grabbing the seatId for the given registration entity in the registration collection store state.
         */
        fetchSeatId : function() {
            var self = this;
            this.$store.dispatch('fetchSeatId', {collection:this.collectionName, entity: this.registration}).then( function(response) {
                self.seatId = response;
            }).catch( function(response){
               console.log(response); 
            });
        }
    },
    /**
     * This brings all the default model properties from the auto-generated model mixin.  Note according to the
     * merge strategy used by Vue, mixin hooks are called before the components own hooks. So that means
     * before `fetchSeatId` gets called, the  model mixin created hook would get called and the `registration` data property would get set.
     */
    mixins : [eejs.api.mixins.model]
})
```

### Properties of the Model Mixin

Property | Description
|---------|-------------|
`collection` | This is an options property used to indicate what collection the model belongs to.
`id` | This is an options property used to indicate that primary key value for the model.
`autoUpdate` | This is a flag to indicate whether the store state for this entity should be updated whenever its local state changes via the registered watcher (read more about watchers [here](eejs-api-watchers-and-computed-properties.md)
`initialUpdateCompleted` | This is an internal options property used to track when the initial update of store state has been completed (set on the `updated` hook).  This is needed for performance reasons (more details in the [watchers and computed properties document](eejs-api-watchers-and-computed-properties.md)
`skipInitialization` | By default, the `created` option has a callback on it that will initialized various properties on the component when it is created. In order to provide flexibility to clients that may wish to implement the component without doing this initialization (instead providing their own initialization routine), this flag is provided.  By default the flag is set to false.
`store` | The generated vuex store for the library is passed in via this property.
`props` | There is one prop on the model mixin labeled `collection`.  This allows parent properties to pass in the collection name.
`data` | The data object passed in has one property, id which is used to reference the primary key value for the entity.  More on how this is set and impacts the loaded entity in the [initialization example](examples/initializing-model-component-with-an-entity.md)
`created` | The logic on the created hookpoint for vue takes care of initializing the `id` data property and the initial entity stored in the component the mixin belongs to.  More on how this works can be found in [this example](examples/initializing-model-component-with-an-entity.md)
`updated` | In this vue hook the `initialUpdateCompleted` flag is set to true.
`computed` | A `collectionName` computed property is set by the mixin and it returns the canonical collection label for the model.
`methods` | See the [separate chart after this one for methods](#methods-in-the-model-mixin)

### Methods in the model mixin

Method | Description
|---------|----------|
`fetchById` | This will retrieve the entity for the given id from the store state for the model's collection and replace the entity existing on the model component with it.
`replaceDefaults` | This method takes an object of field name and field value pairs for and replaces what is set for those fields in the local state for that entity.
`update` | This update's the entity in the store state for that model's collection with the local entities state.
`isEmpty` | This returns a simple boolean on whether the entity is "empty" or not.  The model component's local state record for its entity is considered empty if the entity record is an empty object, or it has just one element and it is the primary key.
`collectionRecord` | This returns the entire collection record from the store state.
`modelName` | This returns the canonical name for the model.
`ensureHasUniqueId` | This takes care of ensuring there is a unique id set for both local state copy of the primary key and the `id` property.  If the entity already has a primary key that is greater than 0 or not an empty string then it does nothing.  If that's not the case however, then a unique id will be generated and prefixed with `_new_id_` which is used to identify new created objects in the store state. 
