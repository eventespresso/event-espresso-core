/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { useSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';

const DEFAULT = {
	prices: [],
	pricesLoaded: false,
	noBasePrice: null,
};

/**
 * A custom react hook for retrieving the related prices entities
 * for the given ticket entity from the eventespresso/core store state.
 *
 * @param {BaseEntity}  ticketEntity
 * @return {Object}     - an array of prices belonging to the given ticket
 *                      - boolean indicating if loading is completed
 *                      - boolean indicating absence of base price
 */
const useTicketPrices = ( ticketEntity ) => {
	return useSelect(
		( select ) => {
			if ( isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
				const { getRelatedEntities } = select( 'eventespresso/core' );
				const { hasFinishedResolution } = select( 'core/data' );
				const prices = getRelatedEntities(
					ticketEntity,
					'price'
				);
				const pricesLoaded = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntities',
					[ ticketEntity, 'price' ]
				);
				return {
					prices,
					pricesLoaded,
					noBasePrice: pricesLoaded && isEmpty( prices ),
				};
			}
			return DEFAULT;
		},
		[ ticketEntity ]
	);
};

export default useTicketPrices;
