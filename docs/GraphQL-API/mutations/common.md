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
