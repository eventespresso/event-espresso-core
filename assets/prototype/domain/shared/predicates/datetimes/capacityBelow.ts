/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';
import validFiniteReglimit from './validFiniteReglimit';
import validInfiniteReglimit from './validInfiniteReglimit';
import validSold from './validStatus';

/**
 * @param {Object} date event date object
 * @param {number} capacity
 * @return {boolean} true if sold/regLimit less than than capacity
 */
const capacityBelow = (date: Datetime, capacity: number) => {
	return (
		validInfiniteReglimit(date) ||
		(validSold(date) &&
			validFiniteReglimit(date) &&
			Math.round(date.sold) / Math.round(date.regLimit) < capacity / 100)
	);
};

export default capacityBelow;
