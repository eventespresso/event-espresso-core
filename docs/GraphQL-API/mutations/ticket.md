# Ticket mutation examples

Ticket object has three mutations:

- `createTicket`
- `updateTicket`
- `deleteTicket`

## `createTicket`

This mutation creates a new ticket. It is recommended to pass `datetimes` and `prices` fields to make sure the relations are properly set.

```gql
mutation createTicket($input: CreateTicketInput!) {
  createTicket(input: $input) {
    ticket {
      id
      name
    }
  }
}
```

### Query variables for `createTicket`

```json
{
  "input": {
    "clientMutationId": "xyz",
    "name": "Some name here",
    "description": "Here goes the description",
    "price": 20.5,
    "startDate": "06/12/2019 10:40:00",
    "endDate": "12/26/2019 20:40:00",
    "datetimes": [
      "RGF0ZXRpbWU6MTQ=",
      "JTRBYTRTUBYYBYT="
    ],
    "prices": [
      "JHGBYTUYN",
      "KLHMGYIOK"
    ]
  }
}
```

## `updateTicket`

This mutation updates an existing ticket.

```gql
mutation updateTicket($input: UpdateTicketInput!) {
  updateTicket(input: $input) {
    ticket {
      id
      name
    }
  }
}
```

### Query variables for `updateTicket`

```json
{
  "input": {
    "clientMutationId": "xyz",
    "id": "VGlja2V0OjE5",
    "name": "Some name here",
    "description": "Here goes the description",
    "startDate": "06/12/2019 10:40:00",
    "endDate": "12/26/2019 20:40:00",
    "datetimes": [
      "RGF0ZXRpbWU6MTQ=",
      "JTRBYTRTUBYYBYT="
    ],
    "prices": [
      "JHGBYTUYN",
      "KLHMGYIOK"
    ]
  }
}
```

## `deleteTicket`

This mutation deletes a ticket.

```gql
mutation deleteTicket($input: DeleteTicketInput!) {
  deleteTicket(input: $input) {
    ticket {
      id
    }
  }
}
```

### Query variables for `deleteTicket`

```json
{
  "input": {
    "clientMutationId": "xyz",
    "id": "VGlja2V0OjE5"
  }
}
```
