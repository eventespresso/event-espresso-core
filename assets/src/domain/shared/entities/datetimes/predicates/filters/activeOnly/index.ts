import isActive from '../../isActive';

import { DatetimeFilterFn } from '../types';

const activeOnly: DatetimeFilterFn = (dates) => {
	return dates.filter((date) => isActive(date));
};

export default activeOnly;
