import useFetchTickets from './tickets/useFetchTickets';
import useFetchDatetimes from './datetimes/useFetchDatetimes';
import useFetchPriceTypes from './priceTypes/useFetchPriceTypes';
import useFetchPrices from './prices/useFetchPrices';
import useFetchCurrentUser from './currentUser/useFetchCurrentUser';
import useFetchGeneralSettings from './generalSettings/useFetchGeneralSettings';
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

	// initiate current user fetching.
	useFetchCurrentUser();

	// initiate general settings fetching.
	useFetchGeneralSettings();
};

export default useInitQueries;
