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
const basePriceCalculations = (
	currentTotal,
	priceTypeId,
	isPercent,
	amount
) => {
	// NOTE: there's no case for handling base price types
	// because that is what we are calculating
	switch ( priceTypeId ) {
		case BASE_PRICE_TYPES.DISCOUNT:
			// increase base price by amount of percent or dollar discount
			return isPercent ?
				currentTotal / ( ( 100 - amount ) / 100 ) :
				currentTotal + amount;
		case BASE_PRICE_TYPES.SURCHARGE:
			// reduce base price by amount of percent or dollar surcharge
			return isPercent ?
				currentTotal / ( ( 100 + amount ) / 100 ) :
				currentTotal - amount;
		case BASE_PRICE_TYPES.TAX:
			return currentTotal / ( ( 100 + amount ) / 100 );
	}
	return currentTotal;
};

export default basePriceCalculations;
