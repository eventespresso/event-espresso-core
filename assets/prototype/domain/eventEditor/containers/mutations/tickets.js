import gql from 'graphql-tag';
import { TICKET_ATTRIBUTES, TICKET_PRICES_ATTRIBUTE } from '../queries/tickets';

export const CREATE_TICKET = gql`
	mutation createTicket($input: CreateTicketInput!) {
		createTicket(input: $input) {
			ticket {
				...ticketAttributes
				...ticketPricesAttribute # fetch default prices when a ticket is created.
			}
		}
	}
	${TICKET_ATTRIBUTES}
	${TICKET_PRICES_ATTRIBUTE}
`;

export const UPDATE_TICKET = gql`
	mutation updateTicket($input: UpdateTicketInput!) {
		updateTicket(input: $input) {
			ticket {
				...ticketAttributes
				...ticketPricesAttribute # fetch updated prices when a ticket is updated.
			}
		}
	}
	${TICKET_ATTRIBUTES}
	${TICKET_PRICES_ATTRIBUTE}
`;

export const DELETE_TICKET = gql`
	mutation deleteTicket($input: DeleteTicketInput!) {
		deleteTicket(input: $input) {
			ticket {
				id
			}
		}
	}
`;
