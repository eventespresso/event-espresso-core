import { parseISO } from 'date-fns';

import { now } from '../filters';
import { Datetime } from '../../../../../eventEditor/services/apollo/types';
import TIME from '../../../../../../application/constants/time';
import { diff } from '../../../../../../application/services/utilities/date';

/**
 * @function
 * @param {Object} date date event object
 * @return {boolean} true if end date is in the past
 */
const isRecentlyExpired = ({ endDate }: Datetime): boolean => {
	return (
		diff('seconds', parseISO(endDate), now) < 0 &&
		diff('seconds', parseISO(endDate), now) > TIME.MONTH_IN_SECONDS * -1
	);
};

export default isRecentlyExpired;
