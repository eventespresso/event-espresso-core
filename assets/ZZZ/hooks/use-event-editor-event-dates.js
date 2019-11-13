/**
 * External imports
 */
import { useSelect } from '@wordpress/data';

const DEFAULT = {
	eventDates: [],
	eventDatesLoaded: false,
};

/**
 * A hook for retrieving all the date entities
 * currently in the eventespresso/core data store.
 *
 * @param {boolean} eventLoaded   true if event has already been loaded
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */
const useEventEditorEventDates = ( eventLoaded = true ) => {
	return useSelect( ( select ) => {
		if ( ! eventLoaded ) {
			return DEFAULT;
		}
		const { getEntitiesForModel } = select( 'eventespresso/core' );
		const eventDates = getEntitiesForModel( 'datetime' );
		return Array.isArray( eventDates ) && eventDates.length ?
			{
				eventDates,
				eventDatesLoaded: true,
			} :
			DEFAULT;
	}, [ eventLoaded ] );
};

export default useEventEditorEventDates;
