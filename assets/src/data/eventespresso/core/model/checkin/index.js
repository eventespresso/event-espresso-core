/**
 * External imports
 */
import { isModelEntityOfModel } from '@eventespresso/validators';
import { InvalidModelEntity } from '@eventespresso/eejs';

/**
 * Internal imports
 */
import { select, dispatch } from '../../../base-controls';
import { REDUCER_KEY } from '../../constants';

export function* receiveLatestCheckin( checkinEntity ) {
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
	// resolve the selector for getLatestCheckin so that if it hasn't been
	// resolved yet, the selector will return the expected check-in record.
	return {
		type:
	}
}

// RECEIVE_LATEST_CHECKIN
// TOGGLE_CHECKIN