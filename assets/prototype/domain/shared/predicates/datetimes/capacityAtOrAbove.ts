/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';
import validFiniteReglimit from './validFiniteReglimit';
import validSold from './validStatus';

/**
 * @param {Object} date event date object
 * @param {number} capacity
 * @return {boolean} true if sold/capacity >= capacity
 */
const capacityAtOrAbove = (date: Datetime, capacity: number) => {
	return (
		validSold(date) &&
		validFiniteReglimit(date) &&
		Math.round(date.sold) / Math.round(date.capacity) >= capacity / 100
	);
};

export default capacityAtOrAbove;
