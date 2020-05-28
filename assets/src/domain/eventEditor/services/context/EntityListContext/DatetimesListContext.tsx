import React, { createContext, useEffect } from 'react';

import type { EntityListContextProps } from '../types';
import { DatetimesFilterStateManager } from '../../filterState';
import useDatesListFilterStateManager from '../../filterState/datetimes/useDatesListFilterStateManager';
import { useFilteredEntities } from '@appLayout/entityList';
import { domain, datesList } from '@edtrServices/constants';
import { useDatetimes } from '@edtrServices/apollo/queries';
import type { Datetime } from '@edtrServices/apollo/types';
import { useEdtrState } from '@edtrHooks/edtrState';
import { getGuids } from '@appServices/predicates';
import notTrashed from '@sharedServices/predicates/filters/notTrashed';
import { entityListCacheIdString } from '@application/services';
import { useMemoStringify } from '@appServices/hooks';

export type DatetimesListContextProps = EntityListContextProps<DatetimesFilterStateManager, Datetime>;

export const DatetimesListContext = createContext<DatetimesListContextProps>(null);

export const DatetimesListProvider: React.FC = ({ children }) => {
	const datetimes = useDatetimes();
	const filters = useDatesListFilterStateManager();

	// memoize filter state
	const filterState = useMemoStringify(filters);

	const { setSortBy, sortingEnabled } = filterState;

	let filteredEntities = useFilteredEntities(domain, datesList, datetimes, filterState);

	if (filterState.sortingEnabled) {
		filteredEntities = notTrashed(filteredEntities);
	}

	// Update Edtr state for isChained filter
	const { setVisibleDatetimeIds } = useEdtrState();
	const cacheIdStr = entityListCacheIdString(filteredEntities);
	useEffect(() => {
		// update only when not sorting
		if (!sortingEnabled) {
			setVisibleDatetimeIds(getGuids(filteredEntities));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cacheIdStr, sortingEnabled]);

	// set sortBy to 'order' when sorting is enabled
	useEffect(() => {
		if (sortingEnabled) {
			setSortBy('order');
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sortingEnabled]);

	const value: DatetimesListContextProps = { filterState, filteredEntities };

	return <DatetimesListContext.Provider value={value}>{children}</DatetimesListContext.Provider>;
};
