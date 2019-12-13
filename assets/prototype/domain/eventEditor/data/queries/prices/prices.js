import gql from 'graphql-tag';
import { PRICE_TYPE_ATTRIBUTES } from '../priceTypes/priceTypes';

export const PRICE_ATTRIBUTES = gql`
	fragment priceAttributes on Price {
		id
		dbId
		amount
		desc
		isBasePrice
		isDefault
		isDeleted
		isDiscount
		isPercent
		isTax
		name
		order
		overrides
		priceTypeOrder
	}
`;

/**
 * The related priceType for a price.
 * Can be used to fetch the related priceType
 * created for a price on the server.
 */
export const PRICE_BASE_TYPE_ATTRIBUTE = gql`
	fragment priceBaseTypeAttribute on Price {
		priceType {
			...priceTypeAttributes
		}
	}
	${PRICE_TYPE_ATTRIBUTES}
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
