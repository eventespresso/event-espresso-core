/**
 * External imports
 */
import React, { createContext } from 'react';

import useRelationsManager from '../apollo/relations/useRelationsManager';
import { RelationsManager } from '../apollo/relations';
import { ProviderProps } from './types';

const RelationsContext = createContext<RelationsManager | null>(null);

const { Provider, Consumer: RelationsConsumer } = RelationsContext;

const RelationsProvider: React.FC<ProviderProps> = ({ children }) => {
	const relations = useRelationsManager();
	return <Provider value={relations}>{children}</Provider>;
};

export { RelationsContext, RelationsProvider, RelationsConsumer };
