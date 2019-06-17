/**
 * External imports
 */
import { withSelect } from '@wordpress/data';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * withPriceTypeEntities
 * returns an object containing the following:
 *    priceTypeEntities - an array of price_type entities
 *    priceTypeEntitiesLoaded - boolean true if loading is complete
 *
 * @function
 */
export default createHigherOrderComponent(
	withSelect(
		( select ) => {
			const { getEntities } = select( 'eventespresso/lists' );
			const priceTypeEntities = getEntities( 'price_type' );
			const { hasFinishedResolution } = select( 'core/data' );
			const priceTypeEntitiesLoaded = hasFinishedResolution(
				'eventespresso/lists',
				'getEntities',
				[ 'price_type' ]
			);
			return { priceTypeEntities, priceTypeEntitiesLoaded };
		}
	),
	'withPriceTypeEntities'
);
