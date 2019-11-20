import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import get from 'lodash/get';

const GET_DATETIMES = gql`
	query getEventData($eventId: Int!) {
		eventBy(eventId: $eventId) {
			datetimes {
					nodes {
					id
					name
					description
					sold
					reserved
					order
					start
					end
					length
					startDate
					endDate
					startTime
					endTime
					capacity
					isPrimary
					isSoldOut
					isUpcoming
					isActive
					isExpired
				}
			}
		}
	}
`;

const useDatesListData = ( eventId ) => {
	const { data } = useQuery( GET_DATETIMES, {
		variables: { eventId },
	} );
	const datetimes = get( data, [ 'eventBy', 'datetimes', 'nodes' ] );

	return datetimes;
};

export default useDatesListData;
