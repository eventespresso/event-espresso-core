/**
 * External imports
 */
import { getEndpoint } from '@eventespresso/model';
import { isModelEntityFactoryOfModel } from '@eventespresso/validators';
import { isEmpty } from 'lodash';

/**
 * Internal imports
 */
import { fetch, dispatch, resolveSelect } from '../../../base-controls';
import { REDUCER_KEY } from '../../constants';
import { REDUCER_KEY as SCHEMA_REDUCER_KEY } from '../../../schema/constants';

/**
 * Resolver for the getLatestCheckin action.
 *
 * @param {number} registrationId
 * @param {number} dateTimeId
 * @return {BaseEntity|null} Null if there is an error or no checkin record.
 */
export function* getLatestCheckin( registrationId, dateTimeId ) {
	let checkInResponse;
	const path = `${ getEndpoint( 'checkin' ) }/` +
		`?where[REG_ID]=${ registrationId }&where[DTT_ID]=${ dateTimeId }` +
		'&order_by[CHK_timestamp]=DESC&limit=1';
	try {
		checkInResponse = yield fetch( {
			path,
			method: 'GET',
		} );
		if ( isEmpty( checkInResponse ) ) {
			// there is no checkin record yet!
			return null;
		}
		checkInResponse = checkInResponse.pop();
	} catch ( error ) {
		// @todo need to do something different when the user isn't authed and
		// this is the cause for the error?
		return null;
	}
	const factory = yield resolveSelect(
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
