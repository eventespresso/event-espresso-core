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
const validInfiniteCapacitylimit = (date: Datetime) => {
	return is(Number, date.capacity) && date.capacity === Infinity;
};

export default validInfiniteCapacitylimit;
