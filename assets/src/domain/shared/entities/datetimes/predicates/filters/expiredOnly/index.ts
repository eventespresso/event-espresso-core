import isExpired from '../../isExpired';
import { DatetimeFilterFn } from '../types';

const expiredOnly: DatetimeFilterFn = (dates) => {
	return dates.filter((date) => isExpired(date));
};

export default expiredOnly;
