import gql from 'graphql-tag';
import { PRICE_ATTRIBUTES } from './prices';

export const TICKET_ATTRIBUTES = gql`
	fragment ticketAttributes on Ticket {
		id
		dbId
		name
		description
		price
	}
`;

/**
 * The related prices for a ticket.
 * Can be used to fetch the default prices
 * created for a ticket on the server.
 */
export const TICKET_PRICES_ATTRIBUTE = gql`
	fragment ticketPricesAttribute on Ticket {
		prices {
			nodes {
				...priceAttributes
			}
		}
	}
	${PRICE_ATTRIBUTES}
`;

export const GET_TICKET = gql`
	query GET_TICKET($id: ID!) {
		ticket(id: $id) {
			...ticketAttributes
		}
	}
	${TICKET_ATTRIBUTES}
`;

export const GET_TICKETS = gql`
	query GET_TICKETS($where: RootQueryTicketsConnectionWhereArgs) {
		tickets(where: $where) {
			nodes {
				...ticketAttributes
			}
		}
	}
	${TICKET_ATTRIBUTES}
`;
