import useFetchTickets from '../queries/tickets/useFetchTickets';
import useFetchDatetimes from '../queries/datetimes/useFetchDatetimes';
import useFetchPriceTypes from '../queries/priceTypes/useFetchPriceTypes';
import useFetchPrices from '../queries/prices/useFetchPrices';
import { useFetchCurrentUser, useFetchGeneralSettings } from '../../../../shared/services/apollo/queries';
import useCacheRehydration from './useCacheRehydration';
import useEvent from '../queries/events/useEvent';

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

	// pre-fetch event data
	useEvent();
};

export default useInitQueries;
