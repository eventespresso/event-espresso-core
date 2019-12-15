# PriceType query examples

PriceType object has connections with `RootQuery` etc. and thus can be accessed as a field of any of them.

## Example with `RootQuery`

```gql
query GET_PRICE_TYPES {
	espressoPriceTypes {
		nodes {
			id
			dbId
			name
			baseType
			isPercent
			isDiscount
			isDeleted
		}
	}
}
```
