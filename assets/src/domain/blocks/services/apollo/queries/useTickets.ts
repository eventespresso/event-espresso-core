import { QueryResult } from '@apollo/react-common';
import gql from 'graphql-tag';

import { useTicketsQuery } from '@dataServices/apollo/queries';
import { TicketsList } from '../types';

export const GET_TICKETS: any = gql`
	query GET_TICKETS($first: Int, $where: EspressoRootQueryTicketsConnectionWhereArgs) {
		espressoTickets(first: $first, where: $where) {
			nodes {
				id
				dbId
				name
			}
		}
	}
`;

const useTickets = (datetime?: string): QueryResult<TicketsList> => {
	return useTicketsQuery({
		query: GET_TICKETS,
		variables: {
			first: 100,
			where: { datetime },
		},
		fetchPolicy: 'cache-first',
	});
};

export default useTickets;
