# EE4 REST API Caculated Fields in GET requests

New in 4.8.36, besides the normal fields and related data, the EE4 REST API can also take care of performing rather complex calculations on your behalf. For example, how many more registrations could there be for an event? If you want to determine this, you'd need to factor in the limits on all the event's datetimes, and also the limits on the tickets for those datetimes, and take into account that some tickets grant access to multiple datetimes. It's tricky. You could send a query for all the events' datetimes and tickets, and calculate how the maximum registrations... or have the EE4 REST API do the calculation for you. Just add `calculate=spaces_remaining` and the count will be added to each event entity's `_calculated_fields` property.

To auto-discover what fields can be calculated, look at the index at the endpoints' `args`'s `calculate` field's `enum` options. Eg the route `"/ee/v4.8.36/events/(?P<id>\d+)"` has this in its `args`:

```json
"calculate": {
  "required": false,
  "default": "",
  "enum": [
    "optimum_sales_at_start",
    "optimum_sales_now",
    "spots_taken",
    "spots_taken_pending_payment",
    "spaces_remaining",
    "registrations_checked_in_count",
    "registrations_checked_out_count",
    "image_thumbnail",
    "image_medium",
    "image_medium_large",
    "image_large",
    "image_post_thumbnail",
    "image_full"
  ]
}
```

So here you see that when you're retrieving events via the EE4 REST API, you can request to also calculate each events' "optimum_sales_at_start", "optimum_sales_now", etc. If you want the EE4 REST API to calculate more than one field, you can either send in a comma-separated list of fields to calculate, or an array, eg

```php
//get first 50 events, and calculate their spots_taken and image_thumbnails
https://demoee.org/wp-json/ee/v4.8.36/events?calculate=spots_taken,image_full
//this next request is the same as above
https://demoee.org/wp-json/ee/v4.8.36/events?calculate[]=spots_taken&calculate[]=image_full
```

Both will ensure the `_calculated_fields` element on each event is populated, eg:

```json
 "_calculated_fields": {
   "spots_taken": 0,
   "image_full": {
     "url": "http://src.wordpress-develop.dev/wp-content/uploads/2016/02/monkey2.jpg",
     "width": 1200,
     "height": 800,
     "generated": false
   }
 }
```

For a full list of what fields can be calculated and their descriptions, please refer to our [Calculated Fields Reference Page](ee4-rest-api-calculated-fields-reference.md).

## Calculating fields on Related Resources

When querying a resource, you can request to calculate fields on related resources too. For example, when querying events, you can include their datetimes and calculate each datetime's spaces available like so:

```
https://demoee.org/wp-json/ee/v4.8.36/events?include=Datetime&calculate=Datetime.spaces_remaining_considering_tickets
```

You can even calculate fields on indirectly related resources. For example, when querying for datetimes, you could include registrations and their check-in status like so:

```
https://demoee.org/wp-json/ee/v4.8.36/datetimes?include=Event.Registration&calculate=Registration.datetime_checkin_stati
```
