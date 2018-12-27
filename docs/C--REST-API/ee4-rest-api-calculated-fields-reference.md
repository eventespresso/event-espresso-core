# EE4 REST API: Calculated Fields Reference

As described in [EE4 REST API Caculated Fields in GET requests document](ee4-rest-api-GET-calculated-fields.md) , as of EE 4.8.36, there are a number of "calculated fields" you can specify to be returned in EE4 REST API responses. This page is dedicated to describing them. It is organized first by the resource/model, then by the individual fields.

## Event

Calculated fields on events. Unless otherwise specified, all the following fields were made available in 4.8.36:

| Field Name | What is returned |
| ---------- | ---------------- |
`optimum_sales_at_start` | The total number of registrations that were possible to be sold before any were sold. Compare to optimum_sales_now.
`optimum_sales_now` | The total number of registrations that are possible given previous sales. Sometimes this will be different from optimum_sales_at_start. Eg, if an event has 10 datetimes with a limit of 1 registrations each and one ticket type for each datetime, and also a “bulk” ticket that grants admission to each datetime. The optimum_sales_at_start was and always will be 20, but once someone registers for the “bulk” ticket, one of the two spots available on each datetime has now been taken, and there can only possibly be 10 more registrations.
`spaces_remaining` | The number of possible additional registrations on this event.
`spots_taken` | The number of approved registrations on this event.
`spots_taken_pending_payment` | The number of registrations pending payment on this event.
`registrations_checked_in_count` | The count of registrations checked into the event at ANY datetime. Note: once a registration checks out they STILL count towards being checked in- that is, checking out doesn’t negate the count of registrations who have checked in.
`registrations_checked_out_count` | The count of registrations who have checked in and then checked out of an event.
`image_full` | Information about the event’s featured image, including its URL, width, height, and whether or not it was generated from the originally uploaded image. (see [image_full example below](ee4-rest-api-calculated-fields-reference.md#image-full-example-response)
`image_thumbnail` | Like the image_full, but the smallest generated version of it, usually 150 by 150 pixels. (see [image_thumbnail example below](ee4-rest-api-calculated-fields-reference.md#image-thumbnail-example-response))
`image_medium` | Like image_full, but around 300 pixels by 200 pixels. (see [image_medium example below](ee4-rest-api-calculated-fields-reference.md#image-medium-example-response))
`image_medium_large` | Like image_full, but around 660 pixels by 440 pixels. (see [image_medium_large example below](ee4-rest-api-calculated-fields-reference.md#image-medium-large-example-response))
`image_large` | Like image_full, but around 660 pixels by 440 pixels. (see [image_large example below](ee4-rest-api-calculated-fields-reference.md#image-large-example-response))
`image_post_thumbnail` | Like image_full, but around 825 by 510 pixels. (see [image_post_thumbnail example below](ee4-rest-api-calculated-fields-reference.md#image-post-thumbnail-example-response))

### Image Full Example Response

```json
"image_full": {
  "url": "http://src.wordpress-develop.dev/wp-content/uploads/2016/02/monkey2.jpg",
  "width": 1200,
  "height": 800,
  "generated": false
}
```

### Image Thumbnail Example Response

```json
"image_thumbnail": {
 "url": "http://src.wordpress-develop.dev/wp-content/uploads/2016/02/monkey2-150x150.jpg",
 "width": 150,
 "height": 150,
 "generated": true
},
```

### Image Medium Example Response

```json
"image_medium": {
      "url": "http://src.wordpress-develop.dev/wp-content/uploads/2016/02/monkey2-300x200.jpg",
      "width": 300,
      "height": 200,
      "generated": true
    },
```

### Image Medium Large Example Response

```json
"image_medium_large": {
      "url": "http://src.wordpress-develop.dev/wp-content/uploads/2016/02/monkey2-768x512.jpg",
      "width": 660,
      "height": 440,
      "generated": true
    },
```

### Image Large Example Response

```json
"image_large": {
      "url": "http://src.wordpress-develop.dev/wp-content/uploads/2016/02/monkey2-1024x683.jpg",
      "width": 660,
      "height": 440,
      "generated": true
    },
```

### Image Post Thumbnail Example Response

```json
"image_post_thumbnail": {
      "url": "http://src.wordpress-develop.dev/wp-content/uploads/2016/02/monkey2-825x510.jpg",
      "width": 825,
      "height": 510,
      "generated": true
    },
```

## Datetime

Fields that can be calculated on datetimes. Unless otherwise stated, these fields were made available in 4.8.36:

| Field Name | What is returned |
| ---------- | ---------------- |
`spaces_remaining_considering_tickets` | The number of spaces left at the datetime, taking into acccount ticket limits.
`registrations_checked_in_count` | The count of registrations who have checked into this datetime of the event. Note: when registrations check out it does NOT negate the fact that they have already checked in.
`registrations_checked_out_count` |  The count of registrations who have checked into this datetime of the event and then checked out.
`spots_taken_pending_payment` | The count of pending registrations for this datetime.

## Registration

FIelds that can be calculated on registrations.

| Field Name | What is returned |
| ---------- | ---------------  |
`datetime_checkin_stati` | Checkin status of this registration at each of their available datetimes. This is an array, whose keys are datetime IDs, and whose values are either "NEVER" (meaning they have not checked into that datetime, ever), "IN" (meaning they most recently checked into the datetime), and "OUT" (meaning they checked in, but subsequently have checked out, and have not checked in again since). Eg `"datetime_checkin_stati":{"1":"OUT","2":"IN","3":"NEVER","4":"NEVER"}`

For more information on how to calculate fields on resources via the EE4 REST API, read [EE4 REST API Caculated Fields in GET requests document](ee4-rest-api-GET-calculated-fields.md).
