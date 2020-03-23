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
import upcomingOnly from './upcomingOnly';
import notTrashed from '../../../../services/predicates/filters/notTrashed';
import trashedOnly from '../../../../services/predicates/filters/trashedOnly';

import { FilterDates } from './types';

export const now = parseISO(formatISO(new Date()));

/**
 * reduces dates array based on value of the "showDates" filter
 */
const filters = ({ dates, show = DatetimesToShow.activeUpcoming }: FilterDates): Datetime[] => {
	const noTrashedDates = notTrashed(dates);
	switch (show) {
		case DatetimesToShow.above50Capacity:
			return aboveCapacity({ dates: noTrashedDates, capacity: 50 });
		case DatetimesToShow.above75Capacity:
			return aboveCapacity({ dates: noTrashedDates, capacity: 75 });
		case DatetimesToShow.above90Capacity:
			return aboveCapacity({ dates: noTrashedDates, capacity: 90 });
		case DatetimesToShow.activeOnly:
			return activeOnly(noTrashedDates);
		case DatetimesToShow.activeUpcoming:
			return activeUpcoming(noTrashedDates);
		case DatetimesToShow.all:
			return allDates(noTrashedDates);
		case DatetimesToShow.below50Capacity:
			return belowCapacity({ dates: noTrashedDates, capacity: 50 });
		case DatetimesToShow.expiredOnly:
			return expiredOnly(noTrashedDates);
		case DatetimesToShow.nextActiveUpcomingOnly:
			return nextActiveUpcomingOnly(noTrashedDates);
		case DatetimesToShow.recentlyExpiredOnly:
			return recentlyExpiredOnly(noTrashedDates);
		case DatetimesToShow.soldOutOnly:
			return soldOutOnly(noTrashedDates);
		case DatetimesToShow.trashedOnly:
			return trashedOnly(dates);
		case DatetimesToShow.upcomingOnly:
			return upcomingOnly(noTrashedDates);
		default:
			return noTrashedDates;
	}
};

export default filters;
