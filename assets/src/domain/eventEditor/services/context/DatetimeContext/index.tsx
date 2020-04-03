import React, { createContext } from 'react';

import { EntityContextProps } from '../types';

const DEFAULT_CONTEXT = {
	id: '',
};

export const DatetimeContext = createContext<EntityContextProps>(DEFAULT_CONTEXT);

export const DatetimeProvider: React.FC<EntityContextProps> = ({ children, id }) => {
	const value: EntityContextProps = { id };

	return <DatetimeContext.Provider value={value}>{children}</DatetimeContext.Provider>;
};
