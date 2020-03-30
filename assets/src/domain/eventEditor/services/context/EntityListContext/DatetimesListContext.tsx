import React, { createContext, useState } from 'react';

import { useDatetimes } from '@edtrServices/apollo/queries';
import { EntityListContextProps, ContextProviderProps } from '../types';
import { Datetime } from '../../apollo';
import { DatetimesFilterStateManager, useDatesListFilterStateManager } from '../../filterState';

export type DatetimesListContextProps = EntityListContextProps<Datetime, DatetimesFilterStateManager>;

export const DatetimesListContext = createContext<DatetimesListContextProps>(null);

const initialState = [];

export const DatetimesListProvider: React.FC<ContextProviderProps> = ({ children }) => {
	const allEntities = useDatetimes();
	const [entities, setEntities] = useState(initialState);
	const [loading, setLoading] = useState(true);
	const setLD = (LD: boolean): void => {
		console.log('');
		console.log('%c setLoading(LD) ', 'color: Orange;');
		console.log('%c 	LD:', 'color: Orange;', LD);
		console.log('%c 	loading:', 'color: Orange;', loading);
		console.log('%c 	entities:', 'color: Orange;', entities);
		console.log('%c 	entities === initialState:', 'color: Orange;', entities === initialState);
		if (LD !== loading && entities !== initialState) {
			console.log('%c 	==> setLoading(' + LD + ')', 'color: DeepPink;');
			setLoading(LD);
		}
	};
	const filters = useDatesListFilterStateManager(setLD);
	const value = { allEntities, entities, filters, loading, setEntities, setLoading: setLD };
	console.log('');
	console.log('%c DatetimesListProvider', 'color: Orchid;');
	console.log('%c 	allEntities:', 'color: Orchid;', allEntities);
	console.log('%c 	entities:', 'color: Orchid;', entities);
	console.log('%c 	loading:', 'color: Orchid;', loading);
	return <DatetimesListContext.Provider value={value}>{children}</DatetimesListContext.Provider>;
};
