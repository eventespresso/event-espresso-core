/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';
import validFiniteReglimit from './validFiniteCapacityLimit';
import validInfiniteCapacityLimit from './validInfiniteCapacityLimit';
import validSold from './validStatus';

/**
 * @param {Object} date event date object
 * @param {number} capacity
 * @return {boolean} true if sold/capacity less than than capacity
 */
const capacityBelow = (date: Datetime, capacity: number) => {
	return (
		validInfiniteCapacityLimit(date) ||
		(validSold(date) &&
			validFiniteReglimit(date) &&
			Math.round(date.sold) / Math.round(date.capacity) < capacity / 100)
	);
};

export default capacityBelow;
