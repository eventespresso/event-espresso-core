# State query examples

State object has connections with `RootQuery`.

## Example with `RootQuery`

```gql
query GET_STATES($where: EspressoRootQueryStatesConnectionWhereArgs) {
	espressoStates(where: $where) {
		nodes {
			id
			name
			abbreviation
			isActive
			country {
				id
				ISO
				name
			}
		}
	}
}
```

### Query variables

```json
{
	"where": {
		"activeOnly": false,
		"countryIsoIn": ["US", "GB"]
	}
}
```
