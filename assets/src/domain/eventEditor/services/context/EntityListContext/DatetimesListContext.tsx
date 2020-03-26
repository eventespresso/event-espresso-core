import React, { createContext, useState } from 'react';

import { useDatetimes } from '@edtrServices/apollo/queries';
import { EntityListContextProps, ContextProviderProps } from '../types';
import { Datetime } from '../../apollo';
import { DatetimesFilterStateManager, useDatesListFilterStateManager } from '../../filterState';

export type DatetimesListContextProps = EntityListContextProps<Datetime, DatetimesFilterStateManager>;

export const DatetimesListContext = createContext<DatetimesListContextProps>(null);

export const DatetimesListProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const allEntities = useDatetimes();
	const [entities, setEntities] = useState([]);
	const filters = useDatesListFilterStateManager();
	const value = { allEntities, entities, filters, setEntities };
	return <DatetimesListContext.Provider value={value}>{children}</DatetimesListContext.Provider>;
};
