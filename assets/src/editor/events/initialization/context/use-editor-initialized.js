/**
 * External imports
 */
import { useContext } from '@wordpress/element';

/**
 * Internal imports
 */
import { EditorInitializedContext } from './editor-initialized-context';

const useEditorInitialized = () => useContext( EditorInitializedContext );

export default useEditorInitialized;
