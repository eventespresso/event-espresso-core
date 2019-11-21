# Ticket mutation examples

Ticket object has has three mutations:

- `createTicket`
- `updateTicket`
- `deleteTicket`

## `createTicket`

This mutation creates a new ticket. It is recommended to pass `datetimes` field to make sure the ticket is not orphaned.

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
    "datetimes": [
      "RGF0ZXRpbWU6MTQ=",
      "JTRBYTRTUBYYBYT="
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
    "datetimes": [
      "RGF0ZXRpbWU6MTQ=",
      "JTRBYTRTUBYYBYT="
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
