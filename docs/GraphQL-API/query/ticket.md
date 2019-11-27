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
    "datetimeIn": [
      "RGF0ZXRpbWU6MTQ=",
      "RGF0ZXRpbWU6MTU="
    ],
  }
}
```

## [Example with `Datetime`](datetime.md)

## Example with related prices

```gql
query getTickets {
  tickets {
    edges {
      node {
        id
        name
        description
        prices {
          nodes {
            id
            name
          }
        }
      }
    }
  }
}
```
