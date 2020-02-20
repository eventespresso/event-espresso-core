import { Datetime } from '@edtrServices/apollo/types';
import isActive from '../predicates/isActive';
import isExpired from '../predicates/isExpired';
import isSoldOut from '../predicates/isSoldOut';
import isTrashed from '../../../services/predicates/isTrashed';

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

	// PLZ SEE NOTE ABOVE
	// if ( isCancelled( DateTimeEntity ) ) {
	// 	return DATETIME_STATUS_ID.CANCELLED;
	// }
	// if ( isPostponed( DateTimeEntity ) ) {
	// 	return DATETIME_STATUS_ID.POSTPONED;
	// }
	// assertDateTimeEntity(DateTimeEntity);
	// return DATETIME_STATUS_ID.INACTIVE;
};

export default status;
