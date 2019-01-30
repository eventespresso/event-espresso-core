## `eejs.model`

This property exposes all the model javascript interfaces for EE models. This becomes available on the `eejs` global when the `CoreAssetManager::JS_HANDLE_MODEL` script handle is registered as a dependency for wp scripts.

All of the below sections are just groupings for easier reading of the documentation.  The various properties are still all found directly on the `eejs.model` object.

### Constants

These are various properties that function as "constants" for data.

| Property | Description |
| -------- | ----------- |
| `DEFAULT_LISTS_STATE` | An object representing the default state to be used by stores containing lists.
| `DEFAULT_CORE_STATE` | An object representing the default state to be used by the core store. |
| `MODEL_NAMES` | An array of model names currently exposed by the site for REST API requests. |
| `QUERY_ORDER_ASC` | A string, `ASC`
| `QUERY_ORDER_DESC` | A string, `DESC`
| `ALLOWED_ORDER_VALUES` | An array of allowed order values: `[ 'asc', 'desc', 'ASC', 'DESC' ]`
| `GREATER_THAN` | A string that represents the URI encoded greater than symbol.
| `LESS_THAN` | A string that represents the URI encoded less than symbol.
| `GREATER_THAN_AND_EQUAL` | A string that represents the URI encoded greater than and equal to symbol.
| `LESS_THAN_AND_EQUAL` | A string that represents the URI encoded less than and equal to symbol.

### Assertions

These are various properties that are assertion type functions.

| Property | Description |
| -------- | ----------- |
| [`assertEntityHasKey`](./assertions.md#assertentityhaskey-key-entity-message---) | A function that validates (throws an exception when not valid) whether the given key exists in the provided entity object. This is used when calling code wants an exception to be thrown.
| [`assertImmutableObjectHasPath`](./assertions.md#assertimmutableobjecthaspath-path-immutable-message---)         | Asserts whether the given path in the provided immutable object exists.             |
| [`assertIsArray`](./assertions.md#assertisarray-items-message---) | A function that validates (throws an exception when not valid) whether the given value is an array
| [`assertIsNotEmpty`](./assertions.md#assertisnotempty-item-message---) | A function that validates (throws an exception when not valid) whether the given value is empty or not.  Call this validator when you want to make sure the provided value is NOT empty.
| [`assertIsMap`](./assertions.md#assertismap-item-message---)         | A function that asserts whether the given value is a Javascript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object.             |

### Endpoints

Various functions related to endpoint data.

| Property |   Description                                                                             |
| -------- | ------------------------------------------------------------------------------------------|
| `endpoints` |   An object containing all the exposed endpoints for rest requests (indexed by model name)|
| [`applyQueryString`](./endpoints.md#applyquerystring-modelname-querystring---) | A function for applying a provided query string to the endpoint for a given model name and returning the entire string for use in a request.
| [`getEndpoint`](./endpoints.md#getendpoint-modelname-) |   A function for retrieving the endpoint for the given Model name.                        |
| [`stripBaseRouteFromUrl`](./endpoints.md#stripbaseroutefromurl-url-)         |   Strips the rest base path from the given url string.                                    |

### Primary Keys

Various functions related to primary key retrieval.

| Property | Description |
| -------- | ----------- |
| `primaryKeys` | An object containing a map of modelName to primary key for that model. |
| [`valuesForCombinedPrimaryKeys`](./primary-keys.md#eejsmodelvaluesforcombinedprimarykeys-keys-entity-) | A function that returns a string representation for the given keys from the provided entity.  This function would be used for models that have combined primary keys (delivered as an array)
| [`valueForPrimaryKey`](./primary-keys.md#eejsmodelvalueforprimarykey-key-entity-) | A function that returns the value for the given key from the provided entity. This function would be used for models that have only one primary key.
| [`getPrimaryKey`](./primary-keys.md#eejsmodelgetprimarykey-modelname-) | A function that returns the primary key (or combined primary keys) from the available data for a given model name.
| [`getPrimaryKeyQueryString`](./primary-keys.md#eejsmodelgetprimarykeyquerystring-modelname-keyvalues---)         | Returns a query string for getting the entities belonging to a model for the given primary key values.             |
| [`getEntityPrimaryKeyValues`](./primary-keys.md#eejsmodelgetentityprimarykeyvalues-modelname-entity-) | A memoized function that returns the values for the primary keys from the provided entity.
| [`keyEntitiesByPrimaryKeyValue`](./primary-keys.md#eejsmodelkeyentitiesbyprimarykeyvalue-modelname-entities---) | A function that receives an array of entities and returns a collection of those same entities indexed by the primary key value for each entity.
| [`createAndKeyEntitiesByPrimaryKeyValue`](./primary-keys.md#eejsmodelcreateandkeyentitiesbyprimarykeyvalue-factory-entities-)         | A function that creates an array of entity instances using the given factory and array of entity values.              |

### Base

Various helper functions related to base functionality for the `eejs.model` module.

| Property | Description |
| -------- | ----------- |
| [`pluralModelName`](./base.md#eejsmodelpluralmodelname-modelname-)         | A memoized function that normalizes to the plural form of a given model name for the incoming string.             |
| [`singularModelName`](./base.md#eejsmodelsingularmodelname-modelname-)         | A memoized function that normalizes to the singular form of a given model name for the incoming string.             |
| [`getQueryString`](./base.md#eejsmodelgetquerystring-querydata---whereconditions----null-maporderby---orderby---orderby-) | A function that returns a query string for use by a REST request given a set of queryData.

### Models

Various model specific functions/interfaces.  In many cases these are composed from the [`Base`](./README.md#base) helper functions.

| Property | Description |
| -------- | ----------- |
| [`dateTimeModel`](./datetime/README.md) | A module containing all model related interfaces for the DateTime model.
| [`eventModel`](./event/README.md) | A module containing all model related interfaces for the Event model.
| [`attendeeModel`](./attendee/README.md)         | A module containing all model related interfaces for the Attendee model.             |
| [`registrationModel`](./registration/README.md) | A module containing all model related interfaces for the Registration model.
| [`statusModel`](./status/README.md) | A module containing all model related interfaces for the Status model.
| [`ticketModel`](./ticket/README.md) | A module containing all model related interfaces for the Ticket model.
| [`checkInModel`](./check-in/README.md) | A module containing all model related interfaces for the Checkin model.

Note: The list of exposed models will be added to over time so the above list may be out of date. You can find all the models and their exposed interfaces [here](../../../assets/src/data/model/)