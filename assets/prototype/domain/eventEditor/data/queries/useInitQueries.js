import { pathOr } from 'ramda';
import useFetchTickets from './tickets/useFetchTickets';
import useFetchDatetimes from './datetimes/useFetchDatetimes';
import useFetchPriceTypes from './priceTypes/useFetchPriceTypes';
import useFetchPrices from './prices/useFetchPrices';
import useCacheRehydration from './useCacheRehydration';

const useInitQueries = () => {
	useCacheRehydration();

	// initiate datetime fetching.
	const { data: datetimesData } = useFetchDatetimes();

	const datetimes = pathOr([], ['datetimes', 'nodes'], datetimesData);

	// initiate ticket fetching.
	const datetimeIn = datetimes ? datetimes.map(({ id }) => id) : [];
	const { data: ticketsData } = useFetchTickets({ datetimeIn });

	const tickets = pathOr([], ['tickets', 'nodes'], ticketsData);

	// initiate price type fetching.
	useFetchPriceTypes();

	// initiate price fetching.
	const ticketIn = tickets.map(({ id }) => id);
	useFetchPrices({ ticketIn });
};

export default useInitQueries;
