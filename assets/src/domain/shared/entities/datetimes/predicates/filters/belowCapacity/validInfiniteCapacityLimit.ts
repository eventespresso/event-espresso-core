/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/services/apollo/types';

/**
 * @param {Object} date event object
 * @return {boolean} true if capacity property is valid and unlimited
 */
const validInfiniteCapacityLimit = ({ capacity }: Datetime): boolean => {
	return is(Number, capacity) && !isFinite(capacity);
};

export default validInfiniteCapacityLimit;
