/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {Object} eventDate
 * @param {string} prefix
 * @return {string} editor id for event date
 */
const useEventDateEditorId = ( eventDate, prefix = '' ) => {
	const editorId = isModelEntityOfModel( eventDate, 'datetime' ) ?
		`event-date-editor-${ eventDate.id }` :
		'';
	return prefix !== '' && editorId !== '' ?
		`${ prefix }-${ editorId }` :
		editorId;
};

export default useEventDateEditorId;
