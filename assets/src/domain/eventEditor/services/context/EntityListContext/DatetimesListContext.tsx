import React, { createContext } from 'react';

import { EntityListContextProps, ContextProviderProps } from '../types';
import { DatetimesFilterStateManager, useDatesListFilterStateManager } from '../../filterState';

export type DatetimesListContextProps = EntityListContextProps<DatetimesFilterStateManager>;

export const DatetimesListContext = createContext<DatetimesListContextProps>(null);

export const DatetimesListProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const filters = useDatesListFilterStateManager();
	const value = { filters };
	return <DatetimesListContext.Provider value={value}>{children}</DatetimesListContext.Provider>;
};
