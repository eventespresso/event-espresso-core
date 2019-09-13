/**
 * External imports
 */
import { priceTypeModel } from '@eventespresso/model';

const { BASE_PRICE_TYPES } = priceTypeModel;

/**
 * @function
 * @param {number} currentTotal
 * @param {number} priceTypeId
 * @param {boolean} isPercent,
 * @param {number} amount
 * @return {Object} calculations based on price modifier
 */
const ticketTotalCalculations = (
	currentTotal,
	priceTypeId,
	isPercent,
	amount
) => {
	switch ( priceTypeId ) {
		case BASE_PRICE_TYPES.BASE_PRICE:
			// basic addition
			return currentTotal + amount;
		case BASE_PRICE_TYPES.DISCOUNT:
			// subtract percent or dollar discount
			return isPercent ?
				currentTotal - ( ( amount / 100 ) * currentTotal ) :
				currentTotal - amount;
		case BASE_PRICE_TYPES.SURCHARGE:
			// add percent or dollar surcharge
			return isPercent ?
				currentTotal + ( ( amount / 100 ) * currentTotal ) :
				currentTotal + amount;
		case BASE_PRICE_TYPES.TAX:
			// add percent tax
			return currentTotal + ( ( amount / 100 ) * currentTotal );
	}
	return currentTotal;
};

export default ticketTotalCalculations;
