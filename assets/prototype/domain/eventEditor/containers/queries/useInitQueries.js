import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import { GET_DATETIMES, GET_TICKETS } from './dates';

const useInitQueries = ({ eventId }) => {
	const { loading: loading1, data: datetimesData } = useQuery(GET_DATETIMES, {
		variables: {
			where: {
				eventId
			}
		}
	});
	const datetimes = get(datetimesData, ['datetimes', 'nodes']);

	const datetimeIn = datetimes && datetimes.map(({ id }) => id);
	const { loading: loading2, data: ticketsData } = useQuery(GET_TICKETS, {
		variables: {
			where: {
				datetimeIn
			}
		}
	});
	const ticketsNodes = get(ticketsData, ['tickets', 'edges']);
	const tickets = ticketsNodes && ticketsNodes.map(({ node }) => node);

	console.log({ loading1, loading2 });

	return { datetimes, tickets };
};

export default useInitQueries;
