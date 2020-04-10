import React, { createContext } from 'react';

import { useDataStateManager } from '../data';
import { ProviderProps, ContextProps } from './types';
import { useFilterStateManager } from '../filters/filterState';

const Context = createContext<ContextProps>(null);

const { Provider, Consumer } = Context;

const ContextProvider: React.FC<ProviderProps> = ({ children, assignmentType, entity, ...rest }) => {
	const value: ContextProps = {
		dataState: useDataStateManager({ assignmentType, entity }),
		filterState: useFilterStateManager(),
		assignmentType,
		entity,
		...rest,
	};

	return <Provider value={value}>{children}</Provider>;
};

export { Context, ContextProvider, Consumer };
