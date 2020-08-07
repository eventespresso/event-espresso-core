# common mutation examples

## `reorderEspressoEntities`

This mutation updates the order field of the supplied entities. The entityIds must be in the same order that is desired.

```gql
mutation REORDER_ENTITIES($input: ReorderEspressoEntitiesInput!) {
	reorderEspressoEntities(input: $input) {
		ok
	}
}
```

### Query variables for `reorderEspressoEntities`

```json
{
	"input": {
		"clientMutationId": "xyz",
		"entityIds": ["RGF0ZXRpbWU6MjA=", "RGF0ZXRpbWU6MTk=", "RGF0ZXRpbWU6MjE=", "RGF0ZXRpbWU6MjI="],
		"entityType": "DATETIME" // or "TICKET"
	}
}
```

**Note**: You should also pass the trashed entities if you want their order to be updated.

## `bulkDeleteEspressoEntities`

This mutation deletes the supplied entities.

```gql
mutation BULK_DELETE_ENTITIES($input: BulkDeleteEspressoEntitiesInput!) {
	bulkDeleteEspressoEntities(input: $input) {
		deleted
		failed
	}
}
```

### Query variables for `bulkDeleteEspressoEntities`

```json
{
	"input": {
		"clientMutationId": "xyz",
		"entityIds": ["VGlja2V0OjIwNw==", "VGlja2V0OjIxMQ==", "VGlja2V0OjIxNw=="],
		"entityType": "TICKET",
		"deletePermanently": false
	}
}
```
