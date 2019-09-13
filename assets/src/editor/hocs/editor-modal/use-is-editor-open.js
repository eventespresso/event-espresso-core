/**
 * External Imports
 */
import { useSelect } from '@wordpress/data';

/**
 * @function
 * @param {string} editorId
 * @return {boolean} true if editor is currently open
 */
const useIsEditorOpen = ( editorId ) => useSelect( ( select ) => {
	return select( 'eventespresso/open-editor-state' ).isEditorOpen( editorId );
}, null );

export default useIsEditorOpen;
