# EE4 REST API: Filtering Results in GET requests

Filtering results when issuing a GET request is [similar to WP Core](http://v2.wp-api.org/reference/posts/), except it's more standardized across ALL resources (eg, you can always filter by the resources' "raw" versions, whatever they may be on that resource). This is because all our models use the same system for querying (unlike WP Core, which uses different functions for querying posts than when querying users than when querying terms, etc) and is based on our [core model querying system](../G--Model-System/model-querying.md). These are the main query params available to you: "where", "order_by", "limit", "group_by", "having", and "caps". Also note that unlike WP Core, all the query parameters are available to you whether logged in or not, however the results you are able to see is ALWAYS restricted by your capabilities.

## where

```php
//get all events in venues in the USA
https://demoee.org/wp-json/ee/v4.8.36/events?where[Venue.CNT_ISO]=US
```

This is how you add WHERE conditions onto your query to narrow down the results.

### Which fields are available for querying?

Use any field name of the entity you're currently querying. For example, if querying for answers, you can either use "ANS_ID" or "ANS_value". Please see the section on "Entities" to see what fields are available.

```php
//This will get all answers where ANS_ID is 10 and ANS_value is foobar 
//(because ANS_ID is the primary key, there should only be one of them; 
//so this will only return that answer if it's value is also "foobar")
https://demoee.org/wp-json/ee/v4.8.36/answers?where[ANS_ID]=10&where[ANS_value]=foobar
```

Some fields have a "raw", "rendered" or "pretty" version. Querying is always based on the "raw" version. Eg if you look at the sample response from above, you'll notice that the field "EVT_desc" has both a "raw" and a "rendered" version. Filtering is always on the "raw" version, and the "rendered" (or sometimes "pretty") version is only for display.

### Related Resources' Fields are also queryable

You can also use fields on related fields, so long as you also specify how they're related. Eg for a resource that's directly related, put the resource's capitalized, singular name first, then a period, then the field you wish to use. For example, the Answer resource is related to the `Registration`, `Question`, `Extra_Meta`, and `Change_Log` resources. So `Question.QST_ID` is how you would specify a field on a related resource.

You can also use fields on any of those indirectly related resources, by putting putting first the directly related resource's name, period, then the indirectly related resource's name, period, and the indirectly related resource's field (etc). Again see the section on "entities" to find out what relations exist. So, the Answer resource is related to the `Registration` resource, which is related to the `Transaction` resource. So an example of this would be `Registration.Transaction.TXN_ID`

You may also use fields on indirectly related resources by specifying the resource chain to follow to arrive at the resource you wish to use in the query. Eg

```php
//Gets all the answers to question 23 that were for registrations for transaction 43.
https://demoee.org/wp-json/ee/v4.8.36/answers?where[Question.QST_ID]=23&where[Registration.Transaction.TXN_ID]=43
```

**Gotcha** When including a related resource in a query, entities will be returned if ANY of the related entities match the query, not if ALL of the related entities match the query.

For example, 

```php
https://demoee.org/wp-json/ee/v4.8.36/events?where[Registration.REG_ID]=!%3D&where[Registration.REG_ID]=2
```
will return all events, so long as ONE of those related registrations' REG_IDs isn't 23. So if an event has registrations with REG_ID 1 and another registration with REG_ID 2, that event will STILL be returned because one of the registrations (the one with REG_ID 1) doesn't have REG_ID 2.

So, how would you query for an event where NONE of the registrations have REG_ID 2? Right now there isn't a great solution. You probably need to request all events who DO have a registration with REG_ID 2, and take the inverse (ie, then query for ALL events, and remove the events you found earlier were related to registration with REG_ID 2), eg 

```php
//get all events who have a registration with REG_ID 2
https://demoee.org/wp-json/ee/v4.8.36/events?where[Registration.REG_ID]=2
//get all events
https://demoee.org/wp-json/ee/v4.8.36/events
//and then manually remove the results from the first list from the second list
```

### Specifying Binary Operators: =, !=, <, <=, >, >=, LIKE,

> In 4.9.74 a new simpler syntax was introduced. If your API client needs to work with older versions of Event Espresso, please [refer to the old
syntax](https://github.com/eventespresso/event-espresso-core/blob/4.9.70.p/docs/C--REST-API/ee4-rest-api-GET-filtering-results.md#specifying-binary-operators-------like) (which is still maintained, but not documented because it was so painful!)

The default operator used in where conditions is always = (equals). Just like when querying models, you can specify other operators.
To specify a binary operator, instead of providing a simple value for the query parameter, provide an array whose key is the operator you want to use, and the value is the operand.
When using the LIKE operator, use "%" sign for wildcards like with MySQL.
Note: that you may need to url-encode operators like "=" and "!=".

```php
//Gets all answers where the ID is above 56 where the value starts with darth
https://demoee.org/wp-json/ee/v4.8.36/answers?where[ANS_ID][>]=56&where[ANS_value][LIKE]=darth%
```

### Specifying Unary operators: IS_NULL, IS_NOT_NULL

You may also provide the unary operator IS_NULL and its opposite IS_NOT_NULL in a similar fashion. The value provided will be ignored.

```php
//Gets all events for which there have been absolutely NO registrations (even incomplete ones)
https://demoee.org/wp-json/ee/v4.8.36/events?where[Registration.REG_ID][IS_NULL]=1
```


### Specifying Ternary Operator: BETWEEN

You may also provide a ternary operator, BETWEEN, which is used with dates in a similar fashion. The value can either be a comma-separated list of two dates, or a JSON array of two dates. 
```php
//Gets all events created between february 7 2015 and march 7 2015
https://demoee.org/wp-json/ee/v4.8.36/events?where[EVT_created][BETWEEN]=2015-02-07T23:19:57,2015-03-07T23:19:57
https://demoee.org/wp-json/ee/v4.8.36/events?where[EVT_created][BETWEEN]=["2015-02-07T23:19:57","2015-03-07T23:19:57"]

```

### Specifying N-Ary Operators: IN, NOT_IN

You may also provide n-ary operators, IN or NOT_IN. The value may either be a comma-separated list of a JSON array.

```php
//Gets all the events in states with ID 23 and 87
https://demoee.org/wp-sjon/ee/v4.8.36/events?where[Venue.STA_ID][IN]=23,87
//Gets all events with name "Party", "Party, Again", or "Party Forever"
https://demoee.org/wp-sjon/ee/v4.8.36/events?where[Venue.STA_ID][IN]=["Party", "Party, Again", "Party Forever"]
```

### Logic Query Params: AND, OR, NOT

By default, all the query parameters are AND'd together, meaning all the WHERE conditions must be met for a result to be returned. You can change this by using OR and then an array of all the fields you wish to OR together. That array may contain sub-arrays joined together with ANDs. You may also negate all the results in a sub-array by using NOT.

```php
//Gets all the events whose ID is 12 or whose name is "party".
https://demoee.org/wp-json/ee/v4.8.36/events?where[filter][OR][EVT_ID]=12&where[filter][OR][EVT_name]=party

//Gets all questions which are not for question group with system ID 1 or 2 (see "Query Parameters with the same Name" for an explanation of the star)
https://demoee.org/wp-json/ee/v4.8.36/questions?where[NOT][OR][Question_Group.QSG_system]=1&where[NOT][OR][Question_Group.QSG_system*]=2
```

### Query Parameters with the Same Name

Sometimes you will want to provide query parameters with the exact same name, eg a event's EVT_name twice: once for an upper limit and once for a lower limit. But when PHP parses the query parameters, each name must be unique. To allow this, you may provide a * (star) character in the parameter's name, followed by anything you want: it will all be ignored, and only the part before the * will be used.

```php
//Gets all payment methods with an ID between 2 and 8
https://demoee.org/wp-json/ee/v4.8.36/payment_methods?where[PMD_ID][]=<&where[PMD_ID][]=9&where[filter][PMD_ID*lower_range_limit][]=<&where[PMD_ID*lower_range_limit][]=2
```

## limit

Use this query parameter to set a limit on how many results will be returned. If this is not provided, the default is 50.

```php
//only find the first 5 events
https://demoee.org/wp-json/ee/v4.8.36/events?limit=5
```

You may also provide an offset with a limit using this parameter, by just providing the offset first, and then the limit.

```php
//only find 5 events after the first 10
https://demoee.org/wp-json/ee/v4.8.36/events?limit=10,5
```

## order_by

Order your results based on any field on the queried resource

```php
//order contacts by last name
https://demoee.org/wp-json/ee/v4.8.36/attendees?order_by=ATT_lname
```

Or by any field on a related resource

```php
//get all events based on their earliest datetime
https://demoee.org/wp-json/ee/v4.8.36/events?order_by=Datetime.DTT_EVT_start
```

By default the ordering will be in ASCENDING order (lowest to highest; oldest to newest). If you want to change this you can either also provide `order=DESC` like so

```php
//get all events based on their latest datetime, farthest in the future first and going back in time
https://demoee.org/wp-json/ee/v4.8.36/events?order_by=Datetime.DTT_EVT_start&order=DESC
```

And if you want to order by multiple fields, you just need to provide an array where keys are the value to order by, and values are either "ASC" or "DESC" (this will override whatever is set on `order`).

```php
//get all questions, ordered first by their question group's order, then by their question's order
https://demoee.org/wp-json/ee/v4.8.36/questions?order_by[Question_Group.QSG_order]=ASC&order_by[QST_order]=ASC
```

## group_by

This is a much more advanced querying filter. [Please read our section on resource querying for more info](../G--Model-System/model-querying.md).

## having

This is a much more advanced querying filter. [Please read our section on resource querying for more info](../G--Model-System/model-querying.md).

## caps

Filters results based on your user's capabilities with regards to different actions. The 4 available values are `read` (default, returns anything you're allowed to read), `read_admin` (returns anything you're allowed to read in the wp-admin area), `edit` (returns only entities you're allowed to edit) and `delete` (returns only entities you're allowed to delete).

```php
//return only events I'm allowed to edit
https://demoee.org/wp-json/ee/v4.8.36/events?caps=edit
```

## password

New in Event Espresso 4.9.74.

Some data, like event descriptions, can be password-protected (see the section in [reading data](ee4-rest-api-reading-data.md#Password-protected Data)).
If you know the password, just add the password query parameter to any request, eg

```php
//see the password-protected event 123
https://demoee.org/wp-json/ee/v4.8.36/events/123?password=jedimaster
//see the password-protected events (assuming all star wars posts use the same password)
https://demoee.org/wp-json/ee/v4.8.36/events/?where[Term_Taxonomy.Term.name]=StarWars&password=jedimaster
```

Note that, unlike the WP REST API, you can provide the password when querying a resource (ie, getting all events, not just one) and when querying data related to a password-protected entity (eg you can provide a password when querying for datetimes or tickets).
The only gotcha is this: if that password is incorrect for any entity, then you'll receive an error and nothing will be received. This is done to prevent someone from attempting to use a password on all events in a single request.
This means that when you're querying a resource, only provide the password if you're confident that's the password for ALL entities.

When querying data related to a custom post type, like datetimes which are related to events, protected data is removed entirely.
Eg
```php
//get all datetimes which aren't for password-protected events
https://demoee.org/wp-json/ee/v4.8.36/datetimes/
```
To view those entities which are password-protected, you can again provide the password query parameter, like so:

```php
//get all datetimes which are for events that we hope use the password "jedimaster". If any datetime is related
//to an event that doesn't use this password, an error message will be returned
https://demoee.org/wp-json/ee/v4.8.36/datetimes/?password=jedimaster
//get all datetimes for a password-protected event
https://demoee.org/wp-json/ee/v4.8.36/events/123/datetimes/?password=jedimaster
//get all tickets for a password-protected event
https://demoee.org/wp-json/ee/v4.8.36/tickets?where[Datetime.EVT_ID]=123&password=jedimaster
```

Administrators can filter results based on passwords, but no one else can. Eg
```php
//show all events with password "jedimaster", and provide the password.
//If you're not a site admin, you'll always get an error
https://demoee.org/wp-json/ee/v4.8.36/events?where[password]=jedimaster&password=jedimaster
```

Password-protected data is always removed if no password is provided when querying with the `caps=read` context, even if you're a privileged user.
If you want to see password-protected content without providing the password, use the `caps=read_admin` context instead. Eg

```php
//Show events and don't require providing a password
https://demoee.org/wp-json/ee/v4.8.36/events?caps=read_admin
```

See [the documentation on what capability contexts are valid](#caps).

## default_where_conditions

When issuing a query, default where conditions are added. These vary by model, but generally:

* for Custom Post Type resources (with a field of type "WP_Post_Status_Field"), posts with status "trash" and "auto-draft" are excluded
* for soft-deleteable resources (with a field of type "Trashed_Flag_Field"), soft-deleted/trashed/archived entities are excluded.

These are added onto the where conditions added based on [the request's capability context](#caps), and they're added on for each resource used in the query. 

For example, the query 

```php
https://demoee.org/wp-json/ee/v4.8.36/events?order_by[Datetime.DTT_EVT_start]=DESC
```

will have default where conditions for both events (custom post type resource) and datetimes (soft-deletable resource). This means
only events which aren't trashed or an auto-draft will be returned, so long as they have at least one non-trashed datetime.


This behaviour can be overriden using the query parameter `default_where_conditions`. The following values are accepted over the REST API:

* `all` (default) default where conditions for all models in the query are added
* `full_this_minimum_others` all the default where conditions for the queried model are included, but none for other models are added
* `minimum` no default where conditions are added

([this a subset of what's available when querying using the models directly](../G--Model-System/model-query-params.md#default_where_conditions))

Examples:

```php
https://demoee.org/wp-json/ee/v4.8.36/datetimes&caps=read_admin
```
will have datetime default where conditions added (so only non-deleted datetimes will be returned).

```php
https://demoee.org/wp-json/ee/v4.8.36/datetimes?default_where_conditions=minimum&caps=read_admin
```
will *not* have default datetime where conditions added (so both deleted and non-deleted datetimes will be returned).

```php
https://demoee.org/wp-json/ee/v4.8.36/datetimes?where[Ticket.TKT_price][<]=10&caps=read_admin
```
will have default datetime and ticket where conditions added (so only non-deleted datetimes for non-deleted tickets will be returned).

```php
https://demoee.org/wp-json/ee/v4.8.36/datetimes?default_where_conditions=minimum&where[Ticket.TKT_price][<]=10&caps=read_admin
```
will *not* have any default where conditions added (so both deleted and non-deleted datetimes for deleted and non-deleted tickets will be returned).

```php
https://demoee.org/wp-json/ee/v4.8.36/datetimes?default_where_conditions=full_this_minimum_others&where[Ticket.TKT_price][<]=10&caps=read_admin
```
will have default datetime where conditions added, but no default where conditions for tickets (so both deleted and non-deleted datetimes for any ticket, regardless of whether the ticket was deleted or not).

### Gotcha default where conditions for related models used in queries can have initiall unexpected results

For example

```php
https://demoee.org/wp-json/ee/v4.8.36/datetimes?caps=read_admin
```
will return all non-deleted datetimes

```php
https://demoee.org/wp-json/ee/v4.8.36/datetimes?force_join=Ticket&caps=read_admin
```
will return all non-deleted datetimes so long as there is a related non-deleted Ticket. 

This means that if a datetime is only related to a single deleted/archived ticket, it will be returned in the first query, but not the second.

This can be overcome by using `default_where_conditions=full_this_minimum_others`, eg

```php
https://demoee.org/wp-json/ee/v4.8.36/datetimes?default_where_conditions=full_this_minimum_others&force_join=Ticket&caps=read_admin
```

will return non-deleted datetimes, regardless of whether their related tickets are deleted or not.


