# Datetime query examples

Datetime object has connections with `RootQuery`, `Event`, `Ticket` etc. and thus can be accessed as a field of any of them.

## Example with `RootQuery`

```gql
query getDatetimes($first: Int, $where: RootQueryDatetimesConnectionWhereArgs) {
  datetimes(first: $first, where: $where) {
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

### Query variables

```json
{
  "first": 50,
  "where": {
    "upcoming": true,
    "event": "ZXNwcmVzc29fZXZlbnRzOjIy"
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

## [Example with `Event`](event.md)

## Example with related tickets

```gql
query getDatetimes {
  datetimes {
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
        # All tickets for the datetime
        tickets {
          nodes {
            id
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
