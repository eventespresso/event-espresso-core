/**
 * External imports
 */
import React, { createContext } from 'react';

import useRelationsManager from '../apollo/relations/useRelationsManager';
import { RelationsManager } from '../apollo/relations';
import { ProviderProps } from './types';

const RelationsContext = createContext<RelationsManager | null>(null);

const { Provider } = RelationsContext;

const RelationsProvider: React.FunctionComponent<ProviderProps> = ({ children }): JSX.Element => {
	const relations = useRelationsManager();
	return <Provider value={relations}>{children}</Provider>;
};

export { RelationsContext, RelationsProvider };
