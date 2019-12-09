import { pathOr } from 'ramda';
import useFetchTickets from './useFetchTickets';
import useFetchDatetimes from './useFetchDatetimes';
import useFetchPriceTypes from './useFetchPriceTypes';
import useFetchPrices from './useFetchPrices';

const useInitQueries = () => {
	console.log('%c useInitQueries: ', 'color: deeppink; font-size: 14px;');

	// initiate datetime fetching.
	const { data: datetimesData, error: datetimeError, loading: loadingDates } = useFetchDatetimes();

	const datetimes = pathOr([], ['datetimes', 'nodes'], datetimesData);

	// initiate ticket fetching.
	const datetimeIn = datetimes ? datetimes.map(({ id }) => id) : [];
	const { data: ticketsData, error: ticketError, loading: loadingTickets } = useFetchTickets({ datetimeIn });

	const tickets = pathOr([], ['tickets', 'nodes'], ticketsData);

	// initiate price type fetching.
	useFetchPriceTypes();

	// initiate price fetching.
	const ticketIn = tickets.map(({ id }) => id);
	useFetchPrices({ ticketIn });

	return {
		datetimes: datetimes || [],
		datetimeError: datetimeError || null,
		loadingDates: loadingDates || false,
		tickets: tickets || [],
		ticketError: ticketError || null,
		loadingTickets: loadingTickets || false,
	};
};

export default useInitQueries;
