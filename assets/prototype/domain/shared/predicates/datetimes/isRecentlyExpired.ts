/**
 * External dependencies
 */
import { differenceInSeconds, parseISO } from 'date-fns';
import { now } from './filters';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../eventEditor/data/types';
import { MONTH_IN_SECONDS } from '../shared/constants';

/**
 * @function
 * @param {Object} date date event object
 * @return {boolean} true if end date is in the past
 */
const isRecentlyExpired = (date: Datetime): boolean => {
	const { endDate } = date;

	return (
		differenceInSeconds(parseISO(endDate), now) < 0 &&
		differenceInSeconds(parseISO(endDate), now) > MONTH_IN_SECONDS * -1
	);
};

export default isRecentlyExpired;
