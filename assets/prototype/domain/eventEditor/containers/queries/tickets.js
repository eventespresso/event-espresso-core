import gql from 'graphql-tag';

export const GET_TICKET = gql`
	query Ticket($id: ID!) {
		ticket(id: $id) {
			id
			ticketId
			name
			description
			price
		}
	}
`;

export const GET_TICKETS = gql`
	query GET_TICKETS($where: RootQueryTicketsConnectionWhereArgs) {
		tickets(where: $where) {
			edges {
				node {
					id
					ticketId
					name
					description
					price
				}
			}
		}
	}
`;
