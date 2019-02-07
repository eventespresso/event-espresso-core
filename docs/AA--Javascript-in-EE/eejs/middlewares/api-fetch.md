This file contains documentation on all the properties and middle-ware functions available on the `eejs.middlewares.apiFetch` object.  These middle-wares are meant for implementation with the `@wordpress/api-fetch` package.

Along with middle-wares, the following properties are found in the object:

| Property                 | Description                              |
| -------------------------| -----------------------------------------|
| `CONTEXT_CAPS_READ`      | The `read` context for api requests.     |
| `CONTEXT_CAPS_READ_ADMIN`| The `read_admin` context for api requests|
| `CONTEXT_CAPS_EDIT`      | The `edit` context for api requests      |
| `CONTEXT_CAPS_DELETE`    | The `delete` context for api requests    |

## `eejs.middleWares.apiFetch.capsMiddleware`

Event Espresso [REST API endpoints have a feature](../../../C--REST-API/ee4-rest-api-GET-filtering-results.md#caps) that allows for filtering results on a request based on the capabilities of the current authorized user.  This middleware allows client code to append a `caps` value to every Event Espresso `GET` REST request.

The following conditions need to be present for the middleware to append a `caps` query argument along with the designated value:

- The url for the request matches the signature of a Event Espresso `REST` request.
- They request method being used is `GET`
- There is no `caps` query argument already in the url.

### Arguments

| Argument  | Type   | Description                                                                                                                               |
| --------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------|
| `context` | string | What context to use as the `caps` value.  Recommended you use any of the `CONTEXT_CAPS_*` constants exposed on `eejs.middleWares.apiFetch`|

### Example

Let's say we were in an editor context and we want to ensure that any `GET` requests for Event Espresso endpoints return data the current authorized user has access to for the `edit` context.

```js
// at some point after `wp.apiFetch` and `eejs.middleWares` are loaded 
// and before any fetch calls:
wp.apiFetch.use( 
  eejs.middleWares.apiFetch.capsMiddleware( 
      eejs.middleWares.apiFetch.CONTEXT_CAPS_EDIT
   )
);
```