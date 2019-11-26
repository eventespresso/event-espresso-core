# Event relations query examples

Using the below query, you can get the relational data for he entities inside an event by passing the event ID.

```gql
query getEvetRelationalData($id: Int!) {
  eventRelations(eventId: $id)
}
```

### Query variables

```json
{
  "id": 22
}
```

The returned data for the field is a JSON encoded string with the following structure:

```json
{
  datetimes: {
    "YTydBYryt": {
      tickets: [ "JHGbUYBuytb", "jhTURYTbb" ]
    },
    "JHBGRFHBF": {
      tickets: [ "JHFBGYFGFNYT", "SDRVERDVT" ]
    }
  },
  tickets: {
    "JHFBGYFGFNYT": {
      datetimes: [ "YTydBYryt", "JHBGRFHBF" ],
      prices: [ "JHBFYFTY", "GNDTRBN" ]
    },
    "jhTURYTbb": {
      datetimes: [ "JHBGRFHBF", "SDRVERDVT" ],
      prices: [ "JHBUHFVY", "JHGBJH" ]
    }
  },
  prices: {
    "JHBFYYT": {
      tickets: [ "JHFBGYFGFNYT", "SDRVERDVT" ],
      priceTypes: [ "KUJNF", "JKBHKJI" ],
    }
  }
}
```
