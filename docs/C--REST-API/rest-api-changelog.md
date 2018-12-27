
# EE4 REST API Changelog

This is a log of client-facing changes made to the EE4 REST API (ie, changes to internal implementations aren't listed here, just changes that affect consumers of the API). For a complete list of changes to EE4, please see [the EE4 changelog](https://eventespresso.com/wiki/ee4-changelog/)

## $VID:$
- Added support for simpler querystring syntax. Eg the following are now valid: "wp-json/ee/v4.8.36/events?where[EVT_ID][IN]=1,2,3", "wp-json/ee/v4.8.36/tickets?where[TKT_name][IN]=['cheap','expensive']", and "wp-json/ee/v4.8.36/datetimes?where[DTT_EVT_start][<]=2018-01-01T00:00:00"
- Fixed password-protected events, venues, and attendees so their sensitive data is replaced with default data.
- Added `password` query parameter for reading password-protected data.
- Added read-only property `_protected` to REST entities, which is a list of all the properties which were replaced with default data. 

## 4.9.66
- Added foreign keys to REST API responses

## 4.9.38
- Added support for `POST`ing, `PUT`ing, and `DELETE`ing EE4 model data
- PHP objects in JSON responses are replaced with JSON objects with properties "error_code" and "error_message"
- Serialized data is no longer accepted when querying
- removed the routes for "post_metas", e.g. "/wp-json/ee/v4.8.36/post_metas" as it was a security concern

## 4.9.18
- Added support for `force_show_ee_namespace` query parameter in order to show different EE namespaces in the WP Index

## 4.9.9
- Added route `/wp-json/ee/v4.8.36/site_info` which gives some general information about site settings, like the default timezone and currency. See https://github.com/eventespresso/event-espresso-core/blob/master/docs/C--REST-API/ee4-rest-api-introduction.md#site-info
- All properties representing a local datetime (which since 4.9.0 have been in the site's default timezone) also have a corresponding UTC version by the same name but with `_gmt` appended onto the end. 

## 4.9.0
- All datetimes returned by the API are now in the site's default timezone (previously they were all in UTC)

## 4.8.40
- Added calculated field "datetime_checkin_stati" on registration resources onto 4.8.36 endpoint. See [the calculated fields reference page](https://github.com/eventespresso/event-espresso-core/blob/master/docs/C--REST-API/ee4-rest-api-calculated-fields-reference.md) for more info
