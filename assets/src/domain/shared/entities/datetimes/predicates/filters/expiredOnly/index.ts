/**
 * External dependencies
 */
import { is } from 'ramda';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/services/apollo/types';
import { isTrashed } from '../../../../../services/predicates';
import { DatetimeFilterFn } from '../types';

const expiredOnly: DatetimeFilterFn = (dates) => {
	const filterFn = (date: Datetime): boolean => {
		return is(Boolean, date.isExpired) && date.isExpired && !isTrashed(date);
	};

	return dates.filter(filterFn);
};

export default expiredOnly;
