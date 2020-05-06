import { QueryResult } from '@apollo/react-common';
import gql from 'graphql-tag';

import { AttendeesQueryWhereArgs, useAttendeesQuery } from '@dataServices/apollo/queries';
import { AttendeesList } from '@blocksServices/apollo/types';

export const GET_ATTENDEES: any = gql`
	query GET_ATTENDEES($first: Int, $where: EspressoRootQueryAttendeesConnectionWhereArgs) {
		espressoAttendees(first: $first, where: $where) {
			nodes {
				id
				dbId
				avatar
				fullName
			}
		}
	}
`;

type UseAttendees = (whereArgs: AttendeesQueryWhereArgs, limit?: number) => QueryResult<AttendeesList>;

const useAttendees: UseAttendees = (where, limit) => {
	return useAttendeesQuery({
		query: GET_ATTENDEES,
		variables: {
			first: limit,
			where,
		},
		fetchPolicy: 'cache-first',
	});
};

export default useAttendees;
