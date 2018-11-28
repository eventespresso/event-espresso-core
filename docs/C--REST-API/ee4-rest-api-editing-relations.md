# EE4 REST API: Editing Relations
Event Espresso 4 data is highly inter-related (see [Relations: Discovering Them, What Relations Establish](ee4-rest-api-writing-data.md#relations-discovering-them-what-relations-establish).)

In order to modify how data is related, you are free to directly edit each entity's foreign keys (eg `EVT_ID` on datetimes is a foreign key, indicating which event the registration belongs to) and entries in their join resource (eg the resource `question_group_question` is actually a resource between questions and question groups).
However, as of $VID:$, the EE4 REST API also provides helper endpoints for adding and removing relations.

For each read-only route for fetching related items (eg `events/123/datetimes`) there is a corresponding write-only 
route (eg `events/123/datetimes/456`) for adding or removing relations. These relations-editing routes are the same
except they accept another ID, the ID of the related entity.

These endpoints are listed in the index (see [Event Espresso Data in the WP API Index](ee4-rest-api-introduction.md#event-espresso-data-in-the-wp-api-index).)

## Adding Relations

To associate data, send a `POST` request.

Eg, if there was an event with ID 124, and a datetime with ID 1 which weren't previously related,
```
POST https://demoee.org/wp-json/ee/v4.8.36/events/124/datetimes/1
``` 
will set datetime's `EVT_ID` to be 123, thus relating the data.
The JSON response will look like this

```json
{
    "success": true,
    "datetime": {
        "DTT_ID": 1,
        "EVT_ID": 124,
        "DTT_name": "",
        "DTT_description": {
            "raw": "",
            "rendered": ""
        },
        "DTT_EVT_start": "2018-09-06T08:00:00",
        "DTT_EVT_end": "2018-09-06T17:00:00",
        "DTT_reg_limit": null,
        "DTT_sold": 2,
        "DTT_reserved": 0,
        "DTT_is_primary": false,
        "DTT_order": 1,
        "DTT_parent": 0,
        "DTT_deleted": false,
        "DTT_EVT_start_gmt": "2018-09-06T15:00:00",
        "DTT_EVT_end_gmt": "2018-09-07T00:00:00",
        "_links": {
            ...
        },
        "_calculated_fields": {}
    },
    "event": {
        "EVT_ID": 124,
        "EVT_name": "Stormtrooper Party",
        "EVT_desc": {
            "raw": "",
            "rendered": ""
        },
        "EVT_slug": "ee",
        "EVT_created": "2018-08-07T09:50:28",
        "EVT_short_desc": "",
        "EVT_modified": "2018-08-07T09:50:28",
        "EVT_wp_user": 1,
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
        "EVT_visible_on": "2018-08-07T16:50:28",
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
        "EVT_created_gmt": "2018-08-07T16:50:28",
        "EVT_modified_gmt": "2018-08-07T16:50:28",
        "EVT_visible_on_gmt": "2018-08-07T23:50:28",
        "link": "http://laragonee.test/events/ee/",
        "_links": {
            ...
        },
        "_calculated_fields": {}
    }
}
```

Notice that it returns an object with both `event` and `datetime` properties, which are the two complete up-to-date entities.

### Editing Relations Across Join Resources

When editing a relation that uses a join resource (ie, is listed as a `HABTM_Relation` relation on the 
[resources endpoint](https://github.com/eventespresso/event-espresso-core/blob/master/docs/C--REST-API/ee4-rest-api-introduction.md#resources-models))
there will also be an entry titled `join`, which is an object with a property whose name is the joining entity's name, and its value is the joining entity.

Eg, if you have a question 12 and question group 4,
```
POST https://demoee.org/wp-json/ee/v4.8.36/questions/12/question_groups/4
```
will make them related (ie, make question 12 part of question group 4, by adding a new entry in the join resource `question_group_question`), and will return

```json
{
    "success": true,
    "question": {
        "QST_ID": 12,
        "QST_display_text": {
            "raw": "Is test",
            "rendered": "<p>Is test</p>\n"
        },
        "QST_admin_label": "is-test",
        "QST_system": "",
        "QST_type": {
            "raw": "RADIO_BTN",
            "pretty": "Radio Buttons"
        },
        "QST_required": false,
        "QST_required_text": "",
        "QST_order": 12,
        "QST_admin_only": false,
        "QST_max": null,
        "QST_wp_user": 1,
        "QST_deleted": false,
        "_links": {
            ...
        },
        "_calculated_fields": {}
    },
    "question_group": {
        "QSG_ID": 4,
        "QSG_name": "IS",
        "QSG_identifier": "is-5bbb8fa565cf72.42203209",
        "QSG_desc": {
            "raw": "",
            "rendered": ""
        },
        "QSG_order": 4,
        "QSG_show_group_name": true,
        "QSG_show_group_desc": false,
        "QSG_wp_user": 1,
        "QSG_system": 0,
        "QSG_deleted": false,
        "_links": {
            ...
        },
        "_calculated_fields": {}
    },
    "join": {
        "question_group_question": {
            "QGQ_ID": 16,
            "QSG_ID": 4,
            "QST_ID": 12,
            "QGQ_order": 0,
            "_links": {
                ...
            },
            "_calculated_fields": {}
        }
    }
}
```
This means `join.questino_group_question` is a entity that joins the other two items together.

If there were a previous entry in the joining resource, it would instead be updated.

## Removing Relations

You use the same routes to remove relations, just using a different HTTP method, `DELETE`.

Eg, if there was an event with ID 124, and a datetime with ID 1 which weren't previously related,
```
DELETE https://demoee.org/wp-json/ee/v4.8.36/events/124/datetimes/1
``` 
will set the datetime's `EVT_ID` to 0, thus removing it from the event.

The JSON response will look like this

```json
{
    "success": true,
    "datetime": {
        "DTT_ID": 1,
        "EVT_ID": 0,
        "DTT_name": "",
        "DTT_description": {
            "raw": "",
            "rendered": ""
        },
        "DTT_EVT_start": "2018-09-06T08:00:00",
        "DTT_EVT_end": "2018-09-06T17:00:00",
        "DTT_reg_limit": null,
        "DTT_sold": 2,
        "DTT_reserved": 0,
        "DTT_is_primary": false,
        "DTT_order": 1,
        "DTT_parent": 0,
        "DTT_deleted": false,
        "DTT_EVT_start_gmt": "2018-09-06T15:00:00",
        "DTT_EVT_end_gmt": "2018-09-07T00:00:00",
        "_links": {
            ...
        },
        "_calculated_fields": {}
    },
    "event": {
        "EVT_ID": 124,
        "EVT_name": "Stormtrooper Party",
        "EVT_desc": {
            "raw": "",
            "rendered": ""
        },
        "EVT_slug": "ee",
        "EVT_created": "2018-08-07T09:50:28",
        "EVT_short_desc": "",
        "EVT_modified": "2018-08-07T09:50:28",
        "EVT_wp_user": 1,
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
        "EVT_visible_on": "2018-08-07T16:50:28",
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
        "EVT_created_gmt": "2018-08-07T16:50:28",
        "EVT_modified_gmt": "2018-08-07T16:50:28",
        "EVT_visible_on_gmt": "2018-08-07T23:50:28",
        "link": "http://laragonee.test/events/ee/",
        "_links": {
            ...
        },
        "_calculated_fields": {}
    }
}
```

on successful removal of the relation. Notice that the datetime's `EVT_ID` is now 0.

### Removing Relations Across Joining Resources

Requests to remove relations across joining resources will also have a `join` property in the response. This is the
joining entity before it was removed during the request.

Eg, if you have question 12 and question group 4, 
```
DELETE https://demoee.org/wp-json/ee/v4.8.36/questions/12/question_groups/4
```
will remove the entry in `question_group_questions` which related that question to that group, and will return:

```json
{
    "success": true,
    "question": {
        "QST_ID": 12,
        "QST_display_text": {
            "raw": "Where are you taking those droids?",
            "rendered": "<p>Where are you taking those droids?</p>\n"
        },
        "QST_admin_label": "droids",
        "QST_system": "",
        "QST_type": {
            "raw": "RADIO_BTN",
            "pretty": "Radio Buttons"
        },
        "QST_required": false,
        "QST_required_text": "",
        "QST_order": 12,
        "QST_admin_only": false,
        "QST_max": null,
        "QST_wp_user": 1,
        "QST_deleted": false,
        "_links": {
            ...
        },
        "_calculated_fields": {}
    },
    "question_group": {
        "QSG_ID": 4,
        "QSG_name": "Tatooine Admission Questionnaire",
        "QSG_identifier": "is-5bbb8fa565cf72.42203209",
        "QSG_desc": {
            "raw": "",
            "rendered": ""
        },
        "QSG_order": 4,
        "QSG_show_group_name": true,
        "QSG_show_group_desc": false,
        "QSG_wp_user": 1,
        "QSG_system": 0,
        "QSG_deleted": false,
        "_links": {
            ...
        },
        "_calculated_fields": {}
    },
    "join": {
        "question_group_question": {
            "QGQ_ID": 15,
            "QSG_ID": 4,
            "QST_ID": 12,
            "QGQ_order": 0,
            "_links": {
                ...
            },
            "_calculated_fields": {}
        }
    }
}
```

to indicate the relation was successful removed. In this case, the entry in `join.question_group_question` is actually the
**previous** question-group-question entry that was removed during this request.
If no question-group-question were removed during the request, `join.question_group_question` will be null.
If the property `success` is `true`, it means there is no relation between the two items at the end of the request;
`false` indicates there is still a relation between them (although, currently if this were the case, an error message should
have been returned).

