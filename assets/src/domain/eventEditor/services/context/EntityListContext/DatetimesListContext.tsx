import React, { createContext, useEffect, useMemo } from 'react';

import type { EntityListContextProps } from '../types';
import { DatetimesFilterStateManager, useDatesListFilterStateManager } from '../../filterState';
import { useFilteredEntities } from '@appLayout/entityList';
import { domain, datesList } from '@edtrServices/constants';
import { useDatetimes } from '@edtrServices/apollo/queries';
import type { Datetime } from '@edtrServices/apollo/types';
import { useEdtrState } from '@edtrHooks/edtrState';
import { getGuids } from '@appServices/predicates';
import notTrashed from '@sharedServices/predicates/filters/notTrashed';

export type DatetimesListContextProps = EntityListContextProps<DatetimesFilterStateManager, Datetime>;

export const DatetimesListContext = createContext<DatetimesListContextProps>(null);

export const DatetimesListProvider: React.FC = ({ children }) => {
	const datetimes = useDatetimes();
	const filters = useDatesListFilterStateManager();

	const filtersStr = JSON.stringify(filters);
	// memoize filter state
	const filterState = useMemo(() => filters, [filtersStr]);

	const { setSortBy, sortingEnabled } = filterState;

	let filteredEntities = useFilteredEntities(domain, datesList, datetimes, filterState);

	if (filterState.sortingEnabled) {
		filteredEntities = notTrashed(filteredEntities);
	}

	// Update Edtr state for isChained filter
	const { setVisibleDatetimeIds } = useEdtrState();
	useEffect(() => {
		// update only when not sorting
		if (!sortingEnabled) {
			setVisibleDatetimeIds(getGuids(filteredEntities));
		}
	}, [filteredEntities, sortingEnabled]);

	// set sortBy to 'order' when sorting is enabled
	useEffect(() => {
		if (sortingEnabled) {
			setSortBy('order');
		}
	}, [sortingEnabled]);

	const value: DatetimesListContextProps = { filterState, filteredEntities };

	return <DatetimesListContext.Provider value={value}>{children}</DatetimesListContext.Provider>;
};
