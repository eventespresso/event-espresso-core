import { prop, sortBy as sortByFn } from 'ramda';
import { compareAsc, parseISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo';
import { SortBy } from '@sharedServices/filterState';

interface SortDates {
	dates: Datetime[];
	sortBy?: SortBy;
}

/**
 * sortDateEntitiesList
 * reduces dateEntities array based on value of the "datesSortedBy" filter
 *
 * @return {Array}         filtered dateEntities array
 */
const sorters = ({ dates, sortBy = 'date' }: SortDates): Datetime[] => {
	switch (sortBy) {
		case 'date':
			return dates.sort(({ startDate: dateLeft }, { startDate: dateRight }) =>
				compareAsc(parseISO(dateLeft), parseISO(dateRight))
			);
		case 'id':
			return sortByFn(prop('dbId'))(dates);
		case 'name':
			return sortByFn(prop('name'))(dates);
		case 'order':
			return sortByFn(prop('order'))(dates);
		default:
			return dates;
	}
};

export default sorters;
