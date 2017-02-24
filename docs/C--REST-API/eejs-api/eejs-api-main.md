# `eejs.api.main`

`eejs.api.main` is an object constructed when `eejs.api.init` is called to initialize the library.  It's the factory like object that takes care of the dynamic construction of all component options object, mixins and the vuex store for the library.  Besides what it registers and exposes as a property on `eejs.api`, there are some public methods exposed as well:

Method  | Arguments | Purpose
|------|------------|-----------|
`getRegisteredCollections` | n/a | This returns all the registered collections as an array.
`getCollectionsSchema` | n/a | This returns the local cached copy of the schema for each of the collections as retrieved and built from the REST API options endpoint for each registered collection.  It is a simple object where the keys are collection labels and values are the raw schema object extracted from the response to that collection's OPTIONS endpoint.
`getPrimaryKeyForCollection` | *collection* | Use this to return the primary key field name for the given collection.
`getDefaults` | n/a | This returns the defaults cached in the object for all the registered collections.  The returned value will be a simple object where the keys are collection labels, and the values are a representative entity for that collection where the values for the entities fields are the defaults as declared by the schema response for that collection.
`getDefaultsForCollection` | *collection* | This returns the defaults for a specific collection.  The response format is the same as `getDefaults` except its just the object for that specific collection.
`init` | n/a | This is the method that gets called by the `eejs.api.init` wrapper function and is what kicks off the build process.


### Usage

To use any of the above methods you would call them like this:

```js
var primaryKeyForEvents = eejs.api.main.getPrimaryKeyForCollection('events');
```




