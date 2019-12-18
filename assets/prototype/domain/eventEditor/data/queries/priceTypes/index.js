import gql from 'graphql-tag';

export const PRICE_TYPE_ATTRIBUTES = gql`
	fragment priceTypeAttributes on EspressoPriceType {
		id
		dbId
		baseType
		isBasePrice
		isDeleted
		isDiscount
		isPercent
		isTax
		name
		order
	}
`;

export const GET_PRICE_TYPE = gql`
	query GET_PRICE_TYPE($id: ID!) {
		priceType(id: $id) {
			...priceTypeAttributes
		}
	}
	${PRICE_TYPE_ATTRIBUTES}
`;

export const GET_PRICE_TYPES = gql`
	query GET_PRICE_TYPES {
		espressoPriceTypes {
			nodes {
				...priceTypeAttributes
			}
		}
	}
	${PRICE_TYPE_ATTRIBUTES}
`;
