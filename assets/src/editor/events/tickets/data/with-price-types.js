/**
 * External imports
 */
import { withSelect } from '@wordpress/data';

/**
 * withPriceTypes
 * returns an object containing the following:
 *    priceTypes - an array of price_type entities
 *    priceTypesLoaded - boolean true if loading is complete
 *
 * @function
 */
export const withPriceTypes = withSelect(
	( select ) => {
		const { getEntities } = select( 'eventespresso/lists' );
		const priceTypes = getEntities( 'price_type' );
		const { hasFinishedResolution } = select( 'core/data' );
		const priceTypesLoaded = hasFinishedResolution(
			'eventespresso/lists',
			'getEntities',
			[ 'price_type' ]
		);
		return { priceTypes, priceTypesLoaded };
	}
);
