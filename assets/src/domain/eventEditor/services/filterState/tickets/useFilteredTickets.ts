import { useEffect, useMemo } from 'react';

import { Ticket } from '@edtrServices/apollo';
import { entityListSearch } from '@appServices/utilities/text';
import filters from '@sharedEntities/tickets/predicates/filters';
import sorters from '@sharedEntities/tickets/predicates/sorters';
import { useTickets } from '@edtrServices/apollo/queries';
import useTicketsListFilterState from './useTicketsListFilterState';

const useFilteredTickets = (): Array<Ticket> => {
	const tickets = useTickets();

	const {
		pageNumber,
		perPage,
		searchText,
		setPageNumber,
		setTotal,
		sortBy,
		ticketsToShow,
		total,
	} = useTicketsListFilterState();

	// Flter the list
	const filteredEntities = useMemo<Array<Ticket>>(() => {
		return filters({ tickets, show: ticketsToShow });
	}, [tickets, ticketsToShow]);

	// search entities
	const searchResults = useMemo<Array<Ticket>>(() => {
		return entityListSearch({
			entities: filteredEntities,
			searchFields: ['name', 'description'],
			searchText,
		});
	}, [filteredEntities, searchText]);

	// sort it
	const sortedEntities = useMemo<Array<Ticket>>(() => {
		return sorters({ tickets: searchResults, sortBy });
	}, [searchResults, sortBy]);

	// paginate it
	const paginatedEntities = useMemo<Array<Ticket>>(() => {
		return sortedEntities.slice(perPage * (pageNumber - 1), perPage * pageNumber);
	}, [sortedEntities, perPage, pageNumber]);

	// Avoid synchronous state update
	useEffect(() => {
		if (total !== searchResults.length) {
			setTotal(searchResults.length);
		}
	}, [total, searchResults]);

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
