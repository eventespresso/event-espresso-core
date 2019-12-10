import gql from 'graphql-tag';

export const PRICE_TYPE_ATTRIBUTES = gql`
	fragment priceTypeAttributes on PriceType {
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
	query getPriceType($id: ID!) {
		priceType(id: $id) {
			...priceTypeAttributes
		}
	}
	${PRICE_TYPE_ATTRIBUTES}
`;

export const GET_PRICE_TYPES = gql`
	query getPriceTypes {
		priceTypes {
			nodes {
				...priceTypeAttributes
			}
		}
	}
	${PRICE_TYPE_ATTRIBUTES}
`;
