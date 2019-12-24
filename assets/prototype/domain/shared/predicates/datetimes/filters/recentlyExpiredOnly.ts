/**
 * Internal dependencies
 */
import { Datetime } from '../../../../eventEditor/data/types';
import isRecentlyExpired from '../isRecentlyExpired';

const recentlyExpiredOnly = (dates: Datetime[]) => {
	const filterFn = (date: Datetime) => {
		return isRecentlyExpired(date) && !date.isDeleted;
	};

	return dates.filter(filterFn);
};

export default recentlyExpiredOnly;
