/**
 * returns amount parsed as a float (if not already a number)
 *
 * @param {number|string} amount
 * @return {number}
 */
const parsedAmount = (amount: number | string): number => {
	return typeof amount === 'number' ? amount : Number.parseFloat(amount);
};

export default parsedAmount;
