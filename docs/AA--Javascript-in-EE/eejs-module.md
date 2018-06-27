# The `eejs` Module

This module is exposed via the [`eejs-core` dependency](eejs-core-dependency.md).  Any javascript loaded with that as a dependency has access to anything on the eejs global.

You can use any of the properties of `eejs` in your webpack builds by making the `eejs-core` script handle a dependency for your loaded javascript and then doing something like this in your own js:

```js
import { data, routes } from '@eventespresso/eejs'
```

Then in your webpack configuration you'd just need to define `@eventespresso/eejs` as an external that points to the `eejs` global.  So something like:

```js
const config = {
   externals: {
       '@eventespresso/eejs': 'eejs'
   }
}
```

Currently the following things are exposed:

## `eejs.data`

This is intended for holding arbitrary data that can be passed from the server to the client for use in other javascript.  You can [read more about exposing custom data here](eejs-data-api.md).

By default, `eejs.data` will always have the following exposed on it:

| Property | Description | Usage Example |
| ---------|-------------|---------------|
| `eejs_api_nonce` | This is the value of `wp_create_nonce('wp_rest')` in case you need to set the nonce headers for WP Rest requests in a WordPress context. | `eejs.data.eejs_api_nonce` |
| `paths` |  This is an object containing various references to paths on the site.  Currently it exposes `rest_url`, `site_url`, and `admin_url`. | `eejs.paths.rest_url`, `eejs.paths.site_url`, `eejs.paths.admin_url` |


## `eejs.routes`

This property holds various route information and accessors.  Currently the following is exposed on it:

| Property | Description | Usage Example |
| --------|-------------|--------------|
| `SITE_URL` | Equivalent to `eejs.data.paths.site_url` | `eejs.routes.SITE_URL` |
| `ADMIN_URL` | Equivalent to `eejs.data.paths.admin_url` | `eejs.routes.ADMIN_URL` |
| `ADMIN_ROUTES` | An object containing all the slugs for each route in the EE core admin pages. | `eejs.routes.ADMIN_ROUTE.EVENT` would return `'espresso_events'` |
| `ADMIN_ROUTE_ACTION_DEFAULT` | This returns the 'default' string that is used for all default actions on EE admin page routes |  `eejs.routes.ADMIN_ROUTE_ACTION_DEFAULT` |
| `ADMIN_ROUTE_ACTIONS` | This is a map of available admin page actions for each admin page slug in Event Espresso admin routes. | `eejs.routes.ADMIN_ROUTE_ACTIONS.EVENT.CATEGORY_LIST` would return `'category_list'`
| `getAdminUrl` | This is a function that receives `page` and `action` arguments and will return a url to that admin page and action. | `eejs.routes.getAdminUrl()` with no arguments will return something like `https://eetest.test/wp-admin/admin.php?page=espresso_events&action=default`.  `eejs.routes.getAdminUrl( eejs.ADMIN_ROUTES.REGISTRATION, eejs.ADMIN_ROUTES.REGISTRATION.REPORTS )` would return something like `https://eetest.test/wp-admin/admin.php?page=espresso_registrations&action=reports` |

## `eejs.vendor`

This property contains references to various third party libraries used as dependencies in EE code.  This allows us to have one file containing all the various vendors we use so that it's cached in user's browsers longer.  EE specific js will then  be much smaller built files and can change more often without breaking the vendor caches.  Currently this vendor file contains a lot of third party code and at some point it will be broken out into smaller individual vendor files.

The following third party libraries are built into this file and exposed on the `eejs.vendor` global.

- `eejs.vendor.react`
- `eejs.vendor.reactDom`
- `eejs.vendor.moment`
- `eejs.vendor.classname`
- `eejs.vendor.lodash`
- `eejs.vendor.reactRedux`
- `eejs.vendor.redux`

## `eejs.i18n`

While WordPress has a `wpi18n` package, its stability is in question being that nothing has been worked out yet for its inclusion in core.  As a result (and to avoid potential conflicts when its introduced), we've decided to wrap it and expose it on our own `eejs.i18n` global. You can read more about our implementation in [this document](javascript-i18n.md)

## `eejs.exception`

This is a very basic custom Error exception class that our javascript uses whenever there is need to throw an exception.
