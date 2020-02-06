/**
 * Internal dependencies
 */
import { isTrashed } from '../../../../../services/predicates';
import { DatetimeFilterFn } from '../types';

const trashedOnly: DatetimeFilterFn = (dates) => {
	return dates.filter(isTrashed);
};

export default trashedOnly;
