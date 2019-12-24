/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';

/**
 * @param {Object} date event object
 * @return {boolean} true if capacity property is valid and unlimited
 */
const validInfiniteCapacityLimit = (date: Datetime) => {
	return is(Number, date.capacity) && date.capacity === -1;
};

export default validInfiniteCapacityLimit;
