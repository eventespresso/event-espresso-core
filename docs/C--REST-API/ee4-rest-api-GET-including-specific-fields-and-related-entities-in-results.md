# EE4 REST API: Including Specific Fields and Related Entities in results for GET request

By default, when you query for a resource **all** its fields are returned on each entity. However, if you don't want to include **all** results you can provide the query parameter `include` and specify exactly which fields you want

```php
//only return event IDs, names, and slug
http://demoee.org/wp-json/ee/v4.8.36/events?include=EVT_name,EVT_slug
```

> Note: entity IDs are always returned.

You can also include fields from related models (using * to return **all** fields on the related models

```php
//get all registrations and their associated answers, and each answer's question, and also the registration's contact
http://demoee.org/wp-json/ee/v4.8.36/registrations?include=Answer.*,Answer.Question.*,Attendee.*
```

Which will return events with an added "datetimes" property, which is a collection of the first 50 datetimes for that event.

Including related resources like this can save you a request or two; but there is no way to filter these related resources. For example, if you want to order the related datetimes by their start time, you will simply need to issue a second request asking for that, eg

```php
//gets all datetimes related to event 15 ordered by their start time
http://demoee.org/wp-json/ee/v4.8.36/datetimes?where[Event.EVT_ID]=15&order_by[DTT_EVT_start]=ASC
```

For the EE4 JSON REST API Client, we can fetch all the datetimes for each event by using the following query:

```php
//get all the datetimes for each event in a single query
http://demoee.org/wp-json/ee/v4.8.36/events?include=Datetime.*
```