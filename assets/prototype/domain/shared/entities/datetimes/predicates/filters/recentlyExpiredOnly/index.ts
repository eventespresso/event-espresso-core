/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../eventEditor/data/types';
import isRecentlyExpired from '../../../../../entities/datetimes/predicates/isRecentlyExpired';

const recentlyExpiredOnly = (dates: Datetime[]): Datetime[] | [] => {
	const filterFn = (date: Datetime) => {
		return isRecentlyExpired(date) && !date.isDeleted;
	};

	return dates.filter(filterFn);
};

export default recentlyExpiredOnly;
