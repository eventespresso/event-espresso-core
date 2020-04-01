import React, { createContext, useMemo } from 'react';

import type { EntityListContextProps, ContextProviderProps } from '../types';
import { TicketsFilterStateManager, useTicketsListFilterStateManager } from '../../filterState';
import { useFilteredEntities } from '@appLayout/entityList';
import { domain, ticketsList } from '@edtrServices/constants';
import { useTickets } from '@edtrServices/apollo/queries';
import type { Ticket } from '@edtrServices/apollo/types';
import { getCacheIds } from '@sharedServices/predicates';

export type TicketsListContextProps = EntityListContextProps<TicketsFilterStateManager, Ticket>;

export const TicketsListContext = createContext<TicketsListContextProps>(null);

export const TicketsListProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const datetimes = useTickets();
	const filters = useTicketsListFilterStateManager();

	const filtersStr = JSON.stringify(filters);
	// memoize filter state
	const filterState = useMemo(() => filters, [filtersStr]);

	const filteredEntitiesList = useFilteredEntities(domain, ticketsList, datetimes, filterState);

	const cacheIds = getCacheIds(filteredEntitiesList).join(':');
	// memoize filtered entities
	const filteredEntities = useMemo(() => filteredEntitiesList, [cacheIds]);

	const value: TicketsListContextProps = { filterState, filteredEntities };

	return <TicketsListContext.Provider value={value}>{children}</TicketsListContext.Provider>;
};
