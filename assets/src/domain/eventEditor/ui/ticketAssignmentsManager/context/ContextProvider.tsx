/**
 * External imports
 */
import React, { createContext } from 'react';

import { useDataStateManager } from '../data';
import { ProviderProps, ContextProps } from './types';
import { useFilterStateManager } from '../filters/filterState';

const Context = createContext<ContextProps>(null);

const { Provider, Consumer } = Context;

const ContextProvider: React.FC<ProviderProps> = ({ children, assignmentType, entityId }) => {
	const value: ContextProps = {
		dataState: useDataStateManager({ assignmentType, entityId }),
		filterState: useFilterStateManager(),
		assignmentType,
		entityId,
	};

	return <Provider value={value}>{children}</Provider>;
};

export { Context, ContextProvider, Consumer };
