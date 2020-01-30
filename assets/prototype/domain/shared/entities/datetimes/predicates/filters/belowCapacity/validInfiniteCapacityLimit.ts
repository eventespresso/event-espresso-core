/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';

/**
 * @param {Object} date event object
 * @return {boolean} true if capacity property is valid and unlimited
 */
const validInfiniteCapacityLimit = ({ capacity }: Datetime) => {
	return is(Number, capacity) && !isFinite(capacity);
};

export default validInfiniteCapacityLimit;
