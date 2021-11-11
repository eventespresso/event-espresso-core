# Datetime query examples

Datetime object has connections with `RootQuery`, `EspressoEvent`, `EspressoTicket` etc. and thus can be accessed as a field of any of them.

## Example with `RootQuery`

### Get a list of datetimes

```gql
query GET_DATETIMES(
	$first: Int
	$where: EspressoRootQueryDatetimesConnectionWhereArgs
) {
	espressoDatetimes(first: $first, where: $where) {
		edges {
			node {
				id
				name
				description
				sold
				reserved
				order
				startDate
				endDate
				startTime
				endTime
			}
		}
	}
}
```

#### Query variables

```json
{
	"first": 50,
	"where": {
		"upcoming": true,
		"event": "ZXNwcmVzc29fZXZlbnRzOjIy",
		"search": "some keywords"
	}
}
```

or

```json
{
	"where": {
		"eventId": 22
	}
}
```

### Get a single datetime

```gql
query GET_DATETIME($id: ID!) {
	espressoDatetime(id: $id) {
		id
		name
		description
	}
}
```

#### Query variables

```json
{
	"id": "RGF0ZXRpbWU6MTQ="
}
```

## [Example with `EspressoEvent`](event.md)

## Example with related tickets

```gql
query GET_DATETIMES {
	espressoDatetimes {
		edges {
			node {
				id
				dbId
				name
				description
				sold
				reserved
				order
				startDate
				endDate
				startTime
				endTime
				# All tickets for the datetime
				tickets {
					nodes {
						id
						dbId
						name
						description
						price
					}
				}
			}
		}
	}
}
```
