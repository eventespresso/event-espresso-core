# EE4 REST API: Including Specific Fields and Related Entities in results for GET request

By default, when you query for a resource **all** its properties are returned on each entity. However, you can provide the query parameter `include` and specify exactly which properties you want

```php
//only return event IDs, names, and slug
https://demoee.org/wp-json/ee/v4.8.36/events?include=EVT_name,EVT_slug
```

This will give a response like this:

```json
[
    {
        "EVT_ID": 121,
        "EVT_name": "Event 455",
        "EVT_slug": "event-455"
    },
    {
        "EVT_ID": 124,
        "EVT_name": "Battle for Hoth",
        "EVT_slug": "battle-for-hoth"
    },
    {
        "EVT_ID": 133,
        "EVT_name": "Party",
        "EVT_slug": "party"
    }
]
```
> Note: entity IDs are always returned.

You can also include properties from related models (using * to return **all** fields on the related models)

```php
//get all registrations and their associated answers, and each answer's question's display text, and also the registration's contact (a.k.a. attendee)
https://demoee.org/wp-json/ee/v4.8.36/registrations?include=Answer.*,Answer.Question.QST_display_text,Attendee.*
```

We can fetch the first 50 datetimes for each event by using the following query:

```php
//get all the datetimes for each event in a single query
https://demoee.org/wp-json/ee/v4.8.36/events?include=Datetime.*
```

> Note: only the first 50 entities are included, in the default order.

Including related resources like this can save you a request or two; but there is no way to filter or reorder these related resources. For example, if you want to order the related datetimes by their start time, you will simply need to issue a second request asking for that, eg

```php
//gets all datetimes related to event 15 ordered by their start time
https://demoee.org/wp-json/ee/v4.8.36/events/15/datetimes?order_by[DTT_EVT_start]=ASC
```

