import { useState } from '@wordpress/element';

const useEditorInitialization = () => {
	const [ editorInitialized, setEditorInitialized ] = useState( false );
	return [ editorInitialized, setEditorInitialized ];
};

export default useEditorInitialization;
