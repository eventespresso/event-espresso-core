# `eejs.model.attendeeModel`

This is an object exposed on `eejs.model` that contains all model related interfaces for the Attendee model.

## Constants

There are a number of constants available on `eejs.model.attendeeModel`

| Constant          | Description                                                        |
| ------------------| -------------------------------------------------------------------|
| `MODEL_NAME`      | The name of the model                                              |


## Query

These are various helper functions for generating datetime related queries.

| Property                                                                        |  Description                                                                                                                                |
| --------------------------------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------- |
| [`queryDataTypes`](./query.md#eejsmodelattendeemodelquerydatatypes)             |  A prop-types configuration option describing query data attributes for this model                                                          |
| [`defaultQueryData`](./query.md#eejsmodelattendeemodeldefaultquerydata)         |  An object describing defaults for the query data on this model.                                                                            |
| [`mapOrderBy`](./query.md#eejsmodelattendeemodelmaporderby-orderby-)            |  A function used to map an orderBy string to the actual value used in a REST query from the context of this model.                          |
| [`whereConditions`](./query.md#eejsmodelattendeemodelwhereconditions-querydata-)|  A function building a where conditions query string for this models collection endpoint request using provided incoming query data object. |
| [`getQueryString`](./query.md#eejsmodelattendeemodelgetquerystring-querydata---)|  A function that returns a query string usable with the collection endpoint for this model.                                                 |