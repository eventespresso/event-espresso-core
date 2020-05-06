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

const getAttendeesOrderBy = (orderBy: string, order: string): Array<any> => {
	const orderByFirstName = {
		field: 'FIRST_NAME',
		order,
	};
	const orderByLastName = {
		field: 'LAST_NAME',
		order,
	};
	let orderByFields = [];
	switch (orderBy) {
		case 'FIRST_THEN_LAST_NAME':
			orderByFields = [orderByFirstName, orderByLastName];
			break;
		case 'LAST_THEN_FIRST_NAME':
			orderByFields = [orderByLastName, orderByFirstName];
			break;
		default:
			orderByFields = [
				{
					field: orderBy,
					order,
				},
			];
			break;
	}

	return orderByFields;
};

const useAttendees: UseAttendees = ({ ticket, status, limit, orderBy, order }) => {
	return useQuery(GET_ATTENDEES, {
		variables: {
			first: limit,
			where: {
				orderby: getAttendeesOrderBy(orderBy, order),
				regTicket: ticket,
				regStatus: status,
			},
		},
	});
};

export default useAttendees;
