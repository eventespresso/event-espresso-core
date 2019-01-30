# `eejs.model.checkInModel`

This is an object exposed on `eejs.model` that contains all model related interfaces for the CheckIn model.

## Constants

There are a number of constants available on `eejs.model.checkInModel`

| Constant            | Description                                                               |
| --------------------| ------------------------------------------------------------------------- |
| `MODEL_NAME`        | The name of the model                                                     |
| `CHECKIN_STATUS_ID` | An object of statuses on this model ( `SOLD_OUT`, `ACTIVE` etc.)          | 
| `CHECKIN_STATUS_IDS`| An array of all the status codes on the model.                            |

## Query

These are various helper functions for generating datetime related queries.

| Property                                                                        |  Description                                                                                                                                |
| --------------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`queryDataTypes`](./query.md#eejsmodelcheckinmodelquerydatatypes)             |  A prop-types configuration option describing query data attributes for this model                                                          |
| [`defaultQueryData`](./query.md#eejsmodelcheckinmodeldefaultquerydata)         |  An object describing defaults for the query data on this model.                                                                            |
| [`mapOrderBy`](./query.md#eejsmodelcheckinmodelmaporderby-orderby-)            |  A function used to map an orderBy string to the actual value used in a REST query from the context of this model.                          |
| [`whereConditions`](./query.md#eejsmodelcheckinmodelwhereconditions-querydata-)|  A function building a where conditions query string for this models collection endpoint request using provided incoming query data object. |
| [`getQueryString`](./query.md#eejsmodelcheckinmodelgetquerystring-querydata---)|  A function that returns a query string usable with the collection endpoint for this model.                                                 |