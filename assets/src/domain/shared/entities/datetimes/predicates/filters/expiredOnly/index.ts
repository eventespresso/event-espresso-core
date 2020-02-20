import { is } from 'ramda';

import { Datetime } from '../../../../../../eventEditor/services/apollo/types';
import { isTrashed } from '../../../../../services/predicates';

import isExpired from '../../isExpired';
import { DatetimeFilterFn } from '../types';

const expiredOnly: DatetimeFilterFn = (dates) => {
	const filterFn = (date: Datetime): boolean => {
		return is(Boolean, date.isExpired) && date.isExpired && !isTrashed(date);
	};
	return dates.filter(filterFn);

	return dates.filter(isExpired);
};

export default expiredOnly;
