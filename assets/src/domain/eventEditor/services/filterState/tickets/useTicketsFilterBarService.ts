import { useEffect } from 'react';

import { useFilterBarService } from '@appLayout/entityList/filterBar';
import { salesFilter, statusFilter } from '@sharedEntities/tickets/predicates/filters';
import sortTckets from '@sharedEntities/tickets/predicates/sorters';
import { domain, ticketsList } from '@edtrServices/constants';
import { entityListSearch } from '@appServices/utilities/text';
import { Ticket } from '@edtrServices/apollo';
import { TicketsFilterStateManager } from '@edtrServices/filterState';
import { useRelatedTicketsForDates } from '@edtrServices/apollo/queries';

type Domain = typeof domain;
type TFSM = TicketsFilterStateManager;

const useTicketsFilterBarService = (): void => {
	const {
		registerFilter: registerTicketsFilter,
		registerSearch: registerTicketsSearch,
		registerSorter: registerTicketsSorter,
	} = useFilterBarService<Domain, typeof ticketsList, Ticket, TFSM>(domain, ticketsList);
	const relatedTickets = useRelatedTicketsForDates(['bla bla']);

	useEffect(() => {
		// Register chain filter
		const unsubscribeChainFilter = registerTicketsFilter(({ entityList, filterState }) => {
			return relatedTickets;
		});

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
			unsubscribeChainFilter();
			unsubscribeSalesFilter();
			unsubscribeStatusFilter();
			unsubscribeTicketsSearch();
			unsubscribeTicketsSorter();
		};
	}, []);
};

export default useTicketsFilterBarService;
