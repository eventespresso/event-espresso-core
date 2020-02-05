/**
 * External dependencies
 */
import { differenceInSeconds, parseISO } from 'date-fns';
import { now } from '../filters';

/**
 * Internal dependencies
 */
import { Datetime } from '../../../../../eventEditor/services/apollo/types';
import TIME from '../../../../../../application/constants/time';

/**
 * @function
 * @param {Object} date date event object
 * @return {boolean} true if end date is in the past
 */
const isRecentlyExpired = ({ endDate }: Datetime): boolean => {
	return (
		differenceInSeconds(parseISO(endDate), now) < 0 &&
		differenceInSeconds(parseISO(endDate), now) > TIME.MONTH_IN_SECONDS * -1
	);
};

export default isRecentlyExpired;
