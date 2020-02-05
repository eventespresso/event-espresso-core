/**
 * External dependencies
 */
import { head } from 'ramda';

/**
 * Internal dependencies
 */
import activeUpcoming from '../activeUpcoming';
import { Datetime } from '../../../../../../eventEditor/services/apollo/types';

const nextActiveUpcomingOnly = (dates: Datetime[]): Datetime[] | [] => {
	const activeUpcomingDates = activeUpcoming(dates);
	const firstActiveUpcomingDates = head(activeUpcomingDates);

	return firstActiveUpcomingDates ? [firstActiveUpcomingDates] : [];
};

export default nextActiveUpcomingOnly;
