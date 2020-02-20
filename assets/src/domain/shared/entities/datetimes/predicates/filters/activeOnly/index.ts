import { is } from 'ramda';
import isActive from '../../isActive';

import { DatetimeFilterFn } from '../types';

const activeOnly: DatetimeFilterFn = (dates) => {
	return dates.filter(({ isActive }) => {
		return is(Boolean, isActive) && isActive;
	});
	return dates.filter((date) => isActive(date));
};

export default activeOnly;
