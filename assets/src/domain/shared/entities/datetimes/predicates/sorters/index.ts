import { prop, sortBy } from 'ramda';
import { compareAsc, parseISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo';
import { SortBy } from '@sharedServices/filterState';

interface SortDates {
	dates: Datetime[];
	order?: SortBy;
}

/**
 * sortDateEntitiesList
 * reduces dateEntities array based on value of the "datesSortedBy" filter
 *
 * @return {Array}         filtered dateEntities array
 */
const sorters = ({ dates, order = 'date' }: SortDates): Datetime[] => {
	switch (order) {
		case 'date':
			return dates.sort(({ startDate: dateLeft }, { startDate: dateRight }) =>
				compareAsc(parseISO(dateLeft), parseISO(dateRight))
			);
		case 'id':
			return sortBy(prop('id'))(dates);
		case 'name':
			return sortBy(prop('name'))(dates);
		case 'order':
			return sortBy(prop('order'))(dates);
		default:
			return dates;
	}
};

export default sorters;
