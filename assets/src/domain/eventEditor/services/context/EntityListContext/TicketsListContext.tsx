import React, { createContext, useEffect, useMemo } from 'react';

import type { EntityListContextProps } from '../types';
import { TicketsFilterStateManager, useTicketsListFilterStateManager } from '../../filterState';
import { useFilteredEntities } from '@appLayout/entityList';
import { domain, ticketsList } from '@edtrServices/constants';
import { useTickets } from '@edtrServices/apollo/queries';
import type { Ticket } from '@edtrServices/apollo/types';
import notTrashed from '@sharedServices/predicates/filters/notTrashed';

export type TicketsListContextProps = EntityListContextProps<TicketsFilterStateManager, Ticket>;

export const TicketsListContext = createContext<TicketsListContextProps>(null);

export const TicketsListProvider: React.FC = ({ children }) => {
	const tickets = useTickets();
	const filters = useTicketsListFilterStateManager();

	const filtersStr = JSON.stringify(filters);
	// memoize filter state
	const filterState = useMemo(() => filters, [filtersStr]);

	const { setSortBy, sortingEnabled } = filterState;

	let filteredEntities = useFilteredEntities(domain, ticketsList, tickets, filterState);

	if (filterState.sortingEnabled) {
		filteredEntities = notTrashed(filteredEntities);
	}

	// set sortBy to 'order' when sorting is enabled
	useEffect(() => {
		if (sortingEnabled) {
			setSortBy('order');
		}
	}, [sortingEnabled]);

	const value: TicketsListContextProps = { filterState, filteredEntities };

	return <TicketsListContext.Provider value={value}>{children}</TicketsListContext.Provider>;
};
