import { Datetime } from '@edtrServices/apollo/types';
import isActive from '../predicates/isActive';
import isExpired from '../predicates/isExpired';
import isSoldOut from '../predicates/isSoldOut';
import isTrashed from '../../../services/predicates/isTrashed';
import isUpcoming from '../predicates/isUpcoming';

import { DATETIME_STATUS_ID } from '../constants';

const status = (date: Datetime): string => {
	if (isTrashed(date)) {
		return DATETIME_STATUS_ID.TRASHED;
	}

	if (isExpired(date)) {
		return DATETIME_STATUS_ID.EXPIRED;
	}

	if (isSoldOut(date)) {
		return DATETIME_STATUS_ID.SOLD_OUT;
	}

	if (isUpcoming(date)) {
		return DATETIME_STATUS_ID.UPCOMING;
	}

	if (isActive(date)) {
		return DATETIME_STATUS_ID.ACTIVE;
	}

	return DATETIME_STATUS_ID.INACTIVE;
};

export default status;
