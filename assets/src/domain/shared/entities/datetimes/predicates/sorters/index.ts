/**
 * External dependencies
 */
import { prop, sortBy } from 'ramda';
import { compareAsc, parseISO } from 'date-fns';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../../prototype/domain/eventEditor/data/types';
import { DatesSorted } from '../../../../../eventEditor/interfaces/datetimes/types';

interface SortDates {
	dates: Datetime[];
	order?: DatesSorted;
}

/**
 * sortDateEntitiesList
 * reduces dateEntities array based on value of the "datesSortedBy" filter
 *
 * @return {Array}         filtered dateEntities array
 */
const sorters = ({ dates, order = DatesSorted.chronologically }: SortDates): Datetime[] => {
	switch (order) {
		case DatesSorted.chronologically:
			return dates.sort(({ startDate: dateLeft }, { startDate: dateRight }) =>
				compareAsc(parseISO(dateLeft), parseISO(dateRight))
			);
		case DatesSorted.byId:
			return sortBy(prop('id'))(dates);
		case DatesSorted.byName:
			return sortBy(prop('name'))(dates);
		case DatesSorted.byOrder:
			return sortBy(prop('order'))(dates);
		default:
			return dates;
	}
};

export default sorters;
