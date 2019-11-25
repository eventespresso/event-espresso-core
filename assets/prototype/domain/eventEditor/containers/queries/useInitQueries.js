import get from 'lodash/get';
import { useEffect } from '@wordpress/element';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
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

	const datetimeIn = datetimes ? datetimes.map(({ id }) => id) : [];

	const [fetchRelatedTickets, {
		data: ticketsData,
		error: ticketError,
		loading: loadingTickets,
		called,
	}] = useLazyQuery(GET_TICKETS, {
		variables: {
			where: {
				datetimeIn
			}
		},
	});

	const tickets = get(ticketsData, ['tickets', 'nodes'], []);

	// fetch tickets only when we have datetimes
	// to avoid fetching all tickets irrespective of dates
	useEffect(() => {
		if (
			!called && // Make sure the query function has not already been called.
			datetimeIn.length // Only if we have datetimes.
		) {
			fetchRelatedTickets();
		}
	}, [datetimeIn, called]);

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
