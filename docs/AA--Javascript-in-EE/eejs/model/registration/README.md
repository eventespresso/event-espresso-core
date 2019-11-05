# `eejs.model.registrationModel`

This is an object exposed on `eejs.model` that contains all model related interfaces for the registration model.

## Constants

There are a number of constants available on `eejs.model.registrationModel`

| Constant                  | Description                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `MODEL_NAMES`             | Object containing `MODEL` and `RELATION` keys. `MODEL` represents the name of the model. |
| `REGISTRATION_STATUS_IDS` | An array of all the status codes on the model.                                           |

## Query

These are various helper functions for generating registration related queries.

| Property                                                                             | Description                                                                                                                                |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`queryDataTypes`](./query.md#eejsmodelregistrationmodelquerydatatypes)              | A prop-types configuration option describing query data attributes for this model                                                          |
| [`defaultQueryData`](./query.md#eejsmodelregistrationmodeldefaultquerydata)          | An object describing defaults for the query data on this model.                                                                            |
| [`mapOrderBy`](./query.md#eejsmodelregistrationmodelmaporderby-orderby-)             | A function used to map an orderBy string to the actual value used in a REST query from the context of this model.                          |
| [`whereConditions`](./query.md#eejsmodelregistrationmodelwhereconditions-querydata-) | A function building a where conditions query string for this models collection endpoint request using provided incoming query data object. |
| [`getQueryString`](./query.md#eejsmodelregistrationmodelgetquerystring-querydata---) | A function that returns a query string usable with the collection endpoint for this model.                                                 |
