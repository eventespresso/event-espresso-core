import { useEffect } from 'react';

import { useFilterBarService } from '@appLayout/entityList/filterBar';
import filterDates from '@sharedEntities/datetimes/predicates/filters';
import sortDates from '@sharedEntities/datetimes/predicates/sorters';
import { datesList, domain } from '@edtrServices/constants';
import { entityListSearch } from '@appServices/utilities/text';
import { Datetime } from '@edtrServices/apollo';
import { DatetimesFilterStateManager } from '@edtrServices/filterState';

type Domain = typeof domain;
type DFSM = DatetimesFilterStateManager;

const useDatesFilterBarService = (): void => {
	const {
		registerFilter: registerDatesFilter,
		registerSearch: registerDatesSearch,
		registerSorter: registerDatesSorter,
	} = useFilterBarService<Domain, typeof datesList, Datetime, DFSM>(domain, datesList);

	useEffect(() => {
		// Register filter
		const unsubscribeDatesFilter = registerDatesFilter(({ entityList, filterState }) => {
			return filterDates({ dates: entityList, show: filterState.datetimesToShow });
		});

		// Register search
		const unsubscribeDatesSearch = registerDatesSearch(({ entityList, filterState }) => {
			return entityListSearch<Datetime>({
				entities: entityList,
				searchFields: ['name', 'description'],
				searchText: filterState.searchText,
			});
		});

		// Register sorter
		const unsubscribeDatesSorter = registerDatesSorter(({ entityList, filterState }) => {
			return sortDates({ dates: entityList, sortBy: filterState.sortBy });
		});

		// Housekeeping
		return (): void => {
			unsubscribeDatesFilter();
			unsubscribeDatesSearch();
			unsubscribeDatesSorter();
		};
	}, []);
};

export default useDatesFilterBarService;
