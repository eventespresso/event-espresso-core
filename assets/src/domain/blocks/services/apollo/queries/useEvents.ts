import { QueryResult } from '@apollo/react-common';
import gql from 'graphql-tag';

import { useEventsQuery } from '@dataServices/apollo/queries';
import { EventsList } from '../types';

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

const useEvents = (): QueryResult<EventsList> => {
	return useEventsQuery({
		query: GET_EVENTS,
		variables: {
			first: 100,
		},
		fetchPolicy: 'cache-first',
	});
};

export default useEvents;
