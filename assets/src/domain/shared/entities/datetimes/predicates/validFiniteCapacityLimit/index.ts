/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../eventEditor/data/types';

/**
 * @param {Object} date event object
 * @return {boolean} true if status property is valid
 */
const validFiniteCapacityLimit = ({ capacity }: Datetime): boolean => {
	return is(Number, capacity) && isFinite(capacity);
};

export default validFiniteCapacityLimit;
