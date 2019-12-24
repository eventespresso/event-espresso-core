/**
 * External dependencies
 */
import { head } from 'ramda';

/**
 * Internal dependencies
 */
import activeUpcoming from './activeUpcoming';
import { Datetime } from '../../../../eventEditor/data/types';

const nextActiveUpcomingOnly = (dates: Datetime[]) => {
	const activeUpcomingDates = activeUpcoming(dates);
	const firstActiveUpcomingDates = head(activeUpcomingDates);

	return [firstActiveUpcomingDates];
};

export default nextActiveUpcomingOnly;
