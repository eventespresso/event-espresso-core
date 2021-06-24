# FormSection query examples

FormSection object has connections with `RootQuery`.

## Example with `RootQuery`

```gql
query GET_FORM_SECTIONS(
	$where: EspressoRootQueryFormSectionsConnectionWhereArgs
) {
	espressoFormSections(where: $where) {
		nodes {
			id
			appliesTo
			belongsTo
			htmlClass
			order
			status
		}
	}
}
```

### Query variables

```json
{
	"where": {
		"appliesTo": ["PRIMARY"],
		"belongsTo": "xyz",
		"status": ["ACTIVE"]
	}
}
```
