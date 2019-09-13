/**
 * External imports
 */
import { Money } from '@eventespresso/value-objects';

/**
 * @function
 * @param {BaseEntity} price,
 * @return {number} amount as float
 */
const getPriceAmount = ( price ) => price.amount && price.amount instanceof Money ?
	price.amount.toNumber() :
	parseFloat( price.amount || 0 );

export default getPriceAmount;
