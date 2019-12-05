/**
 * @function
 * @param {number} currentTotal
 * @param {Object} formData for price
 * @return {Object} calculations based on price modifier
 */
const ticketTotalCalculator = (currentTotal, { name, isBasePrice, isPercent, isDiscount, amount }) => {
	amount = parseFloat(amount);
	console.log('%c > currentTotal: ', 'color: PaleGreen;', currentTotal);
	console.log('%c > name: ', 'color: PaleGreen;', name);
	console.log('%c > > isBasePrice: ', 'color: PaleGreen;', isBasePrice);
	console.log('%c > > isPercent: ', 'color: PaleGreen;', isPercent);
	console.log('%c > > isDiscount: ', 'color: PaleGreen;', isDiscount);
	console.log('%c > > amount: ', 'color: PaleGreen;', amount);
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
