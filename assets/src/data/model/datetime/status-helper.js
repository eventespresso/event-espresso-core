/**
 * External imports
 */
import { __ } from '@eventespresso/i18n';
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
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if event date is occurring NOW
 */
export const isActive = ( DateTimeEntity, includeTrashed = false ) => {
	return (
		( includeTrashed && assertDateTimeEntity( DateTimeEntity ) ) ||
		( ! includeTrashed && ! isTrashed( DateTimeEntity ) )
	) &&
	DateTimeEntity.start.diffNow().asSeconds() < 0 &&
	DateTimeEntity.end.diffNow().asSeconds() > 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if end date is in the past
 */
export const isExpired = ( DateTimeEntity, includeTrashed = false ) => {
	return (
		( includeTrashed && assertDateTimeEntity( DateTimeEntity ) ) ||
		( ! includeTrashed && ! isTrashed( DateTimeEntity ) )
	) &&
	DateTimeEntity.end.diffNow().asSeconds() < 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if end date is in the past
 */
export const isRecentlyExpired = ( DateTimeEntity, includeTrashed = false ) => {
	return (
		( includeTrashed && assertDateTimeEntity( DateTimeEntity ) ) ||
		( ! includeTrashed && ! isTrashed( DateTimeEntity ) )
	) &&
	DateTimeEntity.end.diffNow().asSeconds() < 0 &&
	DateTimeEntity.end.diffNow().asSeconds() > ( MONTH_IN_SECONDS * -1 );
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if tickets sold meets or exceeds registration limit
 */
export const isSoldOut = ( DateTimeEntity, includeTrashed = false ) => {
	if (
		( includeTrashed && ! assertDateTimeEntity( DateTimeEntity ) ) ||
		( ! includeTrashed && isTrashed( DateTimeEntity ) )
	) {
		return false;
	}
	const cap = DateTimeEntity.regLimit;
	return ( cap !== null && cap !== 'INF' && cap !== Infinity && cap !== -1 ) &&
		DateTimeEntity.sold >= cap;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @param {boolean} includeTrashed if true will not filter out trashed entities
 * @return {boolean} true if start date is in the future
 */
export const isUpcoming = ( DateTimeEntity, includeTrashed = false ) => {
	return (
		( includeTrashed && assertDateTimeEntity( DateTimeEntity ) ) ||
		( ! includeTrashed && ! isTrashed( DateTimeEntity ) )
	) &&
	DateTimeEntity.start.diffNow().asSeconds() > 0;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {boolean} true if date is archived
 */
export const isTrashed = ( DateTimeEntity ) => {
	assertDateTimeEntity( DateTimeEntity );
	return DateTimeEntity.deleted;
};

// PLZ NOTE:
// leaving the following code in because it can be used if/when we decide
// to fully support these datetime statuses which are currently defined
// on the EE_Datetime model object class but not yet used

// /**
//  * @function
//  * @param {Object} DateTimeEntity model object
//  * @return {boolean} true if date is cancelled
//  */
// export const isCancelled = ( DateTimeEntity ) => {
// 	assertDateTimeEntity( DateTimeEntity );
// 	return DateTimeEntity.cancelled;
// };
//
// /**
//  * @function
//  * @param {Object} DateTimeEntity model object
//  * @return {boolean} true if date has been postponed
//  */
// export const isPostponed = ( DateTimeEntity ) => {
// 	assertDateTimeEntity( DateTimeEntity );
// 	return DateTimeEntity.postponed;
// };

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string} status ID
 */
export const status = ( DateTimeEntity ) => {
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
	// PLZ SEE NOTE ABOVE
	// if ( isCancelled( DateTimeEntity ) ) {
	// 	return DATETIME_STATUS_ID.CANCELLED;
	// }
	// if ( isPostponed( DateTimeEntity ) ) {
	// 	return DATETIME_STATUS_ID.POSTPONED;
	// }
	return DATETIME_STATUS_ID.INACTIVE;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string}    CSS class for the background color
 */
export const getBackgroundColorClass = ( DateTimeEntity ) => {
	return `ee-status-background-color-${ status( DateTimeEntity ) }`;
};

/**
 * @function
 * @param {Object} DateTimeEntity model object
 * @return {string} date status
 */
export const getDateTimeStatusTextLabel = ( DateTimeEntity ) => {
	let dateStatus = '';
	switch ( status( DateTimeEntity ) ) {
		case DATETIME_STATUS_ID.SOLD_OUT :
			dateStatus = __( 'sold out', 'event_espresso' );
			break;
		case DATETIME_STATUS_ID.EXPIRED :
			dateStatus = __( 'expired', 'event_espresso' );
			break;
		case DATETIME_STATUS_ID.UPCOMING :
			dateStatus = __( 'upcoming', 'event_espresso' );
			break;
		case DATETIME_STATUS_ID.ACTIVE :
			dateStatus = __( 'active', 'event_espresso' );
			break;
		case DATETIME_STATUS_ID.TRASHED :
			dateStatus = __( 'archived', 'event_espresso' );
			break;
		case DATETIME_STATUS_ID.CANCELLED :
			dateStatus = __( 'cancelled', 'event_espresso' );
			break;
		case DATETIME_STATUS_ID.POSTPONED :
			dateStatus = __( 'postponed', 'event_espresso' );
			break;
		case DATETIME_STATUS_ID.INACTIVE :
		default:
			dateStatus = __( 'inactive', 'event_espresso' );
			break;
	}
	return dateStatus;
};
