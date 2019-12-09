/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import useStatusManager from '../../../domain/eventEditor/containers/queries/useStatusManager';

const StatusContext = createContext();

const StatusProvider = ({ children }) => {
	const statusManager = useStatusManager();
	return <StatusContext.Provider value={statusManager}>{children}</StatusContext.Provider>;
};

export { StatusContext, StatusProvider };
