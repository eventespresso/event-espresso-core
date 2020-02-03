/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';
import isRecentlyExpired from '../../isRecentlyExpired';

const recentlyExpiredOnly = (dates: Datetime[]): Datetime[] | [] => {
	const filterFn = (date: Datetime): boolean => {
		return isRecentlyExpired(date) && !date.isTrashed;
	};

	return dates.filter(filterFn);
};

export default recentlyExpiredOnly;
