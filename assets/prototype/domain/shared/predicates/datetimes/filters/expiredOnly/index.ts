/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../eventEditor/data/types';

const expiredOnly = (dates: Datetime[]) => {
	const filterFn = (date: Datetime) => {
		return date.isExpired && !date.isDeleted;
	};

	return dates.filter(filterFn);
};

export default expiredOnly;
