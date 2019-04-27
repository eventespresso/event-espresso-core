/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * withDatetimeTickets
 * returns an object containing the following:
 *    datetimeTickets - an array of ticket entities for the supplied event date
 *    ticketsLoaded - boolean true if loading is complete
 *
 * @function
 */
export const withDatetimeTickets = withSelect(
	( select, ownProps ) => {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		const eventDate = ownProps.eventDate;
		if ( isModelEntityOfModel( eventDate, 'datetime' ) ) {
			const datetimeTickets = getRelatedEntities( eventDate, 'tickets' );
			const ticketsLoaded = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ eventDate, 'tickets' ]
			);
			return { datetimeTickets, ticketsLoaded };
		}
		return {};
	}
);
