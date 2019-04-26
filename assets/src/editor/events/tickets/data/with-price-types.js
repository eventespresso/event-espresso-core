/**
 * External imports
 */
import { withSelect } from '@wordpress/data';

/**
 * withPriceTypes
 */
export const withPriceTypes = withSelect(
	( select ) => {
		select( 'eventespresso/lists' ).getEntities( 'price_type' );
		const { hasFinishedResolution } = select( 'core/data' );
		const priceTypesLoaded = hasFinishedResolution(
			'eventespresso/lists',
			'getEntities',
			[ 'price_type' ]
		);
		return { priceTypesLoaded };
	}
);
