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
	const { loading, data } = useQuery( GET_DATETIMES, {
		variables: { eventId },
	} );
	// eslint-disable-next-line curly
	if ( loading ) return <p>Loading ...</p>;

	const datetimes = get( data, [ 'eventBy', 'datetimes', 'nodes' ] );

	return datetimes;
};

export default useDatesListData;
