# EE4 REST API: Reading Data

This article gives an overview of how to read data from the EE4 REST API included in EE core. It would probably be good to first [read the introduction and setup article](ee4-rest-api-introduction.md), but if you are familiar with how to use the [WP API](wp-api.org), you're ready for this.

## GETting Results

Send an HTTP GET request to the resource's base URI to get ALL the results, eg an HTTP GET request to

```
http://demoee.org/demo/wp-json/ee/v4.8.29/events
```

will request a collection events, and will return a response something like this:

```json
[
    {
        "EVT_ID": 49,
        "EVT_name": "Star Wars watchethon",
        "EVT_desc": {
            "raw": "Let's all watch ton of Star Wars movies! It'll be great!",
            "rendered": "<p>Let's all watch ton of Star Wars movies! It'll be great!</p>\n"
        },
        "EVT_slug": "fegeg",
        "EVT_created": "2015-10-16T17:17:49",
        "EVT_short_desc": "",
        "EVT_modified": "2015-12-31T21:41:08",
        "parent": 0,
        "EVT_order": 0,
        "status": {
            "raw": "publish",
            "pretty": "Published"
        },
        "comment_status": "open",
        "ping_status": "closed",
        "EVT_display_desc": false,
        "EVT_display_ticket_selector": true,
        "EVT_visible_on": "-001-11-30T00:00:00",
        "EVT_additional_limit": 10,
        "EVT_default_registration_status": {
            "raw": "RPP",
            "pretty": "PENDING_PAYMENT"
        },
        "EVT_member_only": false,
        "EVT_phone": "",
        "EVT_allow_overflow": false,
        "EVT_timezone_string": "",
        "EVT_external_URL": "",
        "EVT_donations": false,
        "link": "http://src.wordpress-develop.dev/events/fegeg/",
        "_links": {
            "self": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49"
                }
            ],
            "collection": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events"
                }
            ],
            "https://api.eventespresso.com/registrations": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/registrations",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/datetimes": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/datetimes",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/question_groups": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/question_groups",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/venues": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/venues",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/term_taxonomies": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/term_taxonomies",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/message_template_groups": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/message_template_groups",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/attendees": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/attendees",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/wp_user": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/wp_user",
                    "single": true
                }
            ],
            "https://api.eventespresso.com/post_metas": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/post_metas",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/extra_metas": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/extra_metas",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/change_logs": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/change_logs",
                    "single": false
                }
            ]
        }
    }
]
```

## Gotchas

### Representing Infinity in JSON

Some fields in Event Espresso can represent infinity, which isn't part of the JSON specification. So when fields have this value, they will instead return the special value: -1 for any requests to EE namespaces before 4.8.36, and NULL for requests to EE namespace 4.8.36 or later (this change was made because -1 can be ambiguous).

### Datetimes and Timezones
Since 4.9.0, all datetimes returned in the EE4 REST API are in the site's default timezone (see the [site_info endpoint](https://github.com/eventespresso/event-espresso-core/blob/master/docs/C--REST-API/ee4-rest-api-introduction.md#site-info)  to find which timezone that is). This is usually the timezone you want to display to users, and their input to you will usually be in this timezone too.

However, if you want more control of how times are displayed (eg you want to display datetimes in the current user's timezone, or the timezone of an event's venue), you'd probably prefer to retrieve the times in UTC. Since 4.9.9, all local datetimes properties have a corresponding datetiem property in UTC. These corresponding properties have the same name, but with `_gmt` appended onto the end (similar to how WP API's posts have `post_date` and `post_date_gmt`). When sending data to the EE4 REST API, you can use either the local datetime properties, or the UTC datetime properties. Eg, `http://demoee.org/demo/wp-json/ee/v4.8.29/events?where[EVT_created]=2016-08-19T08:00:00` works (retrives all events created on August 19th 2016 at exactly 8am in the site's local time, which can be found on the [site_info endpoint](https://github.com/eventespresso/event-espresso-core/blob/master/docs/C--REST-API/ee4-rest-api-introduction.md#site-info)), as does `http://demoee.org/demo/wp-json/ee/v4.8.29/events?where[EVT_created_gmt]=2016-08-19T16:00:00` (which retrieves all events created at exactly 4pm UTC).

### featured_image_url removed in 4.8.36

Requests to `mysite.com/wp-json/ee/v4.8.34/events`, and also the equivalent endpoint in EE namespaces 4.8.33 and 4.8.29, and also `venues` and `attendees`, included the "featured_image_url" element on each event, venue, and attendee. However, in 4.8.36 the "featured_image_url" element has been removed. Please see the newly added image_* calculated fields on events.

### Backwards-Compatibility and Data Checking

The EE4 JSON REST API is very extendible by addons, so client code should expect entities to have new items added at whim. For example, it's quite possible a EE4 addon may add a field named "whachemecallit" onto the Event model/resource, in which case you the event entities returned would instead look like

```json
[
    {
        "EVT_ID": 49,
        "EVT_name": "Star Wars watchethon",
        "EVT_desc": {
            "raw": "Let's all watch ton of Star Wars movies! It'll be great!",
            "rendered": "<p>Let's all watch ton of Star Wars movies! It'll be great!</p>\n"
        },
        "EVT_slug": "fegeg",
        "EVT_created": "2015-10-16T17:17:49",
        "EVT_short_desc": "",
        "EVT_modified": "2015-12-31T21:41:08",
        "parent": 0,
        "EVT_order": 0,
        "status": {
            "raw": "publish",
            "pretty": "Published"
        },
        "comment_status": "open",
        "ping_status": "closed",
        "EVT_display_desc": false,
        "EVT_display_ticket_selector": true,
        "EVT_visible_on": "-001-11-30T00:00:00",
        "EVT_additional_limit": 10,
        "EVT_default_registration_status": {
            "raw": "RPP",
            "pretty": "PENDING_PAYMENT"
        },
        "EVT_member_only": false,
        "EVT_phone": "",
        "EVT_allow_overflow": false,
        "EVT_timezone_string": "",
        "EVT_external_URL": "",
        "EVT_donations": false,
        "featured_image_url": null,
        "link": "http://src.wordpress-develop.dev/events/fegeg/",
        /* NEW FIELD CALLED "WHATCHEMECALLIT" ADDED BY AN ADDON*/
        "whatchemecallit" : "dont freak out if you see a field added by an addon! be prepared",
        "_links": {
            "self": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49"
                }
            ],
            "collection": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events"
                }
            ],
            "https://api.eventespresso.com/registrations": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/registrations",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/datetimes": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/datetimes",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/question_groups": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/question_groups",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/venues": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/venues",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/term_taxonomies": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/term_taxonomies",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/message_template_groups": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/message_template_groups",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/attendees": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/attendees",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/wp_user": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/wp_user",
                    "single": true
                }
            ],
            "https://api.eventespresso.com/post_metas": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/post_metas",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/extra_metas": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/extra_metas",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/change_logs": [
                {
                    "href": "http://src.wordpress-develop.dev/wp-json/ee/v4.8.29/events/49/change_logs",
                    "single": false
                }
            ]
        }
    }
]
```

Also, it is planned to maintain the API for each version of core from 4.8.29 onwards. This means that although EE core might be on version 4.10.34, you should still be able to send requests to `http://demoee.org/demo/wp-json/ee/v4.8.29/events` and expect to see the same data in the same format as when EE core was at version 4.8.29 (although that versioned route might have additional properties added in future versions; eg version 4.9.9 adds `EVT_created_gmt` to all events listed on `http://demoee.org/wp-json/ee/v4.8.27/events`). To get data in it's true format as stored in the database, however, you would send your requests the version of the EE4 REST API with the highest version number. You can find out which versions are supported by looking at the index page's "ee", "served_core_versions" parameter. Here is a sample value:

```json
"ee": {
        "version": "4.8.29.rc.005",
        "addons": {
            "Payflow_Pro_Gateway": {
                "name": "Payflow_Pro_Gateway",
                "version": "1.0.2.rc.000"
            },
            "REST_API": {
                "name": "REST_API",
                "version": "3.0.1.beta.002"
            },
            "Stripe_Gateway": {
                "name": "Stripe_Gateway",
                "version": "1.0.12.rc.003"
            },
            "New_Payment_Method": {
                "name": "New_Payment_Method",
                "version": "0.0.1.dev.002"
            }
        },
        "maintenance_mode": "0",
        "served_core_versions": [
            "4.8.29"
        ]
    },
```

Also notice that only the routes for the latest served version of the API is listed in the index, all others aren't included. This is done to encourage you to use the latest version of the API. 




### Compatibility with the EE4 JSON REST API Add-on

This documentation is for the EE4 REST API included in Event Espresso 4.8.29 and up, which should be used for any new API clients. However, the now-deprecated EE4 JSON REST API Addon can still be active at the same time. Please read the introduction of the EE4 JSON REST API Addon for more details.

Related Articles

- [Event Espresso 4 REST API: Introduction](ee4-rest-api-introduction.md)
- [Event Espresso 4 REST API: RPC-Style Endpoints](ee4-rest-apid-rpc-style-endpoints.md)
- [Event Espresso 4 REST API: Extending the API](../D--Addon-API/extending-ee4-rest-api.md)
- [Event Espresso 4 REST API: Testing Tools](ee4-rest-api-testing-tools.md)
