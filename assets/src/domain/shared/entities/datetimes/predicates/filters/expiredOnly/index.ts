import isExpired from '../../isExpired';
import { DatetimeFilterFn } from '../types';

const expiredOnly: DatetimeFilterFn = (dates) => {
	return dates.filter(isExpired);
};

export default expiredOnly;
