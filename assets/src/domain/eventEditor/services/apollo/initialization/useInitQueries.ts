import { useEvent, useFetchDatetimes, useFetchPriceTypes, useFetchPrices, useFetchTickets } from '../queries/';
import { useFetchCurrentUser, useFetchGeneralSettings } from '@sharedServices/apollo/queries';
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

	// pre-fetch event data
	useEvent();
};

export default useInitQueries;
