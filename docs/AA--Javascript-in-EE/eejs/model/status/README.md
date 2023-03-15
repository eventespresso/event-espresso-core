# `eejs.model.statusModel`

This is an object exposed on `eejs.model` that contains all model related interfaces for the status model.

## Constants

There are a number of constants available on `eejs.model.statusModel`

| Constant                   | Description                                                                              |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `MODEL_NAMES`              | Object containing `MODEL` and `RELATION` keys. `MODEL` represents the name of the model. |
| `STATUS_TYPE_EMAIL`        | String representing email status type                                                    |
| `STATUS_TYPE_EVENT`        | String representing event status type                                                    |
| `STATUS_TYPE_MESSAGE`      | String representing message status type                                                  |
| `STATUS_TYPE_PAYMENT`      | String representing payment status type                                                  |
| `STATUS_TYPE_REGISTRATION` | String representing registration status type                                             |
| `STATUS_TYPE_TRANSACTION`  | String representing transaction status type                                              |
| `EMAIL_STATUS_ID`          | An object of statuses for the email status type                                          |
| `EVENT_STATUS_ID`          | And object of statuses for the event status type                                         |
| `MESSAGE_STATUS_ID`        | An object of statuses for the message status type                                        |
| `PAYMENT_STATUS_ID`        | An object of statuses for the payment status type                                        |
| `REGISTRATION_STATUS_ID`   | An object of statuses for the registration status type                                   |
| `TRANSACTION_STATUS_ID`    | An object of statuses for the transaction status type                                    |
| `CPT_STATUS_ID`            | An object of statuses for the CPT status type.                                           |
| `UNKNOWN_STATUS_ID`        | Represents a status that is unknown                                                      |
| `ALL_STATUS_IDS`           | An array of all the status ids.                                                          |

## Helpers

Various helper functions for this model.

| Formatter                                                                                                        | Description                                                                                                                                                                  |
| ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`prettyStatus`](./helpers.md#eejsmodelstatusmodelprettystatus-statusCode-singular--true-schema--sentence-)      | This returns the pretty localized status label string for the given status code and other arguments.                                                                         |
| [`prettyStatuses`](./helpers.md#eejsmodelstatusmodelprettystatuses-statuscodes-singular--true-schema--sentence-) | Same as `prettyStatus` except this accepts an array of status codes and returns an object indexed by those codes with the values the pretty localized label for those codes. |

## Query

These are various helper functions for generating status related queries.

| Property                                                                       | Description                                                                                                                                |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [`queryDataTypes`](./query.md#eejsmodelstatusmodelquerydatatypes)              | A prop-types configuration option describing query data attributes for this model                                                          |
| [`defaultQueryData`](./query.md#eejsmodelstatusmodeldefaultquerydata)          | An object describing defaults for the query data on this model.                                                                            |
| [`mapOrderBy`](./query.md#eejsmodelstatusmodelmaporderby-orderby-)             | A function used to map an orderBy string to the actual value used in a REST query from the context of this model.                          |
| [`whereConditions`](./query.md#eejsmodelstatusmodelwhereconditions-querydata-) | A function building a where conditions query string for this models collection endpoint request using provided incoming query data object. |
| [`getQueryString`](./query.md#eejsmodelstatusmodelgetquerystring-querydata---) | A function that returns a query string usable with the collection endpoint for this model.                                                 |
