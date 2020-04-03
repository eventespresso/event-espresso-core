import { useEffect, useRef } from 'react';

import { useFilterBarService } from '@appLayout/entityList/filterBar';
import { salesFilter, statusFilter } from '@sharedEntities/tickets/predicates/filters';
import sortTckets from '@sharedEntities/tickets/predicates/sorters';
import { domain, ticketsList } from '@edtrServices/constants';
import { entityListSearch } from '@appServices/utilities/text';
import { Ticket } from '@edtrServices/apollo';
import { TicketsFilterStateManager } from '@edtrServices/filterState';
import useIsChainedFilter from './useIsChainedFilter';

type Domain = typeof domain;
type TFSM = TicketsFilterStateManager;

const useTicketsFilterBarService = (): void => {
	const {
		registerFilter: registerTicketsFilter,
		registerSearch: registerTicketsSearch,
		registerSorter: registerTicketsSorter,
	} = useFilterBarService<Domain, typeof ticketsList, Ticket, TFSM>(domain, ticketsList);

	/**
	 * isChained filter needs special treatment :)
	 *
	 * Unlike other sorters and filters, isChained filter is dependent upon
	 * external state which can change. Thus we need to update our filter callback
	 * to make sure the stale state is not bound to the filter callback.
	 */
	const [isChainedFilter, isChainedDeps] = useIsChainedFilter();
	// To avoid multiple filter registrations, we will store the aleady registered
	// filter unsubscribe callback in ref to use it to remove the existing filter.
	const chainedFilterRef = useRef<VoidFunction>();
	useEffect(() => {
		// If already register
		if (typeof chainedFilterRef.current === 'function') {
			// de-register
			chainedFilterRef.current();
		}
		// Register isChained filter
		const unsubscribeIsChainedFilter = registerTicketsFilter(({ entityList, filterState }) => {
			return isChainedFilter({ isChained: filterState.isChained, tickets: entityList });
		});

		// update ref.
		chainedFilterRef.current = unsubscribeIsChainedFilter;

		// Housekeeping
		return (): void => {
			unsubscribeIsChainedFilter();
		};
	}, [isChainedDeps]);

	useEffect(() => {
		// Register sales filter
		const unsubscribeSalesFilter = registerTicketsFilter(({ entityList, filterState }) => {
			return salesFilter({ sales: filterState.sales, tickets: entityList });
		});

		// Register status filter
		const unsubscribeStatusFilter = registerTicketsFilter(({ entityList, filterState }) => {
			return statusFilter({ status: filterState.status, tickets: entityList });
		});

		// Register search
		const unsubscribeTicketsSearch = registerTicketsSearch(({ entityList, filterState }) => {
			return entityListSearch<Ticket>({
				entities: entityList,
				searchFields: ['name', 'description'],
				searchText: filterState.searchText,
			});
		});

		// Register sorter
		const unsubscribeTicketsSorter = registerTicketsSorter(({ entityList, filterState }) => {
			return sortTckets({ tickets: entityList, sortBy: filterState.sortBy });
		});

		// Housekeeping
		return (): void => {
			unsubscribeSalesFilter();
			unsubscribeStatusFilter();
			unsubscribeTicketsSearch();
			unsubscribeTicketsSorter();
		};
	}, []);
};

export default useTicketsFilterBarService;
