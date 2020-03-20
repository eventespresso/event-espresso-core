import { useEffect, useMemo } from 'react';

import { Entity } from '@appServices/apollo/types';
import { EntityListFilterStateManager } from './types';
import useEntityFilterService from './useEntityFilterService';

type ELFSM = EntityListFilterStateManager;

const useFilteredEntities = <D extends string, L extends string, E extends Entity, FS extends ELFSM>(
	domain: D,
	listId: L,
	entityList: Array<E>,
	filterState: FS
): { paginatedEntities: Array<E>; searchResults: Array<E> } => {
	const { pageNumber, perPage, searchText, setPageNumber, setTotal, sortBy, total } = filterState;

	const { applyFilters, applySearches, applySorters } = useEntityFilterService<D, L, E, ELFSM>(domain, listId);

	// Filter the list
	const filteredEntities = useMemo<Array<E>>(() => {
		return applyFilters(entityList, filterState);
	}, [entityList, filterState]);

	// search entities
	const searchResults = useMemo<Array<E>>(() => {
		return applySearches(filteredEntities, filterState);
	}, [filteredEntities, searchText]);

	// sort it
	const sortedEntities = useMemo<Array<E>>(() => {
		return applySorters(searchResults, filterState);
	}, [searchResults, sortBy]);

	// paginate it
	const paginatedEntities = useMemo<Array<E>>(() => {
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

	return { paginatedEntities, searchResults };
};

export default useFilteredEntities;
