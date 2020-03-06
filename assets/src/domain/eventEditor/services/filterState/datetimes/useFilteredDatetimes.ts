import { useMemo, useState, useEffect } from 'react';
import { slice } from 'ramda';

import { useDatetimes } from '@edtrServices/apollo/queries';
import { Datetime } from '@edtrServices/apollo';
import useDatesListFilterState from './useDatesListFilterState';
import filters from '@sharedEntities/datetimes/predicates/filters';
import sorters from '@sharedEntities/datetimes/predicates/sorters';

const useFilteredDatetimes = (): Array<Datetime> => {
	const dates = useDatetimes();
	const [savedTotal, setSavedTotal] = useState(0);

	const { sortBy, datetimesToShow, perPage, pageNumber, setTotal, total } = useDatesListFilterState();

	const paginatedDatetimes = useMemo<Array<Datetime>>(() => {
		const filteredDates = filters({ dates, show: datetimesToShow });

		const sortedDates = sorters({ dates: filteredDates, order: sortBy });

		const paginatedDates = slice<Datetime>(perPage * (pageNumber - 1), perPage * pageNumber, sortedDates);

		setSavedTotal(filteredDates.length);

		return paginatedDates;
	}, [dates, sortBy, datetimesToShow, perPage, pageNumber]);

	// Avoid synchronous state update
	useEffect(() => {
		if (total !== savedTotal) {
			setTotal(savedTotal);
		}
	}, [total, savedTotal]);

	return paginatedDatetimes;
};

export default useFilteredDatetimes;
