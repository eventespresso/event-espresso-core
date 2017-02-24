# Watchers and Computed Properties in Model Component Option Objects
 
If you'll remember from the [Models represented in the eejs-api library](eejs-api-models.md) document, model component objects built by the `eejs.api.main` factory have a reference for the entity represented in the local state (within `data` property).  So for instance, an `eejs.api.components.event` model component options object will have it's data property as (excerpted from the entire object):

```js
  {
    data : function() {
        return {
            hasEvent : false,
            event : {}
        }
    }
  }  
```

When the actual entity is populated on component instantiation/usage, it's properties will be the fields of the entity and it is reactive to changes on the local state.  However to make it easier for client applications implementing this library, the factory also constructs [computed properties](https://vuejs.org/v2/guide/computed.html) for each of the fields on a model and by default sets up a [watcher](https://vuejs.org/v2/guide/computed.html#Watchers) that will automatically update the store state whenever a local state field is modified.

## More about the Computed Properties:

Some things to keep in mind with computed properties as a part of a model component object:

### 1. There is a computed property corresponding to each field in a model.

So for example you'll see this on the built component options object (this is not all the computed properties, just a sampling):

```js
eejs.api.components.event.computed = {
    EVT_ID : {
        get: function() {
            return this.$store.getters.getFieldValueFromEntityById(this.collectionname, this.id, 'EVT_ID');
        },
        set : function() {
            throw eejs.exception(
              'Setting this property (' + property + ') is not allowed.  It is ' +
              'a computed property. The computed properties in the eejs.models are used for ' +
              'representing the state of this model object in the store.  If the `autoUpdate` ' +
              'flag was set to true on instantiation, then the store state will automatically be ' +
              'updated whenever the local state has changed.  Otherwise it will have to be ' +
              'triggered by calling the update method.'
              );
        }
    },
    EVT_descRaw : {
      get: function() {
                  return this.$store.getters.getFieldValueFromEntityById(this.collectionname, this.id, 'EVT_desc');
           },
      set : function() {
              throw eejs.exception(
                'Setting this property (' + property + ') is not allowed.  It is ' +
                'a computed property. The computed properties in the eejs.models are used for ' +
                'representing the state of this model object in the store.  If the `autoUpdate` ' +
                'flag was set to true on instantiation, then the store state will automatically be ' +
                'updated whenever the local state has changed.  Otherwise it will have to be ' +
                'triggered by calling the update method.'
                );
            }  
    }
}
```

In this example you can see that each computed property has a getter that returns the equivalent value from the store state and a setter that blocks mutation through the computed property (more on that in a bit).

You'll also notice that there's `EVT_descRaw`.  Since in vue, we can't have computed properties for nested object elements (i.e. `EVT_desc.raw`), we construct a string for each field in the response that actually has an object as the value.  So the rendered element for the `EVT_desc` field would actually be represented in the computed property as `EVT_descRendered`.
 
 ### 2. Computed properties are used for reactively displaying the global Store State for that entity.
 
 The intended use-case for these computed properties are to simply display the global store state for that entity but NOT to update the store state (although that's possible with vue in general).
   
 So a good rule of thumb to follow is that all inputs should be mutating the fields in the local state, and display can either be the local state properties or computed properties depending on whether you want to show the global state or not.
  
 So how do changes to local state persist to global state then? Good question, this helps segue us into talking about the watcher added by the factory... 
 
 ## Model Field Watchers
 
 When the factory constructs model component option objects for each registered collection, it also registers a watcher for each field on the model.  This means you'd have something like this for the event component option object as an example (not all the watchers, just a sampling):
  
  ```js
eejs.api.components.event.watch = {
    'event.EVT_ID' : function(value) {
        if (this.$options.autoUpdate && this.$options.initialUpdateCompleted) {
            this.update();
        }
    }
}
```

Basically when the conditions are satisfied any change to the local field state will result in updating the entity in the global store state.  So what are these conditions?

### `autoUpdate` flag.

The model component options includes a property labelled `autoUpdate` that defaults to `true` as its value.  This property is exposed so client code can optionally turn off this autoupdating of global store state whenever the local state is modified. 

### `initialUpdateCompleted`

This is also a property on the options object.  It defaults to false and although it can be set externally, it is used to prevent the watcher from firing when the component is first created and mounted (remember the watchers are on each field).  It is set to true in the `updated` hookpoint in the [vue lifecycle](https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram).  This means that bye default, none of the watchers set for the model fields in the local state will fire until after the first updated call in the vue lifecycle.

The primary purpose for this property is for performance so that initial creation and mounting of components on the request won't take longer than needed since the global state is already updated on that initial load.


