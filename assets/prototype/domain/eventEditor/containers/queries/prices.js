import gql from 'graphql-tag';

export const PRICE_ATTRIBUTES = gql`
	fragment priceAttributes on Price {
		id
		name
		priceId
		amount
		isBasePrice
		isPercent
		isDiscount
	}
`;

export const GET_PRICE = gql`
	query getPrice($id: ID!) {
		price(id: $id) {
			...priceAttributes
		}
	}
	${PRICE_ATTRIBUTES}
`;

export const GET_PRICES = gql`
	query getPrices($where: RootQueryPricesConnectionWhereArgs) {
		prices(where: $where) {
			nodes {
				...priceAttributes
			}
		}
	}
	${PRICE_ATTRIBUTES}
`;
