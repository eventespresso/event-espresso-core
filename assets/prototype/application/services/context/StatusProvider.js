/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import useStatusManager from '../apollo/status/useStatusManager';

const StatusContext = createContext();

const StatusProvider = ({ children }) => {
	const statusManager = useStatusManager();
	return <StatusContext.Provider value={statusManager}>{children}</StatusContext.Provider>;
};

export { StatusContext, StatusProvider };
