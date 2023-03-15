# Ticket query examples

Ticket object has connections with `RootQuery`, `Datetime` etc. and thus can be accessed as a field of any of them.

## Example with `RootQuery`

### Get a list of tickets

```gql
query GET_TICKETS($where: EspressoRootQueryTicketsConnectionWhereArgs) {
	espressoTickets(where: $where) {
		edges {
			node {
				id
				dbId
				name
				description
				price
			}
		}
	}
}
```

#### Query variables

```json
{
	"where": {
		"datetime": "RGF0ZXRpbWU6MTQ=",
		"search": "some keywords",
		"orderby": [
			{
				"field": "NAME",
				"order": "DESC"
			}
		]
	}
}
```

or

```json
{
	"where": {
		"datetimeIn": ["RGF0ZXRpbWU6MTQ=", "RGF0ZXRpbWU6MTU="]
	}
}
```

### Get a single ticket

```gql
query GET_TICKET($id: ID!) {
	espressoTicket(id: $id) {
		id
		name
		description
	}
}
```

#### Query variables

```json
{
	"id": "VGlja2V0OjQ1"
}
```

## [Example with `Datetime`](datetime.md)

## Example with related prices

```gql
query GET_TICKETS {
	espressoTickets {
		edges {
			node {
				id
				dbId
				name
				description
				prices {
					nodes {
						id
						dbId
						name
					}
				}
			}
		}
	}
}
```
