/**
 * External imports
 */
import { SiteCurrency } from '@eventespresso/value-objects';

/**
 * @function
 * @param {number|string} moneyValue
 * @return {number} money value
 */
const parseMoneyValue = ( moneyValue ) => {
	moneyValue = moneyValue && moneyValue.toString ?
		moneyValue.toString().replace(
			new RegExp( SiteCurrency.thousandsSeparator, 'g' ),
			''
		).replace(
			SiteCurrency.sign,
			''
		) :
		0;
	moneyValue = parseFloat( moneyValue );
	return ! isNaN( moneyValue ) ? moneyValue : 0;
};

export default parseMoneyValue;
