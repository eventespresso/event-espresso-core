import gql from 'graphql-tag';
import { PRICE_TYPE_ATTRIBUTES } from '../priceTypes';

export const PRICE_ATTRIBUTES = gql`
	fragment priceAttributes on EspressoPrice {
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
	fragment priceBaseTypeAttribute on EspressoPrice {
		priceType {
			...priceTypeAttributes
		}
	}
	${PRICE_TYPE_ATTRIBUTES}
`;

export const GET_PRICE = gql`
	query GET_PRICE($id: ID!) {
		price(id: $id) {
			...priceAttributes
		}
	}
	${PRICE_ATTRIBUTES}
`;

export const GET_PRICES = gql`
	query GET_PRICES($where: EspressoRootQueryPricesConnectionWhereArgs) {
		espressoPrices(where: $where) {
			nodes {
				...priceAttributes
			}
		}
	}
	${PRICE_ATTRIBUTES}
`;
