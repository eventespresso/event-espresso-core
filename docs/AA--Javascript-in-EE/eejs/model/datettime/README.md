# `eejs.model.dateTimeModel`

This is an object exposed on `eejs.model` that contains all model related interfaces for the DateTime model.

## Constants

There are a number of constants available on `eejs.model.dateTimeModel`

| Constant                         | Description                                                               |
| -------------------------------- | ------------------------------------------------------------------------- |
| `MODEL_NAME`                     | The name of the model                                                     |
| `DATETIME_STATUS_ID`             | An object of statuses on this model ( `SOLD_OUT`, `ACTIVE` etc.)          | 
| `DATETIME_STATUS_IDS`            | An array of all the status codes on the model.                            |
| `DATE_FIELDS`                    | An array of fields on the model that have date information.               |

## Formatters

Various formatter helpers for this model.

| Formatter                                                                                              | Description                                                      |
| -------------------------------------------------------------------------------------------------------| ---------------------------------------------------------------- |
| [`prettyDateFromDateTime`](./formatter.md#eejsmodeldatetimemodelprettydatefromdatetime-datetimeentity-)| This returns a prettified label for the provided datetime entity |

## Query

These are various helper functions for generating datetime related queries.

| Property                                                  |  Description                                                                                                                                |
| ----------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`nowDateAndTime`](./query.md#nowdateandtime)             |  A function that returns a `moment` instance representing now.                                                                              |
| [`queryDataTypes`](./query.md#querydatatypes)             |  A prop-types configuration option describing query data attributes for this model                                                          |
| [`defaultQueryData`](./query.md#defaultquerydata)         |  An object describing defaults for the query data on this model.                                                                            |
| [`mapOrderBy`](./query.md#maporderby-orderby-)            |  A function used to map an orderBy string to the actual value used in a REST query from the context of this model.                          |
| [`whereConditions`](./query.md#whereconditions-querydata-)|  A function building a where conditions query string for this models collection endpoint request using provided incoming query data object. |
| [`getQueryString`](./query.md#getquerystring-querydata-)  |  A function that returns a query string usable with the collection endpoint for this model.                                                 |