/**
 * @function
 * @param {number} currentTotal
 * @param {Object} formData for price
 * @return {Object} calculations based on price modifier
 */
const ticketTotalCalculator = (currentTotal, { isBasePrice, isPercent, isDiscount, amount }) => {
	amount = parseFloat(amount || 0);
	const total = parseFloat(currentTotal || 0);
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
