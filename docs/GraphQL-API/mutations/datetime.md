# Datetime mutation examples

Datetime object has has three mutations:

- `createDatetime`
- `updateDatetime`
- `deleteDatetime`

## `createDatetime`

This mutation creates a new datetime. It is recommended to pass the `event` and `tickets` fields to make sure the datetime has proper relations set with those entities.

```gql
mutation createDatetime($input: CreateDatetimeInput!) {
  createDatetime(input: $input) {
    datetime {
      id
      name
    }
  }
}
```

### Query variables for `createDatetime`

```json
{
  "input": {
    "clientMutationId": "xyz",
    "name": "Some name here",
    "description": "Here goes the description",
    "startDate": "",
    "endDate": "",
    "event": 22,
    "tickets": [17,19]
  }
}
```

## `updateDatetime`

This mutation updates an existing datetime.

```gql
mutation updateDatetime($input: UpdateDatetimeInput!) {
  updateDatetime(input: $input) {
    datetime {
      id
      name
    }
  }
}
```

### Query variables for `updateDatetime`

```json
{
  "input": {
    "clientMutationId": "xyz",
    "id": 14,
    "name": "Some name here",
    "description": "Here goes the description",
    "startDate": "",
    "endDate": "",
    "tickets": [17,19]
  }
}
```

## `deleteDatetime`

This mutation deletes a datetime.

```gql
mutation deleteDatetime($input: DeleteDatetimeInput!) {
  deleteDatetime(input: $input) {
    datetime {
      id
    }
  }
}
```

### Query variables for `deleteDatetime`

```json
{
  "input": {
    "clientMutationId": "xyz",
    "id": 20
  }
}
```
