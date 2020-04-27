import { Datetime } from '@edtrServices/apollo';
import { DatetimeStatus } from '@edtrServices/filterState';

import activeOnly from './activeOnly';
import activeUpcoming from './activeUpcoming';
import expiredOnly from './expiredOnly';
import nextActiveUpcomingOnly from './nextActiveUpcomingOnly';
import recentlyExpiredOnly from './recentlyExpiredOnly';
import soldOutOnly from './soldOutOnly';
import upcomingOnly from './upcomingOnly';
import notTrashed from '@sharedServices/predicates/filters/notTrashed';
import trashedOnly from '@sharedServices/predicates/filters/trashedOnly';

import { StatusFilter } from './types';

/**
 * reduces dates array based on value of the "status" filter
 */
const statusFilter = ({ dates: entities, status = DatetimeStatus.activeUpcoming }: StatusFilter): Datetime[] => {
	const dates = notTrashed(entities);
	switch (status) {
		case DatetimeStatus.activeOnly:
			return activeOnly(dates);
		case DatetimeStatus.activeUpcoming:
			return activeUpcoming(dates);
		case DatetimeStatus.all:
			return entities;
		case DatetimeStatus.expiredOnly:
			return expiredOnly(dates);
		case DatetimeStatus.nextActiveUpcomingOnly:
			return nextActiveUpcomingOnly(dates);
		case DatetimeStatus.recentlyExpiredOnly:
			return recentlyExpiredOnly(dates);
		case DatetimeStatus.soldOutOnly:
			return soldOutOnly(dates);
		case DatetimeStatus.trashedOnly:
			return trashedOnly(entities);
		case DatetimeStatus.upcomingOnly:
			return upcomingOnly(dates);
		default:
			return dates;
	}
};

export default statusFilter;
