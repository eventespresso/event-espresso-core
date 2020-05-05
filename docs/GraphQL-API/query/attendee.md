# Attendee query examples

Attendee object has connections with `RootQuery`.

## Example with `RootQuery`

```gql
query GET_ATTENDEES($where: EspressoRootQueryAttendeesConnectionWhereArgs) {
	espressoAttendees(where: $where) {
		edges {
			node {
				id
				dbId
				avatar
				firstName
				lastName
				bio
				shortBio
				email
				phone
				address
				address2
				city
				zip
				country {
					name
				}
				state {
					name
				}
			}
		}
	}
}
```

**Note:** All fields except name fields are protected and require `ee_edit_contacts` capability.

### Query variables

```json
{
	"where": {
		"regStatus": "APPROVED",
		"regTicket": "VGlja2V0OjQ3"
	}
}
```

or

```json
{
	"where": {
		"regTicketIn": ["VGlja2V0OjQ1", "VGlja2V0OjQ2"]
	}
}
```
