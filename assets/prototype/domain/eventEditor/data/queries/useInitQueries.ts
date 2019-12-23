import useFetchTickets from './tickets/useFetchTickets';
import useFetchDatetimes from './datetimes/useFetchDatetimes';
import useFetchPriceTypes from './priceTypes/useFetchPriceTypes';
import useFetchPrices from './prices/useFetchPrices';
import useCacheRehydration from './useCacheRehydration';

const useInitQueries = (): void => {
	useCacheRehydration();

	// initiate datetime fetching.
	useFetchDatetimes();

	// initiate ticket fetching.
	useFetchTickets();

	// initiate price type fetching.
	useFetchPriceTypes();

	// initiate price fetching.
	useFetchPrices();
};

export default useInitQueries;
