/**
 * Internal dependencies
 */
import capacityAtOrAbove from '../../capacityAtOrAbove';
import { Datetime } from '../../../../../../eventEditor/data/types';
import isTrashed from '../../isTrashed';
import validStatus from '../../validStatus';

const soldOutOnly = (dates: Datetime[]): Datetime[] | [] => {
	const filterFn = (date: Datetime): boolean => {
		return !isTrashed(date) && ((validStatus(date) && date.isSoldOut) || capacityAtOrAbove(date, 100));
	};

	return dates.filter(filterFn);
};

export default soldOutOnly;
