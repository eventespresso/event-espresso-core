/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { DATETIME_STATUS_ID, MODEL_NAME } from './constants';

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @throws {TypeError}
 */
const assertDateTimeEntity = ( DateTimeEntity ) => {
	if ( ! isModelEntityOfModel( DateTimeEntity, MODEL_NAME ) ) {
		throw new TypeError(
			'The provided entity is not a datetime instance'
		);
	}
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if event date is occurring NOW
 */
export const isActive = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.start.diffNow() < 0 &&
		DateTimeEntity.end.diffNow() > 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if end date is in the past
 */
export const isExpired = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.end.diffNow() < 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if tickets sold meets or exceeds registration limit
 */
export const isSoldOut = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	const cap = DateTimeEntity.regLimit;
	return ( cap !== null && cap !== 'INF' && cap !== Infinity ) &&
		DateTimeEntity.sold >= cap;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if start date is in the future
 */
export const isUpcoming = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.start.diffNow() > 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string} status ID
 */
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

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string}    CSS class for the background color
 */
export const getBackgroundColorClass = ( DateTimeEntity ) => {
	switch ( status( DateTimeEntity ) ) {
		case DATETIME_STATUS_ID.ACTIVE :
			return 'ee-green-background';
		case DATETIME_STATUS_ID.EXPIRED :
			return 'ee-lt-grey-background';
		case DATETIME_STATUS_ID.SOLD_OUT :
			return 'ee-orange-background';
		case DATETIME_STATUS_ID.UPCOMING :
		default:
			return 'ee-blue-background';
	}
};

