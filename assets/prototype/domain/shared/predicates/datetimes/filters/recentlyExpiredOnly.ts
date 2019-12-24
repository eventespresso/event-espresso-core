/**
 * External dependencies
 */
import { head } from 'ramda';

/**
 * Internal dependencies
 */
import isRecentlyExpired from '../isRecentlyExpired';
import { Datetime } from '../../../../eventEditor/data/types';

const recentlyExpiredOnly = (dates: Datetime[]) => {
	const filterFn = (date: Datetime) => {
		return isRecentlyExpired(date) && !date.isDeleted;
	};

	return dates.filter(filterFn);
};

export default recentlyExpiredOnly;
