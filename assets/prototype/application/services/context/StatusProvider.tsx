/**
 * External imports
 */
import React, { createContext } from 'react';

import useStatusManager from '../apollo/status/useStatusManager';
import { StatusManager } from '../apollo/status';
import { ProviderProps } from './types';

const StatusContext = createContext<StatusManager | null>(null);

const { Provider, Consumer: StatusConsumer } = StatusContext;

const StatusProvider: React.FC<ProviderProps> = ({ children }): JSX.Element => {
	const statusManager = useStatusManager();
	return <Provider value={statusManager}>{children}</Provider>;
};

export { StatusContext, StatusProvider, StatusConsumer };
