import React, { createContext } from 'react';

import { EntityContextProps, EntityContextProvider } from '../types';

const DEFAULT_CONTEXT = {
	id: '',
};

export const TicketContext = createContext<EntityContextProps>(DEFAULT_CONTEXT);

const TicketProvider: EntityContextProvider = ({ children, id }) => {
	const value: EntityContextProps = { id };

	return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export default TicketProvider;
