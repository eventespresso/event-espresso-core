# EspressoPrice mutation examples

EspressoPrice object has three mutations:

-   `createEspressoPrice`
-   `updateEspressoPrice`
-   `deleteEspressoPrice`

## `createEspressoPrice`

This mutation creates a new price. You must pass the `priceType` (GID) field to set the price type ID.

```gql
mutation CREATE_PRICE($input: CreateEspressoPriceInput!) {
	createEspressoPrice(input: $input) {
		price {
			id
			name
		}
	}
}
```

### Query variables for `createEspressoPrice`

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

## `updateEspressoPrice`

This mutation updates an existing price.

```gql
mutation UPDATE_PRICE($input: UpdateEspressoPriceInput!) {
	updateEspressoPrice(input: $input) {
		price {
			id
			name
		}
	}
}
```

### Query variables for `updateEspressoPrice`

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

## `deleteEspressoPrice`

This mutation deletes a price.

```gql
mutation DELETE_PRICE($input: DeleteEspressoPriceInput!) {
	deleteEspressoPrice(input: $input) {
		price {
			id
		}
	}
}
```

### Query variables for `deleteEspressoPrice`

```json
{
	"input": {
		"clientMutationId": "xyz",
		"id": "JGYUKUH"
	}
}
```
