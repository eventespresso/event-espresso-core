import { parseISO } from 'date-fns';

import { Datetime } from '../../../../../eventEditor/services/apollo/types';
import { diff } from '../../../../../../application/services/utilities/date';
import { isValidOrTrashed } from '../../../../services/predicates';
import { now } from '../filters';
import TIME from '../../../../../../application/constants/time';

/**
 * @function
 * @param {Object} date date event object
 * @return {boolean} true if end date is in the past
 */
const isRecentlyExpired = (date: Datetime): boolean => {
	return (
		isValidOrTrashed(date) &&
		diff('seconds', parseISO(date.endDate), now) < 0 &&
		diff('seconds', parseISO(date.endDate), now) > TIME.MONTH_IN_SECONDS * -1
	);
};

export default isRecentlyExpired;
