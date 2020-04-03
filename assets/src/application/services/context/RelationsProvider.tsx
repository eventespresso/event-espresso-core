import React, { createContext } from 'react';

import useRelationsManager from '../apollo/relations/useRelationsManager';
import { RelationsManager } from '../apollo/relations';

const RelationsContext = createContext<RelationsManager | null>(null);

const { Provider, Consumer: RelationsConsumer } = RelationsContext;

const RelationsProvider: React.FC = ({ children }) => {
	const relations = useRelationsManager();
	return <Provider value={relations}>{children}</Provider>;
};

export { RelationsContext, RelationsProvider, RelationsConsumer };
