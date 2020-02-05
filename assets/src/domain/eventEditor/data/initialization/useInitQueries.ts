import useFetchTickets from '../queries/tickets/useFetchTickets';
import useFetchDatetimes from '../queries/datetimes/useFetchDatetimes';
import useFetchPriceTypes from '../queries/priceTypes/useFetchPriceTypes';
import useFetchPrices from '../queries/prices/useFetchPrices';
import { useFetchCurrentUser, useFetchGeneralSettings } from '../../../shared/data/queries';
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
