/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import useRelationsManager from '../apollo/relations/useRelationsManager';

const RelationsContext = createContext();

const RelationsProvider = ({ children }) => {
	const relations = useRelationsManager();
	return <RelationsContext.Provider value={relations}>{children}</RelationsContext.Provider>;
};

export { RelationsContext, RelationsProvider };
