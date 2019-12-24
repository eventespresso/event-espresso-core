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
	dates: any[];
	show?: string;
}

/**
 * reduces dates array based on value of the "showDates" filter
 *
 * @param {Array} dateEntities    original dateEntities array
 * @param {string} showDates    value for the "showDates" filter
 * @return {Array}         filtered dateEntities array
 */
const filters = ({ dates, show = 'on-sale-and-pending' }: FilterDates) => {
	switch (show) {
		case 'all':
			return allDates(dates);
		case 'active-upcoming':
			return activeUpcoming(dates);
		case 'active-only':
			return activeOnly(dates);
		case 'upcoming-only':
			return upcomingOnly(dates);
		case 'next-active-upcoming-only':
			return nextActiveUpcomingOnly(dates);
		case 'sold-out-only':
			return soldOutOnly(dates);
		case 'above-90-capacity':
			return aboveCapacity({ dates, capacity: 90 });
		case 'above-75-capacity':
			return aboveCapacity({ dates, capacity: 75 });
		case 'above-50-capacity':
			return aboveCapacity({ dates, capacity: 50 });
		case 'below-50-capacity':
			return belowCapacity({ dates, capacity: 50 });
		case 'recently-expired-only':
			return recentlyExpiredOnly(dates);
		case 'expired-only':
			return expiredOnly(dates);
		case 'trashed-only':
			return trashedOnly(dates);
	}

	return dates;
};

export default filters;
