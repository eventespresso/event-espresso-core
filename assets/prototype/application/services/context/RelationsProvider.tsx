/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import useRelationsManager from '../apollo/relations/useRelationsManager';
import { RelationsManager } from '../../../application/relations/status';

const RelationsContext = createContext<RelationsManager | null>(null);

const { Provider } = RelationsContext;

const RelationsProvider = ({ children }) => {
	const relations = useRelationsManager();
	return <Provider value={relations}>{children}</Provider>;
};

export { RelationsContext, RelationsProvider };
