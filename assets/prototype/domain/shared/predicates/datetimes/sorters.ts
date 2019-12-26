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

			// dateEntities = sortBy(dateEntities, [
			// 	function(dateEntity) {
			// 		return DateTime.isValid(dateEntity.start) ? dateEntity.start.toMillis() : 0;
			// 	},
			// 	'name',
			// 	'id',
			// ]);
			break;
		case 'by-name':
			return sortBy(prop('name'))(dates);
		case 'by-id':
			return sortBy(prop('name'))(dates);
			// dateEntities = sortBy(dateEntities, ['id']);
			break;
		case 'by-order':
			return sortBy(prop('name'))(dates);
			// dateEntities = sortBy(dateEntities, ['order']);
			break;
	}
	return dates;
};

export default sorters;
