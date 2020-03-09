import { useMemo, useEffect } from 'react';

import { useTickets } from '@edtrServices/apollo/queries';
import { Ticket } from '@edtrServices/apollo';
import useTicketsListFilterState from './useTicketsListFilterState';
import filters from '@sharedEntities/tickets/predicates/filters';
import sorters from '@sharedEntities/tickets/predicates/sorters';

const useFilteredTickets = (): Array<Ticket> => {
	const tickets = useTickets();

	const { sortBy, ticketsToShow, perPage, pageNumber, setTotal, total, setPageNumber } = useTicketsListFilterState();

	// Flter the list
	const filteredEntities = useMemo<Array<Ticket>>(() => {
		return filters({ tickets, show: ticketsToShow });
	}, [tickets, ticketsToShow]);

	// sort it
	const sortedEntities = useMemo<Array<Ticket>>(() => {
		return sorters({ tickets: filteredEntities, sortBy });
	}, [filteredEntities, sortBy]);

	// paginate it
	const paginatedEntities = useMemo<Array<Ticket>>(() => {
		return sortedEntities.slice(perPage * (pageNumber - 1), perPage * pageNumber);
	}, [sortedEntities, perPage, pageNumber]);

	// Avoid synchronous state update
	useEffect(() => {
		if (total !== filteredEntities.length) {
			setTotal(filteredEntities.length);
		}
	}, [total, filteredEntities]);

	useEffect(() => {
		// If there are no paginated entities and current pageNumber is not 1
		//e.g. When there is only one entity on the last page and it's deleted
		if (paginatedEntities.length === 0 && pageNumber > 1) {
			// goto the previous page
			setPageNumber(pageNumber - 1);
		}
	}, [paginatedEntities.length]);

	return paginatedEntities;
};

export default useFilteredTickets;
