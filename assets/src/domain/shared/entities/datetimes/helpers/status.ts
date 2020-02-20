import { Datetime } from '@edtrServices/apollo/types';

const status = (DateTimeEntity) => {
	if (isTrashed(DateTimeEntity)) {
		return DATETIME_STATUS_ID.TRASHED;
	}
	if (isExpired(DateTimeEntity)) {
		return DATETIME_STATUS_ID.EXPIRED;
	}
	if (isSoldOut(DateTimeEntity)) {
		return DATETIME_STATUS_ID.SOLD_OUT;
	}
	if (isUpcoming(DateTimeEntity)) {
		return DATETIME_STATUS_ID.UPCOMING;
	}
	if (isActive(DateTimeEntity)) {
		return DATETIME_STATUS_ID.ACTIVE;
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
