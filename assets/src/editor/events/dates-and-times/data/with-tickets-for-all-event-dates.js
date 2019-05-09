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
 * @function
 */
export const withTicketsForAllEventDates = withSelect(
	( select, { eventDates, eventDatesLoaded } ) => {
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
