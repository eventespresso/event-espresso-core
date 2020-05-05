import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import gql from 'graphql-tag';

import { AttendeesEditProps } from '../types';

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

type UseAttendees = (props: AttendeesEditProps['attributes']) => QueryResult<any>;

const useAttendees: UseAttendees = ({ ticket, status, limit }) => {
	return useQuery(GET_ATTENDEES, {
		variables: {
			first: limit,
			where: {
				regTicket: ticket,
				regStatus: status,
			},
		},
	});
};

export default useAttendees;
