import React, { createContext } from 'react';

import { EntityListContextProps, ContextProviderProps } from '../types';
import { DatetimesFilterStateManager, useDatesListFilterStateManager } from '../../filterState';

export type DatetimesListContextProps = EntityListContextProps<DatetimesFilterStateManager>;
export const DatetimesListContext = createContext<DatetimesListContextProps>(null);
export const DatetimesListProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const filters = useDatesListFilterStateManager();
	return <DatetimesListContext.Provider value={{ filters }}>{children}</DatetimesListContext.Provider>;
};

/* export const TicketListContext = createContext<EntityListContextProps<TicketsFilterStateManager>>(null);
export const TicketListProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const filters = useDatesListFilterState();
	return <TicketListContext.Provider value={{ filters }}>{children}</TicketListContext.Provider>;
}; */
