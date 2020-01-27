import React, { createContext } from 'react';

import { EntityContextProps, EntityContextProvider } from '../types';

const DEFAULT_CONTEXT = {
	id: '',
};

export const DatetimeContext = createContext<EntityContextProps>(DEFAULT_CONTEXT);

export const DatetimeProvider: EntityContextProvider = (props): JSX.Element => {
	const { children, id } = props;

	const value: EntityContextProps = { id };

	return <DatetimeContext.Provider value={value}>{children}</DatetimeContext.Provider>;
};
