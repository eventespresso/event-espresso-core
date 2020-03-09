import { useMemo, useEffect } from 'react';

import { useDatetimes } from '@edtrServices/apollo/queries';
import { Datetime } from '@edtrServices/apollo';
import useDatesListFilterState from './useDatesListFilterState';
import filters from '@sharedEntities/datetimes/predicates/filters';
import sorters from '@sharedEntities/datetimes/predicates/sorters';

const useFilteredDatetimes = (): Array<Datetime> => {
	const dates = useDatetimes();

	const { sortBy, datetimesToShow, perPage, pageNumber, setTotal, total } = useDatesListFilterState();

	// Flter the list
	const filteredDatetimes = useMemo<Array<Datetime>>(() => {
		return filters({ dates, show: datetimesToShow });
	}, [dates, datetimesToShow]);

	// sort it
	const sortedDatetimes = useMemo<Array<Datetime>>(() => {
		return sorters({ dates: filteredDatetimes, sortBy });
	}, [filteredDatetimes, sortBy]);

	// paginate it
	const paginatedDatetimes = useMemo<Array<Datetime>>(() => {
		return sortedDatetimes.slice(perPage * (pageNumber - 1), perPage * pageNumber);
	}, [sortedDatetimes, perPage, pageNumber]);

	// Avoid synchronous state update
	useEffect(() => {
		if (total !== filteredDatetimes.length) {
			setTotal(filteredDatetimes.length);
		}
	}, [total, filteredDatetimes]);

	return paginatedDatetimes;
};

export default useFilteredDatetimes;
