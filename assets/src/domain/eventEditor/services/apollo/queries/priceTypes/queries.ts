import gql from 'graphql-tag';

export const PRICE_TYPE_ATTRIBUTES: any = gql`
	fragment priceTypeAttributes on EspressoPriceType {
		id
		dbId
		baseType
		cacheId
		isBasePrice
		isDiscount
		isPercent
		isTax
		isTrashed
		name
		order
	}
`;

export const GET_PRICE_TYPE: any = gql`
	query GET_PRICE_TYPE($id: ID!) {
		priceType(id: $id) {
			...priceTypeAttributes
		}
	}
	${PRICE_TYPE_ATTRIBUTES}
`;

export const GET_PRICE_TYPES: any = gql`
	query GET_PRICE_TYPES {
		espressoPriceTypes {
			nodes {
				...priceTypeAttributes
			}
		}
	}
	${PRICE_TYPE_ATTRIBUTES}
`;
