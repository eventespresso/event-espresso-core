## EE4 REST API Response Headers in GET requests

As well as the response body, we also send a few useful response headers. Some are always present, others are conditional. They are:

## X-WP-Total

Added in 4.8.36, present on all requests for collections (not specific entities). The total number of records matching your query; the number that would be returned if no limit were applied (reminder: if you don't specify a limit on a query, the default limit is 50). For example,

```php
//only fetch one event, but the response header "X-WP-Total" holds the count of all events
https://demoee.org/wp-json/ee/v4.8.36/events?limit=1
```

## X-WP-PageSize

Added in 4.8.36, present on all requests for collections (not specific entities). The limit that was actually applied to the current query.

## X-WP-TotalPages

Added in 4.8.36, present on all requests for collections (not specific entities). The number of requests it will take, using the current page size/limit, to get all the items in the collection.

## X-EE4-Debug-Model Query Params

Only present when the constant `EE_REST_API_DEBUG_MODE` is set to `true` on the server, in the wp-config.php file (eg, with the code `define( 'EE_REST_API_DEBUG_MODE', true );`). This is an json-encoded array showing exactly what query parameters you provided that will be passed onto the models. Refer to the [model querying doc](../G--Model-System/model-querying.md) for information on how to interpret this array.

## X-EE4-Debug-Missing Caps

Only present when the constant `EE_REST_API_DEBUG_MODE` is set to `true` on the server, in the wp-config.php file. This shows any WordPress capabilities missing from the current user (or if you're not logged in, the lack of user) which affects what entities were returned. For example, if this contains "ee_read_events,ee_read_others_events,ee_read_private_events", it means because the current user didn't have the capability "ee_read_private_events" that private events have been excluded from the returned collection; because "ee_read_others_events" was missing, other users' deleted events have been been excluded; and because "ee_read_events" was missing, only public events have been included. (For the details of how each capability affected the returned collection, you'll need to look directly at the models' source code).