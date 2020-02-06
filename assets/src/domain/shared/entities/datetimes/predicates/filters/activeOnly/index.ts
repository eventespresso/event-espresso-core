/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { DatetimeFilterFn } from '../types';

const activeOnly: DatetimeFilterFn = (dates) => {
	return dates.filter(({ isActive }) => {
		return is(Boolean, isActive) && isActive;
	});
};

export default activeOnly;
