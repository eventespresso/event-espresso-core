/**
 * External imports
 */
import { useSelect } from '@wordpress/data';

/**
 * A hook for retrieving all the price_type entities
 * currently in the eventespresso/core data store.
 *
 * @return {Object} - an array of price types
 *                  - boolean indicating if loading is completed
 */
const usePriceTypes = () => {
	return useSelect( ( select ) => {
		const { getEntities } = select( 'eventespresso/lists' );
		const { hasFinishedResolution } = select( 'core/data' );
		const entities = getEntities( 'price_type' );
		const loaded = hasFinishedResolution(
			'eventespresso/lists',
			'getEntities',
			[ 'price_type' ]
		);
		return {
			priceTypes: entities,
			priceTypesLoaded: loaded,
		};
	}, [] );
};

export default usePriceTypes;
