/**
 * External imports
 */
import { useMemo } from '@wordpress/element';
import { priceTypeModel } from '@eventespresso/model';

const { BASE_PRICE_TYPES } = priceTypeModel;

/**
 * @function
 * @param {number|string} ticketId
 * @param {Object} formData
 * @param {BaseEntity[]} prices,
 * @return {Array} price modifiers
 */
const useBasePrice = useMemo( ( prices ) => prices.find(
	( price ) => price.prtId === BASE_PRICE_TYPES.BASE_PRICE
) );

export default useBasePrice;
