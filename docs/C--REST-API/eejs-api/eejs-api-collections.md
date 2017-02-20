# Collections represented in the eejs-api library.

When reference is made to collections in this documentation, it refers to the ee resources available over the REST API.  So things like `events`, `datetimes`, `registrations` etc.

The `eejs-api` library automatically takes care of building necessary code and logic to enable working with ee collections much easier in your vue apps.  

## Registering Collections to use.

In order to keep the loading time to a minimum, instead of building code for every EE collection using the response from the EE REST API schema, the library requires you to initialize with an array of collections you would like to build for.  You would do something like this to register collections:
  
```js
eejs.api.init( {collections: ['events','datetimes']}).then( function() {  
    //your vue logic here
}).catch( function(e) {
   //catch do any error handling here. 
});
```

In this example we've registered the "Events" and "Datetimes" collections with the library and the library takes care of building _collection component option objects_ and _collection mixin objects_ for use. 

## Collection Component Option Objects

For each collection registered, a collection component option object is created.  Component option objects are what one uses to register as a component as a part of the `components` value in a Vue instance options object or for creating a custom component with.  All automatically built component objects are exposed after the promise resolves at `eejs.api.components`. Examples:

**Registering as a component on a Vue instance**

```js
var customView = new eejs.vue({
    el : '#app',
    components : {
        'events' : eejs.api.components.events
    }
});
```

**Registering as a Vue component and instantiating from it**

```js
var Events = eejs.vue.extend(eejs.api.components.events),
    EventListView = new Events({
        el: '#app'
    });
```

The library intentionally does not build actual vue components because it allows client code using the library more flexibility in manipulating the component objects _globally_ before using them in any vue instances. 

### Properties of a component object.

Property | Description
|---------|-----------|
`collection` | Automatically built components have this set to the canonical reference for the collection (i.e. `events`).  It is used globally by all logic within the instantiated vue instance (and any components registered with a collection when its instantiated) to reference the collection.
 `data` | In vue, the data property is what is used to declare reactive properties exposed/implemented in templates.  For the collection component object the initial data property is initialzed with an object containing two properties:  A property representing the collections entities (i.e. `data.events`), and a boolean property indicating whether any entities exist or not (i.e. `data.hasEvents`).
 `mixins` : Automatically built mixins for the collection component object are registered here.  You can read more about these auto-built mixins (and what they add to the properties for a component) later in this document.
 
 
 
## Collection Mixin Objects

In Vue, [mixins](https://vuejs.org/v2/guide/mixins.html) allow one to define a vue object and send that in as a mixin when declaring a component or vue instance.  The eejs-api library builds ONE mixin to represent collections and this is added to each built component object. After the promise is resolved the collection mixin is exposed at `eejs.mixins.collection`.  The purpose of doing things this way is to allow one to build a completely custom collection component object using the mixin instead of the auto-built collection component object.  This gives the ultimate flexibility in building apps. However, keep in mind that even if you use this mixin that way, you still _must_ register the collection because other things your custom collection component might interact with (via the mixin) would require that registered collection. As a basic example you might do something like this.

```js
var registrationsWithSeatIds = eejs.vue.extend({
    collection : 'registrations',
    data : function() {
        return {
            seatIds : [],
        }
    },
    created : function(){
       this.fetchSeatIds();
    },
    methods : {
        /**
        * This might integrate with a custom module you registered with to eejs.api.store for grabbing 
        * seatIds for all registrations in the registration collection state. 
        */
        fetchSeatIds : function() {
            this.$store.dispatch('fetchSeatIds', {collection:this.collectionName}).then( function(response) {
                self.seatIds = response;
            }).catch( function(response){
               console.log(response); 
            });
        }
    },
    components : {
        registration : eejs.api.components.registration
    },
    /**
     * this brings all the default collection stuff from the auto-generated collection mixin. Note according
     * to the merge strategy used by Vue, mixin hooks are called before the components own hooks.  So that means 
     * before `fetchSeatIds` gets called, the collection mixin `fetch` method would get called.
    */
    mixins : [eejs.api.mixins.collection]
});
```

### Properties of the collection mixin:

Property | Description
|----------|------------|
`collection` | Defaults to blank in the collection mixin but is used to represent what collection this is for.
`store` | Passes in the `eejs.api.store` instance.
`props` | `nameCollection` is passed in as a prop.  If you have a parent vue component implementing a child component that uses this mixin, you can pass the collection into the child component via this prop.<br><br>**Example:**<br><br>`<div id="parent-component"><child-collection v-bind:name-collection="registrations"><child-collection></div>`
`created` | In the created hook point, the mixin checks if the `collection` property is set, if it is then it calls the fetch method (which will retrieve entities for that collection using the store).
`computed` | The collection method has one computed property named `collectionName` and it is a canonical way to retrieve the correct collectionName (using the value for the `collection` property first if its set, and then falling back to the `nameCollection` property. 
`methods` | The collection mixin only has one declared method on it currently: `fetch`.  This method handles retrieving the entities for the collection from the store. If the *refresh* argument is set to true then any entities retrieved from the REST API for the collection will replace entities with the same value for the primary key already in the store state. **Note**, calling this method will _always_ result in a REST API call because it calls the `fetchCollection` action in the store.




