import { Datetime } from '@edtrServices/apollo/types';
import isActive from '../predicates/isActive';
import isExpired from '../predicates/isExpired';
import isSoldOut from '../predicates/isSoldOut';
import isTrashed from '../../../services/predicates/isTrashed';
import isUpcoming from '../predicates/isUpcoming';

import { DATETIME_STATUS_ID } from '../constants';

const status = (date: Datetime): string => {
	if (isActive(date)) {
		return DATETIME_STATUS_ID.ACTIVE;
	}
	if (isExpired(date)) {
		return DATETIME_STATUS_ID.EXPIRED;
	}
	if (isSoldOut(date)) {
		return DATETIME_STATUS_ID.SOLD_OUT;
	}
	if (isTrashed(date)) {
		return DATETIME_STATUS_ID.TRASHED;
	}
	if (isUpcoming(date)) {
		return DATETIME_STATUS_ID.UPCOMING;
	}

	return DATETIME_STATUS_ID.INACTIVE;
};

export default status;
