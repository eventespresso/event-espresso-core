import allDates from './allDates';

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
	}
	return dates;
};

export default filters;
