/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const EMPTY_OBJECT = {};

/**
 * withTicketDatetimes
 */
export const withTicketDatetimes = withSelect(
	( select, ownProps ) => {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		const ticket = ownProps.ticket;
		if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
			const ticketDatetimes = getRelatedEntities( ticket, 'datetimes' );
			const datesLoaded = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ ticket, 'datetimes' ]
			);
			if ( datesLoaded ) {
				return {
					datesLoaded,
					ticket,
					ticketDatetimes,
				};
			}
		}
		return EMPTY_OBJECT;
	}
);
