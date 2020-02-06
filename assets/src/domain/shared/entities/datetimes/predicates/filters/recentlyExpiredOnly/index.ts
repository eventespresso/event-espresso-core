/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/services/apollo/types';
import isRecentlyExpired from '../../isRecentlyExpired';
import { DatetimeFilterFn } from '../types';

const recentlyExpiredOnly: DatetimeFilterFn = (dates) => {
	const filterFn = (date: Datetime): boolean => {
		return isRecentlyExpired(date) && !date.isTrashed;
	};

	return dates.filter(filterFn);
};

export default recentlyExpiredOnly;
