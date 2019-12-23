/**
 * Internal dependencies
 */
import validStatus from '../validStatus';

import { Datetime } from '../../../../eventEditor/data/types';

const soldOutOnly = (dates: Datetime[]) => {
	const filterFn = (date: Datetime) => {
		return !date.isDeleted && ((validStatus(date) && date.isSoldOut) || capacityAtOrAbove(dateEntity, 100));
	};

	return dates.filter(filterFn);
};

export default soldOutOnly;
