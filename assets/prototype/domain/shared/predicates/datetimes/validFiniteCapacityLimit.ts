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
 * @return {boolean} true if status property is valid
 */
const validFiniteCapacityLimit = (date: Datetime) => {
	return is(String, date.status);
};

export default validFiniteCapacityLimit;
