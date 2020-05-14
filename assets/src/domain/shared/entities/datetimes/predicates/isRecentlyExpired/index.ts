import { parseISO } from 'date-fns';

import { Datetime } from '@edtrServices/apollo/types';
import { diff } from '@appServices/utilities';
import { now } from '@sharedServices/utils/dateAndTime';
import TIME from '@appConstants/time';

/**
 * @function
 * @param {Object} date date event object
 * @return {boolean} true if end date is in the past
 */
const isRecentlyExpired = (date: Datetime): boolean => {
	const endDate = parseISO(date.endDate);
	return diff('seconds', endDate, now) < 0 && diff('seconds', endDate, now) > TIME.MONTH_IN_SECONDS * -1;
};

export default isRecentlyExpired;
