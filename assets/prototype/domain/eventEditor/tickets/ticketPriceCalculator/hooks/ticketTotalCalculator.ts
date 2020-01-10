import { Price } from '../../../data/types';
import parsedAmount from '../../../../../application/utilities/money/parsedAmount';

/**
 * @function
 * @param {number} currentTotal
 * @param {Object} formData for price
 * @return {number} calculations based on price modifier
 */
const ticketTotalCalculator = (currentTotal: number, { isBasePrice, isPercent, isDiscount, amount }: Price): number => {
	amount = parsedAmount(amount || 0);
	const total = parsedAmount(currentTotal || 0);
	if (isBasePrice) {
		// basic addition
		return total + amount;
	}
	if (isDiscount) {
		// subtract percent or dollar discount
		return isPercent ? total - (amount / 100) * total : total - amount;
	}
	// add percent or dollar surcharge
	return isPercent ? total + (amount / 100) * total : total + amount;
};

export default ticketTotalCalculator;
