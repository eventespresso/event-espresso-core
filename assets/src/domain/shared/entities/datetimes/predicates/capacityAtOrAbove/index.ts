/**
 * Internal dependencies
 */
import { Datetime } from '@edtrServices/apollo/types';
import validFiniteCapacityLimit from '../validFiniteCapacityLimit';
import validSold from '../validSold';

/**
 * @param {Object} date event date object
 * @param {number} capacity
 * @return {boolean} true if sold/capacity >= capacity
 */
const capacityAtOrAbove = (date: Datetime, capacity: number): boolean => validSold(date)
	&& validFiniteCapacityLimit(date)
	&& Math.round(date.sold) / Math.round(date.capacity) >= capacity / 100;

export default capacityAtOrAbove;
