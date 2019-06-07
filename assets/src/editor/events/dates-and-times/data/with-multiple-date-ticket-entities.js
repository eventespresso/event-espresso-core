/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal imports
 */
import { getDateEntityIds } from './utils';

/**
 * withTicketEntitiesRelatedToAllDateEntities
 * returns an object containing the following:
 * 	multipleDateTicketEntities - an array of ticket entities for the supplied event date
 * 	multipleDateTicketEntitiesLoaded - boolean true if loading is complete
 *
 * @return {function}
 */
export const withMultipleDateTicketEntities = createHigherOrderComponent(
	withSelect(
		( select, { dateEntities, dateEntitiesLoaded } ) => {
			if ( dateEntitiesLoaded ) {
				const { getRelatedEntitiesForIds } = select( 'eventespresso/core' );
				const { hasFinishedResolution } = select( 'core/data' );
				const dateIds = getDateEntityIds( dateEntities );
				const ticketEntities = getRelatedEntitiesForIds(
					'datetime',
					dateIds,
					'tickets'
				);
				const ticketEntitiesLoaded = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntitiesForIds',
					[ 'datetime', dateIds, 'tickets' ]
				);
				if ( ticketEntitiesLoaded ) {
					return { ticketEntities, ticketEntitiesLoaded };
				}
			}
			return {};
		}
	),
	'withMultipleDateTicketEntities'
);
