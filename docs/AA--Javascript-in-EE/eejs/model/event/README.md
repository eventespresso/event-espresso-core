# `eejs.model.eventModel`

This is an object exposed on `eejs.model` that contains all model related interfaces for the Event model.

## Constants

There are a number of constants available on `eejs.model.eventModel`

| Constant           | Description                                                                              |
| ------------------ | ---------------------------------------------------------------------------------------- |
| `MODEL_NAMES`      | Object containing `MODEL` and `RELATION` keys. `MODEL` represents the name of the model. |
| `EVENT_STATUS_ID`  | An object of statuses on this model ( `SOLD_OUT`, `POSTPONED` etc.)                      |
| `EVENT_STATUS_IDS` | An array of all the status codes on the model.                                           |

## Query

These are various helper functions for generating datetime related queries.

| Property                                                                      | Description                                                                                                                                |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`queryDataTypes`](./query.md#eejsmodeleventmodelquerydatatypes)              | A prop-types configuration option describing query data attributes for this model                                                          |
| [`defaultQueryData`](./query.md#eejsmodeleventmodeldefaultquerydata)          | An object describing defaults for the query data on this model.                                                                            |
| [`mapOrderBy`](./query.md#eejsmodeleventmodelmaporderby-orderby-)             | A function used to map an orderBy string to the actual value used in a REST query from the context of this model.                          |
| [`whereConditions`](./query.md#eejsmodeleventmodelwhereconditions-querydata-) | A function building a where conditions query string for this models collection endpoint request using provided incoming query data object. |
| [`getQueryString`](./query.md#eejsmodeleventmodelgetquerystring-querydata---) | A function that returns a query string usable with the collection endpoint for this model.                                                 |
