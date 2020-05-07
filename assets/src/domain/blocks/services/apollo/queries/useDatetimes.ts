import { QueryResult } from '@apollo/react-common';
import gql from 'graphql-tag';
import { useDatetimesQuery } from '@dataServices/apollo/queries';
import { DatetimesList } from '../types';

export const GET_DATETIMES: any = gql`
	query GET_DATETIMES($first: Int, $where: EspressoRootQueryDatetimesConnectionWhereArgs) {
		espressoDatetimes(first: $first, where: $where) {
			nodes {
				id
				dbId
				name
			}
		}
	}
`;

const useDatetimes = (event?: string): QueryResult<DatetimesList> => {
	return useDatetimesQuery({
		query: GET_DATETIMES,
		variables: {
			where: {
				event,
			},
		},
		fetchPolicy: 'cache-first',
	});
};

export default useDatetimes;
