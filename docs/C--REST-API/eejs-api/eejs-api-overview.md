> **Note: This library is still in development and being worked on internally as we implement it for various ui elements in EE.  So consider this documentation still in flux.  We _welcome_ contributions by any developers who start using this, but be aware that everything is subject to change**

# EEJS API Overview

Overtime Event Espresso is implementing javascript more and more for the various functionality throughout the application.  One of the main components that will power this is the EE REST API.  Along with that, as a team, we decided that the js library that would work the best for the javascript apps we build would be [vue.js](https://vuejs.org/v2).

Something that will be used in all the various views/apps we build in EE over time (whether it be the event editor or the checkout process) is our models and collections.  Collections are for things like `events` or `datetimes`.  Models are used for the individual entities of a collection such as `event` or `datetime`. To save having to build direct queries to our REST API for all CRUD actions against collections and models every time we build an app or view, we've built a library that connects with the EE REST API and automatically builds and:
  
  - exposes component options for collections and models to implement in VUE components.
  - exposes mixins to build custom components if needed.
  - creates a Vuex.Store instance that preserves state of all the registered collections for usage in any VUE instances created.  This store is automatically registered with the component options and mixins using it.
  - implements and exposes the [inflection.js](https://github.com/dreamerslab/node.inflection) library.
  - implements and exposes the [uri.js](https://medialize.github.io/URI.js/) library.
  
## Getting Started - Basic Usage

> Currently our library is dependent on being loaded with Event Espresso and WordPress.  However in the future we do intend to provide a standalone option that is not dependent.

The library is registered via `wp_register_script` very early in the Event Espresso loading process and made available via the `eejs-api` reference.  It has `underscore` as a dependency so anywhere it is loaded, underscore will also be made available.

The library is built using browserify and including the `Vue`, `Vuex`, `Vue-resource`, `inflection`, and `urijs` sources as modules.

To use it, list it as a dependency in your own script registration.  You'd end up with something like:

```php
wp_register_script('my-vue-view', $path_to_my_js . 'my-vue-view.js', array('eejs-api'), $my_script_version, true);
wp_enqueue_script('my-vue-view');
```

Then in your script (in this case `my-vue-view.js`), you just need to initialize the library with the collections you want to interact with:

```js
(function(){
   'use strict';
   eejs.api.init({collections:['events','datetimes']}).then( function(){
       //use the exposed components etc to initialize your vue instance(s).
   }).catch( function(e){
       //catch any errors form the intialization process.
       //Most errors will be either from invalid collections sent in with the options object or if there are connection problems with the REST API.
       console.log(e);
   });
})();
```

> For more detailed examples implementing this library see the [examples and code recipes documentation](examples/README.md).

## What is available?

### Before the library is initialized:

#### `eejs.vue`

This holds a reference to the Vue object.

#### `eejs.vue.http`

The [`vue-resource`](https://github.com/pagekit/vue-resource) vue plugin has already been registered with the Vue object, so its exposed as well here.  You can use this to make any custom resource requests not implemented in the `eejs-api` library.

#### `eejs.vuex`

This holds a reference to the [Vuex](https://vuex.vuejs.org/en/) object.

#### `eejs.utils.inflection`

This holds a reference to the [inflection](https://github.com/dreamerslab/node.inflection) library.  So you can use all the methods exposed on that library.

#### `eejs.utils.URI`

This holds a reference to the [URI.js](https://www.npmjs.com/package/urijs) library.  So you can use all the methods exposed on that library.

### After the library is initialized:

It's important to remember that `eejs.api.init` returns a javascript [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) object.  So the following things are only accessible when the Promise is resolved (use them in the callback on the `then` function).

#### `eejs.api.mixins`

This is an object that contains [mixin objects](https://vuejs.org/v2/guide/mixins.html) used in automatically building components for the registered collections.  It is exposed for any custom components/views you want to build.  However, keep in mind any automatically built component options objects (exposed on `eejs.api.components`) have already had these mixins registered with them. 

**The following two mixins are exposed no matter *what* collections are registered**:

##### `eejs.api.mixins.collection`

This is mixed into every component option representing a collection (such as the `datetimes` collection). Read more about this [here](eejs-api-collections.md).

##### `eejs.api.mixins.model`

This is mixed into every component representing a model (such as the `datetime` model). Read more about this [here](eejs-api-models.md).

**The following are mixins that are built for any registered collections**:

For every `relation` on a collection (eg. `datetimes` are related to `events`) there is a special automatically built mixin.  This adds the logic for automatically getting the related entities for that model on the specific entity for the parent collection.  However, relation mixins are _only_ automatically built if the related collection was also registered. So if you only initialize the library with the `events` collection, then the relation mixin for `datetimes` will not get automatically built and registered.  

As an example, let's say you initialized the library with `{collections:['events','datetimes']}`, that means the following will be exposed for use by client code (but keep in mind these relation mixins are _already_ added to their related components.): 

##### `eejs.api.mixins.relations.event.datetimes`

This is the mixin that describes how to get related datetimes for an event entity.  It is automatically registered to the generated `eejs.api.components.event` component.  However if you wanted to build a custom `event` component, you might want to include this mixin with it.

##### `eejs.api.mixins.relations.datetime.events`

This is the mixin that describes how to get related events for a datetime entity.  It is automatically registered to the generated `eejs.api.components.datetime` component.  However if you wanted to build a custom `datetime` component, you might want to include this mixin with it.

#### `eejs.api.components`

The `eejs-api` library automatically builds component option objects that can be used when setting up [vue components](https://vuejs.org/v2/guide/components.html). There are primarily two types of component options for each collection that are built.

##### 1. *Collection* component options

These are components that represent an entire collection of entities (eg. `datetimes` or `events`). If you registered the `datetimes` collection then the following would be exposed:

- `eejs.api.components.datetimes`

The `eejs.api.components.datetimes` component already would have had the `eejs.api.mixins.collection` mixin registered on it, and it would already have the `eejs.api.components.datetime` component registered with it.

You can read more about collection components [here](eejs-api-collections.md).


##### 2. *Model* components

These are components that are used for interacting with a specific entity (eg. `datetime` or `event`). If you registered the `datetimes` and `events` collections then the following would be exposed:

- `eejs.api.components.datetime`
- `eejs.api.components.event`

The `eejs.api.components.event` component would already have the `eejs.api.mixins.model` and `eejs.api.mixins.relations.datetime.event` mixins registered on it.  It would also already have the `eejs.api.component.event` component registered on it because event is a relation to datetime.

You can read more about the model components [here](eejs-api-models.md).

[[BACK TO TABLE OF CONTENTS](README.md)]