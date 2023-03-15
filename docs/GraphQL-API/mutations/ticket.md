# EspressoTicket mutation examples

EspressoTicket object has three mutations:

-   `createEspressoTicket`
-   `updateEspressoTicket`
-   `deleteEspressoTicket`

## `createEspressoTicket`

This mutation creates a new ticket. It is recommended to pass `datetimes` and `prices` fields to make sure the relations are properly set.

```gql
mutation CREATE_TICKET($input: CreateEspressoTicketInput!) {
	createEspressoTicket(input: $input) {
		espressoTicket {
			id
			name
		}
	}
}
```

### Query variables for `createEspressoTicket`

```json
{
	"input": {
		"clientMutationId": "xyz",
		"name": "Some name here",
		"description": "Here goes the description",
		"price": 20.5,
		"startDate": "06/12/2019 10:40:00",
		"endDate": "12/26/2019 20:40:00",
		"datetimes": ["RGF0ZXRpbWU6MTQ=", "JTRBYTRTUBYYBYT="],
		"prices": ["JHGBYTUYN", "KLHMGYIOK"]
	}
}
```

## `updateEspressoTicket`

This mutation updates an existing ticket.

```gql
mutation UPDATE_TICKET($input: UpdateEspressoTicketInput!) {
	updateEspressoTicket(input: $input) {
		espressoTicket {
			id
			name
		}
	}
}
```

### Query variables for `updateEspressoTicket`

```json
{
	"input": {
		"clientMutationId": "xyz",
		"id": "VGlja2V0OjE5",
		"name": "Some name here",
		"description": "Here goes the description",
		"startDate": "06/12/2019 10:40:00",
		"endDate": "12/26/2019 20:40:00",
		"datetimes": ["RGF0ZXRpbWU6MTQ=", "JTRBYTRTUBYYBYT="],
		"prices": ["JHGBYTUYN", "KLHMGYIOK"]
	}
}
```

## `deleteEspressoTicket`

This mutation deletes a ticket.

```gql
mutation DELETE_TICKET($input: DeleteEspressoTicketInput!) {
	deleteEspressoTicket(input: $input) {
		espressoTicket {
			id
		}
	}
}
```

### Query variables for `deleteEspressoTicket`

```json
{
	"input": {
		"clientMutationId": "xyz",
		"id": "VGlja2V0OjE5",
		"deletePermanently": false //default
	}
}
```

Note: To untrash, use `updateEspressoTicket` and pass `isTrashed` as `false`
