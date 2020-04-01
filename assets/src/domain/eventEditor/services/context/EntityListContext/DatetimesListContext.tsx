import React, { createContext, useMemo } from 'react';

import type { EntityListContextProps, ContextProviderProps } from '../types';
import { DatetimesFilterStateManager, useDatesListFilterStateManager } from '../../filterState';
import { useFilteredEntities } from '@appLayout/entityList';
import { domain, datesList } from '@edtrServices/constants';
import { useDatetimes } from '@edtrServices/apollo/queries';
import type { Datetime } from '@edtrServices/apollo/types';
import { getCacheIds } from '@appServices/predicates';

export type DatetimesListContextProps = EntityListContextProps<DatetimesFilterStateManager, Datetime>;

export const DatetimesListContext = createContext<DatetimesListContextProps>(null);

export const DatetimesListProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const datetimes = useDatetimes();
	const filters = useDatesListFilterStateManager();

	const filtersStr = JSON.stringify(filters);
	// memoize filter state
	const filterState = useMemo(() => filters, [filtersStr]);

	const filteredEntitiesList = useFilteredEntities(domain, datesList, datetimes, filterState);

	const cacheIds = JSON.stringify(getCacheIds(filteredEntitiesList));
	// memoize filtered entities
	const filteredEntities = useMemo(() => filteredEntitiesList, [cacheIds]);

	const value: DatetimesListContextProps = { filterState, filteredEntities };

	return <DatetimesListContext.Provider value={value}>{children}</DatetimesListContext.Provider>;
};
