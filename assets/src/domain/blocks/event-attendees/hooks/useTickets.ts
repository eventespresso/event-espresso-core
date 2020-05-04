import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import gql from 'graphql-tag';

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

const useTickets = (datetime?: string): QueryResult<any> => {
	return useQuery(GET_TICKETS, {
		variables: {
			first: 100,
			where: { datetime },
		},
	});
};

export default useTickets;
