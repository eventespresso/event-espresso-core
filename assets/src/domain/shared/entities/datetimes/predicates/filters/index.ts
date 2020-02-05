/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../../../prototype/domain/eventEditor/data/types';
import { ShowDates } from '../../../../../eventEditor/interfaces/datetimes/types';

import aboveCapacity from './aboveCapacity';
import activeOnly from './activeOnly';
import activeUpcoming from './activeUpcoming';
import allDates from './allDates';
import belowCapacity from './belowCapacity';
import expiredOnly from './expiredOnly';
import nextActiveUpcomingOnly from './nextActiveUpcomingOnly';
import recentlyExpiredOnly from './recentlyExpiredOnly';
import soldOutOnly from './soldOutOnly';
import trashedOnly from './trashedOnly';
import upcomingOnly from './upcomingOnly';

export const now = new Date();

interface FilterDates {
	dates: Datetime[];
	show?: string;
}

/**
 * reduces dates array based on value of the "showDates" filter
 *
 * @param {Array} dateEntities    original dateEntities array
 * @param {string} showDates    value for the "showDates" filter
 * @return {Array}         filtered dateEntities array
 */
const filters = ({ dates, show = ShowDates.activeUpcoming }: FilterDates) => {
	switch (show) {
		case ShowDates.above50Capacity:
			return aboveCapacity({ dates, capacity: 50 });
		case ShowDates.above75Capacity:
			return aboveCapacity({ dates, capacity: 75 });
		case ShowDates.above90Capacity:
			return aboveCapacity({ dates, capacity: 90 });
		case ShowDates.activeOnly:
			return activeOnly(dates);
		case ShowDates.activeUpcoming:
			return activeUpcoming(dates);
		case ShowDates.all:
			return allDates(dates);
		case ShowDates.below50Capacity:
			return belowCapacity({ dates, capacity: 50 });
		case ShowDates.expiredOnly:
			return expiredOnly(dates);
		case ShowDates.nextActiveUpcomingOnly:
			return nextActiveUpcomingOnly(dates);
		case ShowDates.recentlyExpiredOnly:
			return recentlyExpiredOnly(dates);
		case ShowDates.soldOutOnly:
			return soldOutOnly(dates);
		case ShowDates.trashedOnly:
			return trashedOnly(dates);
		case ShowDates.upcomingOnly:
			return upcomingOnly(dates);
	}

	return dates;
};

export default filters;
