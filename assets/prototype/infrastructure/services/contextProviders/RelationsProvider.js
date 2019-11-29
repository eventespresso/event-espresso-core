/**
 * External imports
 */
import { createContext } from '@wordpress/element';
import useRelationsManager from '../../../domain/eventEditor/containers/relations/useRelationsManager';

const RelationsContext = createContext();

const RelationsProvider = ({ children, eventId }) => {
	const relations = useRelationsManager({ eventId });
	return <RelationsContext.Provider value={relations}>{children}</RelationsContext.Provider>;
};

export { RelationsContext, RelationsProvider };
