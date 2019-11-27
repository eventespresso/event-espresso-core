# Price mutation examples

Price object has three mutations:

- `createPrice`
- `updatePrice`
- `deletePrice`

## `createPrice`

This mutation creates a new price. You must pass the `priceType` (GID) field to set the price type ID.

```gql
mutation createPrice($input: CreatePriceInput!) {
  createPrice(input: $input) {
    price {
      id
      name
    }
  }
}
```

### Query variables for `createPrice`

```json
{
  "input": {
    "clientMutationId": "xyz",
    "name": "Some name here",
    "desc": "Here goes the description",
    "amount": 20.5,
    "priceType": "JHTYGTRFTYJ",
    "isDefault": true
  }
}
```

## `updatePrice`

This mutation updates an existing price.

```gql
mutation updatePrice($input: UpdatePriceInput!) {
  updatePrice(input: $input) {
    price {
      id
      name
    }
  }
}
```

### Query variables for `updatePrice`

```json
{
  "input": {
    "clientMutationId": "xyz",
    "id": "JGYUKUH",
    "name": "Some name here",
    "desc": "Here goes the description",
    "amount": 29,
    "priceType": "JHTYGTRFTYJ",
    "isDefault": true
  }
}
```

## `deletePrice`

This mutation deletes a price.

```gql
mutation deletePrice($input: DeletePriceInput!) {
  deletePrice(input: $input) {
    price {
      id
    }
  }
}
```

### Query variables for `deletePrice`

```json
{
  "input": {
    "clientMutationId": "xyz",
    "id": "JGYUKUH"
  }
}
```
