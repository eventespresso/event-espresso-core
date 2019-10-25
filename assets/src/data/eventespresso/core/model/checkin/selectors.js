import { getSelectorValue } from '../model-specific-selectors';
import { getEntityById } from '../../selectors';

/**
 * Gets the latest checkin entity in the state for the given value.
 * @param {Object} state
 * @param {number} registrationId
 * @param {number} dateTimeId
 * @return {null|BaseEntity} The checkin entity if it exists or null.
 */
export function getLatestCheckin( state, registrationId, dateTimeId ) {
	const checkinId = getSelectorValue(
		state,
		'getLatestCheckin',
		registrationId,
		dateTimeId
	);
	if ( ! checkinId ) {
		return null;
	}
	return getEntityById( state, 'checkin', checkinId, [] );
}
