The `eejs.middlewares` contains all custom middle-wares created for various libraries/services.  They are exposed on the global so EE add-ons can utilize them as well where needed.

## `@wordpress/api-fetch`

| Middleware                                                                                                       | Description                                                                                  |
| -----------------------------------------------------------------------------------------------------------------| ---------------------------------------------------------------------------------------------|
| [`eejs.middleWares.apiFetch.capsMiddleware`](./api-fetch.md#eejsmiddlewaresapifetchcapsmiddleware-context--read-)| Adds the provided context string to the `caps` query argument on every EE REST _GET_ request.|