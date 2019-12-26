/**
 * External dependencies
 */
import { prop, sortBy } from 'ramda';
import { compareAsc, parseISO } from 'date-fns';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';
import { DatesSortedBy } from '../../../eventEditor/data/date/types';

interface SortDates {
	dates: Datetime[];
	sort: DatesSortedBy;
}

/**
 * sortDateEntitiesList
 * reduces dateEntities array based on value of the "datesSortedBy" filter
 *
 * @return {Array}         filtered dateEntities array
 */
const sorters = ({ dates, sort = DatesSortedBy.chronologically }: SortDates) => {
	switch (sort) {
		case DatesSortedBy.chronologically:
			return dates.sort(({ startDate: dateLeft }, { startDate: dateRight }) =>
				compareAsc(parseISO(dateLeft), parseISO(dateRight))
			);
		case DatesSortedBy['by-id']:
			return sortBy(prop('id'))(dates);
		case DatesSortedBy['by-name']:
			return sortBy(prop('name'))(dates);
		case DatesSortedBy['by-order']:
			return sortBy(prop('order'))(dates);
	}

	return dates;
};

export default sorters;
