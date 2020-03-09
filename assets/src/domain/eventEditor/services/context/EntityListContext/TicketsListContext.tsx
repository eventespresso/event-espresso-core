import React, { createContext } from 'react';

import { EntityListContextProps, ContextProviderProps } from '../types';
import { TicketsFilterStateManager, useTicketsListFilterStateManager } from '../../filterState';

export type TicketsListContextProps = EntityListContextProps<TicketsFilterStateManager>;

export const TicketsListContext = createContext<TicketsListContextProps>(null);

export const TicketsListProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const filters = useTicketsListFilterStateManager();
	const value = { filters };
	return <TicketsListContext.Provider value={value}>{children}</TicketsListContext.Provider>;
};
