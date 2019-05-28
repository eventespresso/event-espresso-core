/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';

/**
 * Internal imports
 */
import { DATETIME_STATUS_ID, MODEL_NAME, MONTH_IN_SECONDS } from './constants';

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
	return DateTimeEntity.start.diffNow().asSeconds() < 0 &&
		DateTimeEntity.end.diffNow().asSeconds() > 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if end date is in the past
 */
export const isExpired = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.end.diffNow().asSeconds() < 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if end date is in the past
 */
export const isRecentlyExpired = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.end.diffNow().asSeconds() < 0 &&
		DateTimeEntity.end.diffNow().asSeconds() > ( MONTH_IN_SECONDS * -1 );
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if tickets sold meets or exceeds registration limit
 */
export const isSoldOut = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	const cap = DateTimeEntity.regLimit;
	return ( cap !== null && cap !== 'INF' && cap !== Infinity && cap !== -1 ) &&
		DateTimeEntity.sold >= cap;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if start date is in the future
 */
export const isUpcoming = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.start.diffNow().asSeconds() > 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if ticket is archived
 */
export const isTrashed = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.deleted;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string} status ID
 */
export const status = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	if ( isTrashed( DateTimeEntity ) ) {
		return DATETIME_STATUS_ID.TRASHED;
	}
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
	return DATETIME_STATUS_ID.INACTIVE;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string}    CSS class for the background color
 */
export const statusColorClass = ( DateTimeEntity ) => {
	switch ( status( DateTimeEntity ) ) {
		case DATETIME_STATUS_ID.ACTIVE :
			return 'green';
		case DATETIME_STATUS_ID.CANCELLED :
			return 'red';
		case DATETIME_STATUS_ID.EXPIRED :
			return 'lite-grey';
		case DATETIME_STATUS_ID.INACTIVE :
			return 'dark-blue';
		case DATETIME_STATUS_ID.POSTPONED :
			return 'purple';
		case DATETIME_STATUS_ID.SOLD_OUT :
			return 'gold';
		case DATETIME_STATUS_ID.TRASHED :
			return 'dark-grey';
		case DATETIME_STATUS_ID.UPCOMING :
		default:
			return 'blue';
	}
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string}    CSS class for the background color
 */
export const getBackgroundColorClass = ( DateTimeEntity ) => {
	return `ee-${ statusColorClass( DateTimeEntity ) }-background`;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {string} border 'all', 'top', 'right', 'bottom', 'left'
 * @return {string}    CSS class for the background color
 */
export const getBorderColorClass = ( DateTimeEntity, border = 'all' ) => {
	const color = statusColorClass( DateTimeEntity );
	switch ( border ) {
		case 'all':
			return `ee-${ color }-border`;
		case 'top':
			return `ee-${ color }-border-top`;
		case 'right':
			return `ee-${ color }-border-right`;
		case 'bottom':
			return `ee-${ color }-border-bottom`;
		case 'left':
			return `ee-${ color }-border-left`;
	}
};

