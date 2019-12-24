import React from 'react';
/**
 * External imports
 */
import { createContext } from 'react';
import useStatusManager from '../apollo/status/useStatusManager';
import { StatusManager } from '../apollo/status';

const StatusContext = createContext<StatusManager | null>(null);

const { Provider } = StatusContext;

const StatusProvider = ({ children }) => {
	const statusManager = useStatusManager();
	return <Provider value={statusManager}>{children}</Provider>;
};

export { StatusContext, StatusProvider };
