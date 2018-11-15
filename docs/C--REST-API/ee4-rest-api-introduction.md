# EE4 REST API: An Introduction

The Event Espresso 4 (EE4) REST API in Core is intended to allow client-side applications, and apps on different servers, to be able to interact with the WordPress Plugin Event Espresso. It is included in Event Espresso since version 4.8.29, and is built on the WP REST API included in WordPress since version 4.4.

Other WordPress plugins that intend to use Event Espresso 4 data server-side (in the PHP code) generally do not need to use the API, and can instead use Event Espresso 4's [database models](../G--Model-System/using-ee4-model-objects.md), config, and other modules directly. 

Example applications of the EE4 REST API could include:

* JavaScript and HTML snippets that could be pasted onto non-WordPress sites that could list events from Event Espresso
* mobile applications for signing attendees into events in Event Espresso
* WordPress plugin that shows (and eventually controls) event data entirely client-side using javascript

If you'd like a more hands-on tutorial, checkout [Building an EE4 Addon that uses Angular.js and the EE4 REST API](building-an-ee4-addon-that-uses-angular-js-and-the-ee4-json-rest-api.md).

## Development
While developing with the EE4 REST API, it is recommended you define the following inside WordPress's `wp-config.php` file:

```php
define('EE_REST_API_DEBUG_MODE',true);
```

This will help make sure you are made aware of any warnings or errors that happen, and it will also ensure that if you add any new endpoints, they will be made available immediately (otherwise we 
cache our registered routes, and only refresh the cache on updates or reactivations of EE). 

Live sites, on the other hand, should set this to `false`, to improve speed, and avoid showing error messages to site visitors.

## Authentication

Some of the EE4 REST API data is public and requires no authentication, but much of it is protected and requires authentication. Because the EE4 REST API is built on the WP REST API, the authentication process is identical: once you authenticate with the WP REST API, you are also authenticated with the EE4 REST API. So we suggest you [read their documentation on authentication](https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/).

Currently, Event Espresso also comes bundled with a [customized version of WP API Basic Auth](https://github.com/eventespresso/Basic-Auth/), primarily used in our mobile apps. However, we do not guarantee we will continue to bundle it with Event Espresso, and so recommend 3rd party applications instead use other authentication methods.

We also have a [tutorial on setting up a demo REST API client application to work with OAuth](https://github.com/eventespresso/event-espresso-core/blob/master/docs/T--Tutorials/using-oauth-client-with-wp-api-oauth.md).

If your application needs to write or delete EE4 data, or if it needs to read data that's normally not publicly-available, you'll need to authenticate (read our [google doc on permissions](https://docs.google.com/spreadsheets/d/1WWfMrmHaA-5LW468GnrgvNX1cQFOvKYq6jj61681GEE/edit?usp=sharing) for more info).

## Endpoint Discovery

Again, because the EE4 REST API is built on the WP REST API, discovering what URLs (endpoints) are available for sending requests to is quite simple. Please [read their documentation](http://v2.wp-api.org/guide/discovery/ on endpoint discovery.

Want to see what the current EE4 REST API looks like? Go ahead and send a request to https://demoee.org/wp-json and see for yourself.

Note: throughout the rest of this article you will see URIs to a particular server that's setup to use the EE4 REST API: demoee.org, where the WP REST API works at demoee.org/wp-json. This is just for ease of learning about the EE4 REST API, obviously your application will want to use data from your server. So for example, if your site's url is mygreatthing.com, the WP REST API would work at mygreatthing.com/wp-json.

## Event Espresso Data in the WP API Index

The WP API index page contains all the EE4 routes, as well some meta information in the "ee" property. Currently it contains: 

* version: the version of the Event Espresso 4 plugin installed on this site
* documentation_url: where to learn more about how to use the API
* addons: a JSON object with properties for each EE4 addon currently active. Each addon contains
    - name: the system name for identifying the addon
    - version: the current version of the addon on this site
* maintenance_mode: indicates whether Event Espresso is currently in maintenance mode. "0" means it is not in maintenance mode (so it can be used as normal), "1" indicates frontend-only maintenance mode (so the site should only be usable by site administrators), "2" indicates full maintenance mode (so the site should not be used, probably because the database needs to be migrated)
* served_core_versions: indicates which EE4 API namespaces are available for use. Please see the section below on [#versioning-and-backwards-compatibility] for more info

Here is an example:

```

"ee": {
    "version": "4.9.0.rc.025",
    "documentation_url": "https://github.com/eventespresso/event-espresso-core/tree/master/docs/C--REST-API",
    "addons": {
      "Promotions": {
        "name": "Promotions",
        "version": "1.0.7.rc.000"
      },
      "Barcode_Scanner": {
        "name": "Barcode_Scanner",
        "version": "1.0.7.rc.000"
      }
    },
    "maintenance_mode": "0",
    "served_core_versions": [
      "4.8.29",
      "4.8.33",
      "4.8.34",
      "4.8.36"
    ]
  },
  
  ```

## Site Info

This is an extra endpoint with site meta information. Currently it contains the following properties:

- default_timezone: an object describing the site's default timezone, with 3 sub-properties:
    * pretty: a string which can be used for displaying the timezone to users. This is translated into the site's language. If the site is in a specific city's timezone then it will display the city; if the site is in a simple UTC offset timezone, then that offset will be shown. The format of this property may change without notice, so your code should not depend on this being in a specific format
    * string: this is the exact timezone string set in WordPress. It will be one of those listed on [http://php.net/manual/en/timezones.php], or it will be an empty string (eg if the site is set to a specific UTC offset)
    * offset: the number of seconds to add onto times returned by the EE4 REST API to get them into the site's default timezone. Note this value can be negative, and it may change depending on whether daylight savings time is being observed
- default_currency: an object describing the site's default currency, with 8 sub-properties:
    * code: the currency code used for money amounts
    * name: a pretty, but not translated, name for the currency, in its singular form
    * name_plural: same as above, but plural
    * sign: the character representing the currency
    * sign_b4: 1 indicates the currency sign should be placed BEFORE the amount, 0 indicates it should be placed afterwards
    * dec_plc: the number of digits to appear after the decimal place when displaying to users
    * dec_mrk: the character to be used for the decimal mark when displaying to users
    * thsnds: the character to be used for separating thousands
For example:

```
{
  "default_timezone": {
    "pretty": "North Dakota - Beulah",
    "string": "America/North_Dakota/Beulah",
    "offset": -18000
  },
  "default_currency": {
    "code": "USD",
    "name": "Dollar",
    "plural": "Dollars",
    "sign": "$",
    "sign_b4": 1,
    "dec_plc": 2,
    "dec_mrk": ".",
    "thsnds": ","
  }
}
```

This route is expected to contain more information in the future, as required.

## Resources (Models)

The "resources" in the Event Espresso REST API are built around the [EE4 models](../G--Model-System/model-querying.md). In the REST APIs we talk about "resources", but in PHP code we talk about models, but they represent the same thing. Each resource/model has fields and relations to other resources.

Resources are the protoypes, and entities are the specific instances (just like models are the prototype, and model objects specific instances). Eg, "events" is a resource queryable on https://demoee.org/wp-json/ee/v4.8.29/events which returns specific "event" entities.

To see what entities exist, send a request to https://demoee.org/wp-json/ee/v4.8.29/resources, or just [click this link](https://demoee.org/wp-json/ee/v4.8.29/resources) to see the resources from one of our servers.

Here is an excerpt:

```json
"Event": {
 "fields": {
 "EVT_ID": {
 "name": "EVT_ID",
 "nicename": "Post ID for Event",
 "has_rendered_format": false,
 "has_pretty_format": false,
 "type": "Primary_Key_Int_Field",
 "datatype": "Number",
 "nullable": false,
 "default": 0,
 "table_alias": "Event_CPT",
 "table_column": "ID"
 },
 "EVT_name": {
 "name": "EVT_name",
 "nicename": "Event Name",
 "has_rendered_format": false,
 "has_pretty_format": false,
 "type": "Plain_Text_Field",
 "datatype": "String",
 "nullable": false,
 "default": "",
 "table_alias": "Event_CPT",
 "table_column": "post_title"
 },
 "EVT_desc": {
 "name": "EVT_desc",
 "nicename": "Event Description",
 "has_rendered_format": true,
 "has_pretty_format": false,
 "type": "Post_Content_Field",
 "datatype": "String",
 "nullable": false,
 "default": "",
 "table_alias": "Event_CPT",
 "table_column": "post_content"
 },
//...many more entries in actual response

"relations": {
 "Registration": {
 "name": "Registration",
 "type": "Has_Many_Relation",
 "single": false
 },
 "Datetime": {
 "name": "Datetime",
 "type": "Has_Many_Relation",
 "single": false
 },
 "Question_Group": {
 "name": "Question_Group",
 "type": "HABTM_Relation",
 "single": false
 },
 "Venue": {
 "name": "Venue",
 "type": "HABTM_Relation",
 "single": false
 },
 "Term_Taxonomy": {
 "name": "Term_Taxonomy",
 "type": "HABTM_Relation",
 "single": false
 },
 "Message_Template_Group": {
 "name": "Message_Template_Group",
 "type": "HABTM_Relation",
 "single": false
 },
 "Attendee": {
 "name": "Attendee",
 "type": "HABTM_Relation",
 "single": false
 },
 "WP_User": {
 "name": "WP_User",
 "type": "Belongs_To_Relation",
 "single": true
 },
```

...many more entries in actual response

Notice the collection of "fields". Here we see there is a field named "EVT_ID" which is a number, "EVT_name" which is a string and "EVT_desc." We also notice that events "have many" datetimes (among other relations).

## Versioning and Backwards Compatibility

Due to feedback from WordPress REST API developer Daniel Bachhuber, we have changed our versioning policy. (You can look at previous versions of this file in github to know what it was previously).

New features and backwards-compatible changes will be added to the latest namespaced version of the EE REST API (eg at the time of writing, the latest versioned namespace is v4.8.36). A new versioned namespace will be released when a non-backwards-compatible change is added.

An exception to this is bugfixes however, especially security fixes: those can be added to the API at any time, and it's possible that they might break backwards compatibility. Of course we will aim to have no bugs and no such changes. 

For example, at the time of writing this article, the latest release of Event Espresso is 4.8.40.p, but the latest versioned namespace for the EE4 REST API is v4.8.36 (ie, to request the event list, you would send a request to `mysite.com/wp-json/ee/v4.8.36/events`, regardless of what the current version of Event Espresso is). However, if a backwards-incompatible change is going to be introduced, which isn't a bugfix, (eg we decide all dates should instead be unix timestamps instead of rfc3339 format, say in version 4.8.255), we would add a new versioned namespace (eg v4.8.255, so you could also send requests to `mysite.com/wp-json/ee/4.8.255/events`) which would include the latest change, and if possible, we would continue to support requests to the previous versioned namespaces (eg so you could continue to use v4.8.36 if you have code you'd rather not update right away to use the new endpoints).

Also note, only the most current endpoints are listed in the index. Eg, if you query a server running EE4.8.40, only `wp-json/ee/v4.8.36/events` will appear in the index, NOT `wp-json/ee/v4.8.29/events` or `wp-json/ee/4.8.34/events`, although those will continue to work.
If you need specific endpoints from an older EE namespace to appear, append "force_show_ee_namespace={namespace}" to show it.

For example, if you need to always see the `ee/v4.8.36` endpoints in the WP index, send a request to `wp-json/?force_show_ee_namespace=ee/v4.8.29`.

Note if you building an API client that might be used with installations of Event Espresso that you won't control: some users might try to use your application on older installations of Event Espresso, which might not have the versioned namespace your API client uses. Eg, they might only have Event Espresso 4.8.34.p installed, and so the v4.8.36 versioned namespace isn't available. 
Also, because the EE4 REST API is modifyable by server-side code. So be aware that the particular installation of Event Espresso you are interacting with could have removed, added, or changed nearly any endpoint, resource, or behaviour. Your API client will need to be ready to handle unexpected behaviour like this.

Please keep up to date on our developer.eventespresso.com blog for updates to the EE4 REST API. You can subscribe to its [RSS feed](http://developer.eventespresso.com/feed/), or [follow us on twitter](https://twitter.com/eventespresso).

Related Articles

- [Event Espresso 4 REST API: Reading Data](ee4-rest-api-reading-data.md)
- [Event Espresso 4 REST API: RPC-Style Endpoints](ee4-rest-api-rps-style-endpoints.md)
- [Event Espresso 4 REST API: Extending the API](../D--Addon-API/extending-ee4-rest-api.md)
- [Event Espresso 4 REST API: Testing Tools](ee4-rest-api-testing-tools.md)

If you have a feature request or bug to report, please let us know on our [Github repo](https://github.com/eventespresso/event-espresso-core/issues).

