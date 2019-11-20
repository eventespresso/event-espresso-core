import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_DATE = gql`
	query getDatetimes($eventId: Number) {
  		datetimes(where: $eventId) {
    		edges {
				node {
					id
					name
					description
					sold
					reserved
					order
					startDate
					endDate
					startTime
					endTime
				}
			}
		}
	}
`;

const useDateCardData = ( { eventId } ) => {
	const { data } = useQuery( GET_DATE, {
		variables: { eventId },
	} );

	return data;
};

export default useDateCardData;
