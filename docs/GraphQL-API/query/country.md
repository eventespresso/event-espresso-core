# Country query examples

Country object has connections with `RootQuery`.

## Example with `RootQuery`

```gql
query GET_COUNTRIES($where: EspressoRootQueryCountriesConnectionWhereArgs) {
	espressoCountries(where: $where, first: 300) {
		nodes {
			id
			name
			ISO
			isActive
			currencyCode
			currencySign
		}
	}
}
```

### Query variables

```json
{
	"where": {
		"activeOnly": false,
		"isoIn": ["US", "GB"]
	}
}
```
