/**
 * External imports
 */
import { isEmpty, uniq } from 'lodash';
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const EMPTY_ARRAY = [];

/**
 * withGetRelatedTicketsForEventDates
 * returns an object containing getRelatedTicketsForEventDates()
 * which receives an array of datetime entities and loops over them
 * calling getRelatedEntities() to retrieve all related ticket entities.
 *
 * !!! IMPORTANT !!!
 * ONLY USE THIS AFTER THE CALL TO hasFinishedResolution() in the
 * withTicketsForAllEventDates() DATA HOC has completed and resolved true
 *
 * @function
 */
export const withGetRelatedTicketsForEventDates = withSelect(
	( select ) => {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		/**
		 * @function
		 * @param {Array} eventDates
		 * @return {Array} tickets
		 */
		const getRelatedTicketsForEventDates = ( eventDates ) => {
			let datetimeTickets = EMPTY_ARRAY;
			if ( Array.isArray( eventDates ) ) {
				eventDates.forEach( ( eventDate ) => {
					if ( isModelEntityOfModel( eventDate, 'datetime' ) ) {
						const relatedTickets = getRelatedEntities(
							eventDate,
							'tickets'
						);
						if (
							Array.isArray( relatedTickets ) &&
							! isEmpty( relatedTickets )
						) {
							datetimeTickets = datetimeTickets.concat(
								relatedTickets
							);
						}
					}
				} );
			}
			return uniq( datetimeTickets );
		};
		return { getRelatedTicketsForEventDates };
	}
);
