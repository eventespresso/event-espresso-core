import { useQuery } from '@apollo/react-hooks';
import { QueryResult } from '@apollo/react-common';
import gql from 'graphql-tag';

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

const useDatetimes = (event?: string): QueryResult<any> => {
	return useQuery(GET_DATETIMES, {
		variables: {
			first: 100,
			where: { event },
		},
	});
};

export default useDatetimes;
