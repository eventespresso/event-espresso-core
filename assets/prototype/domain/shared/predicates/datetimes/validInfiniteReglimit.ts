/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';

/**
 * @param {Object} date event date object
 * @return {boolean} true if regLimit property is valid
 */
const validReglimit = (date: Datetime) => {
	return is(String, date.regLimit) || is(Number, date.regLimit);
};

/**
 * @param {Object} date event object
 * @return {boolean} true if regLimit property is valid and unlimited
 */
const validInfiniteReglimit = (date: Datetime) => {
	return validReglimit(date) && (date.regLimit === 'INF' || date.regLimit === Infinity);
};

export default validInfiniteReglimit;
