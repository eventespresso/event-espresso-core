/**
 * External imports.
 */
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import warning from 'warning';

const DEFAULT = {
	eventDates: [],
	eventDatesLoaded: false,
};

/**
 * A custom react hook for retrieving the related event date entities
 * for the given ticket entity from the eventespresso/core store state.
 *
 * @param {BaseEntity} ticketEntity  A datetime BaseEntity instance.
 * @return {Object} - an array of event dates
 *                  - boolean indicating if loading is completed
 */
const useTicketEventDates = ( ticketEntity ) => {
	return useSelect( ( select ) => {
		if ( ! isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
			warning(
				false,
				'The provided value is not a valid ticket entity.'
			);
			return DEFAULT;
		}
		const {
			getRelatedEntities,
			hasFinishedResolution,
		} = select( 'eventespresso/core' );
		const eventDates = getRelatedEntities( ticketEntity, 'datetime' );
		const eventDatesLoaded = hasFinishedResolution(
			'eventespresso/core',
			'getRelatedEntities',
			[ ticketEntity, 'datetime' ]
		);
		return {
			eventDates,
			eventDatesLoaded,
		};
	}, [ ticketEntity ] );
};

export default useTicketEventDates;
