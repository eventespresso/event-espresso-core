/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';

/**
 * @param {Object} dateEntity    event dateEntity object
 * @return {boolean} true if capacity property is valid
 */
const validStatus = (date: Datetime) => {
	return is(String, date.status);
};

export default validStatus;
