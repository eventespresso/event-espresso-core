# Price query examples

Price object has connections with `RootQuery`, `Ticket` etc. and thus can be accessed as a field of any of them.

## Example with `RootQuery`

```gql
query getPrices ($where: RootQueryPricesConnectionWhereArgs) {
  prices( where: $where) {
    nodes {
        id
        name
        priceId
        priceType {
          id
          priceTypeId
          baseType
          name
        }
    }
  }
}
```

### Query variables

```json
{
  "where": {
    "ticket": "VGlja2V0OjQ1",
    "priceBaseTypeIn": ["BASE_PRICE", "DISCOUNT"]
  }
}
```

or

```json
{
  "where": {
    "ticketIn": [
      "VGlja2V0OjQ1",
      "VGlja2V0OjQ2"
    ]
  }
}
```

## [Example with `Ticket`](ticket.md)
