import React, { createContext } from 'react';

import { EntityContextProps, EntityContextProvider } from '../types';

const DEFAULT_CONTEXT = {
	id: '',
};

export const DateTimeContext = createContext<EntityContextProps>(DEFAULT_CONTEXT);

const DateTimeProvider: EntityContextProvider = (props): JSX.Element => {
	const { children, id } = props;

	const value: EntityContextProps = { id };

	return <DateTimeContext.Provider value={value}>{children}</DateTimeContext.Provider>;
};

export default DateTimeProvider;
