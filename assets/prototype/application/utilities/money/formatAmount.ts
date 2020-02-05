import parsedAmount from './parsedAmount';

export type FormatAmountFunction = (amount: number | string) => string;

/**
 * returns a function that when supplied a value for the number of decimal places used by a currency,
 * returns a second function that can be passed an amount which will then be appropriately formatted
 *
 * @param {number} decimalPlaces
 * @return {Function}
 */
const formatAmount = (decimalPlaces: number): FormatAmountFunction => (amount: number | string): string => {
	return parsedAmount(amount).toFixed(decimalPlaces);
};

export default formatAmount;
