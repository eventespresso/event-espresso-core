/**
 * External dependencies
 */
import { prop, sortBy } from 'ramda';
import { compareAsc, parseISO } from 'date-fns';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../eventEditor/data/types';
import { DatesSortedBy } from '../../../../../eventEditor/data/date/types';

interface SortDates {
	dates: Datetime[];
	sort?: DatesSortedBy;
}

/**
 * sortDateEntitiesList
 * reduces dateEntities array based on value of the "datesSortedBy" filter
 *
 * @return {Array}         filtered dateEntities array
 */
const sorters = ({ dates, sort = DatesSortedBy.chronologically }: SortDates): Datetime[] => {
	switch (sort) {
		case DatesSortedBy.chronologically:
			return dates.sort(({ startDate: dateLeft }, { startDate: dateRight }) =>
				compareAsc(parseISO(dateLeft), parseISO(dateRight))
			);
		case DatesSortedBy.byId:
			return sortBy(prop('id'))(dates);
		case DatesSortedBy.byName:
			return sortBy(prop('name'))(dates);
		case DatesSortedBy.byOrder:
			return sortBy(prop('order'))(dates);
		default:
			return dates;
	}
};

export default sorters;
