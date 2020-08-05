# bulk update mutation examples

## `bulkUpdateEspressoDatetime`

This mutation updates datetimes in bulk. It has two main inputs

```gql
mutation UPDATE_DATETIMES($input: BulkUpdateEspressoDatetimeInput!) {
	bulkUpdateEspressoDatetime(input: $input) {
		updated
		failed
	}
}
```

### Query variables for `bulkUpdateEspressoDatetime`

```json
{
	"input": {
		"clientMutationId": "",
		"uniqueInputs": [
			{
				"id": "RGF0ZXRpbWU6MTEy",
				"name": "New name for date 112",
				"description": "New desc for the date 112",
				"startDate": "2020-08-01T15:14:00+00:00",
				"endDate": "2020-09-01T15:14:00+00:00"
			},
			{
				"id": "RGF0ZXRpbWU6MTE1",
				"startDate": "2020-09-01T15:14:00+00:00",
				"endDate": "2020-10-01T15:14:00+00:00"
			}
		],
		"sharedInput": {
			"id": "",
			"name": "New name for all dates",
			"description": "New desc for all dates",
			"capacity": 200
		}
	}
}
```

## `bulkUpdateEspressoTicket`

This mutation updates tickets in bulk. It has two main inputs

```gql
mutation UPDATE_TICKETS($input: BulkUpdateEspressoTicketInput!) {
	bulkUpdateEspressoTicket(input: $input) {
		updated
		failed
	}
}
```

### Query variables for `bulkUpdateEspressoTicket`

```json
{
	"input": {
		"clientMutationId": "",
		"uniqueInputs": [
			{
				"id": "RGF0ZXRpbWU6MTEy",
				"name": "New name for ticket 112",
				"description": "New desc for the ticket 112",
				"startDate": "2020-08-01T15:14:00+00:00",
				"endDate": "2020-09-01T15:14:00+00:00"
			},
			{
				"id": "RGF0ZXRpbWU6MTE1",
				"startDate": "2020-09-01T15:14:00+00:00",
				"endDate": "2020-10-01T15:14:00+00:00"
			}
		],
		"sharedInput": {
			"id": "",
			"name": "New name for all tickets",
			"description": "New desc for all tickets",
			"quantity": 200
		}
	}
}
```

`uniqueInputs` contains the list individual unique inputs for each entity.

`sharedInput` contains the common input for all the entities

If the value for a field is found in both, then the one in `uniqueInput` will be used.
