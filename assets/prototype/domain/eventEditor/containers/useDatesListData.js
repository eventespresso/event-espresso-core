import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';

const GET_DATETIMES = gql`
	query GET_DATETIMES($where: RootQueryDatetimesConnectionWhereArgs) {
		datetimes(where: $where) {
			nodes {
				id
				datetimeId
				name
				description
				startDate
				endDate
			}
		}
	}
`;

const useDatesListData = (eventId) => {
	const { loading, data } = useQuery(GET_DATETIMES, {
		variables: {
			where: {
				eventId
			}
		}
	});
	// eslint-disable-next-line curly
	if (loading) return <p>Loading ...</p>;

	const datetimes = get(data, ['datetimes', 'nodes']);

	return datetimes;
};

export default useDatesListData;
