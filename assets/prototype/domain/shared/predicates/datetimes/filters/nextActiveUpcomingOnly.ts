/**
 * External dependencies
 */
import { head } from 'ramda';

/**
 * Internal dependencies
 */
import activeUpcoming from './activeUpcoming';

const nextActiveUpcomingOnly = (dates: any[]) => {
	const activeUpcomingDates = dates.filter(activeUpcoming);
	const firstActiveUpcomingDates = head(activeUpcomingDates);

	return [firstActiveUpcomingDates];
};

export default nextActiveUpcomingOnly;
