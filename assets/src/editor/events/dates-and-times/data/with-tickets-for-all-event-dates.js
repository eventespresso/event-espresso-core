/**
 * External imports
 */
import { withSelect } from '@wordpress/data';

/**
 * Internal imports
 */
import { getDatetimeEntityIds } from './utils';

/**
 * withTicketsForAllEventDates
 * returns an object containing the following:
 * 	eventDateTickets - an array of ticket entities for the supplied event date
 * 	eventDateTicketsLoaded - boolean true if loading is complete
 *
 * !!! IMPORTANT !!!
 * ONLY USE THIS AFTER THE CALL TO hasFinishedResolution() in the
 * withEventDatetimes() DATA HOC has completed and resolved true
 *
 * @function
 */
export const withTicketsForAllEventDates = withSelect(
	( select, ownProps ) => {
		const { eventDates, eventDatesLoaded } = ownProps;
		if ( eventDatesLoaded ) {
			const { getRelatedEntitiesForIds } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );
			const eventDateIds = getDatetimeEntityIds( eventDates );
			const eventDateTickets = getRelatedEntitiesForIds(
				'datetime',
				eventDateIds,
				'tickets'
			);
			const eventDateTicketsLoaded = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntitiesForIds',
				[ 'datetime', eventDateIds, 'tickets' ]
			);
			if ( eventDateTicketsLoaded ) {
				return { eventDateTickets, eventDateTicketsLoaded };
			}
		}
		return {};
	}
);
