/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const EMPTY_OBJECT = {};

/**
 * withTicketPrices
 * returns an object containing the following:
 *    ticket - the same ticket entity that was supplied
 *    prices - an array of price entities for the supplied ticket
 *    pricesLoaded - boolean true if loading is complete
 *    noBasePrice - boolean true if loading is complete but prices is empty
 *
 * @function
 */
export const withTicketPrices = withSelect(
	( select, ownProps ) => {
		const { getRelatedEntities } = select( 'eventespresso/core' );
		const { hasFinishedResolution } = select( 'core/data' );
		const ticket = ownProps.ticket;
		if ( isModelEntityOfModel( ticket, 'ticket' ) ) {
			const prices = getRelatedEntities( ticket, 'prices' );
			const pricesLoaded = hasFinishedResolution(
				'eventespresso/core',
				'getRelatedEntities',
				[ ticket, 'prices' ]
			);
			if ( pricesLoaded ) {
				return {
					noBasePrice: isEmpty( prices ),
					pricesLoaded,
					prices,
					ticket,
				};
			}
		}
		return EMPTY_OBJECT;
	}
);
