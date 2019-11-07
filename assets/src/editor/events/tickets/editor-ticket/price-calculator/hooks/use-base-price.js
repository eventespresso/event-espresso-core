/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { priceTypeModel } from '@eventespresso/model';

const { BASE_PRICE_TYPES } = priceTypeModel;

/**
 * @function
 * @param {Array} prices
 * @return {Object} A price
 */
const useBasePrice = ( prices ) => useMemo( () => prices.find(
	( price ) => price.PRT_ID === BASE_PRICE_TYPES.BASE_PRICE
), [ prices ] );

export default useBasePrice;
