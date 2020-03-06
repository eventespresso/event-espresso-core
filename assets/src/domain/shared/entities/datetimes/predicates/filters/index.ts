import { parseISO, formatISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo';
import { DatetimesToShow } from '@edtrServices/filterState';

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

export const now = parseISO(formatISO(new Date()));

interface FilterDates {
	dates: Datetime[];
	show: DatetimesToShow;
}

/**
 * reduces dates array based on value of the "showDates" filter
 */
const filters = ({ dates, show = DatetimesToShow.activeUpcoming }: FilterDates): Datetime[] => {
	switch (show) {
		case DatetimesToShow.above50Capacity:
			return aboveCapacity({ dates, capacity: 50 });
		case DatetimesToShow.above75Capacity:
			return aboveCapacity({ dates, capacity: 75 });
		case DatetimesToShow.above90Capacity:
			return aboveCapacity({ dates, capacity: 90 });
		case DatetimesToShow.activeOnly:
			return activeOnly(dates);
		case DatetimesToShow.activeUpcoming:
			return activeUpcoming(dates);
		case DatetimesToShow.all:
			return allDates(dates);
		case DatetimesToShow.below50Capacity:
			return belowCapacity({ dates, capacity: 50 });
		case DatetimesToShow.expiredOnly:
			return expiredOnly(dates);
		case DatetimesToShow.nextActiveUpcomingOnly:
			return nextActiveUpcomingOnly(dates);
		case DatetimesToShow.recentlyExpiredOnly:
			return recentlyExpiredOnly(dates);
		case DatetimesToShow.soldOutOnly:
			return soldOutOnly(dates);
		case DatetimesToShow.trashedOnly:
			return trashedOnly(dates);
		case DatetimesToShow.upcomingOnly:
			return upcomingOnly(dates);
	}

	return dates;
};

export default filters;
