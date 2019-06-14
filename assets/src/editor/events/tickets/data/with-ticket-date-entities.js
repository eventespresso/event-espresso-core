/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const EMPTY_OBJECT = {};

/**
 * withTicketDateEntities
 * returns an object containing the following:
 *    dateEntities - an array of datetime entities for the supplied ticket
 *    dateEntitiesLoaded - boolean true if loading is complete
 *
 * @function
 */
export const withTicketDateEntities = withSelect(
	( select, { ticketEntity } ) => {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		if ( isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
			const dateEntities = getRelatedEntities( ticketEntity, 'datetime' );
			const dateEntitiesLoaded = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ ticketEntity, 'datetime' ]
			);
			if ( dateEntitiesLoaded ) {
				return {
					dateEntitiesLoaded,
					dateEntities,
				};
			}
		}
		return EMPTY_OBJECT;
	}
);
