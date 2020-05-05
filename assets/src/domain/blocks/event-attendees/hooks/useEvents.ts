import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import gql from 'graphql-tag';

export const GET_EVENTS: any = gql`
	query GET_EVENTS($first: Int) {
		espressoEvents(first: $first) {
			nodes {
				id
				dbId
				name
			}
		}
	}
`;

const useEvents = (): QueryResult<any> => {
	return useQuery(GET_EVENTS, {
		variables: {
			first: 100,
		},
	});
};

export default useEvents;
