# Ticket query examples

Ticket object has connections with `RootQuery`, `Datetime` etc. and thus can be accessed as a field of any of them.

## Example with `RootQuery`

```gql
query getTickets ($where: RootQueryTicketsConnectionWhereArgs) {
  tickets( where: $where) {
    edges {
      node {
        id
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
    "datetimeId": 15,
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
    "datetimeIn": [16,20,14],
  }
}
```

## [Example with `Datetime`](datetime.md)
