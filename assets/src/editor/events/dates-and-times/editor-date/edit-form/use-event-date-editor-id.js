/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * @function
 * @param {Object} eventDate
 * @return {string} editor id for event date
 */
const useEventDateEditorId = ( eventDate ) => (
	isModelEntityOfModel( eventDate, 'datetime' ) ?
		`event-date-editor-${ eventDate.id }` :
		''
);

export default useEventDateEditorId;
