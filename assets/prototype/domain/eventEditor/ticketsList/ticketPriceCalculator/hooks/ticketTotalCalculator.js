/**
 * @function
 * @param {number} currentTotal
 * @param {Object} formData for price
 * @return {Object} calculations based on price modifier
 */
const ticketTotalCalculator = (currentTotal, { name, isBasePrice, isPercent, isDiscount, amount }) => {
	amount = parseFloat(amount);
	if (isBasePrice) {
		// basic addition
		return currentTotal + amount;
	}
	if (isDiscount) {
		// subtract percent or dollar discount
		return isPercent ? currentTotal - (amount / 100) * currentTotal : currentTotal - amount;
	}
	// add percent or dollar surcharge
	return isPercent ? currentTotal + (amount / 100) * currentTotal : currentTotal + amount;
};

export default ticketTotalCalculator;
