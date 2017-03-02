#  Utility Helpers `eejs.utils`

## `eejs.utils.inflection`

Holds an instance of the [inflection.js](https://github.com/dreamerslab/node.inflection) library. This is used throughout the `eejs.api` library for manipulating strings.

## `eejs.utils.URI`

Holds an instance of the [uri.js](https://medialize.github.io/URI.js/) library.  This is used throughout the `eejs.api` library for working with urls.

## `eejs.utils.addRelationsToEndpoint`

The purpose of this method is to return a url that automatically includes all the registered relations to this collection in the endpoint request. 

This receives the arguments:

- *collection*,  a string representing the collection the endpoint is for.
- *endpointUri*, the endpoint URI for the passed in collection.
 
### Usage

Assuming the `events` and `datetimes` collection have been registered and initialized with the `eejs-api` library, you could do something like this:
 
 ```js
var relationsEndpointForEvents = eejs.utils.addRelationsToEndpointURI( 'events', 'https://mywebsite.com/wp-json/ee/v4.8.36/events');
console.log(relationsEndpointForEvents);
// https://mywebsite.com/wp-json/ee/v4.8.36/events?include=Datetime.*
```

## `eejs.utils.addQueryStringToEndpointURI`

This is a handy helper to aid with adding a query string to a provided endpoint URI.  It receives two arguments:

- *queryStringObject*, an object in a format that is in a format recognizable by URI.js.
- *endpointUri*, the uri you want the query string appended to. Note this could be a url that already has parameters on it.

### Usage

You could do something like this:

```js
var uriWithParams = eejs.utils.addQueryStringToEndpointURI({'where[Datetime.DTT_ID]' : 10}, 'https://mywebsite.com/wp-json/ee/v4.8.36/events' );
console.log(uriWithParams);
// https://mywebsite.com/wp-json/ee/v4.8.36/events?where[Datetime.DTT_ID]=10
```

## `eejs.utils.isRelationOf`

This helper is returns a boolean on whether the given relation string represents a relation for the given collection string.  It receives two arguments:

- *relation*,  The string referencing the relation (eg `datetimes`)
- *collection*, The string representing the collection (eg `events`)

### Usage

If the `events`, `datetimes` and `tickets` collection were registered on the `eejs.api` library, then after things are initialized you would be able to do something like the following:
 
 ```js
console.log(eejs.utils.isRelationOf('datetimes', 'events'));
// true

console.log(eejs.utils.isRelationOf('tickets', 'events'));
// false
```

> Note: this only validates the relation to the collection for **registered** collections on the initialized `eejs.api` library.  So for instance if you only registered `events` when initializing the library, then even though we know in the EE data structure that datetimes are related to events, using this method to check that would return false.

## `eejs.utils.verifyRequiredKeysPresentInObject`

This is a simple validator that makes it easier to pass in an object and an array of strings representing keys that are required in the given object.  It validates and returns either the boolean true which means all the required keys are present or an array with the missing keys.  It accepts two arguments:

- *payload*, The object the validation is being done against.
- *requiredKeys*, An array of keys that are required for the given object.

### Usage

```js
console.log(eejs.utils.verifyRequiredKeysPresentInObject(
    {id: 1, somethingElse: 2},
    ['id','somethingElse']
));
// true

console.log(eejs.utils.verifyRequiredKeysPresentInObject(
    {id:1,somethingElse:2},
    ['name']
));
// ['name']
```

## `eejs.utils.getIdsFromEntities`

This returns an array of ids for the given collection entities using the passed in primaryKey.  Receives two arguments:

- *entities*, an array of entity objects.
- *primaryKey*, the field representing the primaryKey for the entity.

### Usage

Given an array of event entities, you might do something like this:

```js
//eventEntities is something defined earlier and is an array of event entity objects
console.log(eejs.utils.getIdsFromEntities(eventEntities, 'EVT_ID'));
// [10,6,32]
```

## `eejs.utils.getIdFromEntity`

Similar to `eejs.utils.getIdsFromEntities` (and used by that method) this simply returns the value for the primary key in the provided entity object. Receives two arguments:

- *entities*, the entity object the id is being retrieved from.
- *primaryKey*, the field representing the primary key for the entity.

### Usage

Given an event entity, you might do something like this:

```js
var event = {
    EVT_ID : 10,
    EVT_name : 'some_event'
    //... all other fields would be in here but truncated for brevity
}
console.log(eejs.utils.getIdFromEntity(event,'EVT_ID'));
// 10
```


## `eejs.utils.getUniqueId`

This simple helper method is used to return a unique temporary id in the format for temporary entity ids in the library.

### Usage

```js
console.log(eejs.utils.getUniqueId()); // _new_id_1
```