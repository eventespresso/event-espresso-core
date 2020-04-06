import gql from 'graphql-tag';
import { PRICE_ATTRIBUTES } from '../prices';

export const TICKET_ATTRIBUTES: any = gql`
	fragment ticketAttributes on EspressoTicket {
		id
		dbId
		cacheId
		description
		endDate
		isDefault
		isExpired
		isFree
		isOnSale
		isPending
		isRequired
		isSoldOut
		isTaxable
		isTrashed
		max
		min
		name
		order
		price
		quantity
		registrationCount
		reserved
		reverseCalculate
		sold
		startDate
		uses
	}
`;

/**
 * The related prices for a ticket.
 * Can be used to fetch the default prices
 * created for a ticket on the server.
 */
export const TICKET_PRICES_ATTRIBUTE: any = gql`
	fragment ticketPricesAttribute on EspressoTicket {
		prices {
			nodes {
				...priceAttributes
			}
		}
	}
	${PRICE_ATTRIBUTES}
`;

export const GET_TICKET: any = gql`
	query GET_TICKET($id: ID!) {
		ticket(id: $id) {
			...ticketAttributes
		}
	}
	${TICKET_ATTRIBUTES}
`;

export const GET_TICKETS: any = gql`
	query GET_TICKETS($where: EspressoRootQueryTicketsConnectionWhereArgs) {
		espressoTickets(where: $where) {
			nodes {
				...ticketAttributes
			}
		}
	}
	${TICKET_ATTRIBUTES}
`;
