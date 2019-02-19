/**
 * External imports
 */
import {
	isModelEntityOfModel,
	isModelEntityFactoryOfModel,
} from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';
import { getEndpoint } from '@eventespresso/model';
import { __ } from '@eventespresso/i18n';

/**
 * Internal imports
 */
import { dispatch, fetch, select } from '../../../base-controls';
import { REDUCER_KEY } from '../../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../../schema/constants';

/**
 * Action for receiving the latest check-in record for the given datetime id and
 * registration id.
 *
 * @param {BaseEntity} checkinEntity
 * @param {number} registrationId
 * @param {number} dateTimeId
 */
export function* receiveLatestCheckin(
	checkinEntity,
	registrationId,
	dateTimeId
) {
	if ( ! isModelEntityOfModel( checkinEntity, 'checkin' ) ) {
		throw new InvalidModelEntity(
			'Expected a checkin record.',
			checkinEntity
		);
	}
	yield dispatch(
		REDUCER_KEY,
		'receiveEntity',
		checkinEntity
	);
	yield dispatch(
		'core/data',
		'finishResolution',
		REDUCER_KEY,
		'getEntityById',
		'checkin',
		checkinEntity.id
	);
	yield dispatch(
		REDUCER_KEY,
		'receiveSelectorValue',
		'getLatestCheckin',
		checkinEntity,
		registrationId,
		dateTimeId,
	);
}

/**
 * Toggles the checkin state for the given registration id and datetime id.
 *
 * @param {number} registrationId
 * @param {number} dateTimeId
 * @param {boolean} force  If true, then whether the registration CAN be checked
 * in or not is ignored.
 * @return {BaseEntity|null} Null if there is an error or the new Checkin entity
 */
export function* toggleCheckin( registrationId, dateTimeId, force = false ) {
	let checkInResponse;
	const path = `${ getEndpoint( 'registration' ) }/` +
		`${ registrationId }/toggle_checkin_for_datetime/${ dateTimeId }`;
	try {
		checkInResponse = yield fetch( {
			path,
			method: 'POST',
			data: { force },
		} );
	} catch ( error ) {
		yield dispatch(
			'core/notices',
			'createErrorNotice',
			__(
				'Toggling the checkin failed. Usually this is due to the checkin not having access',
				'event_espresso',
			)
		);
		return null;
	}
	const factory = yield select(
		SCHEMA_REDUCER_KEY,
		'getFactoryForModel',
		'checkin'
	);
	if ( ! isModelEntityFactoryOfModel( factory, 'checkin' ) ) {
		return null;
	}
	const newCheckin = factory.fromExisting( checkInResponse );
	yield dispatch(
		REDUCER_KEY,
		'receiveLatestCheckin',
		newCheckin,
		registrationId,
		dateTimeId,
	);
	return newCheckin;
}
