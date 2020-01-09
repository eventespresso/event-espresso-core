/**
 * @function
 * @param {number} currentTotal
 * @param {Object} formData for price
 * @return {Object} calculations based on price modifier
 */
const basePriceCalculator = (currentTotal, { isPercent, isDiscount, amount }) => {
	amount = parseFloat(amount || 0);
	const total = parseFloat(currentTotal || 0);
	// NOTE: there's no case for handling base price types because that is what we are calculating
	// ALSO NOTE: Reverse calculations seem backwards, because, well.. they are!
	//            So discounts will increase the total and surcharges will decrease it
	//            because we are working our way backwards from the total to the base price
	if (isDiscount) {
		// increase base price by amount of percent or dollar discount
		return isPercent ? total / ((100 - amount) / 100) : total + amount;
	}
	// reduce base price by amount of percent or dollar surcharge
	return isPercent ? total / ((100 + amount) / 100) : total - amount;
};

export default basePriceCalculator;
