import React, { createContext } from 'react';

import useStatusManager from '../apollo/status/useStatusManager';
import { StatusManager } from '../apollo/status';

const StatusContext = createContext<StatusManager | null>(null);

const { Provider, Consumer: StatusConsumer } = StatusContext;

const StatusProvider: React.FC = ({ children }) => {
	const statusManager = useStatusManager();
	return <Provider value={statusManager}>{children}</Provider>;
};

export { StatusContext, StatusProvider, StatusConsumer };
