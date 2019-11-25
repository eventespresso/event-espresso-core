import get from 'lodash/get';
import { useQuery } from '@apollo/react-hooks';
import { GET_DATETIMES } from './dates';
import { GET_TICKETS } from './tickets';

const useInitQueries = ({ eventId }) => {
	console.log('%c useInitQueries: ', 'color: deeppink; font-size: 14px;');
	const {
		data: datetimesData,
		error: datetimeError,
		loading: loadingDates
	} = useQuery(GET_DATETIMES, {
		variables: {
			where: {
				eventId
			}
		}
	});
	const datetimes = get(datetimesData, ['datetimes', 'nodes']);

	const datetimeIn = datetimes && datetimes.map(({ id }) => id);
	const {
		data: ticketsData,
		error: ticketError,
		loading: loadingTickets
	} = useQuery(GET_TICKETS, {
		variables: {
			where: {
				datetimeIn
			}
		}
	});
	const ticketsNodes = get(ticketsData, ['tickets', 'edges']);
	const tickets = ticketsNodes && ticketsNodes.map(({ node }) => node);

	console.log(
		'%c > datetimes, tickets, errors, & loading state',
		'color: palevioletred;',
		{
			datetimes: datetimes || [],
			datetimeError: datetimeError || null,
			loadingDates: loadingDates || false,
			tickets: tickets || [],
			ticketError: ticketError || null,
			loadingTickets: loadingTickets || false
		}
	);

	return {
		datetimes: datetimes || [],
		datetimeError: datetimeError || null,
		loadingDates: loadingDates || false,
		tickets: tickets || [],
		ticketError: ticketError || null,
		loadingTickets: loadingTickets || false
	};
};

export default useInitQueries;
