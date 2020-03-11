import { useMemo, useEffect } from 'react';

import { entityListSearch } from '@appServices/utilities/text';
import { useDatetimes } from '@edtrServices/apollo/queries';
import { Datetime } from '@edtrServices/apollo';
import useDatesListFilterState from './useDatesListFilterState';
import filters from '@sharedEntities/datetimes/predicates/filters';
import sorters from '@sharedEntities/datetimes/predicates/sorters';

const useFilteredDatetimes = (): Array<Datetime> => {
	const dates = useDatetimes();

	const {
		datetimesToShow,
		pageNumber,
		perPage,
		searchText,
		setPageNumber,
		setTotal,
		sortBy,
		total,
	} = useDatesListFilterState();

	// Flter the list
	const filteredEntities = useMemo<Array<Datetime>>(() => {
		return filters({ dates, show: datetimesToShow });
	}, [dates, datetimesToShow]);

	// search entities
	const searchResults = useMemo<Array<Datetime>>(() => {
		if (!searchText) {
			return filteredEntities;
		}

		return entityListSearch({
			entities: filteredEntities,
			searchFields: ['name', 'description'],
			searchText,
		});
	}, [filteredEntities, searchText]);

	// sort it
	const sortedEntities = useMemo<Array<Datetime>>(() => {
		return sorters({ dates: searchResults, sortBy });
	}, [searchResults, sortBy]);

	// paginate it
	const paginatedEntities = useMemo<Array<Datetime>>(() => {
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

export default useFilteredDatetimes;
