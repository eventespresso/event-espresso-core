/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

import useEventEditorEvent from './use-event-editor-event';

/**
 * A hook for retrieving the event for the supplied event date
 * will default to the currently loaded event for the editor
 *
 * @param {BaseEntity} eventDate   event date entity
 * @return {Object} - the event entity for the supplied ID
 *                  - boolean indicating if loading is completed
 */
const useEventForEventDate = ( eventDate ) => {
	const eventId = isModelEntityOfModel( eventDate, 'datetime' ) ?
		eventDate.evtId :
		0;
	return useEventEditorEvent( eventId );
};

export default useEventForEventDate;
