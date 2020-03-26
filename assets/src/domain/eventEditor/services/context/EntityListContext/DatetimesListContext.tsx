import React, { createContext } from 'react';

import { useDatetimes } from '@edtrServices/apollo/queries';
import { EntityListContextProps, ContextProviderProps } from '../types';
import { Datetime } from '../../apollo';
import { DatetimesFilterStateManager, useDatesListFilterStateManager } from '../../filterState';

export type DatetimesListContextProps = EntityListContextProps<Datetime, DatetimesFilterStateManager>;

export const DatetimesListContext = createContext<DatetimesListContextProps>(null);

export const DatetimesListProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const entities = useDatetimes();
	const filters = useDatesListFilterStateManager();
	// const value = { entities, filters };
	return <DatetimesListContext.Provider value={{ entities, filters }}>{children}</DatetimesListContext.Provider>;
};
