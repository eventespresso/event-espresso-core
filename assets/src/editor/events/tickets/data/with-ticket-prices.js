/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const EMPTY_OBJECT = {};

/**
 * withTicketPrices
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
