# EE4 REST API: Reading Data

This article gives an overview of how to read data from the EE4 REST API included in EE core. It would probably be good to first [read the introduction and setup article](ee4-rest-api-introduction.md), but if you are familiar with how to use the [WP API](wp-api.org), you're ready for this.

## GETting Results

Send an HTTP GET request to the resource's base URI to get ALL the results, eg an HTTP GET request to

```
https://demoee.org/wp-json/ee/v4.8.29/events
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
        "link": "https://demoee.org.org/events/fegeg/",
        "_protected": [],
        "_links": {
            "self": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49"
                }
            ],
            "collection": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events"
                }
            ],
            "https://api.eventespresso.com/registrations": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/registrations",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/datetimes": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/datetimes",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/question_groups": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/question_groups",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/venues": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/venues",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/term_taxonomies": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/term_taxonomies",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/message_template_groups": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/message_template_groups",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/attendees": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/attendees",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/wp_user": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/wp_user",
                    "single": true
                }
            ],
            "https://api.eventespresso.com/post_metas": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/post_metas",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/extra_metas": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/extra_metas",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/change_logs": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/change_logs",
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

### Serialized PHP Objects in Responses Are Removed

There are some database columns where we store serialized PHP objects, but when reading that data over the EE4 REST 
API, we replace these values with a JSON "error" object containing keys "error_code", and "error_message".
E.g., normally answer entities look like this

```json
{
  "ANS_ID": 1,
  "ANS_value": [
    "b",
    "c"
  ],
...
}
```
or
```json
{
  "ANS_ID": 2,
  "ANS_value": "foobar",
...
}
```

but if the answer somehow contains a serialized PHP object in the database in its "ANS_value" column, "ANS_value" will be 
replaced with a JSON error object, like this
```json
{
"ANS_ID": 3,
  "ANS_value": {
    "error_code": "php_object_not_return",
    "error_message": "The value of this field in the database is a PHP object, which can&#039;t be represented in JSON."
  },
  ...
}
```

### Datetimes and Timezones
Since 4.9.0, all datetimes returned in the EE4 REST API are in the site's default timezone (see the [site_info endpoint](https://github.com/eventespresso/event-espresso-core/blob/master/docs/C--REST-API/ee4-rest-api-introduction.md#site-info)  to find which timezone that is). This is usually the timezone you want to display to users, and their input to you will usually be in this timezone too.

However, if you want more control of how times are displayed (eg you want to display datetimes in the current user's timezone, or the timezone of an event's venue), you'd probably prefer to retrieve the times in UTC. Since 4.9.9, all local datetimes properties have a corresponding datetiem property in UTC. These corresponding properties have the same name, but with `_gmt` appended onto the end (similar to how WP API's posts have `post_date` and `post_date_gmt`). When sending data to the EE4 REST API, you can use either the local datetime properties, or the UTC datetime properties. Eg, `https://demoee.org/wp-json/ee/v4.8.29/events?where[EVT_created]=2016-08-19T08:00:00` works (retrieves all events created on August 19th 2016 at exactly 8am in the site's local time, which can be found on the [site_info endpoint](https://github.com/eventespresso/event-espresso-core/blob/master/docs/C--REST-API/ee4-rest-api-introduction.md#site-info)), as does `https://demoee.org/wp-json/ee/v4.8.29/events?where[EVT_created_gmt]=2016-08-19T16:00:00` (which retrieves all events created at exactly 4pm UTC).

### featured_image_url removed in 4.8.36

Requests to `mysite.com/wp-json/ee/v4.8.34/events`, and also the equivalent endpoint in EE namespaces 4.8.33 and 4.8.29, and also `venues` and `attendees`, included the "featured_image_url" element on each event, venue, and attendee. However, in 4.8.36 the "featured_image_url" element has been removed. Please see the newly added image_* calculated fields on events.

### Password-protected Data
New in Event Espresso $VID:$.
If you set a password on an event or venue (and other custom post types used by Event Espresso) some of their data will be replaced with default values. 
For example, if you set a password on an event, its description, excerpt, external URL, among others, will be replaced with their default values (usually blank strings).
The exact list of properties that were protected is listed in the `_protected` property.
For example, here is the JSON for a password-protected event. 

```json
{
    "EVT_ID": 271,
    "EVT_name": "protecty",
    "EVT_desc": {
        "rendered": ""
    },
    "EVT_slug": "protecty",
    "EVT_created": "2018-09-03T13:30:49",
    "EVT_short_desc": "",
    "EVT_modified": "2018-09-03T14:32:18",
    "EVT_wp_user": 1,
    "parent": 0,
    "EVT_order": 0,
    "status": {
        "raw": "publish",
        "pretty": "Published"
    },
    "password": "",
    "comment_status": "open",
    "ping_status": "closed",
    "EVT_display_desc": false,
    "EVT_display_ticket_selector": 1,
    "EVT_visible_on": "2018-11-15T18:31:48",
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
    "EVT_created_gmt": "2018-09-03T20:30:49",
    "EVT_modified_gmt": "2018-09-03T21:32:18",
    "EVT_visible_on_gmt": "2018-09-04T03:30:49",
    "link": "https://demoee.org.org/events/protecty/",
    "_links": {
        "self": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271"
            }
        ],
        "collection": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events"
            }
        ],
        "https://api.eventespresso.com/registrations": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/registrations",
                "single": false
            }
        ],
        "https://api.eventespresso.com/datetimes": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/datetimes",
                "single": false
            }
        ],
        "https://api.eventespresso.com/question_groups": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/question_groups",
                "single": false
            }
        ],
        "https://api.eventespresso.com/venues": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/venues",
                "single": false
            }
        ],
        "https://api.eventespresso.com/term_relationships": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/term_relationships",
                "single": false
            }
        ],
        "https://api.eventespresso.com/term_taxonomies": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/term_taxonomies",
                "single": false
            }
        ],
        "https://api.eventespresso.com/message_template_groups": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/message_template_groups",
                "single": false
            }
        ],
        "https://api.eventespresso.com/attendees": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/attendees",
                "single": false
            }
        ],
        "https://api.eventespresso.com/wp_user": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/wp_user",
                "single": true
            }
        ],
        "https://api.eventespresso.com/post_metas": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/post_metas",
                "single": false
            }
        ],
        "https://api.eventespresso.com/extra_metas": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/extra_metas",
                "single": false
            }
        ],
        "https://api.eventespresso.com/change_logs": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/change_logs",
                "single": false
            }
        ],
        "https://api.eventespresso.com/promotion_objects": [
            {
                "href": "https://demoee.org.org/wp-json/ee/v4.8.36/events/271/promotion_objects",
                "single": false
            }
        ]
    },
    "_calculated_fields": {
        "_protected": []
    },
    "_protected": [
        "password",
        "EVT_desc",
        "EVT_short_desc",
        "EVT_display_desc",
        "EVT_display_ticket_selector",
        "EVT_visible_on",
        "EVT_additional_limit",
        "EVT_default_registration_status",
        "EVT_member_only",
        "EVT_phone",
        "EVT_allow_overflow",
        "EVT_timezone_string",
        "EVT_external_URL",
        "EVT_donations"
    ]
}
```
Notice the last property `_protected`. Each of the properties it lists have been replaced with their default values. Eg `EVT_desc.rendered` was replaced with "", 
`EVT_visible_on` was replaced with today, and `EVT_allow_overflow` was replaced with false.

Also notice `_calculated_fields._protected`, which indicates all the calculated fields which were protected. Each [included entity](ee4-rest-api-GET-including-specific-fields-and-related-entities-in-results.md) will also have a `_protected` property.

For how to view password-protected data, please see [how a password into the EE4 REST API](ee4-rest-api-GET-filtering-results.md#password).


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
        "link": "https://demoee.org.org/events/fegeg/",
        /* NEW FIELD CALLED "WHATCHEMECALLIT" ADDED BY AN ADDON*/
        "whatchemecallit" : "dont freak out if you see a field added by an addon! be prepared",
        "_links": {
            "self": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49"
                }
            ],
            "collection": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events"
                }
            ],
            "https://api.eventespresso.com/registrations": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/registrations",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/datetimes": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/datetimes",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/question_groups": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/question_groups",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/venues": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/venues",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/term_taxonomies": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/term_taxonomies",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/message_template_groups": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/message_template_groups",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/attendees": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/attendees",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/wp_user": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/wp_user",
                    "single": true
                }
            ],
            "https://api.eventespresso.com/post_metas": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/post_metas",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/extra_metas": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/extra_metas",
                    "single": false
                }
            ],
            "https://api.eventespresso.com/change_logs": [
                {
                    "href": "https://demoee.org.org/wp-json/ee/v4.8.29/events/49/change_logs",
                    "single": false
                }
            ]
        }
    }
]
```

Also, it is planned to maintain the API for each version of core from 4.8.29 onwards. This means that although EE core might be on version 4.10.34, you should still be able to send requests to `https://demoee.org/wp-json/ee/v4.8.29/events` and expect to see the same data in the same format as when EE core was at version 4.8.29 (although that versioned route might have additional properties added in future versions; eg version 4.9.9 adds `EVT_created_gmt` to all events listed on `https://demoee.org/wp-json/ee/v4.8.27/events`). To get data in it's true format as stored in the database, however, you would send your requests the version of the EE4 REST API with the highest version number. You can find out which versions are supported by looking at the index page's "ee", "served_core_versions" parameter. Here is a sample value:

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
