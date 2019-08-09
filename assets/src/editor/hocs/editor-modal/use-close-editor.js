/**
 * External Imports
 */
import { useDispatch } from '@wordpress/data';
import { useCallback } from '@wordpress/element';
import cancelClickEvent from '../../helpers/cancel-click-event';

/**
 * @function
 * @param {string} editorId
 * @return {Function} function for closing an editor
 */
const useCloseEditor = ( editorId ) => {
	const { closeEditor } = useDispatch( 'eventespresso/open-editor-state' );
	return useCallback( ( click ) => {
		cancelClickEvent( click, 'useCloseEditor' );
		if ( editorId ) {
			closeEditor( editorId );
		}
	}, [ editorId ] );
};

export default useCloseEditor;
