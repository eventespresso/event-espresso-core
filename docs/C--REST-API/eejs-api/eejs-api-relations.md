# Relations represented in the eejs-api library.

When reference is made to *relations* in this documentation, it refers to the relationship between entities in collections. For example, `datetimes` are related to `events` and `tickets` are related to `datetimes`.

The `eejs-api` library automatically takes care of building necessary code and logic to enable working with relations much easier in your vue apps.

## Registering Collections

In order to keep the loading time to a minimum, instead of building code for every relation between collections using the response from the EE REST API schema, the library requires you to initialice with an array of collections you would like to build for.  From this list of collections, the library will infer what relations to build.  Refer to the [collections document](eejs-api-collections.md) for how this is done.

So for example, if you register the `events` and `datetimes` collection then all the logic necessary for the relationship between events and datetimes will be automatically built.
 
 ## Relations in component option objects.
 
 For each relation that exists to a collection the related collection will have its model component option object added as a component on the main entities model component option object.  So for example, if you registered the `events` and `datetimes` collection, then when things are built, the `eejs.api.components.event` component options object will have the following record:
 
 ```js
console.log(eejs.api.components.event);
/**
 * Outputs this as a part of the component options object
 * {...
 *      'components' : {
 *          'datetime' : { ... } //this will be the options object for the datetimes model component option object.
 *      }
 * ...}
 */
```

And the corresponding `datetime` component would have this:

```js
console.log(eejs.api.components.datetime);
/**
 * Outputs this as a part of the component options object
 * { ...
 *      'components' : {
 *          'event' : { ... } //this will be an options object for the event model component option object.
 *       }
 * ...}
 */
```

## Relation Mixins.

> Note: Although there are a variety of different relation types (one to many, many to one, many to many etc) in the EE model structure, for the purpose of simplicity (at least currently), relations for a model are always referred to in the plural and stored as such (array etc).  This allows for more consistent interation with relations vs sometimes having singular or sometimes having plural.

As a part of the build process, the `eejs.api.main` object will construct *relation mixins* for all the relations between the registered collections.  After building, the relation mixins are exposed on the `eejs.api.mixins.relations` property and they are organized with this structure:

```
eejs.api.mixins.relations = {
 [modelName] : {
        [relationName] : [relationMixin]
    }
}
```

So for example if both `datetimes` and `events` collections were registered with the library, this would be the structure

```js
eejs.api.mixins.relations = {
    event : {
        datetimes : { /** relation mixin for datetimes related to events **/ } 
    },
    datetime : {
        events : { /** relation mixin for events related to datetemes **/ }
    }
}
```

These relation mixins are then registered with the appropriate component options object for a model.  So in our example, the event component would have the `datetimes` relations mixin registered with its `mixins` property AND the datetime compnent would have the `events` relations mixin registered with its `mixins` property.

A built relations mixin has the following structure (using a built events mixin as an example):

### Event->Datetime Relations Mixin Structure

This mixin would be accessible after initialization at `eejs.api.mixins.relations.event.datetimes`.
 
Property | Description
|-------|------------|
`data.datetimes` | This property has a value on an array which will contain all the datetimes related to this event.
`data.hasDatetimes` | A boolean flag that is true when the component instance has related datetimes set.
`store` | Holds the `eejs.api.store` instance.
`mounted` | When loaded this takes care of getting the related datetimes by calling the built `getRelatedDatetimes` method _if_ there are no datetimes in the local state for the event component and if the id for the event component is greater than 0.
`methods` | See the [methods chart below](#methods-for-event-datetimes-mixin)

#### Methods for Event Datetimes Mixin

Method | Arguments | Description
|---------|----------|------------|
`getRelatedDatetimes` | n/a | this will call `fetchRelatedForEntity` in the attached vuex store and retrieve the related datetimes for the given event.




