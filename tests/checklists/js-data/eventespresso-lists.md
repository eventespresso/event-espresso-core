## Selectors

A `*` next to the selector means that this has a corresponding resolver

* [ ] getItems( identifier, queryString ) * - Returns all items for the given identifier and queryString.  Items are returned in an array and may be an arbitrary set of data queried from the db using the querystring (raw response objects)
* [ ] getEntities( modelName, queryString ) * - This is similar to `getItems` except it returns an array of BaseEntity children for the given model.  *Note:* `eventespresso/core` is the authority for entity instances so any retrieved entities will get pulled from `eventespresso/core` if they already exist there and added to `eventespresso/core` state if not.
* [ ] getEntitiesByIds( modelName, ids ) * - effectively the same as the previous query except it allows the client to just specify the ids they want.  **NOTE**: this will set the resolution for `getEntityById` selector in `eventespresso/core` to fulfilled for each entityId in this array (prevents unnecessary queries to the server)
* [ ]  isRequestingItems( identifier, queryString ) - whether the items for the given identifier and query string are being resolved.
* [ ] isRequestingEntities( modelName, queryString ) - effectively the same as the previous

## Dispatch Actions

* [ ] receiveResponse( identifier, queryString, items (array) ) - Used to add arbitrary items to the state.
* [ ] receiveEntityResponse( modelName, queryString, entities (array) ) - Used to add an array of entity instances (BaseEntity) to the state.