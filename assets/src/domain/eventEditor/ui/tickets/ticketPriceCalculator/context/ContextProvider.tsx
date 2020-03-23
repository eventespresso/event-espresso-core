import React, { createContext } from 'react';

import { ProviderProps, ContextProps } from './types';
import { useDataStateManager } from '../data';

const Context = createContext<ContextProps>(null);

const { Provider, Consumer } = Context;

const ContextProvider: React.FC<ProviderProps> = ({ children, ticketId, ...rest }) => {
	const value: ContextProps = {
		dataState: useDataStateManager({ ticketId }),
		...rest,
	};

	return <Provider value={value}>{children}</Provider>;
};

export { Context, ContextProvider, Consumer };
