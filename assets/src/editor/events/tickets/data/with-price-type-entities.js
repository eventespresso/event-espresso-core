/**
 * External imports
 */
import { withSelect } from '@wordpress/data';

/**
 * withPriceTypeEntities
 * returns an object containing the following:
 *    priceTypeEntities - an array of price_type entities
 *    priceTypeEntitiesLoaded - boolean true if loading is complete
 *
 * @function
 */
export const withPriceTypeEntities = withSelect(
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
);
