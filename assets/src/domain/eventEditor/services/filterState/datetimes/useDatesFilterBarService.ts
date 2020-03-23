import { useEffect } from 'react';

import { useFilterBarService } from '@appLayout/entityList/filterBar';
import { salesFilter, statusFilter } from '@sharedEntities/datetimes/predicates/filters';
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
		// Register sales filter
		const unsubscribeSalesFilter = registerDatesFilter(({ entityList, filterState }) => {
			return salesFilter({ dates: entityList, sales: filterState.sales });
		});

		// Register status filter
		const unsubscribeStatusFilter = registerDatesFilter(({ entityList, filterState }) => {
			return statusFilter({ dates: entityList, status: filterState.status });
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
			unsubscribeSalesFilter();
			unsubscribeStatusFilter();
			unsubscribeDatesSearch();
			unsubscribeDatesSorter();
		};
	}, []);
};

export default useDatesFilterBarService;
