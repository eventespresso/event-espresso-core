/**
 * External Imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { cancelClickEvent } from '@eventespresso/eejs';

/**
 * @function
 * @param {string} editorId
 * @return {Function} function for opening an editor
 */
const useOpenEditor = ( editorId ) => {
	const { openEditor } = useDispatch( 'eventespresso/open-editor-state' );
	return useCallback( ( click ) => {
		cancelClickEvent( click, 'useOpenEditor' );
		if ( editorId ) {
			openEditor( editorId );
		}
	}, [ editorId ] );
};

export default useOpenEditor;
