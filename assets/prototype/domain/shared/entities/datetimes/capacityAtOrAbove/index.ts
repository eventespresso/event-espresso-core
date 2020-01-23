/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';
import validFiniteCapacityLimit from '../predicates/validFiniteCapacityLimit';
import validSold from '../predicates/validSold';

/**
 * @param {Object} date event date object
 * @param {number} capacity
 * @return {boolean} true if sold/capacity >= capacity
 */
const capacityAtOrAbove = (date: Datetime, capacity: number): boolean => {
	return (
		validSold(date) &&
		validFiniteCapacityLimit(date) &&
		Math.round(date.sold) / Math.round(date.capacity) >= capacity / 100
	);
};

export default capacityAtOrAbove;
