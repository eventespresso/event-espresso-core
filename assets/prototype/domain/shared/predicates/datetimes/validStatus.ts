/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';

const validStatus = (date: Datetime): boolean => {
	return is(String, date.status);
};

export default validStatus;
