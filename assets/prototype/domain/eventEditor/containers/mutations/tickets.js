import gql from 'graphql-tag';

export const CREATE_TICKET = gql`
	mutation createTicket($input: CreateTicketInput!) {
		createTicket(input: $input) {
			ticket {
				id
				ticketId
				description
				name
				price
			}
		}
	}
`;

export const UPDATE_TICKET = gql`
	mutation updateTicket($input: UpdateTicketInput!) {
		updateTicket(input: $input) {
			ticket {
				id
				description
				name
				price
			}
		}
	}
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
