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

	return [head(activeUpcomingDates)];
};

export default nextActiveUpcomingOnly;
