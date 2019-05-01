/**
 * External imports
 */
import { checkInModel } from '@eventespresso/model';
import { isModelEntityOfModel } from '@eventespresso/validators';
import { sprintf } from '@eventespresso/i18n';
import memize from 'memize';
import { __ } from '@wordpress/i18n';

/**
 * Helper for getting checkin status configuration strings.
 *
 * @param {BaseEntity|null} checkInEntity	A checkin entity or null.
 * @param {boolean} 		force			If true and checkInEntity is null
 * 											this returns strings related to
 * 											forcing a checkin.
 * @return {Object}  An configuration object.
 */
const getCheckInStatusConfiguration = ( checkInEntity, force = false ) => {
	let status = isModelEntityOfModel( checkInEntity, 'checkin' ) ?
		checkInEntity.in :
		checkInModel.CHECKIN_STATUS_ID.STATUS_CHECKED_NEVER;
	status = [
		checkInModel.CHECKIN_STATUS_ID.STATUS_CHECKED_NEVER,
		checkInModel.CHECKIN_STATUS_ID.STATUS_CHECKED_OUT,
	].includes( status ) && force ?
		null :
		status;
	let checkInStatusText,
		checkInActionText,
		checkInActionClassName,
		checkInStatusIcon,
		checkInStatusClassName;
	switch ( status ) {
		case checkInModel.CHECKIN_STATUS_ID.STATUS_CHECKED_NEVER:
			checkInStatusText = __(
				'Has not been checked in yet.',
				'event_espresso'
			);
			checkInActionText = __( 'Check In', 'event_espresso' );
			checkInActionClassName = 'ee-green';
			checkInStatusClassName = 'ee-red';
			checkInStatusIcon = 'no-alt';
			break;
		case checkInModel.CHECKIN_STATUS_ID.STATUS_CHECKED_IN:
			checkInStatusText = sprintf(
				__( 'Last checked in on %s', 'event_espresso' ),
				checkInEntity.timestamp
			);
			checkInActionText = __( 'Check Out', 'event_espresso ' );
			checkInActionClassName = 'ee-red';
			checkInStatusClassName = 'ee-green';
			checkInStatusIcon = 'yes';
			break;
		case checkInModel.CHECKIN_STATUS_ID.STATUS_CHECKED_OUT:
			checkInStatusText = sprintf(
				__( 'Last checked out on %s', 'event_espresso' ),
				checkInEntity.timestamp
			);
			checkInActionText = __( 'Check In', 'event_espresso ' );
			checkInActionClassName = 'ee-green';
			checkInStatusClassName = 'ee-red';
			checkInStatusIcon = 'no-alt';
			break;
		default:
			checkInStatusText = __(
				'Has access to datetime, but not approved.',
				'event_espresso'
			);
			checkInActionText = __( 'Check In Anyways', 'event_espresso ' );
			checkInActionClassName = 'ee-yellow';
			checkInStatusClassName = 'ee-red';
			checkInStatusIcon = 'no-alt';
			break;
	}
	return {
		checkInStatusText,
		checkInActionText,
		checkInActionClassName,
		checkInStatusIcon,
		checkInStatusClassName,
	};
};

/**
 * Returns user friendly checkin status text for the current checkin status.
 *
 * @param {BaseEntity|null}	Checkin entity or null
 * @param {boolean} force	If true and checkInEntity is null this returns
 * 							strings related to forcing a checkin.
 * @return {string} A user-friendly string describing the checkin status.
 * @type {memoized}
 */
export const getCheckInStatusText = memize(
	( checkInEntity, force = false ) => getCheckInStatusConfiguration(
		checkInEntity,
		force,
	).checkInStatusText
);

/**
 * Returns user friendly checkin action text for the current checkin status.
 *
 * "Action text" refers to describing toggling the checkin status for the given
 * status.  So for example if the provided checkin status is never checked in or
 * checked out, the action text would be "Check In"
 *
 * @param {BaseEntity|null}	Checkin entity or null
 * @param {boolean} force	If true and checkInEntity is null this returns
 * 							strings related to forcing a checkin.
 * @return {string} A user friendly string describing a the action the user can
 * 					take on this checkin record.
 * @type {memoized}
 */
export const getCheckInActionText = memize(
	( checkInEntity, force = false ) => getCheckInStatusConfiguration(
		checkInEntity,
		force
	).checkInActionText
);

/**
 * Returns a css class name for the checkin action.
 *
 * @param {BaseEntity|null}	Checkin entity or null
 * @param {boolean} force	If true and checkInEntity is null this returns
 * 							strings related to forcing a checkin.
 * @return {string} The css class for the action on this checkin.
 * @type {memoized}
 */
export const getCheckInActionClassName = memize(
	( checkInEntity, force = false ) => getCheckInStatusConfiguration(
		checkInEntity,
		force
	).checkInActionClassName
);

/**
 * Returns a dashicon reference for the checkin status.
 *
 * @param {BaseEntity|null}	Checkin entity or null
 * @param {boolean} force	If true and checkInEntity is null this returns
 * 							strings related to forcing a checkin.
 * @return {string} The dashicon reference for this checkin status.
 * @type {memoized}
 */
export const getCheckInStatusIcon = memize(
	( checkInEntity, force = false ) => getCheckInStatusConfiguration(
		checkInEntity,
		force
	).checkInStatusIcon
);

/**
 * Returns css class string for the current checkin status.
 *
 * @param {BaseEntity|null}	Checkin entity or null
 * @param {boolean} force	If true and checkInEntity is null this returns
 * 							strings related to forcing a checkin.
 * @return {string} The css class name for the current checkin status.
 * @type {memoized}
 */
export const getCheckInStatusClassName = memize(
	( checkInEntity, force = false ) => getCheckInStatusConfiguration(
		checkInEntity,
		force
	).checkInStatusClassName
);
