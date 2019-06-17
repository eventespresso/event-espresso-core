/**
 * External imports
 */
import { isEmpty } from 'lodash';
import { withSelect } from '@wordpress/data';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { createHigherOrderComponent } from '@wordpress/compose';

const EMPTY_OBJECT = {
	noBasePrice: true,
	priceEntitiesLoaded: false,
	priceEntities: [],
};

/**
 * withTicketPriceEntities
 * returns an object containing the following:
 *    priceEntities - an array of price entities for the supplied ticket
 *    priceEntitiesLoaded - boolean true if loading is complete
 *    noBasePrice - boolean true if loading is complete but priceEntities is empty
 *
 * @function
 */
export default createHigherOrderComponent(
	withSelect(
		( select, { ticketEntity } ) => {
			const { getRelatedEntities } = select( 'eventespresso/core' );
			const { hasFinishedResolution } = select( 'core/data' );
			if ( isModelEntityOfModel( ticketEntity, 'ticket' ) ) {
				const priceEntities = getRelatedEntities( ticketEntity, 'price' );
				const priceEntitiesLoaded = hasFinishedResolution(
					'eventespresso/core',
					'getRelatedEntities',
					[ ticketEntity, 'price' ]
				);
				if ( priceEntitiesLoaded ) {
					return {
						noBasePrice: isEmpty( priceEntities ),
						priceEntitiesLoaded,
						priceEntities,
					};
				}
			}
			return EMPTY_OBJECT;
		}
	),
	'withTicketPriceEntities'
);
