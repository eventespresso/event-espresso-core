/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

const DEFAULT_OBJECT = {
	ticketEntities: [],
	ticketEntitiesLoaded: false,
};

/**
 * withTicketEntitiesRelatedToAllDateEntities
 * returns an object containing the following:
 * 	ticketEntities - an array of ticket entities for the supplied event date
 * 	ticketEntitiesLoaded - boolean true if loading is complete
 *
 * @return {Function}
 */
const withTicketEntitiesForAllDateEntities = createHigherOrderComponent(
	withSelect(
		( select, { dateEntities, dateEntitiesLoaded, editorInitialized } ) => {
			if ( dateEntitiesLoaded && ! editorInitialized ) {
				const { getRelatedEntitiesForIds } = select( 'eventespresso/core' );
				const { hasFinishedResolution } = select( 'core/data' );
				const dateIds = dateEntities.map(
					( dateEntity ) => dateEntity.id
				);
				const ticketEntities = getRelatedEntitiesForIds(
					'datetime',
					dateIds,
					'ticket'
				);
				const ticketEntitiesLoaded = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntitiesForIds',
					[ 'datetime', dateIds, 'ticket' ]
				);
				if ( ticketEntitiesLoaded ) {
					return { ticketEntities, ticketEntitiesLoaded };
				}
			}
			return DEFAULT_OBJECT;
		}
	),
	'withTicketEntitiesForAllDateEntities'
);

export default withTicketEntitiesForAllDateEntities;
