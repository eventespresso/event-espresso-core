import activeOnly from './activeOnly';
import activeUpcoming from './activeUpcoming';
import allDates from './allDates';
import nextActiveUpcomingOnly from './nextActiveUpcomingOnly';
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
	}
	return dates;
};

export default filters;
