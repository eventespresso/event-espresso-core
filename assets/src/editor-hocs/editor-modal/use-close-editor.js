/**
 * External Imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import { cancelClickEvent } from '@eventespresso/utils';

/**
 * @function
 * @param {string} editorId
 * @return {Function} function for closing an editor
 */
const useCloseEditor = ( editorId ) => {
	const { closeEditor } = useDispatch( 'eventespresso/open-editor-state' );
	return useCallback( ( click, src ) => {
		src = src ? src : editorId;
		cancelClickEvent( click, src );
		if ( editorId ) {
			closeEditor( editorId );
		}
	}, [ editorId ] );
};

export default useCloseEditor;
