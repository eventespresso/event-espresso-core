import { parseISO, formatISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo';
import { DatetimeSales, DatetimeStatus } from '@edtrServices/filterState';

import aboveCapacity from './aboveCapacity';
import activeOnly from './activeOnly';
import activeUpcoming from './activeUpcoming';
import allDates from './allDates';
import belowCapacity from './belowCapacity';
import expiredOnly from './expiredOnly';
import nextActiveUpcomingOnly from './nextActiveUpcomingOnly';
import recentlyExpiredOnly from './recentlyExpiredOnly';
import soldOutOnly from './soldOutOnly';
import upcomingOnly from './upcomingOnly';
import notTrashed from '../../../../services/predicates/filters/notTrashed';
import trashedOnly from '../../../../services/predicates/filters/trashedOnly';

import { SalesFilter, StatusFilter } from './types';

export const now = parseISO(formatISO(new Date()));

/**
 * reduces dates array based on value of the "sales" filter
 */
export const salesFilter = ({ dates: entities, sales = DatetimeSales.all }: SalesFilter): Datetime[] => {
	const dates = notTrashed(entities);
	switch (sales) {
		case DatetimeSales.above50Capacity:
			return aboveCapacity({ dates, capacity: 50 });
		case DatetimeSales.above75Capacity:
			return aboveCapacity({ dates, capacity: 75 });
		case DatetimeSales.above90Capacity:
			return aboveCapacity({ dates, capacity: 90 });
		case DatetimeSales.all:
			return allDates(dates);
		case DatetimeSales.below50Capacity:
			return belowCapacity({ dates, capacity: 50 });
		default:
			return dates;
	}
};

/**
 * reduces dates array based on value of the "status" filter
 */
export const statusFilter = ({ dates: entities, status = DatetimeStatus.activeUpcoming }: StatusFilter): Datetime[] => {
	const dates = notTrashed(entities);
	switch (status) {
		case DatetimeStatus.activeOnly:
			return activeOnly(dates);
		case DatetimeStatus.activeUpcoming:
			return activeUpcoming(dates);
		case DatetimeStatus.all:
			return allDates(dates);
		case DatetimeStatus.expiredOnly:
			return expiredOnly(dates);
		case DatetimeStatus.nextActiveUpcomingOnly:
			return nextActiveUpcomingOnly(dates);
		case DatetimeStatus.recentlyExpiredOnly:
			return recentlyExpiredOnly(dates);
		case DatetimeStatus.soldOutOnly:
			return soldOutOnly(dates);
		case DatetimeStatus.trashedOnly:
			return trashedOnly(dates);
		case DatetimeStatus.upcomingOnly:
			return upcomingOnly(dates);
		default:
			return dates;
	}
};
