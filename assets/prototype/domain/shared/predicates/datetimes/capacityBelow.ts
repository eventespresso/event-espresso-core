/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';
import validFiniteCapacityLimit from './validFiniteCapacityLimit';
import validInfiniteCapacityLimit from './validInfiniteCapacityLimit';
import validSold from './validStatus';

interface capacityBelowProps {
	capacity: number;
	date: Datetime;
}

/**
 * @param {Object} date event date object
 * @param {number} capacity
 * @return {boolean} true if sold/capacity less than than capacity
 */
const capacityBelow = ({ capacity, date }): boolean => {
	return (
		validInfiniteCapacityLimit(date) ||
		(validSold(date) &&
			validFiniteCapacityLimit(date) &&
			Math.round(date.sold) / Math.round(date.capacity) < capacity / 100)
	);
};

export default capacityBelow;
