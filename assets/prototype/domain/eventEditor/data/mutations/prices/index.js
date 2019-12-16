import gql from 'graphql-tag';
import { PRICE_ATTRIBUTES } from '../../queries/prices';

export const CREATE_PRICE = gql`
	mutation createPrice($input: CreatePriceInput!) {
		createPrice(input: $input) {
			price {
				...priceAttributes
			}
		}
	}
	${PRICE_ATTRIBUTES}
`;

export const UPDATE_PRICE = gql`
	mutation updatePrice($input: UpdatePriceInput!) {
		updatePrice(input: $input) {
			price {
				...priceAttributes
			}
		}
	}
	${PRICE_ATTRIBUTES}
`;

export const DELETE_PRICE = gql`
	mutation deletePrice($input: DeletePriceInput!) {
		deletePrice(input: $input) {
			price {
				id
			}
		}
	}
`;
