# Event query examples

## Basic event query

```gql
query getEventData($id: Int!) {
	eventBy(eventId: $id) {
		id
		dbId
		name
		desc
		isUpcoming
		isActive
		isInactive
		isExpired
	}
}
```

### Query variables

```json
{
	"id": 22
}
```

## Event query with venues

```gql
query getEventData($id: Int!) {
	eventBy(eventId: $id) {
		id
		dbId
		name
		desc
		# All the venues
		venues {
			nodes {
				name
				desc
				address
				address2
				city
				zip
				capacity
				phone
			}
		}
	}
}
```

## Event query with datetimes and related tickets

```gql
query getEventData($id: Int!) {
	eventBy(eventId: $id) {
		id
		dbId
		name
		desc
		# All datetimes for the event
		datetimes {
			nodes {
				id
				dbId
				name
				description
				startDate
				endDate
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

## Event query with venues, datetimes and related tickets

```gql
query getEventData($id: Int!) {
	eventBy(eventId: $id) {
		id
		dbId
		name
		desc
		# All the venues
		venues {
			nodes {
				name
				desc
			}
		}
		# All datetimes for the event
		datetimes {
			nodes {
				id
				dbId
				name
				startDate
				endDate
				# All tickets for the datetime
				tickets {
					nodes {
						id
						dbId
						name
						price
					}
				}
			}
		}
	}
}
```
