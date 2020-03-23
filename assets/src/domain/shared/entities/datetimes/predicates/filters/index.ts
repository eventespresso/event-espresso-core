import { parseISO, formatISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo';
import { Sales, Status } from '@edtrServices/filterState';

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
export const salesFilter = ({ dates: entities, sales = Sales.all }: SalesFilter): Datetime[] => {
	const dates = notTrashed(entities);
	switch (sales) {
		case Sales.above50Capacity:
			return aboveCapacity({ dates, capacity: 50 });
		case Sales.above75Capacity:
			return aboveCapacity({ dates, capacity: 75 });
		case Sales.above90Capacity:
			return aboveCapacity({ dates, capacity: 90 });
		case Sales.all:
			return allDates(dates);
		case Sales.below50Capacity:
			return belowCapacity({ dates, capacity: 50 });
		default:
			return dates;
	}
};

/**
 * reduces dates array based on value of the "status" filter
 */
export const statusFilter = ({ dates: entities, status = Status.activeUpcoming }: StatusFilter): Datetime[] => {
	const dates = notTrashed(entities);
	switch (status) {
		case Status.activeOnly:
			return activeOnly(dates);
		case Status.activeUpcoming:
			return activeUpcoming(dates);
		case Status.all:
			return allDates(dates);
		case Status.expiredOnly:
			return expiredOnly(dates);
		case Status.nextActiveUpcomingOnly:
			return nextActiveUpcomingOnly(dates);
		case Status.recentlyExpiredOnly:
			return recentlyExpiredOnly(dates);
		case Status.soldOutOnly:
			return soldOutOnly(dates);
		case Status.trashedOnly:
			return trashedOnly(dates);
		case Status.upcomingOnly:
			return upcomingOnly(dates);
	}
};
