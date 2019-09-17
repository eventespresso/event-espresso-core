/**
 * External Imports
 */
import { useSelect } from '@wordpress/data';

/**
 * @function
 * @return {boolean} true if editor is currently open
 */
const useCurrentlyOpenEditor = () => useSelect( ( select ) => {
	return select( 'eventespresso/open-editor-state' ).currentlyOpenEditor();
}, null );

export default useCurrentlyOpenEditor;
