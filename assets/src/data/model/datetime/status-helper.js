/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { DATETIME_STATUS_ID, MODEL_NAME } from './constants';

const assertDateTimeEntity = ( DateTimeEntity ) => {
	if ( ! isModelEntityOfModel( DateTimeEntity, MODEL_NAME ) ) {
		throw new TypeError(
			'The provided entity is not a datetime instance'
		);
	}
};

export const isActive = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.start.diffNow() < 0 &&
		DateTimeEntity.end.diffNow() > 0;
};

export const isExpired = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.end.diffNow() < 0;
};

export const isSoldOut = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.sold >= DateTimeEntity.regLimit;
};

export const isUpcoming = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.start.diffNow() > 0;
};

export const status = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	if ( isExpired( DateTimeEntity ) ) {
		return DATETIME_STATUS_ID.EXPIRED;
	}
	if ( isSoldOut( DateTimeEntity ) ) {
		return DATETIME_STATUS_ID.SOLD_OUT;
	}
	if ( isUpcoming( DateTimeEntity ) ) {
		return DATETIME_STATUS_ID.UPCOMING;
	}
	if ( isActive( DateTimeEntity ) ) {
		return DATETIME_STATUS_ID.ACTIVE;
	}
	return null;

};
