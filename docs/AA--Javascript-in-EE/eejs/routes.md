# `eejs.routes`

Exposed on `eejs.routes` are a few constants and helpers related to route/path info for the environment the javascript is being served from.

## Constants

The following constants are available:

| Constant                   | Description                                                                                                                                                     | Example |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| `eejs.routes.SITE_URL`     | This exposes the base url for the site this js is served from                                                                        | `https://mysite.com`
| `eejs.routes.ADMIN_URL`    | This exposes the base admin url for the site this js is served from                                                          | `https://mysite.com/wp-admin`
| `eejs.routes.ADMIN_ROUTES` | This is an object mapping constants for each of the various admin routes for Event Espresso data on an Event Espresso web site.  Note: this is a hardcoded map. | `console.log( eejs.routes.ADMIN_ROUTES.EVENTS );` returns `espresso_events` |
| `eejs.routes.ADMIN_ROUTE_ACTION_DEFAULT`                           | Exposes the string used to indicate the 'default' action route for all Event Espresso Admin pages.                                                                                                                                                                 | `default`      |
| `eejs.routes.ADMIN_ROUTE_ACTIONS`                           | Exposes a hard-coded collection of all admin route _display_ actions for Event Espresso admin pages.  This collection is indexed by the route slug each item is an object with keys being a constant and values being the slug used for the route.                                                                                                                                                                  | `eejs.routes.ADMIN_ROUTE_ACTIONS[ eejs.routes.ADMIN_ROUTES.EVENTS ].CATEGORY_LIST` will return `category_list`     |

## Functions

The following functions are available.

### `eejs.getAdminUrl( page = ADMIN_ROUTES.EVENTS, action = ADMIN_ROUTE_ACTION_DEFAULT )`

This utility function returns the admin url for a given page and action.

#### Arguments

| Argument | Type   | Description                                                                                                                         |
| -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `page`   | string | The main ee admin page string. It's useful to use on of the `eejs.ADMIN_ROUTES` constants here                                      |
| `action` | string | Should correspond to the action for the specific admin page.  It's useful to use one of the `eejs.routes.ADMIN_ROUTE_ACTIONS` here. |

### Example

Assuming the url for the site is `https://mysite.com`:

```js
// https://mysite.com/wp-admin/?admin.php&page=espresso_venues&action=default
console.log( eejs.routes.getAdminUrl( eejs.routes.ADMIN_ROUTES.VENUES ) );
```

