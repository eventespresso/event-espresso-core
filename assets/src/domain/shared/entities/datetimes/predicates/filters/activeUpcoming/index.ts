import { anyPass, filter } from 'ramda';

import isActive from '../../isActive';
import isUpcoming from '../../isUpcoming';
import { DatetimeFilterFn } from '../types';

const activeUpcoming: DatetimeFilterFn = (dates) => {
	return dates.filter(({ isActive, isUpcoming }) => isActive || isUpcoming);

	const predicates = anyPass([isActive, isUpcoming]);
	return filter(predicates)(dates);
};

export default activeUpcoming;
