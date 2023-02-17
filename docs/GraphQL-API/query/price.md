# Price query examples

Price object has connections with `RootQuery`, `EspressoTicket` etc. and thus can be accessed as a field of any of them.

## Example with `RootQuery`

```gql
query GET_PRICES($where: EspressoRootQueryPricesConnectionWhereArgs) {
	espressoPrices(where: $where) {
		nodes {
			id
			name
			dbId
			amount
			isBasePrice
			isDefault
			isPercent
			isTax
			priceTypeOrder
			priceType {
				id
				dbId
				baseType
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
		"ticket": "VGlja2V0OjQ1",
		"priceBaseTypeIn": ["BASE_PRICE", "DISCOUNT"]
	}
}
```

or

```json
{
	"where": {
		"ticketIn": ["VGlja2V0OjQ1", "VGlja2V0OjQ2"]
	}
}
```

## [Example with `EspressoTicket`](ticket.md)
