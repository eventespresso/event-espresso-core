# FormElement query examples

FormElement object has connections with `RootQuery`.

## Example with `RootQuery`

```gql
query GET_FORM_ELEMENTS(
	$where: EspressoRootQueryFormElementsConnectionWhereArgs
) {
	espressoFormElements(where: $where) {
		nodes {
			id
			adminLabel
			belongsTo
			publicLabel
			status
		}
	}
}
```

### Query variables

```json
{
	"where": {
		"belongsTo": ["abc"],
		"status": ["ACTIVE"]
	}
}
```
