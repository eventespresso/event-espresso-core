/**
 * External dependencies
 */
import { head } from 'ramda';

/**
 * Internal dependencies
 */
import activeUpcoming from '../activeUpcoming';
import { DatetimeFilterFn } from '../types';

const nextActiveUpcomingOnly: DatetimeFilterFn = (dates) => {
	const activeUpcomingDates = activeUpcoming(dates);
	const firstActiveUpcomingDates = head(activeUpcomingDates);

	return firstActiveUpcomingDates ? [firstActiveUpcomingDates] : [];
};

export default nextActiveUpcomingOnly;
