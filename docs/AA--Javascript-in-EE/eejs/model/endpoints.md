Various functions related to endpoint data exposed on `eejs.model`.

## `eejs.model.getEndpoint( modelName )`

Retrieves the REST endpoint for the provided model.

This returns the endpoint if it exists and throws an `eejs.Exception` if the given model name is not known.

### Arguments

| Argument    | Type   | Description                                                                                         |
| ----------- | ------ | --------------------------------------------------------------------------------------------------- |
| `modelName` | string | The name of the model to retrieve the endpoint for.  This should be the singular name of the model. |

### Example

```js
// "/ee/v4.8.36/events''
console.log( eejs.model.getEndpoint( 'event' ) );
```

## `applyQueryString( modelName, queryString = '' )`

This applies the provided queryString (without `?`) to the REST endpoint for the given model.  If the `queryString` argument is not included then just returns the endpoint for the model.

This returns a string.  Will also throw an `eejs.Exception` if the given model name is not known.

### Arguments

| Argument      | Type   | Description                                                                  |
| ------------- | ------ | -----------------------------------------------------------------------------|
| `modelName`   | string | The name of the model (singular form) for which to apply the query string to.|
| `queryString` | string | The query string (without the `?`) to apply to the endpoint.                 |

### Example

```js
// "/ee/v4.8.36/events/?[where][EVT_ID]=10&order_by[Datetime.DTT_EVT_start]=DESC"
console.log( eejs.model.applyQueryString(
  'event',
  '[where][EVT_ID]=10&order_by[Datetime.DTT_EVT_start]=DESC'
) );
```

## `stripBaseRouteFromUrl( url )`

Strips the `base_rest_route` value ( eg. `https://myurl.com/wp-json/`) from the provided url string.

This returns a string.

### Arguments

| Argument | Type   | Description                              |
| -------- | ------ | ---------------------------------------- |
| `url`    | string | The string to strip the base route from. |

### Example

Assuming the javascript is hosted on the `https://ee.test` domain:

```js
// "ee/v4.8.36/events"
console.log( eejs.model.stripBaseRouteFromUrl( 'https://ee.test/wp-json/ee/v4.8.36/events' ) );
```