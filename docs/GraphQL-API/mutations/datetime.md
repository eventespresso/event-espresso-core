# EspressoDatetime mutation examples

EspressoDatetime object has three mutations:

-   `createEspressoDatetime`
-   `updateEspressoDatetime`
-   `deleteEspressoDatetime`

## `createEspressoDatetime`

This mutation creates a new datetime. It is recommended to pass the `event` and `tickets` fields to make sure the datetime has proper relations set with those entities.

```gql
mutation CREATE_DATETIME($input: CreateEspressoDatetimeInput!) {
	createEspressoDatetime(input: $input) {
		datetime {
			id
			name
		}
	}
}
```

### Query variables for `createEspressoDatetime`

```json
{
	"input": {
		"clientMutationId": "xyz",
		"name": "Some name here",
		"description": "Here goes the description",
		"startDate": "06/12/2019 10:40:00",
		"endDate": "12/26/2019 20:40:00",
		"eventId": 22,
		"tickets": ["RGF0ZXJKHNUYT=", "UIYNFTRUYNTBYY"]
	}
}
```

## `updateEspressoDatetime`

This mutation updates an existing datetime.

```gql
mutation UPDATE_DATETIME($input: UpdateEspressoDatetimeInput!) {
	updateEspressoDatetime(input: $input) {
		datetime {
			id
			name
		}
	}
}
```

### Query variables for `updateEspressoDatetime`

```json
{
	"input": {
		"clientMutationId": "xyz",
		"id": "RGF0ZXRpbWU6MTQ=",
		"name": "Some name here",
		"description": "Here goes the description",
		"startDate": "06/12/2019 10:40:00",
		"endDate": "12/26/2019 20:40:00",
		"event": "ZXNwcmVzc29fZXZlbnRzOjIy",
		"tickets": ["RGF0ZXJKHNUYT=", "UIYNFTRUYNTBYY"]
	}
}
```

## `deleteEspressoDatetime`

This mutation deletes a datetime.

```gql
mutation DELETE_DATETIME($input: DeleteEspressoDatetimeInput!) {
	deleteEspressoDatetime(input: $input) {
		datetime {
			id
		}
	}
}
```

### Query variables for `deleteEspressoDatetime`

```json
{
	"input": {
		"clientMutationId": "xyz",
		"id": "RGF0ZXRpbWU6MTQ="
	}
}
```
