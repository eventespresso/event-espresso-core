/**
 * External imports
 */
// import { find } from 'lodash';
import memoize from 'memize';
import { priceTypeModel } from '@eventespresso/model';

const { BASE_PRICE_TYPES } = priceTypeModel;

/**
 * @function
 * @param {number|string} ticketId
 * @param {Object} formData
 * @param {BaseEntity[]} prices,
 * @return {Array} price modifiers
 */
const getBasePrice = memoize(
	( prices ) => prices.find( ( price ) => {
		return price.prtId === BASE_PRICE_TYPES.BASE_PRICE;
	} )
);

export default getBasePrice;
