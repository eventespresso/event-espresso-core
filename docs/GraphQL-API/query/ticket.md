# Ticket query examples

Ticket object has connections with `RootQuery`, `Datetime` etc. and thus can be accessed as a field of any of them.

## Example with `RootQuery`

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

### Query variables

```json
{
	"where": {
		"datetime": "RGF0ZXRpbWU6MTQ=",
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
