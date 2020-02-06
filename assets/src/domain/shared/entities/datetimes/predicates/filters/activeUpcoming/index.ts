/**
 * Internal dependencies
 */
import { DatetimeFilterFn } from '../types';

const activeUpcoming: DatetimeFilterFn = (dates) => {
	return dates.filter(({ isActive, isUpcoming }) => isActive || isUpcoming);
};

export default activeUpcoming;
