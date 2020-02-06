/**
 * Internal dependencies
 */
import capacityAtOrAbove from '../../capacityAtOrAbove';
import { Datetime } from '../../../../../../eventEditor/services/apollo/types';
import { isTrashed } from '../../../../../services/predicates';
import validStatus from '../../validStatus';
import { DatetimeFilterFn } from '../types';

const soldOutOnly: DatetimeFilterFn = (dates) => {
	const filterFn = (date: Datetime): boolean => {
		return !isTrashed(date) && ((validStatus(date) && date.isSoldOut) || capacityAtOrAbove(date, 100));
	};

	return dates.filter(filterFn);
};

export default soldOutOnly;
