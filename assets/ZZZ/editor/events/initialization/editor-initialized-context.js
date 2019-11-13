/**
 * External imports
 */
import { createContext } from '@wordpress/element';

const EditorInitializedContext = createContext( false );
const { Provider, Consumer } = EditorInitializedContext;

export {
	EditorInitializedContext,
	Provider,
	Consumer,
};
